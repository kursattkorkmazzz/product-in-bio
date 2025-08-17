import LinkEditor from "@/components/link-editor/link-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Page from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";

export default function LinkEditorPage() {
  return (
    <Page className="grid grid-cols-2 gap-2">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Link Editor</CardTitle>
          <CardDescription>
            You can design your links and layouts.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <LinkEditor />
        </CardContent>
      </Card>

      <div>Realtime Visualization</div>
    </Page>
  );
}
