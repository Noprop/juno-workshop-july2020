import axios from "axios";
import React, { useState, useEffect } from "react";

import CardImage from "../cardImage";

import "./Card.css";

const Card = ({ movieInput }) => {
  const [display, setDisplay] = useState(false);
  const [movie, setMovie] = useState({});

  const closeCard = () => {
    setDisplay(false);
  }

  useEffect(() => {
    if (movieInput.title) {
      setDisplay(true);
      axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieInput.id}?api_key=efa8201def1d6033a95abf52ee1ae478&language=en-US`
      }).then((res) => {
        console.log(res.data);
        setMovie(res.data)
      });
    }
  }, [movieInput]);
  
  return (
    <div
      className={`cardContainer ${display ? "displayTrue" : "displayFalse"}`}
    >
      {movieInput.title && (
        <div className="card">
          <button
            className="closeCard"
            onClick={closeCard}
            aria-label="close card"
          >
            X
          </button>
          {movie.poster_path && (
            <div className="imgContainer">
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`Poster of ${movie.title}`}
              />
            </div>
          )}
          <div className="movieDetails">
            <h3 className="cardMovieTitle">{movie.title}</h3>
            <p>Release date: {movie.release_date}</p>
            <p>Length: {Math.round(movie.runtime / 60 * 100) / 100} hours</p>
            <p>Description: {movie.overview}</p>
            <p>Genre: </p>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`}>IMDB</a>
            <div className="cardRatings">
              <span className="cardRatingsRating">{movie.vote_average}</span>
              <svg height="20" width="23" className="star rating" data-rating="1">
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
