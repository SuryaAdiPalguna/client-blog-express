import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import striptags from "striptags";
import DashboardLayout from "../../components/dashboard/Layout";

export default function DashboardPostsIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page")) || 1;

  const [showModal, setShowModal] = useState(false);

  const [inputSearch, setInputSearch] = useState("");
  const [posts, setPosts] = useState({
    data: [],
    page: { size: 0, total: 0, current: 0 },
    request: null,
  });

  const totalPage = Math.ceil(posts.page.total / posts.page.size) || 1;
  const currentPage = posts.page.current || page;
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  const [auth, setAuth] = useState({ status: false, data: null });
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

  const fetchPosts = async () => {
    if (!auth.data?.username) return;
    const response = await fetch(
      `https://api-blog-express-9dbb509347a4.herokuapp.com/api/posts?limit=10&author=${auth.data?.username}` +
        (search ? `&search=${search}` : "") +
        (page ? `&page=${page}` : ""),
      { credentials: "include" }
    );
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [search, page, auth.data?.username]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      search: inputSearch,
    });
  };
  const handleDelete = async (e, slug) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://api-blog-express-9dbb509347a4.herokuapp.com/api/posts/${slug}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      console.log(result);
      setShowModal(false);
      await fetchPosts();
      navigate("/dashboard/posts");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      {/* container-fluid = w-full px-3 mx-auto */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <section className="p-4 sm:ml-64">
        <div className="w-full px-3 mx-auto">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <h1 className="font-extrabold">Dashboard Posts</h1>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                  <div>
                    <Link
                      to="/dashboard/posts/create"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      Create Post
                    </Link>
                  </div>
                  <form className="max-w-2xl w-1/2" onSubmit={handleSearch}>
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search post..."
                        name="search"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                <table className="w-full text-sm text-left text-gray-500 shadow-sm">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Body
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.data.map((post) => (
                      <tr className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {striptags(post.title).length > 20
                            ? striptags(post.title).slice(0, 20) + "..."
                            : striptags(post.title)}
                        </td>
                        <td className="px-6 py-4">
                          {striptags(post.body).length > 50
                            ? striptags(post.body).slice(0, 50) + "..."
                            : striptags(post.body)}
                        </td>
                        <td className="px-6 py-4">{post.category_id.name}</td>
                        <td className="px-6 py-4 flex">
                          <Link
                            to={`/dashboard/posts/${post.slug}`}
                            className="text-white bg-cyan-300 hover:bg-cyan-400 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm px-2.5 py-1 mr-1 focus:outline-none"
                          >
                            <svg
                              className="w-[18px] h-[18px] text-inherit"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </Link>
                          <Link
                            to={`/dashboard/posts/${post.slug}/edit`}
                            className="text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-100 font-medium rounded-lg text-sm px-2.5 py-1 mr-1 focus:outline-none"
                          >
                            <svg
                              className="w-[18px] h-[18px] text-inherit"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                              />
                            </svg>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            data-modal-target="popup-modal"
                            data-modal-toggle="popup-modal"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1 mr-1 focus:outline-none"
                          >
                            <svg
                              className="w-[18px] h-[18px] text-inherit"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                              />
                            </svg>
                          </button>
                          {showModal && (
                            <div
                              id="popup-modal"
                              tabIndex="-1"
                              data-aos="fade-in"
                              data-aos-delay="500"
                              className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-gray-900/20 bg-opacity-50"
                            >
                              <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow">
                                  <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    data-modal-hide="popup-modal"
                                  >
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
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                  <div className="p-4 md:p-5 text-center">
                                    <svg
                                      className="mx-auto mb-4 text-gray-400 w-12 h-12"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                      />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                                      Are you sure you want to delete this post?
                                    </h3>
                                    <form
                                      onSubmit={(e) =>
                                        handleDelete(e, post.slug)
                                      }
                                      style={{ display: "inline" }}
                                    >
                                      <button
                                        data-modal-hide="popup-modal"
                                        type="submit"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                      >
                                        Yes, I'm sure
                                      </button>
                                    </form>
                                    <button
                                      data-modal-hide="popup-modal"
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    >
                                      No, cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              {posts.data.length > 0 ? (
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <Link
                        to={`/dashboard/posts?page=${
                          currentPage > 1 ? currentPage - 1 : 1
                        }`}
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="w-3 h-3 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </Link>
                    </li>
                    {pageNumbers.map((number) => (
                      <li key={number}>
                        <Link
                          to={`/dashboard/posts?page=${number}`}
                          className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                            number === currentPage
                              ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                          }`}
                          aria-current={
                            number === currentPage ? "page" : undefined
                          }
                        >
                          {number}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to={`/dashboard/posts?page=${
                          currentPage < totalPage ? currentPage + 1 : totalPage
                        }`}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="w-3 h-3 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </nav>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
