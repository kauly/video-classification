import { FabricImage, StaticCanvas } from "fabric";

export enum MODELS {
  YOLOv8n = "yolov8n",
  YOLOv8s = "yolov8s",
}

export enum WIZARD_TABS {
  setup = "SETUP",
  tunning = "TUNNING",
}

export type Box = {
  height: number;
  left: number;
  top: number;
  width: number;
};

export type TunningOptions = {
  confidence: number;
  iou: number;
};

export type LoadModelPayload = {
  model_name: MODELS;
};

export type DetectedItem = {
  box: Box;
  class_name: string;
  confidence: number;
};

export type DetectResponse = DetectedItem[];
export type DetectPayload = {
  image_path: string;
} & TunningOptions;

export type Dimensions = {
  width: number;
  height: number;
};

export type ModelInput = {
  id: string;
  result_id: string;
} & Pick<DetectPayload, "confidence" | "iou">;

export type ModelBox = { id: string; prediction_id: string } & Box;

export type ModelPrediction = {
  id: string;
  result_id: string;
  box: ModelBox[];
} & Pick<DetectedItem, "class_name" | "confidence">;

export type Result = {
  id: string;
  created_at: string;
  image_path: string;
  input: ModelInput;
  predictions: ModelPrediction[];
};

export type UpdateCanvasProps = {
  canvasInstance: StaticCanvas;
  videoInstance: HTMLVideoElement;
  dimensions: Dimensions;
};

export type GetImageFromVideoProps = Omit<UpdateCanvasProps, "canvasInstance">;
export type GetImageFromVideoReturn = {
  imgSrc: string;
  canvasImage: FabricImage;
};

export type HandleDetectResponseProps = {
  data: DetectedItem[];
  canvas: StaticCanvas;
};
