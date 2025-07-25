import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./uploads/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = (fieldName: string) => {
  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
      const filetypes = /jpeg|jpg|png|gif|webp/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (extname && mimetype) {
        return cb(null, true);
      } else {
        return cb(
          new Error("Only image files are allowed (jpg, jpeg, png, gif).")
        );
      }
    },
  }).single(fieldName);
};

export default upload;
