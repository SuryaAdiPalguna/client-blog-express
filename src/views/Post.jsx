import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Layout from "./components/Layout";

dayjs.extend(relativeTime);

export default function Post() {
  const { slug } = useParams();

  const [post, setPost] = useState({
    data: null,
  });

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

  if (!post.data) {
    return (
      <Layout title="Loading...">
        <p className="text-center py-8">Loading post...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Single Post">
      {/* container = w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl */}
      {/* row = flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 */}
      {/* col = grow shrink-0 basis-0 */}

      <nav className="flex bg-gray-50" aria-label="Breadcrumb">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to="/home"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to="/posts"
                      className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
                    >
                      Blog
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                      {post.data.title}
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>

      <article className="bg-gray-50">
        <div className="w-full px-3 mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex flex-wrap mt-0 mx-3 *:shrink-0 *:w-full *:max-w-full *:px-3 *:mt-0 py-8">
            <div className="grow shrink-0 basis-0">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
                {post.data.title}
              </h1>
              <p className="mb-3 font-normal text-gray-700 text-sm">
                By{" "}
                <Link
                  to={`/posts?author=${post.data.author_id.username}`}
                  className="font-medium"
                >
                  {post.data.author_id.name}
                </Link>{" "}
                in{" "}
                <Link
                  to={`/posts?category=${post.data.category_id.slug}`}
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
              {post.data.image ? (
                <img
                  className="h-auto max-w-full"
                  src={`https://api-blog-express-9dbb509347a4.herokuapp.com${post.data.image}`}
                  alt={post.data.title}
                />
              ) : (
                <img
                  className="h-auto max-w-full"
                  src="/img/post.jpg"
                  alt={post.data.title}
                />
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
    </Layout>
  );
}
