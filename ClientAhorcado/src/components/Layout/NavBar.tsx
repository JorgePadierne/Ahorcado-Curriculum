"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useNavigate, NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Ranking", href: "/ranking" },
  { name: "Game", href: "/game" },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-green-600 cursor-pointer tracking-tight"
          >
            Ahorcado
          </span>
        </div>

        {/* Botón hamburguesa */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-green-50 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links escritorio */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-base font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-green-700 bg-green-50 shadow-sm"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Log out */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleNavigate}
            className="text-sm font-semibold text-gray-700 hover:text-green-600 transition"
          >
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">Ahorcado</span>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-green-50 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={handleNavigate}
                  className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
