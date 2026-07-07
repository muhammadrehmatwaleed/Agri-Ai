function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white pt-16 pb-8 px-5"
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-4xl font-bold text-green-500">
              🌾 AgriAI
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              Smart Agriculture Platform powered by Artificial Intelligence.
              Helping farmers with crop disease detection, weather forecasting,
              crop recommendations, and market prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>Home</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">
              Contact
            </h3>

            <p className="text-gray-300">📧 info@agriai.com</p>

            <p className="mt-3 text-gray-300">
              📞 +92 300 1234567
            </p>

            <p className="mt-3 text-gray-300">
              📍 Pakistan
            </p>
          </div>

        </div>

        <hr className="my-10 border-gray-700" />

        <p className="text-center text-gray-400">
          © 2026 AgriAI | Final Year Project | MERN Stack
        </p>

      </div>
    </footer>
  );
}

export default Footer;