const fs = require('fs');
const path = require('path');
const Terser = require('terser');

const directory = path.join(__dirname, 'src'); // Path to your source directory

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (path.extname(file) === '.ts' || path.extname(file) === '.tsx') { // Adjust for TypeScript files
      const filePath = path.join(directory, file);
      const code = fs.readFileSync(filePath, 'utf8');
      const result = Terser.minify(code, { output: { comments: false } });

      if (result.error) throw result.error;

      fs.writeFileSync(filePath, result.code, 'utf8');
    }
  });
});
