import { SignOutButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";

const SideMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`fixed top-20 right-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-screen bg-(--white) shadow-lg z-1 transition-transform duration-500 ease-out 
        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
    >
      <ul className="p-10 overflow-y-auto grid gap-8">
        <li>
          <Link href="/profil">Min Profil</Link>
          <hr />
        </li>
        <li>
          <Link href="/arrangementer">Mine kladder</Link>
        </li>
        <li>
          <Link href="/vaerkarkiv">Opret arrangement</Link>
        </li>
        <li>
          <hr className="mb-2" />
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
