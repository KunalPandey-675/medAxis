import ComingSoon from "@/components/global/ComingSoon";

export function meta() {
    return [{ title: "Coming Soon - MedAxis" }];
}

const UnderConstruction = () => {
    return (
        <ComingSoon 
            title="Feature Coming Soon"
            description="We're currently working hard on this feature. It will be available in an upcoming release."
        />
    );
};

export default UnderConstruction;
