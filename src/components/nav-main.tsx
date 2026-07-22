"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { Route } from "@/types";
import React from "react";

// type NavMainProps = {
//   items: Route[];
// };

// export function NavMain({
//   items,
// }: {
//   items: NavMainProps;
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupContent className="flex flex-col gap-2">

//           <SidebarMenu>
//             {items.map((group) => (
//               <React.Fragment key={group.title}>
//                 <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

//                 {group.items.map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <SidebarMenuItem key={item.title}>
//                       <SidebarMenuButton asChild>
//                         <Link href={item.url}>
//                           {Icon && <Icon className="size-4" />}
//                           <span>{item.title}</span>
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </SidebarMenu>

//       </SidebarGroupContent>
//     </SidebarGroup>
//   );
// }

type NavMainProps = {
  items: Route[];
};

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((group) => (
            <React.Fragment key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <Link href={item.url} className="flex gap-2">
                        {Icon && <Icon className="size-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
