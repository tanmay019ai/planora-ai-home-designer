// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/models", express.static(path.join(__dirname, "models")));

const MESHY_API_KEY = process.env.MESHY_API_KEY;

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    // Step 1: Generate preview
    const previewRes = await axios.post(
      "https://api.meshy.ai/openapi/v2/text-to-3d",
      {
        mode: "preview",
        prompt,
        art_style: "realistic",
        should_remesh: true
      },
      {
        headers: {
          Authorization: `Bearer ${MESHY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const previewTaskId = previewRes.data.result;
    if (!previewTaskId) throw new Error("No preview task ID received");

    // Step 2: Poll for preview completion
    await waitForCompletion(previewTaskId);

    // Step 3: Start refine using previewTaskId
    const refineRes = await axios.post(
      "https://api.meshy.ai/openapi/v2/text-to-3d",
      {
        mode: "refine",
        preview_task_id: previewTaskId,
        enable_pbr: true
      },
      {
        headers: {
          Authorization: `Bearer ${MESHY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const refineTaskId = refineRes.data.result;
    if (!refineTaskId) throw new Error("No refine task ID received");

    // Step 4: Poll for refine completion
    const refinedModelUrl = await waitForCompletion(refineTaskId, true);

    // Step 5: Save model to /models/<uuid>/model.glb
    const folderId = uuidv4();
    const folderPath = path.join(__dirname, "models", folderId);
    fs.mkdirSync(folderPath, { recursive: true });

    const modelPath = path.join(folderPath, "model.glb");
    const modelData = await axios.get(refinedModelUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(modelPath);
    modelData.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const finalUrl = `http://localhost:${PORT}/models/${folderId}/model.glb`;
    return res.json({ modelUrl: finalUrl });
  } catch (err) {
    console.error("❌ Error:", err.message);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

// Function to poll task until SUCCEEDED
async function waitForCompletion(taskId, isRefine = false) {
  const maxAttempts = 60;
  const delay = 5000;

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(resolve => setTimeout(resolve, delay));

    const poll = await axios.get(
      `https://api.meshy.ai/openapi/v2/text-to-3d/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${MESHY_API_KEY}`
        }
      }
    );

    const status = poll.data.status;

    if (status === "SUCCEEDED") {
      return isRefine ? poll.data.model_urls?.glb : taskId;
    }

    if (status === "FAILED") {
      throw new Error(`${isRefine ? "Refine" : "Preview"} generation failed`);
    }
  }

  throw new Error(`${isRefine ? "Refine" : "Preview"} generation timed out`);
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
