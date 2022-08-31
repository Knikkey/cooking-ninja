import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import styles from "./RecipeList.module.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

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
          </div>
        );
      })}
    </div>
  );
}
