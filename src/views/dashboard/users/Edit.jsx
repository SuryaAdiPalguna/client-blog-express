import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function DashboardUsersEdit() {
  const location = useLocation();
  const successMessage = location.state?.success;
  const errorMessage = location.state?.error;

  const { slugParams } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  const [auth, setAuth] = useState({ status: false, data: null });
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(
          "https://api-blog-express-9dbb509347a4.herokuapp.com/sessions/api/auth",
          { credentials: "include" }
        );
        const data = await response.json();
        setAuth(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuth();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/users/" +
          slugParams,
        { credentials: "include" }
      );
      const data = await response.json();
      console.log(data);
      setUsername(data.data.username);
      setName(data.data.name);
      setEmail(data.data.email);
      setImage(data.data.image);
    };
    fetchPost();
  }, [slugParams]);

  // function javascript
  const previewImage = () => {
    const image = document.querySelector("#image");
    const imgPreview = document.querySelector(".img-preview");
    const oFReader = new FileReader();

    imgPreview.style.display = "block";
    oFReader.readAsDataURL(image.files[0]);
    oFReader.onload = (e) => (imgPreview.src = e.target.result);
  };
  // end function javascript

  const handleSubmit = async (e, slugParams) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/users/" +
          slugParams,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
      const result = await res.json();

      if (!res.ok) {
        setErrors(result.errors || {});
        console.error(result);
        return;
      }

      console.log(result);
      navigate("/dashboard/users/" + slugParams + "/edit", {
        state: { success: "Profile has been updated!" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth.status) {
    navigate("/login");
    return;
  }

  return (
    <DashboardLayout>
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <section className="p-4 sm:ml-64">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0">
            <div className="grow shrink-0 basis-0 flex justify-center">
              {successMessage && showSuccess ? (
                <div
                  id="alert-3"
                  className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 w-full"
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
                  className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 w-full"
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
            <div className="grow shrink-0 basis-0">
              <h1 className="font-extrabold text-center">Profile</h1>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <form
                className="max-w-full"
                onSubmit={(e) => handleSubmit(e, slugParams)}
                encType="multipart/form-data"
              >
                <div className="mb-5">
                  <input type="hidden" name="oldImage" value={image} />
                  {image ? (
                    <img
                      className="img-preview h-full max-w-xs mb-2 ring-2 ring-gray-300 mx-auto rounded-full"
                      src={`https://api-blog-express-9dbb509347a4.herokuapp.com${image}`}
                    />
                  ) : (
                    <img
                      className="img-preview h-full max-w-xs mb-2 ring-2 ring-gray-300 mx-auto rounded-full"
                      src="/img/user-circle.png"
                    />
                  )}
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 text-center"
                  >
                    Profile Image
                  </label>
                  <input
                    className={`block max-w-xs mx-auto text-sm ${
                      errors.image
                        ? "error-file-input"
                        : "text-gray-900 border-gray-300 bg-gray-50"
                    }  border rounded-lg cursor-pointer focus:outline-none`}
                    id="image"
                    name="image"
                    type="file"
                    onChange={previewImage}
                  />
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`${
                      errors.username
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }  border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    required
                  />
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`${
                      errors.email
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }  border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`${
                      errors.name
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }  border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`${
                      errors.password
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }  border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter your password"
                    name="password"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="confirm"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    className={`${
                      errors.confirm
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }  border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter your confirm"
                    name="confirm"
                  />
                  {errors.confirm && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirm}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
