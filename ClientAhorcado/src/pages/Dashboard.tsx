import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Tutorial from "../components/Layout/Tutorial";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-10 mt-50">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Bienvenido al Ahorcado
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Este es un juego que consiste en adivinar palabras antes de que el
              stickman sea ahorcado
            </p>
          </div>
          <hr className="w-full border-t border-gray-900 my-4" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl py-10 sm:py-20 lg:py-20">
        <div className="text-center mb-8 bg-gray-100 rounded-2xl shadow-md p-8">
          <h2 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl mt-10">
            Tutorial
          </h2>
          <div className="pt-15">
            <Tutorial />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
        <Button
          onClick={() => navigate("/game")}
          className="fixed bottom-20 right-10 bg-blue-500 text-white p-4 rounded-xl w-30 bg-green-400 text-2xl hover:scale-110 transition duration-300"
        >
          Jugar
        </Button>
      </div>
    </div>
  );
}
