import { ModeToggle } from "@/toggle-mode";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <Image src="/listify-logo.svg" alt="Listify" width={70} height={50} />
        <div className="ml-250 flex items-end">
          <ModeToggle />
        </div>
        <SignOutButton />
      </nav>
      <div className="min-h-screen">
        <h1 className="text-4xl font-bold text-center mt-10 bg-linear-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
          Welcome to Listify Dashboard
        </h1>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-lg text-muted-foreground">
            Manage your tasks and to-do lists efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
