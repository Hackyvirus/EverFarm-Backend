const tf = require('@tensorflow/tfjs-node');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Load the TensorFlow model
let model;
const loadModel = async () => {
  model = await tf.loadLayersModel('D:/Web Dev/Imp/everfarm-backend/AI/model.json');
};
loadModel();

// Endpoint to handle image upload and prediction
app.post('/predict', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  // Load and preprocess the image
  const imageBuffer = fs.readFileSync(filePath);
  const imageTensor = tf.node.decodeImage(imageBuffer).resizeNearestNeighbor([224, 224]).toFloat().div(tf.scalar(255)).expandDims();

  // Make prediction
  const predictions = model.predict(imageTensor);
  predictions.print();

  // Send prediction response
  res.json(predictions.arraySync());

  // Remove the uploaded file
  fs.unlinkSync(filePath);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
