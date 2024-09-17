import multer from 'multer';
import path from 'path';

// Configurar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/avatars');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

  export default upload;