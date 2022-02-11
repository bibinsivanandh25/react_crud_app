import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../Axios";

const DeletePosts = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [state, setState] = useState({
    loading: false,
    title: "",
    author: "",
  });
  let { loading, title, author } = state;
  useEffect(() => {
    let fetchData = async () => {
      let deletedData = await Axios.get(`/posts/${id}`);
      setState(deletedData.data);
    };
    fetchData();
  }, [id]);
  let handleClick = async () => {
    await Axios.delete(`/posts/${id}`);
    navigate("/");
  };
  return (
    <div>
      <aside>
        <h2>
          {title} + <span>{author}</span>
        </h2>
      </aside>
      <button className="btn btn-danger" onClick={handleClick}>
        Remove
      </button>
    </div>
  );
};

export default DeletePosts;
