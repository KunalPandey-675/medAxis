import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, Users, Stethoscope, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MedAxis - Enterprise Healthcare Platform" },
    { name: "description", content: "The modern operating system for healthcare facilities. Power your clinical and administrative operations with AI." },
  ];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="MedAxis" className="h-8 w-8" />
            <span className="font-heading text-xl font-bold tracking-tight">MedAxis</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#solutions" className="hover:text-foreground transition-colors">Solutions</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Sign In
            </Link>
            <Button asChild className="rounded-full shadow-lg shadow-primary/20 interactive-hover">
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
          
          <div className="container mx-auto max-w-7xl px-6">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div variants={fadeIn} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                MedAxis AI 2.0 is now available
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="font-heading text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.1] text-gradient-dark dark:text-gradient-dark text-gray-900"
              >
                Healthcare operations, <br className="hidden md:block" /> perfected.
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
              >
                The unified clinical and administrative platform designed for modern hospitals. 
                Reduce workload, improve patient outcomes, and scale effortlessly.
              </motion.p>
              
              <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-xl shadow-primary/25 interactive-hover" asChild>
                  <Link to="/login">
                    Start for free
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-background/50 backdrop-blur-sm interactive-hover">
                  Book a demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 relative mx-auto max-w-6xl"
            >
              <div className="glass-card rounded-2xl md:rounded-[2rem] p-2 md:p-4 border-white/20 dark:border-white/10">
                <div className="rounded-xl md:rounded-3xl overflow-hidden border border-border bg-background shadow-2xl relative">
                  {/* Mockup Header */}
                  <div className="h-10 border-b border-border bg-muted/50 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>
                  {/* Mockup Content */}
                  <div className="aspect-[16/9] md:aspect-[21/9] bg-background p-6 md:p-8 flex gap-6">
                    <div className="hidden md:flex flex-col gap-4 w-48 shrink-0">
                      <div className="h-8 w-24 bg-muted rounded-md mb-4" />
                      {[1,2,3,4,5].map(i => <div key={i} className="h-6 w-full bg-muted/50 rounded-md" />)}
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="flex gap-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="flex-1 h-24 rounded-xl border border-border bg-card/50 p-4 flex flex-col justify-between">
                            <div className="h-4 w-16 bg-muted rounded" />
                            <div className="h-8 w-24 bg-primary/20 rounded" />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 rounded-xl border border-border bg-card/50" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="w-full py-24 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-16 md:mb-24">
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need. <br className="hidden md:block text-muted-foreground" /><span className="text-muted-foreground">Nothing you don't.</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[400px]">
              {/* Feature 1 */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 premium-shadow transition-all hover:border-primary/50">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-3">AI Clinical Assistant</h3>
                    <p className="text-muted-foreground text-lg max-w-md">Instantly analyze patient histories and generate preliminary insights. Save hours of documentation daily.</p>
                  </div>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 premium-shadow transition-all hover:border-primary/50">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-3">Patient Portals</h3>
                    <p className="text-muted-foreground">Seamless digital experience for your patients.</p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 premium-shadow transition-all hover:border-primary/50">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-3">Smart Scheduling</h3>
                    <p className="text-muted-foreground">Automated conflict resolution and reminders.</p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 premium-shadow transition-all hover:border-primary/50">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-3">Enterprise Security</h3>
                    <p className="text-muted-foreground text-lg max-w-md">HIPAA compliant architecture with end-to-end encryption and granular role-based access controls.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="w-full py-24 border-t border-border">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-bold font-heading text-foreground">99.9%</span>
                <span className="text-sm font-medium text-muted-foreground">Uptime SLA</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-bold font-heading text-foreground">2M+</span>
                <span className="text-sm font-medium text-muted-foreground">Patients Managed</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-bold font-heading text-foreground">500+</span>
                <span className="text-sm font-medium text-muted-foreground">Hospitals Connected</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-bold font-heading text-foreground">0ms</span>
                <span className="text-sm font-medium text-muted-foreground">Sync Latency</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
          <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to transform your practice?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join hundreds of forward-thinking healthcare organizations using MedAxis to deliver better care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-primary/25 interactive-hover" asChild>
                <Link to="/login">
                  Get Started Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg bg-background interactive-hover">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.svg" alt="MedAxis" className="h-6 w-6" />
                <span className="font-heading text-lg font-bold">MedAxis</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                The enterprise healthcare operating system. Designed for the future of medicine.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-foreground">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} MedAxis Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
