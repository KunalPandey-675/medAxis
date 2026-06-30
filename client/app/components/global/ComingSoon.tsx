import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

interface ComingSoonProps {
    title?: string;
    description?: string;
}

const ComingSoon = ({
    title = "Page Under Construction",
    description = "We're currently working hard on this feature. It will be available in an upcoming release.",
}: ComingSoonProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 text-center"
        >
            <div className="relative mb-8 mt-12">
                <div className="absolute inset-0 blur-3xl opacity-20 bg-primary rounded-full animate-pulse"></div>

                <div className="relative bg-card/50 backdrop-blur-xl border border-border p-6 rounded-3xl shadow-xl">
                    <Construction className="w-16 h-16 text-primary" strokeWidth={1.5} />
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground mb-4">
                {title}
            </h1>

            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                {description}
            </p>

            <div className="flex gap-4">
                <Button 
                    variant="outline" 
                    className="rounded-xl px-6 h-12 shadow-sm interactive-hover border-border"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Button>
                <Button 
                    asChild 
                    className="rounded-xl px-6 h-12 shadow-md interactive-hover"
                >
                    <Link to="/dashboard">Return to Dashboard</Link>
                </Button>
            </div>
        </motion.div>
    );
};

export default ComingSoon;
