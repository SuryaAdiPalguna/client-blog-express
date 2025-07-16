import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Layout";
import { useNavigate, useParams } from "react-router-dom";

export default function DashboardCategoriesEdit() {
  const { slugParams } = useParams();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  const [auth, setAuth] = useState({ status: false, data: null });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({ status: false, data: null });

  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/sessions/api/admin",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setAdmin(data);
    };
    fetchAdmin();
  }, []);

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
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/categories/" +
          slugParams,
        { credentials: "include" }
      );
      const data = await response.json();
      console.log(data);
      setName(data.data.name);
      setSlug(data.data.slug);
      setImage(data.data.image);
    };
    fetchPost();
  }, [slugParams]);

  useEffect(() => {
    fetch(
      "https://api-blog-express-9dbb509347a4.herokuapp.com/api/categories",
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // function javascript
  useEffect(() => {
    if (!name) return;

    const timeout = setTimeout(() => {
      fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/categories/slug?name=" +
          name,
        {
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSlug(data.slug);
        })
        .catch((err) => console.error(err));
    }, 500);

    return () => clearTimeout(timeout);
  }, [name]);

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
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/categories/" +
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
      navigate("/dashboard/categories", {
        state: { success: "Category has been updated!" },
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

  if (!admin.status) {
    navigate("/dashboard");
    return;
  }

  return (
    <DashboardLayout>
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <section className="p-4 sm:ml-64">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <h1 className="font-extrabold">Edit Category</h1>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <form
                className="max-w-full"
                onSubmit={(e) => handleSubmit(e, slugParams)}
                enctype="multipart/form-data"
              >
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
                    } border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter category name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autofocus
                    required
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="slug"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    className={`${
                      errors.slug
                        ? "error-input"
                        : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    } border text-sm rounded-lg block w-full p-2.5`}
                    placeholder="Enter category slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    autofocus
                    required
                  />
                  {errors.slug && (
                    <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category Image
                  </label>
                  <input type="hidden" name="oldImage" value={image} />
                  {image ? (
                    <img
                      className="img-preview h-auto max-w-xs mb-2 ring-2 ring-gray-300"
                      src={`https://api-blog-express-9dbb509347a4.herokuapp.com${image}`}
                    />
                  ) : (
                    <img
                      className="img-preview h-auto max-w-xs mb-2 ring-2 ring-gray-300"
                      src="/img/image.png"
                    />
                  )}
                  <input
                    className={`block w-full text-sm ${
                      errors.image
                        ? "error-file-input"
                        : "text-gray-900 border-gray-300 bg-gray-50"
                    } border rounded-lg cursor-pointer focus:outline-none`}
                    id="image"
                    name="image"
                    type="file"
                    onChange={previewImage}
                  />
                  {errors.image ? (
                    <p className="mt-2 text-sm text-red-600">{{ $message }}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
