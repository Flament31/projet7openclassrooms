import { useQuery } from "react-query";
import ArticlesCard from "./ArticlesCard";

const Post = () => {
  const {
    // les données renvoyées par le serveur
    // null si la requête n'est pas encore résolue
    data,
    // l'erreur renvoyé par le serveur
    // ou null si pas d'erreur
    error,
  } = useQuery("posts", async () => {
    const response = await fetch("http://localhost:8000/api/post");
    const data = await response.json();
    return data;
  });

  if (error) {
    return <span>Il y a un problème</span>;
  }

  return (
    <div>
      <ul>
        <li>
          <div>
            {data?.map((post, index) => (
              <ArticlesCard
                key={`${post.id}-${index}`}
                title={post.title}
                text={post.text}
                imageUrl={post.imageUrl}
                id={post.id}
                likes={post.likes}
              />
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Post;
