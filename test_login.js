const http = require('http');

const data = JSON.stringify({
  email: 'pplnpoojita@gmail.com',
  password: 'password123' // assuming this is not the right password
});

const req = http.request({
  hostname: 'localhost',
  port: 5001,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(res.statusCode, body));
});

req.on('error', console.error);
req.write(data);
req.end();
