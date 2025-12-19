import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <Image src="/listify-logo.svg" alt="Listify" width={70} height={50} />
        <SignOutButton />
      </nav>
    </div>
  );
};

export default Dashboard;
