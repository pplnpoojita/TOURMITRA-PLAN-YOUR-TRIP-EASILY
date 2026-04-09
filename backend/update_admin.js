const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    const email = "tourmitra0821@gmail.com";
    const newPassword = "tourmitra@08";
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    let user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      user.name = "Poojita";
      user.role = "admin";
      await user.save();
      console.log('User updated successfully in MongoDB');
    } else {
      user = await User.create({
        name: "Poojita",
        email: email,
        password: hashedPassword,
        role: "admin"
      });
      console.log('User created successfully in MongoDB');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();
