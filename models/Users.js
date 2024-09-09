const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {type: String, required: [true, "user name is required"], lowercase: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {
            type: String,
            required: [true, "password is required"],
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9]+$/.test(v);
                },
                message: props => "Password must contain both letters and numbers",
              },
        }
    }, 
    {versionKey: false}  
);

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("Users", userSchema);