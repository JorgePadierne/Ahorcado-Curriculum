export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-teal-600 dark:text-teal-300"></div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="https://www.instagram.com/jorgebolanos283?igsh=NmJqcHZ0eDc4aTJt&utm_source=qr"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">Instagram</span>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/JorgePadierne"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">GitHub</span>
              </a>
            </li>

            <li>
              <a
                href="https://github.com/NstorTapia23"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
                <span className="sr-only">GitHub</span>
                {/* SVG GitHub */}
              </a>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Compañía
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Soporte
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Email: jorgebolanos535@gmail.com</li>
              <li>Teléfono: +34 600 292 908</li>
              <li>Dirección: Arrefice, Las Palmas, España</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Email: nestortriana287@gmail.com</li>
              <li>Teléfono: +53 55 476 430</li>
              <li>Dirección: Ciego de Ávila, Cuba</li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
