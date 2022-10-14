import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { ThumbsUpRegular } from "../../icons/thumbs-up-regular";
import { ThumbsUpSolid } from "../../icons/thumbs-up-solid";

const postSlice = createSlice({
  name: "post",
  initialState: {
    getPostsValue: null,
    getLikesValue: null,
  },
  reducers: {
    getLikes: (state, action) => {
      state.getLikesValue = action.payload;
    },
    addLike: (state, action) => {
      state.getLikesValue.push(action.payload);
    },
    removeLike: (state, action) => {
      state.getLikesValue = state.getLikesValue.filter(
        (element) => element.id !== action.payload
      );
    },
  },
});

export const { getLikes, addLike, removeLike } = postSlice.actions;

export const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const likesData = useSelector((state) => state.post.getLikesValue);
  const likeCounter = likesData.filter(
    (element) => element.postLiked_id === post.id
  );

  // Liker
  const like = () => {
    axios
      .patch(
        `http://localhost:8000/api/post/likeUnlike/${post.id}`,
        {
          liker_id: uid,
        },
        { withCredentials: true }
      )
      .then((res) => {
        axios
          .get(`http://localhost:8000/api/post/post/likeUnlike`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addLike(res.data.at(-1)));
            console.log("LIKED");
            setLiked(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  // Enlever son like
  const unlike = () => {
    axios
      .get(`http://localhost:8000/api/post/post/likeUnlike`, {
        withCredentials: true,
      })
      .then((res) => {
        res.data.forEach((like) => {
          if (like.liker_id === uid && like.postLiked_id === post.id) {
            axios
              .get(
                `http://localhost:8000/api/post/post/likeUnlike/getOneLike/${like.id}`,
                { withCredentials: true }
              )
              .then((res) => {
                axios
                  .patch(
                    `http://localhost:8000/api/post/post/likeUnlike/${post.id}`,
                    {
                      liker_id: uid,
                    },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    dispatch(removeLike(like.id));
                    console.log("UNLIKED");
                    setLiked(false);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((err) => console.log(err));
  };
  // pas plus d'un like
  useEffect(() => {
    let shouldSkip = false;
    likesData.forEach((like) => {
      if (shouldSkip) {
        return;
      }
      if (like && like.liker_id === uid && like.postLiked_id === post.id) {
        setLiked(true);
        shouldSkip = true;
      } else {
        setLiked(false);
      }
    });
  }, [uid, likesData, post.id, liked]);

  return (
    <>
      {liked === false ? (
        <ThumbsUpRegular onClick={like} />
      ) : (
        <ThumbsUpSolid onClick={unlike} />
      )}
      <span>{likeCounter.length}</span>
    </>
  );
};
