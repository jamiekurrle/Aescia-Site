import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

type NavItem = { href: string; label: string };

export default function SiteMenu() {
  const router = useRouter();
  const path = router.asPath?.split("#")[0]?.split("?")[0] ?? "/";
  const isHome = path === "/";

  const [open, setOpen] = useState(false);

  const items: NavItem[] = useMemo(
    () => [
      { href: "/about", label: "About" },
      { href: "/governance", label: "Governance" },
      { href: "/security", label: "Security" },
      { href: "/clinical-regulatory", label: "Clinical & Regulatory" },
      { href: "/evidence", label: "Evidence" },
      { href: "/contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Only show on homepage (desktop visibility is handled in CSS)
  if (!isHome) return null;

  return (
    <div className="aesciaMenuRoot">
      <button
        type="button"
        className="aesciaMenuIconButton"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open ? "true" : "false"}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 7H20M4 12H20M4 17H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div className="aesciaMenuOverlay" role="dialog" aria-modal="true">
          <div
            className="aesciaMenuBackdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="aesciaMenuPanel">
            <div className="aesciaMenuHeader">
              <div className="aesciaMenuTitle">Pages</div>
              <button
                type="button"
                className="aesciaMenuClose"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="aesciaMenuNav" aria-label="Site pages">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="aesciaMenuLink"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
