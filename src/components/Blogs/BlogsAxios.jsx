import React, { useEffect, useState } from "react";

import axios from "axios";

const API_URL = "http://localhost:7777/products";
const BlogsAxios = () => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);
  //  GET
  useEffect(() => {
    axios.get(API_URL).then((res) => setData(res.data));
  }, [reload]);

  //   POST
  const handleCreate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newBlog = Object.fromEntries(formData.entries());

    axios.post(API_URL, newBlog).then((res) => console.log(res));
    e.target.reset();
    setReload((p) => !p);
  };

  //   DELETE
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then((res) => setReload((p) => !p));
  };

  //   PUT
  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
  };

  return (
    <div>
      <h2>BlogAxios</h2>
      <form onSubmit={handleCreate}>
        <input type="text" name="title" />
        <button>Create</button>
      </form>

      <hr />
      {edit ? (
        <form onSubmit={handleEdit}>
          <h2>edit</h2>
          <input
            value={edit.title}
            onChange={(e) => setEdit((p) => ({ ...p, title: e.target.value }))}
            type="text"
          />
          <button>save</button>
        </form>
      ) : (
        <></>
      )}

      {data?.map((blog) => (
        <div className="" key={blog.id}>
          <p>{blog?.title}</p>
          <button onClick={() => handleDelete(blog.id)}>delete</button>
          <button onClick={(e) => setEdit(blog)}>edit</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BlogsAxios;
