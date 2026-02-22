import React from "react";

function Booking() {
  return (
    <section className="bg-gray-200 ">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* left */}
          <article className="rounded-2xl bg-white p-8">
            <form action="" className="space-y-5">
              <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
                <label className="block text-xs font-medium text-emerald-700">
                  Park at
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter a place"
                    className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-search-icon lucide-search"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </div>
              </div>

              {/* Until */}
              <div className="flex flex-row-2 gap-5">
                <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
                  <label className="block text-xs font-medium text-emerald-700">
                    From
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
                <div className="rounded-lg border border-gray-300 bg-white px-4 py-3 gap-4">
                  <label className="block text-xs font-medium text-emerald-700">
                    Until
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Booking;
