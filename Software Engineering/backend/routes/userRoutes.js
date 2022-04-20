const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../model/userModel")
const router = express.Router();
const UserController = require('../routes/userController')
const alert = require('alert');
const { getToken } = require("../ultil.js");
const e = require("express");
router.get('/liststaff', UserController.index)
router.post('/show', UserController.show)
router.post('/update', UserController.update)
router.post('/delete', UserController.destroy)

router.get("/createadmin", async(req, res) => {
  try {
  const user = new User({
    email: 'admin@gmail.com',
    password: 'admin',
    name: 'admin',
    isStaff: false,
    isAdmin: true
  });
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  
  const newuser = await user.save()
  res.send(newuser)
  }catch(error) {
    res.send({message: error.message})
  }
})
// signup route
router.post('/register', async (req, res) => {
  const body = req.body;
  const checkuser = await User.findOne({ email: body.email });
  if(checkuser){
    res.status(401).send({ message: 'Invalid User Data.' });

    alert("mail đã có người đăng kí");
  }else{
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isStaff: body.password == 'staff',
      isAdmin: body.password == 'admin' && body.email == 'admin@gmail.com'
    });
    
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
      //res.alert("mail đã có người đăng kí");
    }
  }
})
  router.post("/store", async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // createing a new mongoose doc from user data
    let user = new User({
      name: body.name,
      isStaff : body.isStaff,
      email: body.email,
      password : body.password
    })
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));
  });
// login route
router.post("/signin", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          isStaff: user.isStaff,
          isAdmin: user.isAdmin,
          token: getToken(user)
        })
        res.status(200).send({ message: "Valid password" });
      } else {
        res.status(400).send({ error: "Invalid Password" });
      }
    } else {
      res.status(401).send({ error: "User does not exist" });
    }
});

router.put("/reset", async (req, res) => {
  if (req.body.password===req.body.cf_password && req.body.username)
  {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const pass = await bcrypt.hash(req.body.cf_password, salt);
  try
  {
    const body=req.body;
    const updateData = {
      name: req.body.username,
      email: body.email,
      password : pass
    }
    await User.findOneAndUpdate({email: body.email}, {$set: updateData});
    const newUser= User.findOne({email: body.email})
    if (newUser)
      {
        res.send({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          isStaff: newUser.isStaff,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser)
        })
      }
  }
  catch (error)
  {
      console.log(error);
  }  }
  else
  {
    res.status(400).send({message:"Password did not match"});
  }
});
  module.exports = router;