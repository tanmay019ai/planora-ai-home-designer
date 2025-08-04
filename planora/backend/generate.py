from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import json
import uuid
import shutil
import subprocess

app = Flask(__name__)
CORS(app)

os.makedirs("static", exist_ok=True)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    print(f"✅ Received prompt: {prompt}")

    try:
        # STEP 1: Get structured layout from AI
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "Planora",
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {
                        "role": "user",
                        "content": f"""Convert this house request into a JSON layout with room objects.
Each object should have 'type', 'position' [x,y,z], and optional 'size' (small, medium, large).
Prompt: {prompt}

Respond ONLY with a pure JSON array.
Example:
[
  {{ "type": "bedroom", "position": [0, 0, 0], "size": "medium" }},
  {{ "type": "kitchen", "position": [4, 0, 0], "size": "small" }}
]
"""
                    }
                ]
            })
        )

        res_data = response.json()
        layout_json = res_data["choices"][0]["message"]["content"]

        # STEP 2: Save layout to file
        layout_data = json.loads(layout_json)
        layout_path = "layout.json"
        with open(layout_path, "w") as f:
            json.dump(layout_data, f, indent=2)

        print("✅ Layout saved:", layout_data)

        # STEP 3: Generate model using Blender
        model_id = str(uuid.uuid4())[:8]
        output_glb = f"static/house_{model_id}.glb"

        blender_command = [
            "blender", "--background", "--python", "blender_script.py", "--", output_glb
        ]

        subprocess.run(blender_command, check=True)

        # STEP 4: Return generated model URL
        model_url = f"http://localhost:5000/{output_glb}"
        return jsonify({
            "modelUrl": model_url
        })

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route("/static/<path:filename>")
def serve_model(filename):
    return send_from_directory("static", filename)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
