export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://mongo:27017/myFirstDatabase",
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || "tj670==5H|5H==076jt",
};
