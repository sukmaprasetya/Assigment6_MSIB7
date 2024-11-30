import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar(props) {
  const [searchValue, setSearchValue] = useState("");
  const { onSearch } = props;

  return (
    <section className={styles.navbar}>
      <h3>H8 Movies</h3>
      <div>
        <input 
          type="text" 
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }} 
        />
        <button
          onClick={() => {
            onSearch(searchValue);
          }}
          className={styles.searchBarBtn}
        >
          Search
        </button>
      </div>
    </section>
  )
}

export { Navbar }