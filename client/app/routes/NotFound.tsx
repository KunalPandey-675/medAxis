import ComingSoon from "@/components/global/ComingSoon";

export function meta() {
    return [{ title: "404 - Page Not Found" }];
}

const NotFound = () => {
    return (
        <ComingSoon 
            title="Page Not Found"
            description="The page you are looking for does not exist or is currently under development. Please check back later."
        />
    );
};

export default NotFound;
