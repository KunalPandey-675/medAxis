import UserManagement from "@/components/users/UserManagement";

export function meta() {
  return [{ title: "Nurses" }];
}
const Nurses = () => {
  return (
    <UserManagement
      role="nurse"
      title="Nurses"
      description="Manage nurses accounts"
    />
  );
};

export default Nurses;