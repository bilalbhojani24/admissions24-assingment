import React from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <h2 onClick={() => router.push("/")}>admissions24</h2>
      <button onClick={() => router.push("/create-user")}>Create User</button>
    </nav>
  );
};

export default Navbar;
