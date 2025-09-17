import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Tutorial from "../components/Layout/Tutorial";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Fondo decorativo superior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-pink-300 to-indigo-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        {/* Header */}
        <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-28">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Bienvenido al Ahorcado
            </h1>
            <p className="mt-6 text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto">
              Adivina las palabras antes de que el stickman sea ahorcado. Pon a
              prueba tu vocabulario y reta a tus amigos.
            </p>
          </div>
          <hr className="w-full border-t border-gray-200 my-8" />
        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-6xl py-10 sm:py-16 lg:py-20 px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Tutorial
          </h2>
          <p className="mt-2 text-gray-500 text-lg">
            Aprende rápidamente cómo jugar antes de empezar
          </p>
        </div>

        {/* Card tutorial */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <Tutorial />
        </div>
      </div>

      {/* Fondo decorativo inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-pink-300 to-indigo-300 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
        />
      </div>

      {/* Botón flotante */}
      <Button
        onClick={() => navigate("/game")}
        className="fixed bottom-10 right-10 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg text-xl transition-transform duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.752 11.168l-5.197-3.028A1 1 0 008 9.028v5.944a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z"
          />
        </svg>
        Jugar
      </Button>
    </div>
  );
}
