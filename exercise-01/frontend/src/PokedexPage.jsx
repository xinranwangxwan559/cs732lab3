import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import styles from "./PokedexPage.module.css";

// Define the base URL for images outside the component to avoid re-declarations on re-renders
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

export default function PokedexPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
    setLoading(true); // Begin loading state

    axios.get(`${API_BASE_URL}/api/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data); // Set fetched Pokémon data
        setLoading(false); // End loading state
        setError(false); // Reset error state in case of previous errors
      })
      .catch(() => {
        setError(true); // Set error state on failure
        setLoading(false); // End loading state
      });
  }, [id]); // Depend on `id` so this effect runs again if the `id` changes

  // Conditionally render components based on the loading and error states
  if (loading) return <PokemonLoading />;
  if (error) return <PokemonNotFound id={id} />;
  return <PokedexEntry pokemon={pokemon} />;
}

function PokedexEntry({ pokemon }) {
  const [isImageLoaded, setImageLoaded] = useState(false);

  // Handle image loading state
  useEffect(() => {
    setImageLoaded(false); // Reset image loaded state whenever the Pokémon data changes
  }, [pokemon.imageUrl]);

  return (
    <>
      <h1>{pokemon.name}</h1>
      {!isImageLoaded && <PlaceholderImage />}
      <img
        className={styles.dexImage}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
        src={`${IMAGE_BASE_URL}${pokemon.imageUrl}`} // Concatenate IMAGE_BASE_URL with the image URL from the Pokémon data
        onLoad={() => setImageLoaded(true)}
        alt={pokemon.name}
      />
      <p>{pokemon.dexEntry}</p>
    </>
  );
}

function PokemonNotFound({ id }) {
  return (
    <>
      <h1>Pokémon not found!</h1>
      <img className={styles.dexImage} src="/white-pokeball.png" alt="Pokéball" />
      <p>Unfortunately, a pokémon with id <code>{id}</code> is not registered in the dex!</p>
    </>
  );
}

function PokemonLoading() {
  return (
    <>
      <h1>Loading...</h1>
      <PlaceholderImage />
      <p>We are currently loading...</p>
    </>
  );
}

function PlaceholderImage() {
  return <img className={styles.placeholderImage} src="/white-pokeball.png" alt="Loading" />;
}
