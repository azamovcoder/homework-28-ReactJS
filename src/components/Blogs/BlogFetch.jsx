import "./BlogFetch.scss";

import React, { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const API_URL = "http://localhost:7777/products";

const BlogFetch = () => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [reload]);

  const handleCreate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newBlog = Object.fromEntries(formData.entries());
    // console.log(newBlog);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    }).then((res) => {
      console.log(res);
      e.target.reset();
      setReload((p) => !p);
    });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => setReload((p) => !p));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    }).then((res) => {
      setReload((p) => !p);
      setEdit(null);
    });
  };
  return (
    <div className="container">
      <form className="create__form" onSubmit={handleCreate}>
        <h2>Create Product</h2>
        <input placeholder="enter title" type="text" name="title" />
        <input placeholder="img" type="text" name="img" />
        <input placeholder="category" type="text" name="category" />
        <input placeholder="price" type="text" name="price" />
        <input placeholder="count" type="text" name="count" />
        <button>Create</button>
      </form>
      {edit ? (
        <form className="edit__form" onSubmit={handleEdit}>
          <h2>Edit Product</h2>
          <button
            onClick={() => setReload((p) => !p)}
            className="edit__form__close"
          >
            X
          </button>
          <input
            placeholder="img"
            value={edit.img}
            onChange={(e) => setEdit((p) => ({ ...p, img: e.target.value }))}
            type="text"
          />

          <input
            placeholder="title"
            value={edit.title}
            onChange={(e) => setEdit((p) => ({ ...p, title: e.target.value }))}
            type="text"
          />
          <input
            placeholder="category"
            value={edit.category}
            onChange={(e) =>
              setEdit((p) => ({ ...p, category: e.target.value }))
            }
            type="text"
          />
          <input
            placeholder="price"
            value={edit.price}
            onChange={(e) => setEdit((p) => ({ ...p, price: e.target.value }))}
            type="number"
          />
          <input
            placeholder="count"
            value={edit.count}
            onChange={(e) => setEdit((p) => ({ ...p, count: e.target.value }))}
            type="number"
          />

          <button>save</button>
        </form>
      ) : (
        <></>
      )}
      <div className="product__cards">
        {data?.map((blog) => (
          <div className="product__card" key={blog.id}>
            <div className="product__card__img">
              <img src={blog.img} alt={blog.title} />
            </div>
            <div className="product__card__info">
              <p>Name: {blog.title}</p>
              <p>Category: {blog.category}</p>
              <p> Price: {blog.price} $</p>
              <p> Count: {blog.count}</p>
            </div>
            <div className="product__card__buttons">
              <button
                className="product__card__buttons__delete"
                onClick={() => handleDelete(blog.id)}
              >
                <MdDeleteOutline />
              </button>
              <button
                className="product__card__buttons__edit"
                onClick={(e) => setEdit(blog)}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFetch;
