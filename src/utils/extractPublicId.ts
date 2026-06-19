export const extractPublicId = (url: string, keepExtension = false): string => {
  const parts = url.split("/upload/")[1];

  // remove version (v1750243472/)
  const pathWithoutVersion = parts.replace(/^v\d+\//, "");
   if (keepExtension) {
     return pathWithoutVersion;
   }
  
     return pathWithoutVersion.substring(0, pathWithoutVersion.lastIndexOf("."));
};
