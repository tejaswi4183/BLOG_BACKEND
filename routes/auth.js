const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation');


router.post('/register', async (req, res) => {

    const {error} = await registerSchema.validateAsync(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(404).send('email is already exist');

    
   const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
    });
    try{
        const saveduser = await user.save();
        console.log('saved');
        //res.send(saveduser);
        res.send({user: user._id});
    }
    catch(err){
        res.status(404).send(err);
    }
});

router.post('/login', async (req, res) => {
     const {error} = await loginSchema.validateAsync(req.body);

   //const { error } = Joi.validate(req.body, schema);
   
   if(error) return res.status(400).send(error.details[0].message);
   

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).send("Email does't exists");

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword) return res.status(404).send('Invalid password');

    const token = jwt.sign({_id: user._id}, "secretkey");
    res.header('authorization', token).send(token);
 

     //res.send('logged in');
});

module.exports = router;