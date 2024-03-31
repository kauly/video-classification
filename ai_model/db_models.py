import uuid
import sqlalchemy as sa
from config import db


class PredictionModel(db.Model):
    __tablename__ = "prediction"

    id = sa.Column(sa.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_name = sa.Column(sa.String(100), nullable=False)
    confidence = sa.Column(sa.Float, nullable=False)
    image_path = sa.Column(sa.String(500), nullable=False)
    box = db.relationship("BoxModel", uselist=False, backref="prediction")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "class_name": self.class_name,
            "confidence": self.confidence,
            "image_path": self.image_path,
            "box": self.box.to_dict(),
        }

    def __repr__(self) -> str:
        return f"<Prediction Class: {self.class_name} Confidence: {self.confidence} Image: {self.confidence}>"


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
        return f"<Box Class: {self.prediction_id} top: {self.top} left: {self.left} width: {self.width} height: {self.height}>"
