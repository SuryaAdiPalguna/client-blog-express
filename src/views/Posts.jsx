import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import striptags from "striptags";
import relativeTime from "dayjs/plugin/relativeTime";

import Layout from "./components/Layout";

dayjs.extend(relativeTime);

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const author = searchParams.get("author");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page")) || 1;

  const [inputSearch, setInputSearch] = useState("");
  const [posts, setPosts] = useState({
    data: [],
    page: { size: 0, total: 0, current: 0 },
    request: null,
  });

  const totalPage = Math.ceil(posts.page.total / posts.page.size) || 1;
  const currentPage = posts.page.current || page;
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://api-blog-express-9dbb509347a4.herokuapp.com/api/posts?limit=9" +
          (search ? `&search=${search}` : "") +
          (author ? `&author=${author}` : "") +
          (category ? `&category=${category}` : "") +
          (page ? `&page=${page}` : ""),
        { credentials: "include" }
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [search, page, category, author]);

  useEffect(() => {
    setInputSearch(search || "");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      setSearchParams({
        search: inputSearch,
      });
    } else if (author) {
      setSearchParams({
        search: inputSearch,
      });
    } else {
      setSearchParams({ search: inputSearch });
    }
  };

  return (
    <Layout title="All Posts">
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}
      {/* col-12 = grow-0 shrink-0 basis-auto w-full */}
      {/* col-6 = grow-0 shrink-0 basis-auto w-6/12 */}
      {/* col-4 = grow-0 shrink-0 basis-auto w-4/12 */}

      <section className="py-16 bg-gray-50" data-aos="fade-in">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8 text-center">
            <div className="grow shrink-0 basis-0">
              <h1 className="font-extrabold">All Blog</h1>
              <h3 className="font-extrabold">
                {posts.request ? posts.request : null}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8 text-center">
            <div className="grow shrink-0 basis-0">
              <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Search
                </label>
                {category ? (
                  <input type="hidden" name="category" value={category}></input>
                ) : (
                  <></>
                )}
                {author ? (
                  <input type="hidden" name="author" value={author}></input>
                ) : (
                  <></>
                )}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            {posts.data.length > 0 ? (
              posts.data.map((post) => (
                <div className="grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-4/12 py-4">
                  <div className="bg-white border border-gray-200 rounded-lg shadow">
                    <Link to={`/posts/${post.slug}`}>
                      {post.image ? (
                        <img
                          className="rounded-t-lg"
                          src={`https://api-blog-express-9dbb509347a4.herokuapp.com${post.image}`}
                          alt={post.title}
                        />
                      ) : (
                        <img
                          className="rounded-t-lg"
                          src="/img/post.jpg"
                          alt={post.title}
                        />
                      )}
                    </Link>
                    <div className="p-5">
                      <Link to={`/posts/${post.slug}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                          {post.title}
                        </h5>
                      </Link>
                      <p className="mb-3 font-normal text-gray-700 text-sm">
                        By{" "}
                        <Link
                          to={`/posts?author=${post.author_id.username}`}
                          className="font-medium"
                        >
                          {post.author_id.name}
                        </Link>{" "}
                        in{" "}
                        <Link
                          to={`/posts?category=${post.category_id.slug}`}
                          className="font-medium"
                        >
                          {post.category_id.name}
                        </Link>{" "}
                        {dayjs(post.createdAt).fromNow()}
                      </p>
                      <p className="mb-3 font-normal text-gray-700">
                        {striptags(post.body).length > 100
                          ? striptags(post.body).slice(0, 100) + "..."
                          : striptags(post.body)}
                      </p>
                      <Link
                        to={`/posts/${post.slug}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
                  </div>
                </div>
              ))
            ) : (
              <div className="col py-4">
                <p className="mb-3 text-lg text-center text-gray-500 md:text-xl">
                  No posts available!{" "}
                  <Link
                    to="/posts"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Back to posts
                  </Link>
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              {posts.data.length > 0 ? (
                <nav aria-label="Page navigation example">
                  <ul className="flex items-center -space-x-px h-10 text-base">
                    <li>
                      <Link
                        to={`/posts?page=${
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
                          to={`/posts?page=${number}`}
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
                        to={`/posts?page=${
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
    </Layout>
  );
}
