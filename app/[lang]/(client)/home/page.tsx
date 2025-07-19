import HomeHeader from "@/components/home/home-header";
import Banner from "@/components/home/banner";
import Why from "@/components/home/why";
import Solutions from "@/components/home/solutions";
import Testimonials from "@/components/home/testimonials";
import CtaSection from "@/components/home/cta-section";
import DownloadApp from "@/components/home/download-app";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTestimonyGroups } from "@/backend/queries/testimoney/get-testimony-groups";
import { getDictionary } from "../../dictionaries";
import FreeCourse from "@/components/home/free-course";

async function HomePage({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const user = await currentUser();

  if (user && user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  if (user && user.role === "ADMIN") {
    redirect("/admin");
  }

  const groups = await getTestimonyGroups(10);
  const testimonies = groups.flatMap((group) =>
    group.testemonies.flatMap(
      (testimony) =>
        //@ts-ignore
        testimony.video?.id as string
    )
  );

  return (
    <main>
      <HomeHeader dict={dict} />
      <Banner dict={dict} />
      <Why lang={lang} dict={dict} />
      <FreeCourse lang={lang} dict={dict} />
      <Solutions lang={lang} dict={dict} />
      <Testimonials lang={lang} dict={dict} testimonies={testimonies} />
      <CtaSection dict={dict} />
      <div className="w-[90%] mx-auto pt-40">
        <DownloadApp lang={lang} dict={dict} />
      </div>
    </main>
  );
}

export default HomePage;
