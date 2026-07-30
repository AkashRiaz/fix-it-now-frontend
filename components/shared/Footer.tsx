const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">🔧 Fix-It-Now</h2>

            <p className="mt-4 text-gray-400 max-w-sm">
              Reliable technicians at your doorstep. Book trusted professionals
              for repair, maintenance, and home services.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                className="w-10 h-10 rounded-full bg-gray-800 
              flex items-center justify-center hover:bg-blue-600 transition"
              >
                f
              </a>

              <a
                className="w-10 h-10 rounded-full bg-gray-800 
              flex items-center justify-center hover:bg-pink-600 transition"
              >
                ◎
              </a>

              <a
                className="w-10 h-10 rounded-full bg-gray-800 
              flex items-center justify-center hover:bg-sky-500 transition"
              >
                𝕏
              </a>

              <a
                className="w-10 h-10 rounded-full bg-gray-800 
              flex items-center justify-center hover:bg-blue-700 transition"
              >
                in
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5">Company</h3>

            <ul className="space-y-3">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/technicians">Technicians</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5">Services</h3>

            <ul className="space-y-3">
              <li>Electrical Repair</li>
              <li>Plumbing</li>
              <li>AC Repair</li>
              <li>Appliance Service</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-5">Legal</h3>

            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>

              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div
          className="max-w-7xl mx-auto px-6 py-5 
        flex flex-col md:flex-row justify-between gap-3"
        >
          <p className="text-sm text-gray-500">
            © 2026 Fix-It-Now. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Trusted home services platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
