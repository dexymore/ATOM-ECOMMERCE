import { Request, Response, NextFunction } from 'express';
import { Item ,IItem} from '../models/itemModel';
import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";
import cloudinary from '../utils/cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// const multerStorage = multer.memoryStorage();

// interface IFile {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     buffer: Buffer;
//     size: number;
//   }


// const multerFilter = (req: Request, file:IFile, cb: any) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Not an image! Please upload only images.'), false);
//     }
// }

// export const upload = multer({
//     storage: multerStorage,
//     fileFilter: multerFilter
// });
// upload.array('images', 5);






exports.getAllItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

const items = await Item.find()
if (!items) {
    return next(new AppError('No items found', 404));}

res.status(200).json({
    status: 'success',
    results: items.length,
 
    data: {
        items,
    },
});



});

exports.getItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

const item = await Item.findById(req.params.id);

if (!item) {
    return next(new AppError('No item found with that ID', 404));
    
}

res.status(200).json({
    status: 'success',
    data: {
        item,
    },
});

});

export const createItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Log directory of the controller function
    // console.log('Controller directory:', __dirname);
  
    const { images, ...otherData } = req.body;
  
    if (!Array.isArray(images)) {
      return next(new AppError('Images should be an array', 400));
    }
  
    const uploader = async (filePath: string) => {
      // Check if the file exists before attempting to upload
      if (!fs.existsSync(filePath)) {
        throw new AppError(`File not found: ${filePath}`, 400);
      }
      return await cloudinary.uploader.upload(filePath, { folder: 'Items' });
    };
  
    try {
      const uploadPromises = images.map((image: string) => {
        const filePath = path.resolve(__dirname, '../data', image); // Adjust the path as necessary
        return uploader(filePath);
      });
      const uploadResults = await Promise.all(uploadPromises);
  
      const formattedImages = uploadResults.map(result => ({
        public_id: result.public_id,
        url: result.secure_url
      }));
  
      const newItem = await Item.create({
        ...otherData,
        images: formattedImages
      });
  
      if (!newItem) {
        return next(new AppError('Error creating this item', 500));
      }
  
      res.status(201).json({
        status: 'success',
        data: {
          item: newItem,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
exports.updateItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const item= await Item.findByIdAndUpdate(req.params.id, req.body);
if (!item) {
    return next(new AppError('No item found with that ID', 404))};
res.status(200).json({
    status: 'success',
    data: {
        item,
    },
});
});


exports.deleteItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const item= await Item.findByIdAndDelete(req.params.id);
if (!item) {
    return next(new AppError('No item found with that ID', 404))}
res.status(204).json({})

})


exports.getSpecificItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const queryObj = { ...req.query };


  const allowedFields = ['category', 'size', 'sex', 'name'];

  // Remove fields from queryObj that are not allowed
  Object.keys(queryObj).forEach(key => {
      if (!allowedFields.includes(key)) {
          delete queryObj[key];
      }
  });

  // Modify the query to perform partial matching for the name field
  if (queryObj.name) {
      queryObj.name = { $regex: queryObj.name, $options: 'i' }; // 'i' makes it case-insensitive
  }


  const items = await Item.find(queryObj);

  if (!items.length) {
      return next(new AppError('No items found matching the criteria', 404));
  }

  res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
          items,
      },
  });
});
