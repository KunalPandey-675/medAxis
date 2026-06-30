"use client";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

import { NavUser } from "@/components/navigation/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { authClient } from "@/lib/auth-client";
import { navConfig } from "./nav-config";
import type { Role } from "@/types";

interface NavItem {
    title: string;
    url: string;
    icon?: React.ElementType;
    allowedRoles: Role[];
    items?: {
        title: string;
        url: string;
        allowedRoles?: Role[];
    }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { pathname } = useLocation();
    const { data: session } = authClient.useSession();
    const userRole = (session?.user?.role as Role) || "patient";

    const filterNav = (items: NavItem[]) => {
        return items.filter((item) => item.allowedRoles.includes(userRole));
    };
    const filteredMain = filterNav(navConfig.navMain);
    const filteredAdmin = filterNav(navConfig.navAdmin);
    const filteredSecondary = filterNav(navConfig.navSecondary);

    const isGroupActive = (items: { url: string }[] = []) => {
        return items.some((item) => item.url === pathname);
    };

    return (
        <Sidebar variant="inset" collapsible="icon" className="border-r border-border/50 shadow-sm" {...props}>
            <SidebarHeader className="py-4 px-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:p-2! hover:bg-transparent"
                        >
                            <Link to="/dashboard" className="flex items-center gap-3">
                                <div className="flex aspect-square size-14 items-center justify-center">
                                    <img
                                        src="/logo.svg"
                                        alt="MedAxis Logo"
                                        className="size-8"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-heading font-bold text-xl tracking-tight text-foreground">
                                        MedAxis
                                    </span>
                                    <span className="truncate text-[11px] font-medium tracking-wide uppercase text-muted-foreground">
                                        {userRole} Portal
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="px-3 gap-2">
                {/* Group 1 */}
                {filteredMain.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70 mb-2">Platform</SidebarGroupLabel>
                        <SidebarMenu className="gap-1.5">
                            {filteredMain.map((item) => {
                                const isActive = isGroupActive(item.items);

                                return (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={isActive}
                                                    size="lg"
                                                    className={`group-data-[collapsible=icon]:justify-center! rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                                >
                                                    {item.icon && <item.icon className="size-5 opacity-80" />}

                                                    <span className="group-data-[collapsible=icon]:hidden font-medium">
                                                        {item.title}
                                                    </span>

                                                    <ChevronRight className="ml-auto opacity-50 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub className="pr-0 mr-0 border-l border-border/50 ml-4 pl-3">
                                                    {item.items?.map((subItem) => {
                                                        const isChildActive = pathname === subItem.url;
                                                        return (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={isChildActive}
                                                                    className={`my-1 rounded-lg transition-colors ${isChildActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                                                >
                                                                    <Link to={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
                {/* Grpup 2 */}
                {filteredAdmin.length > 0 && (
                    <SidebarGroup className="mt-4">
                        <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/70 mb-2">Administration</SidebarGroupLabel>
                        <SidebarMenu className="gap-1.5">
                            {filteredAdmin.map((item) => {
                                const isActive = isGroupActive(item.items);
                                return (
                                    <Collapsible
                                        key={item.title}
                                        asChild
                                        defaultOpen={isActive}
                                        className="group/collapsible"
                                    >
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={isActive}
                                                    size="lg"
                                                    className={`group-data-[collapsible=icon]:justify-center! rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                                >
                                                    {item.icon && <item.icon className="size-5 opacity-80" />}
                                                    <span className="group-data-[collapsible=icon]:hidden font-medium">
                                                        {item.title}
                                                    </span>
                                                    <ChevronRight className="ml-auto opacity-50 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub className="pr-0 mr-0 border-l border-border/50 ml-4 pl-3">
                                                    {item.items?.map((subItem) => {
                                                        const isChildActive = pathname === subItem.url;
                                                        return (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={isChildActive}
                                                                    className={`my-1 rounded-lg transition-colors ${isChildActive ? 'text-primary font-medium bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                                                >
                                                                    <Link to={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        );
                                                    })}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                )}
            </SidebarContent>
            {session?.user && (
                <SidebarFooter className="p-3 border-t border-border/50">
                    <NavUser
                        user={{
                            name: session?.user?.name!,
                            email: session?.user?.email!,
                            avatar: session?.user?.image!,
                        }}
                    />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}