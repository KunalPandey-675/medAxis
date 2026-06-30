import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { authClient } from '@/lib/auth-client';
import { useLocation } from 'react-router';
import type { Role } from '@/types';
import Loader from '@/components/global/Loader';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { getRouteConfig, navConfig } from '@/components/navigation/nav-config';
import { toast } from 'sonner';
import Header from '@/components/navigation/Header';
import { AnimatePresence, motion } from 'framer-motion';

const Layout = () => {
  const { data: session, isPending } = authClient.useSession();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userRole = (session?.user?.role as Role) || "patient";

  useEffect(() => {
    if (isPending) return;

    const allNavItems = [...navConfig.navMain];
    const currentRouteConfig = getRouteConfig(pathname, allNavItems);

    if (currentRouteConfig) {
      const hasAccess = currentRouteConfig.allowedRoles.includes(userRole);

      if (!hasAccess) {
        toast.error("Unauthorized Access");
        navigate("/dashboard", { replace: true });
      }
    }
  }, [pathname, userRole, isPending, navigate]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader label="Initializing Med Axis..." />
      </div>
    );
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background relative flex flex-col min-h-screen overflow-hidden transition-all duration-300 ease-in-out">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
