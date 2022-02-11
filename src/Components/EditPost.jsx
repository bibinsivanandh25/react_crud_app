import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [state, setState] = useState({
    title: "",
    author: "",
    loading: false,
  });
  let { title, author, loading } = state;
  useEffect(() => {
    let fetchPost = async () => {
      let existsData = await Axios.get(`/posts/${id}`);
      setState(existsData.data);
    };
    fetchPost();
  }, [id]);

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payload = { title, author };
      await Axios.put(`/posts/${id}`, payload);
      navigate("/");
    } catch (error) {}
    setState({ loading: false });
  };
  return (
    <section id="postsBlock" className="col-md-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h2 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Update post
        </h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter title"
              onChange={handleChange}
              name="title"
              value={title}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter author"
              onChange={handleChange}
              name="author"
              value={author}
            />
          </div>
          <div className="mb-3">
            <button className="font-weight-bold bg-primary">
              {loading ? "loading" : "update"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default EditPost;
