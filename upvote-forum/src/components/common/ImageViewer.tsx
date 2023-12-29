// "use client";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Env from "@/config/env";
// import { Backend_URL } from "@/lib/constants";
// import Image from "next/image";

// export default function ImageViewer({ image }: { image: string }) {
//   console.log(`${Backend_URL}/uploads/threads/${image}`)
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Image
//           src={`${Backend_URL}/uploads/threads/${image}`}
//           alt="1"
//           width={100}
//           height={100}
//           className="w-full rounded-md mt-2 cursor-pointer"
//         />
//       </SheetTrigger>
//       <SheetContent side="bottom" className="w-screen">
//         <SheetHeader>
//           <SheetTitle>Show Image</SheetTitle>
//           <SheetDescription className="mb-4 w-full flex justify-center items-center">
//             <Image
//               src={`${Backend_URL}/uploads/threads/${image}`}
//               alt={`Post_image_${image}`}
//               width={100}
//               height={100}
//               className="w-full h-[550px] rounded-lg object-contain "
//               unoptimized
//             />
//           </SheetDescription>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// }
