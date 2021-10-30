import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from "./User.module.css";

const User = ({ user, id }) => {
  const [userData, setUserData] = useState(user.data);
  useEffect(() => {
    // Reason : Due to SSR we cannot use browser objects and serverSideProps
    // Some users are stored in localstorage so have fetch from there
    if (userData.message === "Resource not found") {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.filter((item) => item.id == id);
      setUserData(user[0]);
    }
  }, [user]);

  return (
    <Layout>
      <div className={styles.user__info}>
        <h1>Hi, {userData.name}</h1>
        <p>
          Your email id is <b>{userData.email}</b>
        </p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://gorest.co.in/public-api/users/${query.slug}`
  );
  const user = await res.json();
  return { props: { user, id: query.slug } };
}

export default User;
