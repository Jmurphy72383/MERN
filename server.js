const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/symbols', require('./routes/api/symbols'));
app.use('/api/data', require('./routes/api/data'));
app.use('/api/nyseData', require('./routes/api/nyseData'));
app.use('/api/portfolio', require('./routes/api/portfolio'));

//Serve Static Assets In Production
if(process.env.NODE_ENV === 'production') {
    //Set Static Folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));