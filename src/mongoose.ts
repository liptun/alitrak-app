import dotenv from 'dotenv'
import mongoose from 'mongoose'
// import User from './models/User'

dotenv.config()
const uri: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/admin`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    ssl: true,
    dbName: process.env.DB_NAME
})


// const testUser = new User({
//     name: 'Bar',
//     email: 'foo692@bar.com',
//     password: 'test1234'
// })

// testUser
//     .save()
//     .then((r) => {
//         console.log('result', r)
//     })
//     .catch((e) => {
//         console.error(e.message)
//     })
