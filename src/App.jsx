import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import React, { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState(allCharacters);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      // .then((data) => console.log(data));
      .then((data) => setCharacters(data.results.slice(0, 5)));
  }, []);
  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
