import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Searchbar from "./Searchbar";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className={styles.navbar} style={{ background: color }}>
      <nav>
        <Link to="/" className={styles.brand}>
          Cooking Ninja
        </Link>
        {/* <Searchbar /> */}
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
