import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to Database');
    })
    .catch((err) => {
        console.error('Database connection error', err);
    });

// Define Mongoose schemas and models
const farmerSchema = new mongoose.Schema({
    userName: String,
    phone: Number,
    email: String,
    password: String
});
const Farmer = mongoose.model('Farmer', farmerSchema);

const farmSchema = new mongoose.Schema({
    farmName: String,
    farmLocation: String,
    area: Number,
    laborers: Number,
    laborPayment: Number,
    income: Number,
    loss: Number,
    investment: Number,
    totalMoney: Number,
    experience: Number,
    cropCount: Number,
    crops: String,
    irrigationMethods: String,
    farmingMachines: String,
    expectedEarnings: Number,
});
const Farm = mongoose.model('Farm', farmSchema);

// Endpoint to create a new farm
app.post('/api/farm', async (req, res) => {
    const farmData = new Farm(req.body);
    try {
        const savedFarm = await farmData.save();
        res.status(201).json({ success: true, farm: savedFarm });
    } catch (error) {
        console.error('Error saving farm data', error);
        res.status(500).json({ success: false, message: 'Error saving farm data', error });
    }
});

// Endpoint for login
app.post('/auth/login', async (req, res) => {
    const { name, pass } = req.body;
    try {
        const farmer = await Farmer.findOne({ userName: name });

        if (!farmer || farmer.password !== pass) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({ success: true, message: 'ok' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Error during login', error });
    }
});

// Endpoint for user signup
app.post('/auth/signup', async (req, res) => {
    try {
        const user = new Farmer(req.body);
        await user.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
