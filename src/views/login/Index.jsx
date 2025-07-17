import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function LoginIndex() {
  const location = useLocation();
  const successMessage = location.state?.success;
  const errorMessage = location.state?.error;

  const [auth, setAuth] = useState({ status: false, data: null });

  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setShowError(true);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (!res.ok) {
        console.error(result);
        e.target.reset();
        return navigate("/login", {
          state: { error: "Login failed. Please try again." },
        });
      }

      console.log(result);
      e.target.reset();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/sessions/api/auth",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setAuth(data);
    };
    fetchAuth();
  }, []);

  if (auth.status) {
    return navigate("/");
  }

  return (
    <Layout title="Login">
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <section className="py-32 bg-gray-50">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0">
            <div className="grow shrink-0 basis-0 flex justify-center">
              {successMessage && showSuccess ? (
                <div
                  id="alert-3"
                  className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 w-full max-w-md"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">
                    {successMessage}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSuccess(false)}
                    className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
                    data-dismiss-target="#alert-3"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <></>
              )}

              {errorMessage && showError ? (
                <div
                  id="alert-2"
                  className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 w-full max-w-md"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">{errorMessage}</div>
                  <button
                    type="button"
                    onClick={() => setShowError(false)}
                    className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
                    data-dismiss-target="#alert-2"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0 flex justify-center">
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h1 className="text-xl font-medium text-gray-900">
                    Sign in to your account
                  </h1>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter your email"
                      autoFocus
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <div className="text-sm font-medium text-gray-500">
                    Don't have an account yet?{" "}
                    <Link
                      to="/register"
                      className="text-blue-700 hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
