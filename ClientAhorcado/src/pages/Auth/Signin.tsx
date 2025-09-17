import { Input, Button, Label } from "../../components/UI/index";
import { useForm } from "react-hook-form";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = useAxios();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const createUser = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/usuario/registrar", {
        Name: data.usuario,
        Password: data.password,
      });

      // Si el registro es exitoso, crear el objeto usuario y hacer login
      if (response.data.success) {
        toast.success("Usuario creado", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      const newUser = {
        id: response.data.id || Date.now(), // Usar ID del servidor o timestamp como fallback
        name: data.usuario,
      };
      login(newUser);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Error al crear usuario", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error al crear usuario:", error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-br from-green-100 via-white to-green-50 min-h-screen">
      <ToastContainer />

      {/* Títulos */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-2 drop-shadow">
          ¡Juego del Ahorcado!
        </h1>
        <h2 className="text-lg font-medium text-gray-700 mb-8">
          Crea una cuenta para jugar
        </h2>
      </div>

      {/* Card del formulario */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-xl rounded-2xl p-8">
        <form className="space-y-6" onSubmit={createUser}>
          {/* Usuario */}
          <div>
            <Label htmlFor="usuario" className="font-medium text-gray-700">
              Usuario
            </Label>
            <div className="mt-2">
              <Input
                id="usuario"
                type="text"
                placeholder="Nombre de usuario..."
                className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition duration-200"
                {...register("usuario", {
                  required: {
                    value: true,
                    message: "El usuario es requerido",
                  },
                  minLength: {
                    value: 4,
                    message: "Debe tener mínimo 4 carácteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "No debe tener más de 12 carácteres",
                  },
                })}
              />
              {errors.usuario && typeof errors.usuario.message === "string" && (
                <span className="text-red-500 text-sm">
                  {errors.usuario.message}
                </span>
              )}
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <Label htmlFor="password" className="font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition duration-200"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  minLength: {
                    value: 4,
                    message: "Debe tener mínimo 4 carácteres",
                  },
                  maxLength: {
                    value: 12,
                    message: "No debe tener más de 12 carácteres",
                  },
                })}
              />
              {errors.password &&
                typeof errors.password.message === "string" && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
            </div>
          </div>

          {/* Botón */}
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-2 shadow-md transition duration-300"
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </div>
        </form>

        {/* Link para login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/"
            className="font-semibold text-green-600 hover:text-green-500 transition duration-200"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
