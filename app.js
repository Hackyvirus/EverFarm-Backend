import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import * as tf from '@tensorflow/tfjs-node';

const app = express();
const PORT = 4000;

// Setup multer for file uploads
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Eversity', { useNewUrlParser: true, useUnifiedTopology: true })
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

// Load the AI model once at startup
let aiModel;
const loadModel = async () => {
    try {
        aiModel = await tf.loadLayersModel('D:/Web Dev/Imp/everfarm-backend/AI/model.json');
        console.log('AI Model loaded successfully');
    } catch (error) {
        console.error('Error loading AI model:', error);
    }
};
loadModel();

// Endpoint to handle image upload and prediction
app.post('/api/predict', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    try {
        const imgBuffer = req.file.buffer; // Get the image buffer
        const imageTensor = tf.node.decodeImage(imgBuffer, 3); // Decode image
        const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]); // Resize to model input size
        const inputTensor = resizedImage.expandDims(0).toFloat().div(tf.scalar(255)); // Prepare tensor

        // Make prediction
        const prediction = aiModel.predict(inputTensor);
        const result = prediction.arraySync(); // Get the result from the tensor

        res.status(200).json({ success: true, prediction: result });
    } catch (error) {
        console.error('Error during prediction:', error);
        res.status(500).json({ success: false, message: 'Error making prediction', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
