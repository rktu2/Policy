const express = require('express');
const app = express();
const connectDB = require('./db.js');
const apiRoutes = require('./routes/index.js');
const schedularRoutes = require('./routes/schedular.js')

require('dotenv').config()
connectDB()
app.use(express.json());


app.use('/api/v1', apiRoutes);
app.use('/api/schedular',schedularRoutes);
//server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

