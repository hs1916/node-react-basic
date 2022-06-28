import React, { useEffect, useState} from 'react';
import Axios from 'axios'

function Favorite(props) {

    const movieId = props.movieid;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title; 
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    let variables = {
        userFrom: userFrom,
        movieId: movieId, 
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if (response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert ('실패')
            }
        })

        console.log('Favorite.js userForm: ' + userFrom);
        console.log('Favorite.js moviePost: ' + moviePost);
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if (response.data.success) {
                setFavorited(response.data.favorited)
            } else {
                alert ('실패')
            }
        })

    }, []);

    const onClickFavorite = () => {

        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables )
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert (' Favorite 에서 지우는데 실패')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables )
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert (' Favorite 에서 추가하는데 실패')
                    }
                })
        }



    }


    return (
        <div>
            <button onClick={onClickFavorite}> {Favorited ? "Favorite" : "Add to Favorite"} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite
