import { NavLink, Outlet } from "react-router-dom";
import styles from "./PokedexLayout.module.css";
import React, { useState, useEffect } from 'react'; // Importing useState and useEffect
import axios from 'axios'; // Importing axios for API calls 
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
  const [pokemonList, setPokemonList] = useState([]); // State to store the list of Pokemon

  // Fetching Pokemon data from the backend when the component mounts
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''; // Ensure you have the .env file set up correctly
    axios.get(`${API_BASE_URL}/api/pokemon`)
      .then(response => {
        setPokemonList(response.data); // Update the state with the fetched Pokemon data
      })
      .catch(error => console.error("There was an error fetching the Pokemon data:", error));
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className={styles.list}>
      <div>
        {pokemonList.map((pokemon) => (
          <ListItem key={pokemon.id} pokemon={pokemon} /> // Use pokemon.id as key for uniqueness
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
