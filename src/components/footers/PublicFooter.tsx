import Logo from "../logos/Logo";

function PublicFooter() {
  return (
    <footer className="w-full bg-slate-700">
      <div className="grid grid-cols-1 items-start gap-8 py-7 lg:grid-cols-12">
        <div className="flex items-start lg:col-span-4">
          <Logo />
        </div>
        <div className="lg:col-span-8 lg:ml-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 text-white">
          <div>
            <h1 className="text-white">Platform</h1>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-white">Services</h1>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Hourly / Daily parking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Monthly parking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Manage bookings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-white">Contact</h1>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Report an issue
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 pl-5 pb-3 border-t border-slate-700 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <p className="text-sm text-slate-400">
          © 2026 ParkSlotPilot. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-slate-300 pr-5">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Cancellation Policy
          </a>
          <a href="#" className="hover:text-white">
            Cookies Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
