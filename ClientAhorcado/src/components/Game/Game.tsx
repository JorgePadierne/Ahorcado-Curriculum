import { useState, useEffect } from "react";
import { Button } from "../UI";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../UI";
import Swal from "sweetalert2";

const man = [
  ` ----|  
 |      
 |      
 |      
 |      
 |      
--------`,
  ` ----|  
 |  😄  
 |      
 |      
 |      
 |      
--------`,
  ` ----|  
 |  😰  
 |   |  
 |   |  
 |      
 |      
--------`,
  ` ----|  
 |  😩  
 |  \\|  
 |   |  
 |      
 |      
--------`,
  ` ----|  
 |  😫  
 |  \\|/ 
 |   |  
 |      
 |      
--------`,
  ` ----|  
 |  😱  
 |  \\|/  
 |   |  
 |  /   
 |      
--------`,
  ` ----|  
 |  💀  
 |  \\|/  
 |   |  
 |  / \\ 
 |      
--------`,
];

// 🔹 Normalización de palabra o letra
const normalizar = (str: string = ""): string =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

// 🔹 Función para calcular puntuación
function Game() {
  const api = useAxios();
  const { user } = useAuth();

  const [attempts, setAttempts] = useState<number>(0);
  const [select, setSelect] = useState<string>("facil");
  const [word, setWord] = useState<string[]>([]);
  const [wrongChar, setWrongChar] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState<string>("");

  // Cronómetro
  const [tiempo, setTiempo] = useState(0);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    let intervaloId: number;
    if (corriendo) {
      intervaloId = window.setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervaloId);
  }, [corriendo]);

  const iniciarCronometro = () => setCorriendo(true);
  const resetearCronometro = () => {
    setCorriendo(false);
    setTiempo(0);
  };

  // 🔹 Traer palabra según dificultad
  const handleDificultad = async () => {
    try {
      const { data } = await api.get(
        `/api/juego/palabraaleatoria?dificultad=${select}`
      );
      const wordTemp = normalizar(data.palabra);
      setWord(wordTemp.split(""));
      setGuessedLetters([]);
      setWrongChar([]); // 🔹 Reiniciar letras fallidas
      setAttempts(0);
      setLetterInput("");
      resetearCronometro();
      iniciarCronometro();
    } catch (Error) {
      console.error(Error);
    }
  };

  // 🔹 Intentar letra
  const guessLetter = (letter: string) => {
    const upperLetter = normalizar(letter);
    if (!/^[A-Z]$/.test(upperLetter)) return; // solo letras
    if (!upperLetter) return;
    if (guessedLetters.includes(upperLetter)) return;

    if (word.includes(upperLetter)) {
      setGuessedLetters([...guessedLetters, upperLetter]);
    } else if (attempts < man.length - 1) {
      setAttempts(attempts + 1);
      setWrongChar([...wrongChar, upperLetter]);
    }
    setLetterInput("");
  };

  // 🔹 Reiniciar juego
  const handleReset = async () => {
    setAttempts(0);
    setGuessedLetters([]);
    setWrongChar([]);
    setLetterInput("");
    resetearCronometro();
    if (select) {
      await handleDificultad();
    } else {
      setWord([]);
    }
  };

  const isWinner =
    word.length > 0 && word.every((letter) => guessedLetters.includes(letter));
  const isLoser = word.length > 0 && attempts === man.length - 1;

  // 🔹 SweetAlert ganador
  useEffect(() => {
    if (isWinner) {
      setCorriendo(false);

      const calcularPuntuacion = (
        tiempoSegundos: number,
        intentosFallidos: number
      ): number => {
        const puntajeMaximo = 1000;
        const penalizacionPorSegundo = 2;
        const penalizacionPorIntento = 50;

        let puntuacion =
          puntajeMaximo -
          tiempoSegundos * penalizacionPorSegundo -
          intentosFallidos * penalizacionPorIntento;

        if (select === "medio") puntuacion *= 2;
        if (select === "dificil") puntuacion *= 5;

        return Math.max(puntuacion, 0);
      };

      const puntuacion = calcularPuntuacion(tiempo, attempts);
      Swal.fire({
        title: "¡Ganaste! 🎉",
        text: `Desea sumar su puntuación? ${puntuacion}`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.patch("/api/juego/agregarpuntuacion", {
              Usuario: user?.name || "Usuario desconocido",
              Puntuacion: puntuacion,
            });
            Swal.fire({
              title: "¡Puntuación guardada!",
              text: `Tu puntuación de ${puntuacion} puntos ha sido guardada exitosamente.`,
              icon: "success",
              confirmButtonText: "¡Genial!",
            });
            setWord([]);
          } catch (Error) {
            console.error(Error);
            Swal.fire({
              title: "Error",
              text: "No se pudo sumar la puntuación. Inténtalo de nuevo.",
              icon: "error",
              confirmButtonText: "Entendido",
            });
            setWord([]);
          }
        }
      });
    }
  }, [isWinner, api, attempts, tiempo, user?.name, select]);

  // 🔹 SweetAlert perdedor
  useEffect(() => {
    if (isLoser) {
      setCorriendo(false);
      Swal.fire({
        title: "¡Perdiste! 😢",
        text: `La palabra era: ${word.join("")}. Se restan 1000 pts`,
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then(async () => {
        try {
          await api.patch("/api/juego/restarpuntaje", {
            Name: user?.name,
            DerrotaFlag: true,
          });
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "No se pudo restar el puntaje.", "error");
        }
      });
      setWord([]);
    }
  }, [isLoser, word, api, user?.name]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="p-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl mt-20">
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-600">
          🎯 Juego del Ahorcado
        </h1>

        {/* Selección de dificultad */}
        <div className="mb-8">
          <label
            htmlFor="dificultad"
            className="block text-sm font-semibold text-gray-700 mb-2 text-center"
          >
            Selecciona dificultad
          </label>
          <div className="flex gap-3 justify-center">
            <select
              id="dificultad"
              className="rounded-lg border-gray-300 shadow-sm sm:text-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
            <Button
              onClick={handleDificultad}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4"
            >
              Aceptar
            </Button>
          </div>
        </div>

        {/* Cronómetro */}
        <div className="text-center mb-6">
          <span className="inline-block text-xl font-mono bg-gray-100 px-6 py-3 rounded-lg shadow-inner text-gray-800">
            ⏳ Tiempo:{" "}
            {Math.floor(tiempo / 60)
              .toString()
              .padStart(2, "0")}
            :{(tiempo % 60).toString().padStart(2, "0")}
          </span>
        </div>

        {/* Muñeco */}
        <pre className="whitespace-pre font-mono text-3xl bg-gray-50 p-6 rounded-xl shadow-inner text-center mb-8">
          {man[attempts]}
        </pre>

        {/* Palabra */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {(select === "facil" || select === "medio") &&
            word.map((letter, index) => (
              <span
                key={index}
                className={`p-2 text-3xl w-10 inline-block text-center border-b-4 ${
                  guessedLetters.includes(letter)
                    ? "text-green-600 font-bold border-green-400"
                    : "text-gray-400 border-gray-300"
                }`}
              >
                {guessedLetters.includes(letter) ? letter : "_"}
              </span>
            ))}
          {select === "dificil" &&
            word.map((letter, index) => (
              <span
                key={index}
                className={`p-2 text-3xl w-10 inline-block text-center border-b-4 ${
                  guessedLetters.includes(letter)
                    ? "text-green-600 font-bold border-green-400"
                    : "text-gray-400 border-gray-300"
                }`}
              >
                {guessedLetters.includes(letter) ? letter : ""}
              </span>
            ))}
        </div>

        {/* Input de letras */}
        {!isWinner && !isLoser && (
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex gap-3">
              <Input
                type="text"
                maxLength={1}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                value={letterInput}
                onChange={(e) => setLetterInput(normalizar(e.target.value))}
                className="text-center p-3 border rounded-lg w-16 text-lg focus:ring-indigo-500 focus:border-indigo-500"
                disabled={word.length === 0 || isWinner || isLoser}
              />
              <Button
                onClick={() => letterInput && guessLetter(letterInput)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6"
                disabled={word.length === 0 || isWinner || isLoser}
              >
                Intentar
              </Button>
            </div>

            {wrongChar.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-red-600 font-semibold">
                  Letras fallidas:
                </span>
                {wrongChar.map((letter, index) => (
                  <span
                    key={index}
                    className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Botón Reiniciar */}
        <div className="text-center">
          <Button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6"
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Game;
