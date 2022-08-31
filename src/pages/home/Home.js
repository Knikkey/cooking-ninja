import { useFetch } from "../../hooks/useFetch";

//components
import RecipeList from "../../components/RecipeList";

//styles
import styles from "./Home.module.css";

export default function Home() {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  return (
    <div className={styles.home}>
      {error && <p className={styles.error}>{error}</p>}
      {isPending && <p className={styles.loading}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
