import { Schema, model, Document } from 'mongoose';

interface IItem extends Document {
    name: string;
    availability: boolean;
    createdAt: Date;
    discount:number | null;
    images: [string];
    price: number;
    category: string;
    description: string;
    size: string;
    stock: number;
    sold: number;
    sex: string;
  
}

const itemSchema = new Schema<IItem>({
    name: { type: String, required: true },
    availability: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    discount: {
        percentage: { type: Number, default: 0 },
        validUntil: { type: Date, default: null },
      },
    images: { type: [], required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    sex: { type: String, required: true , enum:["Male","Female","Unisex"]},


    // Define additional important attributes here
});

const Item= model<IItem>('Item', itemSchema);

export { Item, IItem };