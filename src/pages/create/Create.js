import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import styles from "./Create.module.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  useEffect(() => {
    if (data) history.push("/");
  }, [data, history]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIng) => [...prevIng, ing]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className={styles.create}>
      <h2 className={styles["page-title"]}>Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="recipeTitle">Recipe Title:</label>
        <input
          required
          type="text"
          id="recipeTitle"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>

        <label htmlFor="ingredientInp">Recipe Ingredients:</label>
        <div className={styles.ingredients}>
          <input
            type="text"
            id="ingredientInp"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          ></input>
          <button onClick={handleAdd}>Add</button>
        </div>
        <p>
          Current ingredients:{" "}
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>

        <label htmlFor="recipeTitle">Recipe Method:</label>
        <textarea
          required
          type="text"
          id="recipeMethod"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        ></textarea>

        <label htmlFor="cookingTime">Cooking Time (minutes):</label>
        <input
          required
          type="number"
          id="cookingTime"
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
        ></input>

        <button>Submit</button>
      </form>
    </div>
  );
}
