import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

function App() {
  const [posts, setposts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [select, setSelect] = useState(1);
  const postsPerPage = 10;

  const fetchData = async (page) => {
    const skip = (page - 1) * postsPerPage;
    const res = await fetch(
      `https://dummyjson.com/posts?limit=${postsPerPage}&skip=${skip}`
    );
    const data = await res.json();
    console.log(data);

    setposts(data.posts);
    setTotalPosts(100);
  };

  useEffect(() => {
    fetchData(select);
  }, [select]);

  const handlePrev = () => {
    if (select > 1) setSelect(select - 1); // Go to previous page
  };

  const handleNext = () => {
    if (select < Math.ceil(totalPosts / postsPerPage)) setSelect(select + 1); // Go to next page
  };

  return (
    <div className="bg-gray-800 h-auto w-full flex flex-col items-center">
      <h1 className="text-2xl tracking-wider font-semibold">
        Pagination Posts
      </h1>
      {posts.length > 0 &&
        posts.map(
          ({ title, body, id, reactions: { dislikes, likes }, views }) => (
            <div key={id} className="max-w-md border-b-2 p-4">
              <p className="text-xl py-1">{title}</p>
              <p className="text-gray-400 text-sm">{body}</p>
              <div className="flex gap-2 justify-start items-center py-2 text-sm">
                <IoEyeSharp />
                <p>{views}</p>
                <AiFillLike />
                <p>{likes}</p>
                <AiFillDislike />
                <p>{dislikes}</p>
              </div>
            </div>
          )
        )}

      <div className="flex gap-3 justify-center items-end">
        <p
          className="p-4 hover:bg-gray-700 text-gray-400 rounded-lg text-md transition-all ease-in"
          onClick={handlePrev}
        >
          Prev
        </p>
        {[...Array(Math.ceil(totalPosts / postsPerPage))].map((_, i) => (
          <div
            key={i}
            className={`${
              select === i + 1
                ? `text-white bg-sky-600 p-4 rounded-lg text-md transition-all ease-in `
                : `p-4 hover:bg-gray-700 text-gray-400  rounded-lg text-md transition-all ease-in`
            }`}
            onClick={() => setSelect(i + 1)}
          >
            {i + 1}
          </div>
        ))}
        <p
          className="p-4  hover:bg-gray-700 text-gray-400 rounded-lg text-md transition-all ease-in"
          onClick={handleNext}
        >
          Next
        </p>
      </div>
    </div>
  );
}

export default App;
