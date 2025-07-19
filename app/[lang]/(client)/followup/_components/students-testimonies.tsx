"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonyGroupWithTestimonies } from "@/types/types";
import { useState } from "react";
import { number } from "zod";

interface Props {
  groups: TestimonyGroupWithTestimonies[];
  dict: any;
}

function StudentsTestimonies({ groups: rawGroups, dict }: Props) {
  const [currentNumber, setCurrentNumber] = useState(1);
  const groups = rawGroups.map((item) => ({
    name: item.title,
    number: item.testemonies.length,
  }));

  const testimonies = rawGroups.flatMap((group) =>
    group.testemonies.flatMap(
      (testimony) =>
        //@ts-ignore
        testimony.video?.id as string
    )
  );

  const groupInfo = (() => {
    let total = 0;
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const nextTotal = total + group.number;
      if (currentNumber <= nextTotal) {
        return {
          groupIndex: i, // 0-based index of the group
          numberInGroup: currentNumber - total, // 1-based number within the group
        };
      }
      total = nextTotal;
    }
    return null; // in case currentNumber is out of bounds
  })();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full flex items-start justify-center gap-10 pt-20">
      <CarouselContent className=" h-[700px]">
        {testimonies.map((id, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 flex items-center justify-center">
            <iframe
              key={id}
              src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${id}`}
              allow="fullscreen"
              allowFullScreen
              className="w-[400px] aspect-auto h-[675px]"></iframe>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="h-[400px] flex flex-col justify-between pt-10">
        {groupInfo && (
          <div className="space-y-5">
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-medium">
                {groupInfo.groupIndex + 1 < 10 && "0"}
                {groupInfo.groupIndex + 1}
                <span className="text-base text-brand font-normal">
                  /{groups.length < 10 && "0"}
                  {groups.length}
                </span>
              </h1>
              <h3 className="font-medium text-xl">
                {dict.home.testimonials.groups}
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-medium">
                {groupInfo.numberInGroup < 10 && "0"}
                {groupInfo.numberInGroup}
                <span className="text-base text-brand font-normal">
                  /{groups[groupInfo.groupIndex].number < 10 && "0"}
                  {groups[groupInfo.groupIndex].number}
                </span>
              </h1>
              <h3 className="font-medium text-xl">
                {dict.home.testimonials.student}
              </h3>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <CarouselPrevious
            className="static"
            onManualClick={() => setCurrentNumber((prev) => prev - 1)}
          />
          <CarouselNext
            className="static"
            onManualClick={() => setCurrentNumber((prev) => prev + 1)}
          />
        </div>
      </div>
    </Carousel>
  );
}

export default StudentsTestimonies;
