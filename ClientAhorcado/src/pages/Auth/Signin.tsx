import { Input, Button, Label } from "../../components/UI/index";
import { useForm } from "react-hook-form";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      if (response.data) {
        const newUser = {
          id: response.data.id || Date.now(), // Usar ID del servidor o timestamp como fallback
          name: data.usuario
        };
        login(newUser);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white pt-35">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-center text-green-400 mb-2">
          ¡Juego del Ahorcado!
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-10">
          Crea una cuenta para jugar
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={createUser}>
          <div>
            <Label htmlFor="usuario">Usuario</Label>
            <div className="mt-2">
              <Input
                id="usuario"
                type="text"
                placeholder="Nombre de usuario..."
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

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
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
          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
