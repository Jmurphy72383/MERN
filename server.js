const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/symbols', require('./routes/api/symbols'));
app.use('/api/data', require('./routes/api/data'));
app.use('/api/portfolio', require('./routes/api/portfolio'));

app.get('/', (req, res) => res.send('API Running!!!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));