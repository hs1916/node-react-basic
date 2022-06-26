import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../../Config";
import MainImage from "./Section/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMoveImage, setMainMoveImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // const endpoint = `${API_URL}/movie/latest?apikey${API_KEY}&language=ko-KR`
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        if (response.page === 1) {
          setMainMoveImage(response.results[0]);
        }
        setCurrentPage(response.page)
      });
  }



  const loadMoreItems = () => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage + 1}`;
    fetchMovies(endpoint);
  }

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main image */}

      {MainMoveImage && (
        <MainImage
          image={`${IMAGE_URL}/w1280${MainMoveImage.backdrop_path}`}
          title={MainMoveImage.original_title}
          text={MainMoveImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2> Movies by latest</h2>
        <hr />
        {/* movie grid card */}
        <Row gutter={[16, 16]}>
          {Movies && Movies.map((movie, index) => {
            return (
            <React.Fragment key={index}>
              <GridCards
                  landingPage={true}
                  image={movie.poster_path ?
                         `${IMAGE_URL}/w500${movie.poster_path}`
                         :null }
                  movieId={movie.id}
                  movieName={movie.original_title}
              />
            </React.Fragment>
          )})}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}> Load More </button>
      </div>
    </div>
  );
}

export default LandingPage;
