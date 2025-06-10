import { GroupWithMembersWithMessages } from "@/types/types";
import AddGroupMemberButton from "./add-member-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  group: GroupWithMembersWithMessages | null;
}

function MembersDetails({ group }: Props) {
  return (
    <ScrollArea className="h-[95vh]">
      <div className="space-y-5">
        <div className="flex items-center gap-5">
          <h1 className="text-lg font-medium">
            Members{" "}
            <span className="font-light">({group?.members.length})</span>
          </h1>
          <AddGroupMemberButton group={group} />
        </div>
        <div className="space-y-1">
          {group?.members?.map((student, idx) => {
            return (
              <div
                key={student.id}
                className={cn(
                  "py-5",
                  idx !== group?.members.length - 1 && "border-b"
                )}>
                <div className="flex items-start gap-3 ">
                  <Avatar className="border-2 border-[#1FB4AB70] h-12 w-12">
                    <AvatarImage
                      src={
                        //@ts-ignore
                        student?.image?.url || student.image || ""
                      }
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-brand/10 cursor-pointer">
                      {student?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0">
                    <h3 className="text-[10px] font-light">
                      {student.studentNumber}
                    </h3>
                    <h1 className="font-medium">{student.name}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}

export default MembersDetails;
