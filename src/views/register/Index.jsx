import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function RegisterIndex() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const [auth, setAuth] = useState({ status: false, data: null });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();

      if (!res.ok) {
        setErrors(result.errors || {});
        console.error(result);
        return;
      }

      console.log(result);
      navigate("/login", {
        state: { success: "Registration successful! Please log in." },
      });
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
    <Layout title="Register">
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <section className="py-32 bg-gray-50">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0 flex justify-center">
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h1 className="text-xl font-medium text-gray-900">
                    Create an account
                  </h1>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`${
                        errors.name
                          ? "error-input"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border text-sm rounded-lg block w-full p-2.5`}
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autofocus
                      required
                    />
                    {errors.name ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.name[0]}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className={`${
                        errors.username
                          ? "error-input"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border text-sm rounded-lg block w-full p-2.5`}
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autofocus
                      required
                    />
                    {errors.username ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.username[0]}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
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
                      className={`${
                        errors.email
                          ? "error-input"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border text-sm rounded-lg block w-full p-2.5`}
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autofocus
                      required
                    />
                    {errors.email ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email[0]}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className={`${
                        errors.password
                          ? "error-input"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border text-sm rounded-lg block w-full p-2.5`}
                      required
                    />
                    {errors.password ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password[0]}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password_confirmation"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      placeholder="Confirm your password"
                      className={`${
                        errors.password_confirmation
                          ? "error-input"
                          : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      } border text-sm rounded-lg block w-full p-2.5`}
                      required
                    />
                    {errors.password_confirmation ? (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password_confirmation[0]}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account
                  </button>
                  <div className="text-sm font-medium text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-700 hover:underline">
                      Login here
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
