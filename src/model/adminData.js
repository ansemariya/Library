const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb+srv://userone:userone@myfiles.bqvp5.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // validate(value) {
        //     if (!validator.isEmail(value)) throw new Error("Invalid Username Provided")
        // }
    },
    password: {
        type: String,
        required: true
    }
})

AdminSchema.pre('save', async function (next) {
    const admin = this;
    admin.password = await bcrypt.hash(admin.password, 8)
    next();
})




AdminSchema.statics.findByCredentials = async (username, password) => {
    const admin = await AdminData.findOne({ username })
    if (!admin) throw new Error("Unable to LOGIN(You aren't a Admin)")

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) throw new Error("Unable to LOGIN")

    return admin
}

const AdminData = mongoose.model('AdminData', AdminSchema);

module.exports = AdminData;