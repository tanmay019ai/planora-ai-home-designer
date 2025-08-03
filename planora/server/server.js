const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend access
app.use(express.json());

app.post('/generate', (req, res) => {
  const { prompt } = req.body;

  console.log("Received prompt:", prompt);

  // Simulate a fake response for testing
  const fakeModelUrl = "https://example.com/fake-3d-model.glb";

  res.json({ modelUrl: fakeModelUrl });
});

app.listen(5000, () => {
  console.log('Backend is running on http://localhost:5000');
});
