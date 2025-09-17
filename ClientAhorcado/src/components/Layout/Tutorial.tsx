function Tutorial() {
  return (
    <div className="p-6 text-xl">
      <section className="mb-8 bg-white rounded-2xl shadow p-6 hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          1. ¿Qué es el Ahorcado?
        </h2>
        <p>
          El <strong>ahorcado</strong> es un juego clásico de adivinar palabras
          en el que el jugador debe intentar descubrir letra por letra hasta
          revelar totalmente el vocablo en la menor cantidad de intentos
          posibles. Cada error acerca al “ahorcado” a completar su dibujo.
        </p>
      </section>
      <section className="mb-8 bg-white rounded-2xl shadow p-6 hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          2. Reglas Básicas
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Se le otorgará al jugador una palabra secreta aleatoria (el largo y
            la dificultad dependerán del modo de juego seleccionado).
          </li>
          <li>El jugador va ingresando letras para adivinar la palabra.</li>
          <li>Si la letra existe en la misma, se revela en su posición.</li>
          <li>Si la letra no existe, se dibuja una parte del “ahorcado”.</li>
          <li>
            El juego termina al adivinar la palabra o completar el dibujo.
          </li>
        </ul>
      </section>
      <section className="mb-8 bg-white rounded-2xl shadow p-6 hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          3. Elementos del Juego
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Palabra Oculta
            </h3>
            <p>
              En los modos fácil y medio será representada sustituyendo, en un
              inicio, con guiones o líneas cada letra. Ejemplo:{" "}
              <code>_ _ _ _ _</code>
            </p>
            <p>
              En el caso del modo difícil, como parte de la experiencia de
              juego, estas líneas no serán mostradas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Dibujo del Ahorcado
            </h3>
            <p>
              Cada fallo añade una parte al cuerpo: cabeza, torso, brazos,
              piernas...
            </p>
          </div>
        </div>
      </section>
      <section className="mb-8 bg-white rounded-2xl shadow p-6 text-center hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          4. Ejemplo Rápido
        </h2>
        <p className="mb-4">Supongamos que la palabra secreta es “GATO”:</p>
        <div className="inline-block bg-gray-50 rounded-xl px-6 py-4 shadow">
          <p className="font-mono text-lg mb-2">_ _ _ _</p>
          <p className="text-gray-600 text-sm">Se han intentado: A, E, I</p>
          <p className="text-red-400 text-sm">Fallos: 2</p>
        </div>
      </section>
      <section className="bg-white rounded-2xl shadow p-6 hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-semibold text-green-400 mb-3">
          5. Consejos para Jugar Mejor
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Comienza probando vocales, suelen aparecer con frecuencia.</li>
          <li>Piensa en palabras comunes según las letras descubiertas.</li>
          <li>Gestiona tus intentos: cada error cuenta.</li>
        </ul>
      </section>
    </div>
  );
}

export default Tutorial;
