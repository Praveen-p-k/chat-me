export default function LoginPage() {
  return (
    <section className="bg-primary-dark">
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full shadow md:mt-0 sm:max-w-md xl:p-0 bg-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Sign in to you account
            </h1>

            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-primary-dark focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-primary-dark focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 dark ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="flex w-full ml-3 justify-between text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 text-gray-300"
                  >
                    Remember me
                  </label>
                  <a
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-dark font-medium text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
            <p className="text-sm font-light text-gray-500 text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
