import React from "react";
import AddTestimonyButton from "./_components/add-testimony-button";
import AddTestimonyGroupButton from "./_components/add-testimony-group-button";
import { XIcon } from "lucide-react";
import TestimonyCard from "./_components/testimony-card";
import { getTestimonyGroups } from "@/backend/queries/testimoney/get-testimony-groups";

async function TestimoniesPage() {
  const groups = await getTestimonyGroups();

  return (
    <div className="space-y-7">
      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.id} className="space-y-5">
            <div className="flex items-center gap-5">
              <h1 className="text-lg font-medium">{group.title}</h1>
              <AddTestimonyButton groupId={group.id} />
            </div>
            <div className="flex flex-wrap items-center gap-5">
              {group.testemonies.map((testimoney) => (
                <TestimonyCard key={testimoney.id} testimony={testimoney} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddTestimonyGroupButton />
    </div>
  );
}

export default TestimoniesPage;
