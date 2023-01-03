const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

//user schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minLength: [6, 'Minimum password length is 6 characters'],
        validate: [
            (password) => {
            const reg = /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
            if (reg.test(password)) {
                return true
            } else {
                return false
            }
        },
        "The password must contain upper & lower case mixed with atleast one numbers and spcial char"]
    }
})

//fire a function before user doc saved to db
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error)
        next()
    }
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    //console.log({ email })
    const user = await UserSchema.findOne({ email })

    if (user) {

        //console.log(user)
        //console.log(password)

        //console.log(bcrypt.compare(password, user.password))

        const auth = await bcrypt.compare(password, user.password)
        //console.log('the value of auth is: ', auth)
        
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const UserSchema = mongoose.model('user', userSchema)
module.exports = UserSchema