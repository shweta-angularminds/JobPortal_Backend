import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./uploads/resume/"); 
  },
  filename: (req: any, file: any, cb: any) => {
   
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req: any, file: any, cb: any) => {
    
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

   
    if (extname && mimetype) {
      
      return cb(null, true);
    } else {
      
      return cb(new Error("Only resume files are allowed (pdf, doc, docx)."));
    }
  },
}).single("resume"); 

export default uploadFile;
