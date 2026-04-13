const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

async function checkUsers() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({});
  console.log('Users in DB:');
  users.forEach(u => console.log(`- ${u.name} | ${u.email} | ${u.role} | ${u.password}`));
  mongoose.disconnect();
}
checkUsers();
