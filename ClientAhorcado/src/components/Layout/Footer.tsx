export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="mx-auto max-w-screen-xl space-y-10 px-6 py-14 lg:px-8">
        {/* Social */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-2xl font-bold text-green-400">Ahorcado</span>

          <ul className="mt-6 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="https://www.instagram.com/jorgebolanos283?igsh=NmJqcHZ0eDc4aTJt&utm_source=qr"
                rel="noreferrer"
                target="_blank"
                className="text-green-400 hover:text-green-300 transition"
              >
                <span className="sr-only">Instagram</span>
                {/* Icono Instagram */}
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/JorgePadierne"
                rel="noreferrer"
                target="_blank"
                className="text-green-400 hover:text-green-300 transition"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.63 2 12.29c0 4.5 2.87 8.31 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.63-3.37-1.38-3.37-1.38-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.58 2.36 1.13 2.94.87.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.16-4.56-5.14 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04a9.2 9.2 0 015 0c1.9-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.73 1.03 1.66 1.03 2.8 0 3.99-2.34 4.87-4.57 5.13.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.85 0 .27.18.59.69.48A10.3 10.3 0 0022 12.29C22 6.63 17.52 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/NstorTapia23"
                rel="noreferrer"
                target="_blank"
                className="text-green-400 hover:text-green-300 transition"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.63 2 12.29c0 4.5 2.87 8.31 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.63-3.37-1.38-3.37-1.38-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.52 1.05 1.52 1.05.9 1.58 2.36 1.13 2.94.87.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.16-4.56-5.14 0-1.14.39-2.07 1.03-2.8-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04a9.2 9.2 0 015 0c1.9-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.73 1.03 1.66 1.03 2.8 0 3.99-2.34 4.87-4.57 5.13.36.32.67.95.67 1.92 0 1.39-.01 2.5-.01 2.85 0 .27.18.59.69.48A10.3 10.3 0 0022 12.29C22 6.63 17.52 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 gap-8 border-t border-gray-700 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-12">
          <div>
            <h3 className="font-semibold text-green-400">Compañía</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-green-300">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-400">Soporte</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-green-300">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-400">Contacto</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a
                  href="mailto:jorgebolanos535@gmail.com"
                  className="hover:text-green-300"
                  target="_blank"
                >
                  Email: jorgebolanos535@gmail.com
                </a>
              </li>
              <li>Teléfono: +34 600 292 908</li>
              <li>Dirección: Arrecife, Las Palmas, España</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-400">Contacto</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>
                <a
                  href="mailto:nestortriana287@gmail.com"
                  className="hover:text-green-300"
                  target="_blank"
                >
                  Email: nestortriana287@gmail.com
                </a>
              </li>
              <li>Teléfono: +53 55 476 430</li>
              <li>Dirección: Ciego de Ávila, Cuba</li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} ServiciosWeb. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
