import { Rect, Group, FabricText } from "fabric";

import type { DetectedItem, HandleDetectResponseProps } from "./app.types";

const createABox = (item: DetectedItem) => {
  const rect = new Rect({
    left: item.box.left,
    top: item.box.top,
    width: item.box.width,
    height: item.box.height,
    fill: "rgba(0, 0, 0, 0)", // Semi-transparent black fill
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
    selectable: false,
  });

  // Group the rectangle and text for easier manipulation
  const group = new Group([rect, text]);

  return group;
};

const handleDetectResponse = ({ data, canvas }: HandleDetectResponseProps) => {
  for (const item of data) {
    const group = createABox(item);
    canvas.add(group);
  }

  canvas.renderAll();
};

export { handleDetectResponse };
