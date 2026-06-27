import UserManagement from "@/components/users/UserManagement";

export function meta() {
  return [{ title: "Administrators" }];
}

const Admins = () => {
  return (
    <div> <UserManagement
      role="admin"
      title="Administrators"
      description="Manage administrator accounts"
    /></div>
  );
};

export default Admins;