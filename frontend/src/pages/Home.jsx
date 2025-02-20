import { useEffect, useState } from "react";
import Post from "../components/Post";
import "./pages.css";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
  console.log(API_URL, " api url");
  useEffect(() => {
    fetch(`${API_URL}/post`, {
      method: "get",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  if (posts) {
    return (
      <div className="homeContainer">
        <div className="homeNav">
          <div className="n1">
            <a href="">Rexent</a>
          </div>
          <div className="n2">
            <a href="">Folloving</a>
          </div>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <Post key={post.id} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomePage;
