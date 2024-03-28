export type ModelName = "yolov8n" | "yolov8s";

export type Box = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export interface LoadModelPayload {
  model_name: ModelName;
}

export interface DetectResponse {
  box: Box;
  class_name: string;
  confidence: number;
}

export interface DetectPayload {
  image_path: string;
  confidence: number;
  iou: number;
}
