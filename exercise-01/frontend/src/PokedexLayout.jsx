import { NavLink, Outlet } from "react-router-dom";
import styles from "./PokedexLayout.module.css";

/**
 * Renders the layout of the page, including a list of pokemon on the left, and a main window on the right.
 * The main window contains an <Outlet> which is intended to render a PokedexPage inside, based on the route.
 */
export default function PokedexLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.dexContainer}>
        <PokemonList />

        <div className={styles.dexView}>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders a list of pokemon.
 */
function PokemonList() {
  // TODO Your code here.
  const pokemonList = [];

  return (
    <div className={styles.list}>
      <div>
        {pokemonList.map((pokemon) => (
          <ListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

/**
 * Renders a single pokemon in the list.
 */
function ListItem({ pokemon }) {
  return (
    <NavLink
      to={pokemon.id.toString()}
      className={({ isActive }) =>
        isActive ? `${styles.listItem} ${styles.activeListItem}` : styles.listItem
      }
    >
      <img src="pokeball.png" />
      <span>{pokemon.name}</span>
    </NavLink>
  );
}
