module.exports = {
  // 1. MongoDB
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://tanmay:notpassword@cluster0.xcgkdi7.mongodb.net/postTest?retryWrites=true&w=majority",

  // 2. JWT
  TOKEN_SECRET: process.env.TOKEN_SECRET || "anystring",
  // "pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L",

  // 3. Express Server Port
  LISTEN_PORT: process.env.PORT || 3000,
};
