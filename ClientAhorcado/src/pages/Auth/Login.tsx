import { useForm } from "react-hook-form";
import { useAxios } from "../../hooks/useAxios";
import { Input, Button, Label } from "../../components/UI/index";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = useAxios();
  const logUser = handleSubmit(async (data) => {
    await api.post("/api", {
      Name: data.usuario,
      Password: data.password,
    });
  });

  return (
    <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-8 bg-white pt-35">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          ¡Juego del Ahorcado!
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-10">
          Inicia sesión para jugar
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={logUser}>
          <div>
            <Label htmlFor="usuario">User</Label>
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
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: {
                    value: true,
                    message: "El password es requerido",
                  },
                  minLength: {
                    value: 4,
                    message: "Debe tener mínimo 6 carácteres",
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
            <Button type="submit">Iniciar Sesión</Button>
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
  );
}

export default Login;
