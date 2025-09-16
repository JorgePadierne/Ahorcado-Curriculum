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

// 🔹 Función para calcular puntuación

function Game() {
  const api = useAxios();
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<number>(0);
  const [select, setSelect] = useState<string>("facil");
  const [word, setWord] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState<string>("");

  // Cronómetro automático
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

  const handleDificultad = async () => {
    try {
      const { data } = await api.get(
        `/api/juego/palabraaleatoria?dificultad=${select}`
      );
      const wordTemp = data.palabra.toUpperCase();
      setWord(wordTemp.split(""));
      setGuessedLetters([]);
      setAttempts(0);
      setLetterInput("");
      resetearCronometro();
      iniciarCronometro();
    } catch (Error) {
      console.error(Error);
    }
  };

  const guessLetter = (letter: string) => {
    const upperLetter = letter.toUpperCase();
    if (word.includes(upperLetter) && !guessedLetters.includes(upperLetter)) {
      setGuessedLetters([...guessedLetters, upperLetter]);
    } else if (!word.includes(upperLetter) && attempts < man.length - 1) {
      setAttempts(attempts + 1);
    }
    setLetterInput("");
  };

  const handleReset = async () => {
    setAttempts(0);
    setGuessedLetters([]);
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

  // 🔹 SweetAlert cuando gana
  useEffect(() => {
    if (isWinner) {
      setCorriendo(false);

      // Función para calcular puntuación
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

        if (select === "medio") {
          puntuacion = puntuacion * 2;
        }
        if (select === "dificil") {
          puntuacion = puntuacion * 5;
        }

        return Math.max(puntuacion, 0);
      };

      const puntuacion = calcularPuntuacion(tiempo, attempts);
      Swal.fire({
        title: "¡Ganaste! 🎉",
        text: `Desea guardar su puntuación? ${puntuacion} `,
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
          } catch (Error) {
            console.error(Error);
            Swal.fire({
              title: "Error",
              text: "No se pudo guardar la puntuación. Inténtalo de nuevo.",
              icon: "error",
              confirmButtonText: "Entendido",
            });
          }
        }
      });
    }
  }, [isWinner, api, attempts, tiempo, user?.name, select]);

  // 🔹 SweetAlert cuando pierde
  useEffect(() => {
    if (isLoser) {
      setCorriendo(false);
      Swal.fire({
        title: "¡Perdiste! 😢",
        text: `La palabra era: ${word.join("")}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [isLoser, word]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-3xl bg-gradient-to-b from-gray-100 to-gray-50 rounded-xl shadow-lg mt-20">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Juego del Ahorcado
        </h1>

        {/* Selección de dificultad */}
        <div className="mb-6">
          <label
            htmlFor="dificultad"
            className="block text-sm font-medium text-gray-700 mb-2 text-center"
          >
            Selecciona dificultad
          </label>
          <div className="flex gap-2 justify-center">
            <select
              id="dificultad"
              className="flex-1 rounded border-gray-300 shadow-sm sm:text-sm p-2"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
            <Button
              onClick={handleDificultad}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Aceptar
            </Button>
          </div>
        </div>

        {/* Cronómetro */}
        <div className="text-center mb-4">
          <span className="text-xl font-mono bg-gray-300 px-4 py-2 rounded shadow-inner">
            Tiempo:{" "}
            {Math.floor(tiempo / 60)
              .toString()
              .padStart(2, "0")}
            :{(tiempo % 60).toString().padStart(2, "0")}
          </span>
        </div>

        {/* Muñeco */}
        <pre className="text-left whitespace-pre font-mono text-3xl bg-gray-200 p-6 rounded shadow-inner text-center mb-6">
          {man[attempts]}
        </pre>

        {/* Palabra */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {word.map((letter, index) => {
            if (select === "facil" || select === "medio") {
              return (
                <span
                  key={index}
                  className={`underline p-2 text-2xl w-10 inline-block text-center ${
                    guessedLetters.includes(letter)
                      ? "text-green-700 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {guessedLetters.includes(letter) ? letter : "_"}
                </span>
              );
            }
            return (
              <div key={index} className="w-10 text-center">
                <div
                  className={`underline p-2 text-2xl w-10 inline-block text-center ${
                    guessedLetters.includes(letter)
                      ? "text-green-700 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {guessedLetters.includes(letter) ? letter : ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input de letras */}
        {!isWinner && !isLoser && (
          <div className="flex justify-center gap-2 mb-4">
            <Input
              type="text"
              maxLength={1}
              value={letterInput}
              onChange={(e) => setLetterInput(e.target.value.toUpperCase())}
              className="text-center p-2 border rounded w-16"
              disabled={word.length === 0 || isWinner || isLoser}
            />
            <Button
              onClick={() => letterInput && guessLetter(letterInput)}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={word.length === 0 || isWinner || isLoser}
            >
              Intentar
            </Button>
          </div>
        )}

        {/* Botón Reiniciar */}
        <div className="text-center flex justify-center gap-2 flex-wrap">
          <Button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Game;
