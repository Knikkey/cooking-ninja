import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../Firebase/config";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        }
        if (!doc.exists) {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "Something different",
    });
  };

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
          <button onClick={handleClick}>Edit</button>
        </>
      )}
    </div>
  );
}
