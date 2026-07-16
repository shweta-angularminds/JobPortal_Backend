const {
  PORT,
  MONGO_URL,
  SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

const requiredEnv = {
  MONGO_URL,
  SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};

Object.entries(requiredEnv).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  port: Number(PORT) || 5000,
  mongoUrl: MONGO_URL!,
  jwtSecret: SECRET_KEY!,
  cloudinary: {
    cloudName: CLOUDINARY_CLOUD_NAME!,
    apiKey: CLOUDINARY_API_KEY!,
    apiSecret: CLOUDINARY_API_SECRET!,
  },
};
