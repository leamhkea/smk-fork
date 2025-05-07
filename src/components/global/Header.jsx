import { HiOutlineShoppingBag } from "react-icons/hi";

const Header = () => {
  return (
    <header className="fixed top-0 px-(--content-width) w-full z-1">
      <nav>
        <ul className="flex items-center justify-between py-4 px-8">
          {/* Venstre side */}
          <div className="flex gap-8">
            <Link href="/">
              <li className={pathname === "/" ? "text-(--blue)" : "text-black"}>
                Logo
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
            <HiOutlineShoppingBag />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
