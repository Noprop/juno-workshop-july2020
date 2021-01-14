import React, { useState } from "react";
import "./App.css";
import Search from './components/search/Search';
import Card from './components/card/Card';

const App = () => {
  const [displayMovie, setDisplayMovie] = useState({}); 

  const showCard = (movie) => {
    setDisplayMovie(movie);
  }

  return (
    <div className="App">
      <h1>Juno x ecobee: Pair Programming Exercise</h1>
      <Search showCard={showCard} />
      <Card movieInput={displayMovie} />
    </div>
  );
}

export default App;
