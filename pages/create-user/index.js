import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import Layout from "../../components/layout";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // error handling
    let error = 0;
    Object.values(user).map((item) => {
      if (!item) {
        error++;
      }
    });
    if (error > 0) {
      setError("All the fields are mandatory!!");
      return;
    }

    // add to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ id: Date.now(), status: "active", ...user });
    localStorage.setItem("users", JSON.stringify(users));

    // cleaning
    setUser({
      name: "",
      email: "",
      gender: "",
    });
    setError();

    // route user
    router.push("/");
  };

  /**
   * Adding Bootstrap CDN here to convey that in Next JS we can use all HTML tags in indiviual pages as well
   */

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Layout>
        <div className="row justify-content-center m-0">
          <div className="col-12 col-md-8 m-0">
            <h1 className="text-center my-4">Create New Post</h1>
            {error && <div className="m-0 alert alert-danger">{error}</div>}
            <form>
              <div className="my-4">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="my-4">
                <label className="form-check-label">Gender</label>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="form-check-input"
                    name="gender"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="form-check-input"
                    name="gender"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>
              <div className="my-4">
                <button className="btn__create__post" onClick={handleSubmit}>
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateUser;
