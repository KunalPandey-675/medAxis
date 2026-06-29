import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import Notifications from "./Notifications";

const Header = () => {
    const { pathname } = useLocation();
    const { data: session } = authClient.useSession();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 glass px-4 md:px-6">
            <SidebarTrigger className="size-9 shadow-sm" />
            <Separator orientation="vertical" className="h-6 opacity-50" />
            <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                    <h1 className="capitalize font-heading font-bold text-xl md:text-2xl tracking-tight text-foreground">
                        {pathname.split("/").includes("profile")
                            ? "Profile"
                            : pathname.split("/").pop()}
                    </h1>
                    <p className="text-xs md:text-sm text-muted-foreground">
                        Welcome back, {session?.user.role === "doctor" ? "Dr. " : ""}
                        <span className="font-medium text-foreground/80">{session?.user.name}</span>
                    </p>
                </div>
                <div className="flex gap-1 md:gap-2 items-center">
                    <ThemeToggle />
                    {session?.user && <Notifications user={session?.user} />}
                    <Separator orientation="vertical" className="h-6 mx-1 md:mx-2 opacity-50 hidden md:block" />
                    <Link
                        to={`/profile/${session?.user.id}`}
                        className={
                            buttonVariants({
                                variant: "ghost",
                            }) + " flex items-center gap-3 rounded-xl px-2 py-6 interactive-hover hover:bg-muted/50"
                        }
                    >
                        <Avatar className="h-9 w-9 rounded-xl border border-border/50 shadow-sm">
                            <AvatarImage
                                src={session?.user.image || ""}
                                alt={session?.user.name}
                            />
                            <AvatarFallback className="rounded-xl text-primary bg-primary/10 font-bold">
                                {session?.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="hidden md:grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-bold tracking-tight">{session?.user.name}</span>
                            <span className="truncate text-[10px] uppercase tracking-wider font-semibold text-primary">
                                {session?.user.role}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;