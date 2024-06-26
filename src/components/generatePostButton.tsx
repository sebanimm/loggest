import { Plus } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function GeneratePostButton() {
  const session = await auth();

  return (
    <>
      {session?.user && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10">
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>새 글 작성하기</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
