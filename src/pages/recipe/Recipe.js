import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const { mode } = useTheme();

  return (
    <div className={`${styles.recipe} ${styles[mode]}`}>
      {isPending && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className={styles.method}>{recipe.method}</p>
        </>
      )}
    </div>
  );
}
