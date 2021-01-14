import React, { useState } from "react";
import './Search.css'
import axios from 'axios';

const Search = ({ showCard }) => {
  const [output, setOutput] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (value.length > 0) getData(value);    
  }

  const getData = (query) => {
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie/?api_key=efa8201def1d6033a95abf52ee1ae478&include_adult=false&language=en-US&page=1&query=${query}`
    }).then((res) => {
      console.log(res);
      setOutput(res.data.results);
    }).catch(err => console.log('Err! ', err));
  }

  return (
    <div className="Search">
      <input placeholder="Search Movies" onChange={handleInput}></input>
      <div className="output wrapper">
        {output.length > 0 && (
          output.map(movie => {
            return <div className="movie" key={movie.id} onClick={() => showCard(movie)} >
              {movie.poster_path ? 
                <img className="moviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title} poster`} />
                : <h3 className="moviePoster" >No poster for {movie.title}</h3>
              }
            </div>
          })
        )}
      </div>
    </div>
  );
}

export default Search;
