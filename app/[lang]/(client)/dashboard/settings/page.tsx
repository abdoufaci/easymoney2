import { getDictionary } from "@/app/[lang]/dictionaries";
import SettingsCard from "./_components/settings-card";
import { StudentSettingsForm } from "@/components/settings/student-settings-form";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";

async function SettingsPage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const auth = await currentUser();
  const user = await getUserById(auth?.id!);

  return (
    <div className="w-full flex flex-col gap-5 md:!flex-row items-start md:!items-center justify-center relative">
      <h1 className="text-xl font-semibold md:!absolute top-0 left-0">
        Settings
      </h1>
      <SettingsCard>
        <StudentSettingsForm dict={dict} user={user} />
      </SettingsCard>
    </div>
  );
}

export default SettingsPage;
