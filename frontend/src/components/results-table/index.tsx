import { getResults } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";

function ResultsTable() {
  const query = useQuery({
    queryKey: ["getResults"],
    queryFn: getResults,
  });
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={query?.data || []} />
      </CardContent>
    </Card>
  );
}

export { ResultsTable };
