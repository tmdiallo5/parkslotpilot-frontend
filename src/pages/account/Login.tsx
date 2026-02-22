import React from "react";

function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 pb-24">
      <div className="w-full max-w-3xl  bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-12">
        <h1 className="text-2xl font-medium text-gray-900 mb-10">
          Sign in to your account.
        </h1>
        <form action="" className="space-y-6">
          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48">
              Email address
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="flex-1 max-w-2xl border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48 ">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="flex-1 max-w-2xl border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-10">
            <div className="w-44" />
            <a href="#" className="ml-auto text-green-600 hover:underline">
              I&apos;ve forgotten my password
            </a>
          </div>

          <div className="flex items-center justify-between pt-10">
            <button type="button" className="text-green-600 hover:underline">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-10 py-3"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
