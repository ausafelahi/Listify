import { ModeToggle } from "@/toggle-mode";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <nav className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <Image src="/listify-logo.svg" alt="Listify" width={70} height={50} />
        <div className="ml-250 flex items-end">
          <ModeToggle />
        </div>
        <SignOutButton />
      </nav>
    </div>
  );
};

export default Header;
