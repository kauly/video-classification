import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS_NAMES } from "@/lib/app.types";
import { useAppActions, useSelectedTab } from "@/lib/state";
import { MainContent } from "./main-content";
import { ResultContent } from "./result-content";

function MainTabs() {
  const selectedTab = useSelectedTab();
  const { setSelectedTab } = useAppActions();

  const handleChange = (tab: string) => setSelectedTab(tab as TABS_NAMES);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleChange}
      className="flex flex-col h-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={TABS_NAMES.main}>Main</TabsTrigger>
        <TabsTrigger value={TABS_NAMES.results}>Results</TabsTrigger>
      </TabsList>
      <TabsContent value={TABS_NAMES.main} className="h-full">
        <MainContent />
      </TabsContent>
      <TabsContent value={TABS_NAMES.results} className="h-full">
        <ResultContent />
      </TabsContent>
    </Tabs>
  );
}

export { MainTabs };
