import React from "react";
import useFetch from "./HOOKS/useFetch";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import CreatePosts from "./Components/CreatePosts";
import EditPost from "./Components/EditPost";
import DeletePosts from "./Components/DeletePosts";

const App = () => {
  let gitHubApi = useFetch("http://api.github.com/users");
  console.log(gitHubApi);
  return (
    <Router>
      <section>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePosts />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/delete-post/:id" element={<DeletePosts />} />
          </Routes>
        </main>
        <footer></footer>
      </section>
    </Router>
  );
};

export default App;

//?:id - slug - connecting to another page
