export enum MODELS {
  YOLOv8n = "yolov8n",
  YOLOv8s = "yolov8s",
}

export type Box = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export interface LoadModelPayload {
  model_name: MODELS;
}

export interface DetectedItem {
  box: Box;
  class_name: string;
  confidence: number;
}

export type DetectResponse = DetectedItem[];
export interface DetectPayload {
  image_path: string;
  confidence: number;
  iou: number;
}

export type CapturedImage = {
  src: string;
  width: number;
  height: number;
};
