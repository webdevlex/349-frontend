import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import star from "../images/star-solid.svg";

import useMovieModalInfo from "../hooks/useMovieModalInfo";
import HeartButton from "./HeartButton";

Modal.setAppElement("#root");

// Mapping of genre IDs to genre names
const genres = {
	28: "Action",
	12: "Adventure",
	16: "Animation",
	35: "Comedy",
	80: "Crime",
	99: "Documentary",
	18: "Drama",
	10751: "Family",
	14: "Fantasy",
	36: "History",
	27: "Horror",
	10402: "Music",
	9648: "Mystery",
	10749: "Romance",
	878: "Science Fiction",
	10770: "TV Movie",
	53: "Thriller",
	10752: "War",
	37: "Western",
};

// SearchResult component for displaying movie search results.
const SearchResult = ({ movie }) => {
	const [showModal, setShowModal] = useState(false);
	const [fadeAway, setFadeAway] = useState(false);

	// Function to open the modal
	const handleModalOpen = () => {
		setShowModal(true);
	};

	// Function to close the modal with a fade effect
	const handleModalClose = () => {
		setFadeAway(true);
		setTimeout(() => {
			setShowModal(false);
			setFadeAway(false);
		}, 200);
	};

	// State to store additional movie information
	const [movieMap, setMovieMap] = useState({});
	const getMovieInfo = useMovieModalInfo(setMovieMap, movie.name);

	useEffect(() => {
		// Fetch and set additional movie information
		getMovieInfo(movie.id)
			.then((movieInfo) => {
				setMovieMap(movieInfo);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [movie.id]);

	return (
		<div className="result">
			<div className="result-img">
				<div className="shader"></div>
				<HeartButton movie={movie} movieMap={movieMap} />
				<img
					loading="lazy"
					src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
					alt=""
					className="cover-img"
					onClick={handleModalOpen}
				/>
			</div>

			<div className="result-details">
				<div className="result-votes">
					<p className="result-avg">
						{Math.round(movie.vote_average * 10) / 10}
						<span className="out-of-10">/10</span>
					</p>
					<img src={star} alt="" className="star" />
				</div>
				<p className="result-title">{movie.original_title}</p>
				<p className="result-date">{movie.release_date.slice(0, 4)}</p>
			</div>

			<Modal
				isOpen={showModal}
				className={`result-modal ${fadeAway ? "fade-away" : ""}`}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.7)",
					},
				}}>
				<div className="modal-img-wrapper">
					<div className="shader"></div>
					<HeartButton movie={movie} movieMap={movieMap} />
					<img
						className="modal-img"
						src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
						alt=""
					/>
				</div>
				<div className="modal-bottom">
					<div className="modal-heading">
						<p className="modal-title">
							{movie.original_title}
							<span className="modal-runtime">
								{` ${Math.floor(movieMap.runtime / 60)}h ${
									movieMap.runtime % 60
								}min`}
							</span>
						</p>
						<div className="modal-votes">
							<p className="modal-avg">
								{Math.round(movie.vote_average * 10) / 10}
								<span className="out-of-10">/10</span>
							</p>
							<img src={star} alt="" className="star" />
						</div>
					</div>
					<p className="modal-text">
						<span className="modal-text">
							{movieMap && movieMap.contentRating}
						</span>
						<span> | </span>
						<span>
							{movie.genre_ids.map((id, index) => (
								<span key={id}>
									{genres[id]}
									{index !== movie.genre_ids.length - 1 ? ", " : ""}
								</span>
							))}
						</span>
						<span> | </span>
						<span>{movie.release_date.substr(0, 4)}</span>
					</p>
					<p className="modal-overview">{movie.overview}</p>
					<p className="modal-extra">
						<strong className="accent-color">Director:</strong>{" "}
						{movieMap.directors}
					</p>
					<p className="modal-extra">
						<strong className="accent-color">Budget:</strong> ${movieMap.budget}
					</p>
					<button onClick={handleModalClose} className="modal-button">
						Close Modal
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default SearchResult;
