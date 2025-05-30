"use client";

// Importerer pakker fra react og andet
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRef } from "react";
import { useClickAway } from "react-use";

// Importerer react icons
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import ClosingTag from "./ikoner/ClosingTag";

// Importerer egne components
import KurvPopover from "../offentlig/kurvview/KurvPopover";
import SideMenu from "@/components/kurator/global/SideMenu";
import Kurv from "./ikoner/Kurv";

const Header = () => {
  // Laver const til de to pathname med underline og blå text-farve
  const pathnameBlue = usePathname();
  const pathnameUnderline = usePathname();

  // Laver const til at vise burgermenu for KURATOR
  const [showSideMenu, setShowSideMenu] = useState(false);
  const handleToggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  // Laver const til at vise popover menuer for OFFENTLIG BRUGER
  const [showKurvMenu, setShowKurvMenu] = useState(false);

  // Laver en ref til kurv-menuen (for at lytte efter klik udenfor popover)
  const kurvRef = useRef(null);

  // useClickAway hook til at lukke menuen, hvis man klikker udenfor
  useClickAway(kurvRef, () => {
    setShowKurvMenu(false);
  });

  // Laver const til at vise popover menuer for KURATOR (gemte værker)
  const [showGemteVaerker, setShowGemteVaerker] = useState(false);

  // Laver en ref til gemteværker-menuen
  const gemteVaerkerRef = useRef(null);

  useClickAway(gemteVaerkerRef, () => {
    setShowGemteVaerker(false);
  });

  // Laver en ref til gemteværker-menuen
  const sideMenuRef = useRef(null);

  useClickAway(sideMenuRef, () => {
    setShowSideMenu(false);
  });

  return (
    <nav className="fixed top-0 px-(--content-width) w-full z-1 backdrop-blur-xs">
      <ul className="flex items-baseline justify-between py-4 px-8">
        {/* Venstre side */}
        <div className="flex items-baseline gap-8">
          <Link href="/">
            <li
              className={
                pathnameBlue === "/" ? "text-(--blue)" : "text-(--black)"
              }
            >
              <svg
                viewBox="0 0 73 25"
                width="130px"
                height="auto"
                style={{ display: "block", margin: 0, padding: 0 }}
                fill="currentColor"
              >
                <path d="M9 25c-5 0-9-2.74-9-8.62h6.42c0 2.81.91 3.59 2.74 3.59a1.88 1.88 0 0 0 2-1.9c0-2.09-.68-2.43-4.9-3.71C1.32 12.87.3 11 .3 7c0-4.19 3.18-7 8.21-7 5.03 0 8.18 2.64 8.18 8.21h-6.08c0-2.13-.37-3.31-2.2-3.31-1.45 0-2 .61-2 2 0 1.55.44 2.06 4 3.07 5.27 1.49 7.06 3.62 7.06 7.57C17.53 22.91 12.6 25 9 25m28.06-.68V5.98h-.14l-3.71 18.34h-5.54L24.26 5.98h-.14v18.34h-5.67V.68h9.56l2.53 15.71h.14L33.41.68h9.29v23.64zm13.48 0h-6.49V.68h6.49v10.47L54.39.68h7.2l-4.83 11.18 5.57 12.46h-7.5l-4.29-11.28zm15.35-2.38l.27-.38a.06.06 0 0 0 0-.08l-.27-.38-.28.38a.11.11 0 0 0 0 .08l.28.38zm-.54-3.01a2 2 0 0 1-.44-.79 1.18 1.18 0 0 0-.41-.07c-.39 0-.7.22-.54.74a2.53 2.53 0 0 0 .33.58c.38-.37.81.32.75.86h.34c.29 0 .46-.05.45-.27-.49-.19-.93-.79-.48-1.05zm3.55 3.01l.27-.38a.06.06 0 0 0 0-.08l-.27-.38-.28.38a.11.11 0 0 0 0 .08l.28.38zm-1.58-.05h.08l.39-.05v-.59l-.38-.05h-.1l-.38.05v.59l.39.05zm-.12-3.29v-.31a.52.52 0 0 1-.2-.44 1.29 1.29 0 0 0-.91-.39c-.63 0-.33.5-.7.54a1.17 1.17 0 0 0 .24.81c.26-.16.59 0 .66.42a1.14 1.14 0 0 1-.18.7c.09.21.26.27.57.27a.49.49 0 0 0 .52-.31c-.56-.39-.64-1.22 0-1.29zm2.13-.6c-.37 0-.07-.54-.7-.54a1.27 1.27 0 0 0-.9.39.56.56 0 0 1-.21.44v.31c.64.07.57.9 0 1.29a.49.49 0 0 0 .53.31c.3 0 .47-.06.57-.27a1.07 1.07 0 0 1-.18-.7c.06-.41.39-.58.65-.42a1.17 1.17 0 0 0 .24-.81z"></path>
                <path d="M67.36 13.55c-3.0806.0276-5.5582 2.5424-5.5399 5.623.0183 3.0807 2.5257 5.5659 5.6064 5.5568C70.5072 24.7206 73 22.2208 73 19.14a5.59 5.59 0 0 0-5.64-5.59zm2.49 8.6h-5v-1.26h5v1.26zm1.17-3c-.11.16-.36.41-.36.62-.41 0-.73.45-.78.81h-.58c-.31 0-.48 0-.56-.25a.73.73 0 0 1-.65.25.79.79 0 0 1-.7-.31.79.79 0 0 1-.7.31.74.74 0 0 1-.65-.25c-.08.2-.25.25-.56.25h-.58c0-.36-.37-.81-.77-.81 0-.21-.26-.46-.37-.62-.65-.88-.17-1.43.52-1.44a1.59 1.59 0 0 1 .71.18c0-.61.45-.84 1-.84a1.93 1.93 0 0 1 1.18.48 1.82 1.82 0 0 1 .13-.28.55.55 0 0 1-.45-.52.56.56 0 0 1 .5-.53v-.35H67v.05a.1.1 0 0 1-.2 0v-.05a.1.1 0 0 1-.1-.09.1.1 0 0 1 .1-.1v-.05a.1.1 0 0 1 .2 0v.05h.23v-.27h-.05a.1.1 0 0 1-.09-.1.09.09 0 0 1 .09-.1h.05v-.05a.11.11 0 0 1 .1-.1.1.1 0 0 1 .1.1v.05h.05a.1.1 0 0 1 .1.1.11.11 0 0 1-.1.1h-.05v.27h.23v-.05a.1.1 0 0 1 .1-.1.09.09 0 0 1 .1.1v.05a.1.1 0 0 1 .1.1.1.1 0 0 1-.1.09v.05a.09.09 0 0 1-.1.1.1.1 0 0 1-.1-.1v-.05h-.23v.35a.53.53 0 0 1 .05 1.05 1.82 1.82 0 0 1 .13.28 1.93 1.93 0 0 1 1.21-.53c.52 0 1 .23 1 .84a1.62 1.62 0 0 1 .71-.18c.67.04 1.14.59.47 1.47l.02.02z"></path>
                <path d="M70.22 18.07a1.22 1.22 0 0 0-.41.07 1.86 1.86 0 0 1-.44.79c.45.26 0 .86-.48 1.05 0 .22.16.27.45.27h.34c-.06-.54.37-1.23.76-.86a2.87 2.87 0 0 0 .32-.58c.16-.52-.15-.74-.54-.74z"></path>
              </svg>
            </li>
          </Link>
          <Link href="/arrangementer">
            <li
              className={`bold hover:underline ${
                pathnameBlue === "/" ? "text-(--blue)" : "text-(--black)"
              } ${pathnameUnderline === "/arrangementer" ? "underline" : ""}`}
            >
              Arrangementer
            </li>
          </Link>
        </div>

        {/* Højre side: kurv */}
        <div className="flex gap-3">
          <SignedOut>
            <div ref={kurvRef} className="relative">
              <li
                className={`cursor-pointer ${
                  pathnameBlue === "/" ? "text-(--blue)" : "text-(--black)"
                }`}
                onClick={() => setShowKurvMenu((prev) => !prev)}
              >
                {showKurvMenu ? <ClosingTag /> : <Kurv />}
              </li>

              {/* Send onClose prop så Header kan lukke menuen */}
              {showKurvMenu && (
                <KurvPopover onClose={() => setShowKurvMenu(false)} />
              )}
            </div>
          </SignedOut>

          <SignedIn>
            <div ref={sideMenuRef}>
              <li
                className={`cursor-pointer ${
                  pathnameBlue === "/" ? "text-(--blue)" : "text-(--black)"
                }`}
                onClick={handleToggleSideMenu}
              >
                {showSideMenu ? (
                  <IoMdClose size={30} />
                ) : (
                  <IoIosMenu size={30} />
                )}
              </li>
              {showSideMenu && <SideMenu />}
            </div>
          </SignedIn>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
