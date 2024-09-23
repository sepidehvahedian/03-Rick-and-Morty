import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { SearchResult } from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios(
  //         "https://rickandmortyapi.com/api/character"
  //       );
  //       // console.log(res);
  //       setCharacters(data.results.slice(0, 5));
  //       // setIsLoading(false);
  //     } catch (err) {
  //       console.log(err.response.data.error);
  //       // for real project get console.log
  //       // err.response.data.message
  //       // setIsLoading(false);
  //       // console.log(err.message);
  //       toast.error(err.response.data.error);
  //       // setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        setCharacters(data.results.slice(0, 5));
        // setIsLoading(false);
      })
      .catch((err) => {
        // setIsLoading(false);
        toast.error(err.response.data.error);
      })
      .finally(() => setIsLoading(false));
  }, []);
  // console.log(error);
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
