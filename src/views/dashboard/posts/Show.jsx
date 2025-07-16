import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function DashboardPostsShow() {
  const { slug } = useParams();

  const [post, setPost] = useState({
    data: null,
  });

  const [auth, setAuth] = useState({ status: false, data: null });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await fetch(
          "https://api-blog-express-9dbb509347a4.herokuapp.com/sessions/api/auth",
          {
            credentials: "include",
          }
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
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/posts/" + slug,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setPost(data);
    };
    fetchPost();
  }, [slug]);

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
      navigate("/dashboard/posts");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!post.data) {
    return (
      <DashboardLayout>
        <p className="text-center py-8">Loading post...</p>
      </DashboardLayout>
    );
  }

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

      <article className="p-4 sm:ml-64">
        <div className="w-full px-3 mx-auto">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
                {post.data.title}
              </h1>
              <p className="mb-3 font-normal text-gray-700 text-sm">
                By{" "}
                <Link
                  to="/posts?author={{ $post->author->username }}"
                  className="font-medium"
                >
                  {post.data.author_id.name}
                </Link>{" "}
                in{" "}
                <Link
                  to="/posts?category={{ $post->category->slug }}"
                  className="font-medium"
                >
                  {post.data.category_id.name}
                </Link>{" "}
                {dayjs(post.data.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  to="/dashboard/posts"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <svg
                    className="w-[12px] h-[12px] text-gray-800 me-2"
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
                      d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                  </svg>
                  Back
                </Link>
                <Link
                  to="/dashboard/posts/{{ $post->slug }}/edit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <svg
                    className="w-[12px] h-[12px] text-gray-800 me-2"
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
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <svg
                    className="w-[12px] h-[12px] text-gray-800 me-2"
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
                  Delete
                </button>
                {showModal && (
                  <div
                    id="popup-modal"
                    tabindex="-1"
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
                            onSubmit={(e) => handleDelete(e, post.data.slug)}
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
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              {post.data.image ? (
                <img
                  className="h-auto max-w-4xl"
                  src={`https://api-blog-express-9dbb509347a4.herokuapp.com${post.data.image}`}
                  alt={post.data.title}
                />
              ) : (
                <img
                  className="h-auto max-w-4xl"
                  src="/img/post.jpg"
                  alt={post.data.title}
                ></img>
              )}
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div
              className="grow shrink-0 basis-0 text-lg font-normal text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.data.body }}
            />
          </div>
        </div>
      </article>
    </DashboardLayout>
  );
}
