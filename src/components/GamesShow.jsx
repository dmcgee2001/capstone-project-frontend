/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function GamesShow(props) {
  const [game, setGame] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const handleShowGame = () => {
    axios.get(`http://localhost:3000/games/${params.id}.json`).then((response) => {
      setGame(response.data);
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { game_id: game.id };
    props.onCreateCollection(params, () => event.target.reset());
    window.location.href = `/games/${game.id}`;
  };
  useEffect(handleShowGame, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div id="games-show">
            <h1 className="text-center mb-4">Game Info</h1>
            <div className="text-center">
              <img
                src={game.background_image}
                alt={game.name}
                className="img-fluid rounded"
                style={{ objectFit: "cover", height: "400px", width: "100%", aspectRatio: "16/9" }}
              />
            </div>
            <h2 className="mt-4">{game.name}</h2>
            <p>
              <strong>Released:</strong> {game.released}
            </p>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{game.description}</p>
            <button className="btn btn-danger" onClick={() => navigate(-1)}>
              Go back
            </button>{" "}
            <button className="btn btn-secondary" onClick={handleSubmit}>
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
