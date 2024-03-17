import express from "express";
import { pokemon } from "../data/pokemon.js";

const router = express.Router();

// A dummy route which will simply return the text "Hello, World".
router.get("/api/hello", (req, res) => {
  res.send("Hello, World");
});

// TODO Add your routes here.
router.get("/api/pokemon", (req, res) => {
  const pokemonList = pokemon.map(p => ({ id: p.id, name: p.name }));
  res.json(pokemonList);
  
});

// Route to get a specific Pokémon by id
router.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedPokemon = pokemon.find(p => p.id === id);

  if (!selectedPokemon) {
    return res.sendStatus(404); // Send a 404 Not Found status if Pokémon doesn't exist
  }

  res.json(selectedPokemon);
});

export default router;
