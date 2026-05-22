import { useState } from "react";
import { RiCloseFill, RiMenu3Fill } from "@remixicon/react";
import { LINKS } from "../constants";
import Magnet from "./Magnet";

function Navbar({ isAboutOpen, enableInteractiveEffects }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-200 ${
        isAboutOpen ? "pointer-events-none opacity-35" : "opacity-100"
      }`}
      aria-label="Primary"
    >
      <div className="section-wrap pt-4">
        <div className="card-shell flex items-center justify-between rounded-pill px-4 py-3 sm:px-6">
          <a href={import.meta.env.BASE_URL} aria-label="Go to homepage">
            <Magnet
              disabled={!enableInteractiveEffects}
              wrapperClassName="inline-flex"
              innerClassName="inline-flex"
            >
              <img
                src={`${import.meta.env.BASE_URL}logopraj.png`}
                alt="Prajnesh Kumar logo"
                className="h-11 w-11 rounded-pill border border-subtle object-cover sm:h-12 sm:w-12"
                draggable="false"
              />
            </Magnet>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-text focus-visible:text-text"
              >
                <Magnet
                  disabled={!enableInteractiveEffects}
                  wrapperClassName="inline-block"
                  innerClassName="inline-block"
                >
                  {link.label}
                </Magnet>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-subtle bg-surface text-text md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <RiCloseFill size={20} /> : <RiMenu3Fill size={20} />}
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-navigation"
            className="card-shell mt-3 rounded-lg px-4 py-4 md:hidden"
          >
            <ul className="space-y-3" aria-label="Mobile navigation links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-md px-2 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface-elevated hover:text-text"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
