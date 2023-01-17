import { useState, useEffect } from "react";
import axios from "axios";

const UpdateArticle = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    console.log(pathname);
    let arr = pathname;
    let id = arr[arr.length - 1];
    console.log(id);

    axios
      .get(`http://localhost:8000/api/post/${id}`, {
        data: {
          id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setText(res.data.text);
        setImageUrl(res.data.imageUrl);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleModifyPost = async (e) => {
    const pathname = window.location.pathname.split("/");
    console.log(pathname);
    let arr = pathname;
    let id = arr[arr.length - 1];
    console.log(id);

    e.preventDefault();

    await axios({
      method: "PUT",
      url: `http://localhost:8000/api/post/${id}`,
      data: {
        title,
        text,
        imageUrl,
        id,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="contact-form">
      <h2 className="text-white">Modifier votre publication</h2>
      <div className="col">
        <div className="form-group">
          <label htmlFor="nom" className="text-white">
            Titre
          </label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
          />
        </div>
        <div className="form-group" class="text-white">
          <label htmlFor="nom">Partager une image</label>
          <br />
          <input
            type="file"
            id="file"
            name="imageUrl"
            accept="image/png, image/jpeg, image/jpg"
            placeholder={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom" className="text-white">
            Votre publication
          </label>
          <br />
          <textarea
            id="text"
            name="text"
            placeholder={text}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div>
          <input
            className="btn btn-success"
            type="button"
            value="publier"
            onClick={handleModifyPost}
          />
        </div>
      </div>
    </form>
  );
};

export default UpdateArticle;
