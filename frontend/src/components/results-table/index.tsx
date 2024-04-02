import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useTableData } from "@/lib/state";

function ResultsTable() {
  const data = useTableData();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}

export { ResultsTable };
