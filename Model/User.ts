import mongoose from "mongoose";

const {Schema} = mongoose;

interface IUser extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    role: 'Client' | 'Freelancer';
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Client', 'Freelancer'] },
})

const User = mongoose.model<IUser>('User', userSchema);
module.exports = User;