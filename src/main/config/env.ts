export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://geverson:root@localhost:27017',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SECRET || 'tj670==5H|5H==076jt'
}