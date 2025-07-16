import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/Layout";

export default function DashboardIndex() {
  const [auth, setAuth] = useState({ status: false, data: null });
  const [admin, setAdmin] = useState({ status: false, data: null });
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth.status) {
    navigate("/login");
    return;
  }

  return (
    <DashboardLayout>
      <section className="p-4 sm:ml-64 bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12 mb-8">
            <h1 className="text-gray-900 text-3xl md:text-5xl font-extrabold mb-2">
              Welcome, {auth.data.name}
            </h1>
            <p className="text-lg font-normal text-gray-500 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
              exercitationem! Officiis cum aliquid quos fugit, maxime iure
              voluptates, dicta nemo porro saepe esse architecto at! Architecto
              dolore ex praesentium magni.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
              <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                Post Dashboard
              </h2>
              <p className="text-lg font-normal text-gray-500 mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Architecto autem commodi repellendus dolor rerum laborum itaque
                accusamus ea suscipit, sit eos labore ipsam optio quos non, hic
                eum eligendi voluptatum?
              </p>
              <Link
                to="/dashboard/posts"
                className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
            {admin.status ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
                <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                  Category Dashboard
                </h2>
                <p className="text-lg font-normal text-gray-500 mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  ad illo unde ex possimus, omnis odio. Obcaecati, praesentium
                  quisquam! Cupiditate in ut labore error similique officiis
                  reprehenderit aspernatur voluptatibus praesentium.
                </p>
                <Link
                  to="/dashboard/categories"
                  className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
                <h2 className="text-gray-900 text-3xl font-extrabold mb-2">
                  My Profile
                </h2>
                <p className="text-lg font-normal text-gray-500 mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  ad illo unde ex possimus, omnis odio. Obcaecati, praesentium
                  quisquam! Cupiditate in ut labore error similique officiis
                  reprehenderit aspernatur voluptatibus praesentium.
                </p>
                <Link
                  to={`/dashboard/users/${auth.data.name}/edit`}
                  className="text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
                >
                  Read more
                  <svg
                    className="w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
