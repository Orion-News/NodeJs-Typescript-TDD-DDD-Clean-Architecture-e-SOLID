export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb+srv://curso-mango:Hf5GCCm5mcojO56a@curse-mango.a85oa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SECRET || 'tj670==5H|5H==076jt'
}