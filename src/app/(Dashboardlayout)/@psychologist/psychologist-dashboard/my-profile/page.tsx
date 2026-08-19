export const dynamic = "force-dynamic";

import MyProfile from "@/app/ui-components/profile/my-profile";
import { getMyProfile } from "@/lib/getMyProfile";
import { MyProfileResponse } from "@/types/profiles";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  user: Extract<MyProfileResponse, { role: "PSYCHOLOGIST" }>;
}

const MyProfilePsychologist = async () => {
  const data = await getMyProfile();

  if (!data) redirect("/login");
  //   const profile = user.profile;
  return (
    <div>
      <MyProfile user={data} />
    </div>
  );
};

export default MyProfilePsychologist;

// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { MyProfileResponse } from "@/types/profiles";
// import ProfileInfoItem from "@/app/ui-components/profile/ProfileInfoItem";
// // import ProfileInfoItem from "./ProfileInfoItem";
// // import { MyProfileResponse } from "@/types/profile";

// interface Props {
//   user: Extract<MyProfileResponse, { role: "PSYCHOLOGIST" }>;
// }

// const MyProfilePsychologist = ({ user }: Props) => {
//   const profile = user.profile;

//   return (
//     <div className="mx-auto max-w-3xl p-6">
//       <Card className="border-[#8FAF9F]/30 bg-[#F7F5F0]">
//         <CardHeader className="flex flex-row items-center gap-4">
//           <Avatar className="h-16 w-16 border border-[#8FAF9F]">
//             <AvatarImage
//               src={profile?.profilePhoto ?? undefined}
//               alt={user.name}
//             />
//             <AvatarFallback className="bg-[#8FAF9F] text-[#0f1f1c]">
//               {user.name?.charAt(0)?.toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           <div className="flex flex-col gap-1">
//             <h2 className="text-lg font-semibold text-[#0f1f1c]">
//               {user.name}
//             </h2>
//             <p className="text-sm text-[#0f1f1c]/60">{user.email}</p>
//             <div className="flex gap-2 pt-1">
//               <Badge className="bg-[#0f1f1c] text-[#F7F5F0]">
//                 Psychologist
//               </Badge>
//               {profile?.verified ? (
//                 <Badge
//                   variant="outline"
//                   className="border-[#8FAF9F] text-[#0f1f1c]"
//                 >
//                   Verified
//                 </Badge>
//               ) : (
//                 <Badge
//                   variant="outline"
//                   className="border-destructive text-destructive"
//                 >
//                   Not Verified
//                 </Badge>
//               )}
//               {profile?.status && (
//                 <Badge variant="secondary">{profile.status}</Badge>
//               )}
//             </div>
//           </div>
//         </CardHeader>

//         <Separator className="bg-[#8FAF9F]/30" />

//         <CardContent className="grid grid-cols-2 gap-6 pt-6">
//           <ProfileInfoItem label="Sector" value={profile?.sector} />
//           <ProfileInfoItem
//             label="Experience"
//             value={
//               profile?.experience ? `${profile.experience} yrs` : undefined
//             }
//           />
//           <ProfileInfoItem
//             label="Appointment Fee"
//             value={
//               profile?.appointmentFee ? `৳${profile.appointmentFee}` : undefined
//             }
//           />
//           <ProfileInfoItem label="Availability" value={profile?.availability} />
//           <ProfileInfoItem
//             label="Qualification"
//             value={profile?.qualification}
//           />
//           <ProfileInfoItem label="License ID" value={profile?.licenseId} />
//           <ProfileInfoItem
//             label="Contact Number"
//             value={profile?.contactNumber}
//           />
//           <ProfileInfoItem label="Address" value={profile?.address} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default MyProfilePsychologist;
