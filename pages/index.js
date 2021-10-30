import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

const Home = ({ data }) => {
  const router = useRouter();
  const [users, setUsers] = useState(data.data);

  useEffect(() => {
    // combining localStorage users and API fetched users
    const usersLocal = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers([...usersLocal.reverse(), ...users]);
  }, []);

  const handleClick = (user) => {
    const filteredUsers = users.filter((item) => item.id !== user.id);
    setUsers(filteredUsers);
  };

  const viewUser = (user) => {
    router.push(`user/${user.id}`);
  };

  return (
    <Layout>
      <section className={styles.card__grid}>
        {users?.map((user) => (
          <div key={user.id} className={styles.user__card}>
            <div>
              <h2>Name : {user.name}</h2>
              <p className={styles.email__script}>Email : {user.email}</p>
              <p>Status : {user.status}</p>
            </div>

            <div className={styles.buttons__view}>
              <button onClick={() => viewUser(user)}>View</button>
              <button onClick={() => handleClick(user)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://gorest.co.in/public-api/users`);
  const data = await res.json();
  return { props: { data } };
}

export default Home;
