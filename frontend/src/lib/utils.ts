import { type ClassValue, clsx } from "clsx";
import { Canvas, FabricImage, Rect, Group, FabricText } from "fabric";
import { twMerge } from "tailwind-merge";

import type { CreateLabeledImageProps, DetectedItem } from "./app.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const createABox = (item: DetectedItem) => {
  const rect = new Rect({
    left: item.box.left,
    top: item.box.top,
    width: item.box.width,
    height: item.box.height,
    fill: "rgba(0, 0, 0, 0.3)", // Semi-transparent black fill
    stroke: "blue", // Adjust stroke color
    strokeWidth: 2,
    selectable: false, // Prevent accidental selection of the box (optional)
  });

  // Create text object with class name
  const text = new FabricText(item.class_name, {
    left: item.box.left + 10, // Adjust text position within the box
    top: item.box.top + 10, // Adjust text position within the box
    fill: "white", // Text color
    fontSize: 16, // Adjust font size
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black background for text
    padding: 5, // Padding around the text (optional)
  });

  // Group the rectangle and text for easier manipulation
  const group = new Group([rect, text]);

  return group;
};

export const createLabeledImage = async ({
  dimensions,
  imgSrc,
  items,
}: CreateLabeledImageProps) => {
  try {
    const canvas = document.createElement("canvas");
    const fabricCanvas = new Canvas(canvas, dimensions);
    const fabricImage = await FabricImage.fromURL(imgSrc);
    fabricCanvas.add(fabricImage);

    for (const item of items) {
      const group = createABox(item);
      fabricCanvas.add(group);
    }

    fabricCanvas.renderAll();
    const labeledImage = fabricCanvas.toDataURL({
      format: "jpeg",
      multiplier: 1,
    });

    return labeledImage;
  } catch (err) {
    throw Error(`Error on create labeled image: ${err}`);
  }
};
