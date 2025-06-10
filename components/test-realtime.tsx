// "use client";

// import { useChatQuery } from "@/hooks/use-chat-query";
// import { Button } from "./ui/button";
// import { useEffect, useState } from "react";
// import { InfiniteData } from "@tanstack/react-query";
// import { unknown } from "zod";
// import supabase from "@/lib/supabase";
// import { Test } from "@prisma/client";
// import { set } from "date-fns";

// function TestRealtime() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isPending,
//     refetch,
//   } = useChatQuery();

//   const [addedData, setAddedData] = useState<Test[]>([]);

//   const [tests, setTests] = useState<
//     InfiniteData<
//       {
//         items: {
//           id: string;
//           text: string;
//           createdAt: Date;
//           updatedAt: Date;
//         }[];
//         nextCursor: string | null;
//       },
//       unknown
//     >
//   >();

//   useEffect(() => {
//     setTests(data);
//   }, [data]);

//   useEffect(() => {
//     const channel = supabase
//       .channel("test-realtime")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "Test" },
//         (payload) => {
//           setAddedData((prev) => [payload.new as Test, ...prev]);
//         }
//       )
//       .on(
//         "postgres_changes",
//         { event: "UPDATE", schema: "public", table: "Test" },
//         (payload) => {
//           const updated = payload.new as Test;

//           // Update local addedData if needed
//           setAddedData((prev) =>
//             prev.map((item) => (item.id === updated.id ? updated : item))
//           );

//           setTests((prev) => {
//             if (!prev) return prev;
//             return {
//               ...prev,
//               pages: prev.pages.map((page) => ({
//                 ...page,
//                 items: page.items.map((item) =>
//                   item.id === updated.id ? { ...item, ...updated } : item
//                 ),
//               })),
//             };
//           });
//         }
//       )
//       .on(
//         "postgres_changes",
//         { event: "DELETE", schema: "public", table: "Test" },
//         (payload) => {
//           const deletedId = payload.old.id;

//           setAddedData((prev) => prev.filter((item) => item.id !== deletedId));

//           setTests((prev) => {
//             if (!prev) return prev;

//             const deletedWasCursor = prev.pages.some((page, idx) => {
//               const lastItem = page.items[page.items.length - 1];
//               const isLastPage = idx === prev.pages.length - 1;
//               return isLastPage && lastItem?.id === deletedId;
//             });

//             const updatedPages = prev.pages.map((page) => ({
//               ...page,
//               items: page.items.filter((item) => item.id !== deletedId),
//             }));

//             if (deletedWasCursor) {
//               refetch();
//             }

//             return {
//               ...prev,
//               pages: updatedPages,
//             };
//           });
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, [data, refetch]);

//   const allIds = new Set(addedData.map((item) => item.id));

//   return (
//     <div className="space-y-5">
//       {isFetchingNextPage && <h1>Loading...</h1>}
//       {isPending && <h1>Loading...</h1>}
//       <div className="flex flex-col-reverse space-y-5">
//         {addedData.map((item, idx) => (
//           <h1 key={idx}>{item.text}</h1>
//         ))}
//         {tests?.pages.map((page) =>
//           page.items
//             .filter((item) => !allIds.has(item.id))
//             .map((item) => <h1 key={item.id}>{item.text}</h1>)
//         )}
//       </div>
//       {hasNextPage && (
//         <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
//           More
//         </Button>
//       )}
//     </div>
//   );
// }

// export default TestRealtime;
