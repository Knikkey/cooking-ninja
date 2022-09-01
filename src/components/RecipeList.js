import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import trashcan from "../assets/trashcan.svg";
import { projectFirestore } from "../Firebase/config";

import styles from "./RecipeList.module.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div>No recipes to load...</div>;
  }

  return (
    <div className={styles["recipe-list"]}>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id} className={`${styles.card} ${styles[mode]}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime}</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
            <img
              alt="trashcan"
              src={trashcan}
              className={styles.delete}
              onClick={() => handleClick(recipe.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
