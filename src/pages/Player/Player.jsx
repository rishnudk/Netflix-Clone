import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2FmNDRkNTBhYTlkZGJmN2U2ZTQ3NjZjZDAyMWZlNyIsIm5iZiI6MTc1NTg3Mzc5OC42OTQwMDAyLCJzdWIiOiI2OGE4ODIwNjVkN2NhMmVjOTc2MGRhOWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rBO5iuDEo0-R_44hviepR8mNH0OmMqQ0Es7Go-TTPDU"
    },
  };

  // Fetch video
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setVideoData(res.results[0]))
      .catch((err) => console.error(err));

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovieDetails(res))
      .catch((err) => console.error(err));
  }, [id]);

  // Add to Wishlist
  const addToWishlist = () => {
    if (!movieDetails) return;
    if (wishlist.some((m) => m.id === movieDetails.id)) {
      alert("Already in wishlist!");
      return;
    }
    const updatedWishlist = [...wishlist, movieDetails];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Added to Wishlist!");
  };

  return (
    <div className="player-page">
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => navigate(-1)}
        className="back-btn"
      />

      <div className="player-container">
        {/* LEFT SIDE → Trailer */}
        <div className="player-left">
          {videoData ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoData.key}`}
              title="trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Loading trailer...</p>
          )}
        </div>

        {/* RIGHT SIDE → Details */}
        <div className="player-right">
          {movieDetails ? (
            <>
              <h2>{movieDetails.title}</h2>
              <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
              <p><strong>Rating:</strong> ⭐ {movieDetails.vote_average}</p>
              <p><strong>Genres:</strong> {movieDetails.genres?.map(g => g.name).join(", ")}</p>
              <p className="overview">{movieDetails.overview}</p>

              <button className="wishlist-btn" onClick={addToWishlist}>
                ➕ Add to Wishlist
              </button>
            </>
          ) : (
            <p>Loading movie details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
