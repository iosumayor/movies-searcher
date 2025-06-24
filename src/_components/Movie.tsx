import React, { useEffect, useState } from "react";

export const Movie = ({ title, year }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
      <button className="like-button" onClick={handleLikeClick} type="button">
        {isLiked ? "❤️" : "🤍"} Me gusta
      </button>
    </div>
  );
};
