import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/brightness.svg";

import styles from "./ThemeSelector.module.css";

const themeColors = ["#58249c", "#249c6b", "#b70233"];

export default function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={styles["theme-selector"]}>
      <div className={styles["mode-toggle"]}>
        <img
          onClick={toggleMode}
          alt="light/dark mode icon"
          src={modeIcon}
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className={styles["theme-buttons"]}>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
