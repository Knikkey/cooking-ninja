import { projectFirestore } from "../../Firebase/config";
import { useEffect, useState } from "react";

//components
import RecipeList from "../../components/RecipeList";

//styles
import styles from "./Home.module.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
          setData([]);
        }
        if (!snapshot.empty) {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className={styles.home}>
      {error && <p className={styles.error}>{error}</p>}
      {isPending && <p className={styles.loading}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
