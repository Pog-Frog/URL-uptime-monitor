import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
        res.send('Hello World!');
    }
);

mongoose.connect('mongodb://mongodb:27017/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
        console.log('Connected to MongoDB');
    }
);
app.listen(3000, () => {
        console.log('Server is running on port 3000');
    }
);

export default app;
