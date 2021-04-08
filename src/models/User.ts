import { model, Schema, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

interface IUser extends Document {
    email: string
    password: string
    name: string
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
    },
    password: { type: String, required: true },
})

userSchema.pre<IUser>('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = model('User', userSchema)

export default User
