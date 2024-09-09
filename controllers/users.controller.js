const User = require("../models/Users");

exports.register = async (req, res) => {
    console.log("Start Register");
    
    const { name, email, password } = req.body;

    try {
        const user =  await User.findOne({email});
        if (user) {
            return res.status(404).json({message: "email already exist"});
        }
        const newUser = new User({name, email, password});
        await newUser.save();
        console.log("Registration Success");
        res.render("routes/login");
    } catch (err) {
        console.log(`user registration error---${err.message}`);
        return res.status(500).json({message: "internal server error"});
    } 
}

exports.login = async (req, res) => {
    console.log("Start Login", req.body);
    const {email, password} = req.body;

    const user =  await User.findOne({email});

    if (!user) {
        return res.status(404).json({message: "User Doesn't Exist"});
    }
    const result = await user.matchPassword(password);
    if (result) {
        res.render("routes/task");
    } else {
        return res.status(404).json({message: "Password isn't correct"});
    }

}