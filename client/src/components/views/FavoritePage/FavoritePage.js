import React, { useEffect, useState } from 'react'
import { Typography, Popover } from 'antd';
import axios from 'axios';
import './favorite.css';
import { IMAGE_URL } from '../../../Config';


const { Title } = Typography;

function FavoritePage() {

  const [FavoriteMovie, setFavoriteMovie] = useState([]);

  console.log(' -- api ')

  useEffect(() => {
    fetchFavoriteMovies()
  }, []);

  const fetchFavoriteMovies = () => {
    axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          console.log(response.data)
          setFavoriteMovie(response.data.favorite)
        } else {
          alert('영화정보를 가져오는데 실패 했습니다')
        }
      })
  }


  // image={`${IMAGE_URL}/w1280${Movie.backdrop_path}`}

  const renderCards =  FavoriteMovie.map((movie, index) => {

    const content = (
      <div>
        {movie.moviePost ? 
          <img src={`${IMAGE_URL}/w500${movie.moviePost}`} /> : "no image"}
      </div>
    )

    const onClickDelete = (movieId, userFrom) => {
      const variables = {
        movieId: movieId, 
        userFrom: userFrom
      }
      axios.post('/api/favorite/removeFromFavorite', variables )
      .then(response => {
          if (response.data.success) {
            fetchFavoriteMovies()
          } else {
            alert (' Favorite 에서 지우는데 실패')
          }
      })
    }

    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime} mins</td>
        <td><button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>Remove</button></td>
      </tr>
    )} )




return (
  <div style={{ width: '85%', margin: '3rem auto' }}>
    <Title level={2} > Favorite Movies By Me </Title>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Movie Title</th>
          <th>Movie RunTime</th>
          <td>Remove from favorites</td>
        </tr>
      </thead>
      <tbody>
        {renderCards}

      </tbody>
    </table>
  </div>
)
}

export default FavoritePage
