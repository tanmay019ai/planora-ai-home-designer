const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MESHY_API_KEY = process.env.MESHY_API_KEY;

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    console.log('✅ Received prompt:', prompt);
    const freeModelUrl = 'http://localhost:5173/house.glb'; // Placeholder for free model URL

  return res.json({ modelUrl: freeModelUrl });

    // const headers = { 
    //   Authorization: `Bearer ${MESHY_API_KEY}`,
    //   'Content-Type': 'application/json'
    // };

    // const payload = {
    //   mode: 'preview',
    //   prompt: prompt,
    //   art_style: 'realistic',
    //   should_remesh: true
    // };

    // const response = await axios.post(
    //   'https://api.meshy.ai/openapi/v2/text-to-3d',
    //   payload,
    //   { headers }
    // );

    // console.log('✅ Meshy API response:', response.data);

    // const generationId = response.data?.generationId;
    // if (!generationId) {
    //   return res.status(500).json({ error: 'No generationId received from Meshy' });
    // }

    // // Polling for model status
    // let modelUrl = null;
    // for (let i = 0; i < 20; i++) {
    //   await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds

    //   const statusRes = await axios.get(
    //     `https://api.meshy.ai/v1/mesh/${generationId}/status`,
    //     { headers }
    //   );

    //   const status = statusRes.data?.status;
    //   console.log(`⏳ Attempt ${i + 1}: Status - ${status}`);

    //   if (status === 'SUCCEEDED') {
    //     modelUrl = statusRes.data?.assetUrls?.gltf || statusRes.data?.assetUrls?.fbx || statusRes.data?.assetUrls?.usdz;
    //     break;
    //   } else if (status === 'FAILED') {
    //     return res.status(500).json({ error: 'Model generation failed on Meshy' });
    //   }
    // }

    // if (!modelUrl) {
    //   return res.status(500).json({ error: 'Model not ready in time' });
    // }

    // return res.json({ modelUrl });

  } catch (error) {
    console.error('❌ Error during model generation:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Internal server error while generating model' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
