import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { SearchResult, Search, Favourites } from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [count, setCount] = useState(0);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setCharacters([]);
      return;
    }

    fetchData();
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourites((preFav) => [...preFav, char]);
  };

  const isAddToFaourite = favourites.map((fav) => fav.id).includes(selectedId);

  // console.log(selectedId);
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://rickandmortyapi.com/api/character")
  //     .then(({ data }) => {
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       // setIsLoading(false);
  //       toast.error(err.response.data.error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);
  // console.log(error);

  // 1.dependency array :role ? => when to run effect function
  // 1. useEffect(()=>{}) => on every renders
  // 2.useEffect(()=>,[])=> on mount
  // 3.useEffect(()=>
  // if(query)
  // ,[query])=>dep . array chang => run effect function , state and props

  // when this useEffect runs.?!

  // state =>changes => re-render => browser paint
  // state=> changes => run effect function

  // useEffect(() => {
  //   console.log("CALL EFFECT ON EVERY RENDERS");
  // });

  // useEffect(() => {
  //   console.log("CALL EFFECT ON EVERY RENDERS");
  // }, []);

  // useEffect(() => {
  //   console.log("CALL EFFECT ON EVERY RENDERS");
  // }, [query]);

  // console.log("RENDERING COMPONENT");

  return (
    <div className="app">
      <div style={{ color: "#fff" }}>{count}</div>
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFavourites={favourites.length} />
      </Navbar>
      <Main>
        <CharacterList
          // error={error}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddToFaourite={isAddToFaourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
