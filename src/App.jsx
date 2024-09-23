import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { SearchResult } from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/characternn");
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json();
        setCharacters(data.results);
        // setIsLoading(false);
      } catch (err) {
        // setIsLoading(false);
        // console.log(err.message);
        toast.error(err.message);
        // setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCharacters(data.results.slice(0, 5));
  //       setIsLoading(false);
  //     });
  // }, []);
  console.log(error);
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList
          // error={error}
          characters={characters}
          isLoading={isLoading}
        />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
