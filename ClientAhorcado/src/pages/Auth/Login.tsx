import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ahorcadoLoginImg from "../../assets/images/ahorcadoIimage.png";
import { useAxios } from "../../hooks/useAxios";

interface User {
  id: number;
  name: string;
}

function Login() {
  const api = useAxios();
  const navigate = useNavigate(); // te da la función para navegar
  const [users, setUsers] = useState<User[]>([]);
  const handleLogin = () => {
    // ... tu lógica de login
    navigate("/dashboard");
  };

  useEffect(() => {
    api.get<User[]>("/users").then((res) => setUsers(res.data));
  }, [api]);
  return (
    <div className="min-h-screen flex">
      {/* Mitad izquierda - Formulario de Login */}
      <div className="w-1/2 flex flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            ¡Juego del Ahorcado!
          </h1>
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-10">
            Inicia sesión para jugar
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                User
              </label>
              <div className="mt-2">
                <input
                  id="usuario"
                  name="usuario"
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nombre de usuario..."
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <a
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Registrate aquí
            </a>
          </p>
        </div>
      </div>
      <div className="w-1/2 relative overflow-hidden">
        <img
          src={ahorcadoLoginImg}
          alt="Ahorcado Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
