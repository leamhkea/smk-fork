"use client";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 px-(--content-width) w-full z-1">
      <nav>
        <ul className="flex items-baseline justify-between py-4 px-8">
          {/* Venstre side */}
          <div className="flex items-baseline gap-8">
            <Link href="/">
              <li className={pathname === "/" ? "text-(--blue)" : "text-black"}>
                <Image
                  src="/smk_logo.png"
                  alt={"smk logo"}
                  width={100}
                  height={100}
                />
              </li>
            </Link>
            <Link href="/arrangementer">
              <li className={pathname === "/" ? "text-(--blue)" : "text-black"}>
                Arrangementer
              </li>
            </Link>
          </div>

          {/* Højre side: kurv */}
          <li className={pathname === "/" ? "text-(--blue)" : "text-black"}>
            <HiOutlineShoppingBag size={30} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
