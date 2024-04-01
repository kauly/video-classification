import { ColumnDef } from "@tanstack/react-table";

import { ModelPrediction, Result } from "@/lib/app.types";

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "input.iou",
    header: "IOU",
  },
  {
    accessorKey: "input.confidence",
    header: "Confidence",
  },
  {
    accessorKey: "predictions",
    header: "Predictions",
    cell: ({ row }) => {
      const predictions: ModelPrediction[] = row.getValue("predictions");
      return predictions?.length || 0;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "image_path",
    header: "Image",
  },
];
