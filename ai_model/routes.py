import os
from PIL import Image
from flask import request, jsonify
from smart_open import open
from app import app, db, Model
from db_models import Prediction, Box


@app.route("/detect", methods=["POST"])
def detect():
    image_path = request.json["image_path"]
    confidence = request.json["confidence"]
    iou = request.json["iou"]

    with open(image_path, "rb") as f:
        original_img = Image.open(f).convert("RGB")

    predictions = model(original_img, confidence, iou)
    detections = [p.to_dict() for p in predictions]

    if len(predictions) > 0:
        for pred in detections:
            bbox = pred.get("box")
            box = Box(
                top=bbox.top, left=bbox.left, width=bbox.width, height=bbox.height
            )
            new_pred = Prediction(
                class_name=pred.get("class_name"),
                confidence=pred.get("confidence"),
                image_path=image_path,
                box=box,
            )
            db.session.add(new_pred)
            db.session.commit()
    return jsonify(detections)


@app.route("/health_check", methods=["GET"])
def health_check():
    if model is None:
        return "Model is not loaded"
    return f"Model {model.model_name} is loaded"


@app.route("/load_model", methods=["POST"])
def load_model():
    model_name = request.json["model_name"]
    global model
    model = Model(model_name)
    return f"Model {model_name} is loaded"


@app.route("/upload", methods=["POST"])
def upload_img():
    file = request.files.get("file")
    print(f"File: {file}")
    if not file:
        return "Error: No file uploaded!", 500

    file_name = file.filename
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)
    file.save(file_path)
    return file_path


@app.route("/predictions", methods=["GET"])
def predictions():
    try:
        result = Prediction.query.all()
        return jsonify([r.json() for r in result])
    except:
        return "Error", 500
