import uuid
import sqlalchemy as sa
from config import db
from datetime import datetime


class InputModel(db.Model):
    __tablename__ = "input"

    id = sa.Column(sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    iou = sa.Column(sa.Float, nullable=False)
    confidence = sa.Column(sa.Float, nullable=False)
    result_id = sa.Column(sa.UUID(as_uuid=True), sa.ForeignKey("result.id"))

    def __repr__(self) -> str:
        return f"<Input Class: {self.id}, iou: {self.iou}, confidence: {self.confidence}, result: {self.result_id}"

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "iou": self.iou,
            "confidence": self.confidence,
            "result_id": self.result_id,
        }


class PredictionModel(db.Model):
    __tablename__ = "prediction"

    id = sa.Column(sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_name = sa.Column(sa.String(100), nullable=False)
    confidence = sa.Column(sa.Float, nullable=False)
    result_id = sa.Column(sa.UUID(as_uuid=True), sa.ForeignKey("result.id"))
    box = db.relationship("BoxModel", uselist=False, backref="prediction")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "class_name": self.class_name,
            "confidence": self.confidence,
            "result_id": self.result_id,
            "box": self.box.to_dict(),
        }

    def __repr__(self) -> str:
        return f"<Prediction Class: {self.id}, Class Name: {self.class_name}, Confidence: {self.confidence}, Box: {self.box}>"


class BoxModel(db.Model):
    __tablename__ = "box"

    id = sa.Column(sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prediction_id = sa.Column(sa.UUID(as_uuid=True), sa.ForeignKey("prediction.id"))
    left = sa.Column(sa.Integer, nullable=False)
    top = sa.Column(sa.Integer, nullable=False)
    width = sa.Column(sa.Integer, nullable=False)
    height = sa.Column(sa.Integer, nullable=False)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "prediction_id": self.prediction_id,
            "left": self.left,
            "top": self.top,
            "width": self.width,
            "height": self.height,
        }

    def __repr__(self) -> str:
        return f"<Box Class: {self.id}, prediction id: {self.prediction_id} top: {self.top} left: {self.left} width: {self.width} height: {self.height}>"


class ResultModel(db.Model):
    __tablename__ = "result"

    id = sa.Column(sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = sa.Column(sa.DateTime(), nullable=False, default=datetime.now)
    input = db.relationship("InputModel", uselist=False, backref="result")
    predictions = db.relationship("PredictionModel", backref="result")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "input": self.input.to_dict(),
            "predictions": [p.to_dict() for p in self.predictions],
        }

    def __repr__(self) -> str:
        return f"<Result Class: {self.id}, Input: {self.input}, Predictions: {len(self.predictions)}"
