import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WIZARD_TABS } from "@/lib/app.types";
import { useAppActions, useSelectedTab } from "@/lib/state";

import { SetupForm } from "../setup-form";
import { TunningForm } from "../tunning-form";

function WizardTabs() {
  const selectedTab = useSelectedTab();
  const { setSelectedTab } = useAppActions();

  const handleChange = (tab: string) => setSelectedTab(tab as WIZARD_TABS);

  return (
    <Tabs
      value={selectedTab}
      onValueChange={handleChange}
      className="flex flex-col h-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={WIZARD_TABS.setup}>Setup</TabsTrigger>
        <TabsTrigger value={WIZARD_TABS.tunning}>Tunning</TabsTrigger>
      </TabsList>
      <TabsContent value={WIZARD_TABS.setup} className="h-full">
        <SetupForm />
      </TabsContent>
      <TabsContent value={WIZARD_TABS.tunning} className="h-full">
        <TunningForm />
      </TabsContent>
    </Tabs>
  );
}

export { WizardTabs };
