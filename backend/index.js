const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const EmployeesRouter = require('./Routes/employees');  // Make sure this is correct

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

const app = express();

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/employees', EmployeesRouter);  // Ensure this line is present

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});