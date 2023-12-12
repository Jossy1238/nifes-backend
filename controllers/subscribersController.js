const Subscriber = require("../models/Subscriber");

//Subscribe
const subscribe = async (req, res)=>{
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({message: "Please fill all required fields"});
        }    


        //Check if user with email exists
        let existingEmail = await Subscriber.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: "User with this email already exists"});
        }

        const subscriber = new Subscriber(
            {
                email
            }
        );

        await subscriber.save();

        return res.status(200).json({message: "You have successfully subscribed to our newsletter"});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    subscribe
}