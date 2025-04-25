import { useModal } from "@/hooks/useModalStore";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import Image from "next/image";

function VerifyDocumentsBody() {
  const { onClose, data } = useModal();
  const dict = data?.dict;
  const student = data?.user;

  const documents = student?.documents;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-5 px-10">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 w-52 h-52 rounded-full bg-brand blur-xl opacity-70 -z-10"></div>
            <Image
              alt="avatar"
              src={
                //@ts-ignore
                student?.image?.url || ""
              }
              height={100}
              width={100}
              className="object-cover w-52 h-52 rounded-full border-[10px] border-[#1FB4AB0F] z-50"
            />
          </div>
          <div className="space-y-1 flex flex-col items-center">
            <h3 className="text-brand text-sm">4848747848</h3>
            <h1 className="text-2xl font-semibold">{student?.name}</h1>
            <h3 className="text-brand">EM Student</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Informations</h1>
            <SquarePen className="h-4 w-4 cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">Email</span>
            <h1>{student?.email}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.phoneNumber}</span>
            <h1>{student?.phone}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.JoinDate}</span>
            <h1>{format(student?.createdAt || new Date(), "dd/MM/yyyy")}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.country}</span>
            <h1>{student?.country}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.city}</span>
            <h1>{student?.city}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.adress}</span>
            <h1>{student?.adress}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.zipCode}</span>
            <h1>{student?.zipCode}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C0BDBD]">{dict?.general.dateOfBirth}</span>
            <h1>{format(student?.dateOfBirth || new Date(), "dd/MM/yyyy")}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Image
          alt="document"
          src={
            //@ts-ignore
            documents?.document1?.url || ""
          }
          height={400}
          width={400}
          className="w-full h-40 object-contain aspect-square"
        />
        <Image
          alt="document"
          src={
            //@ts-ignore
            documents?.document2?.url || ""
          }
          height={400}
          width={400}
          className="w-full h-40 object-contain aspect-square"
        />
      </div>
    </div>
  );
}

export default VerifyDocumentsBody;
