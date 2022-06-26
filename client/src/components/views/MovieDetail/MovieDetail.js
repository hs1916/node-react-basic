import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../../Config';
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function MovieDetail(props) {

    let propParams = useParams();
    const [Movie, setMovie] = useState(null);
    const [Crew, setCrew] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        const info_endpoint = `${API_URL}/movie/${propParams.movieId}?api_key=${API_KEY}&language=ko-KR`;
        const credit_endpoint = `${API_URL}/movie/${propParams.movieId}/credits?api_key=${API_KEY}&language=ko-KR`;

        let fetchInfo = fetch(info_endpoint);
        let fetchCrew = fetch(credit_endpoint);

        fetchInfo.then(r => r.json())
            .then(r => {
                console.log('fetch Info : ' + r)
                setMovie(r)
                console.log(r)
            })

        fetchCrew.then(response => response.json())
            .then(response => {
                console.log(' fetch Crew: ' + response)
                setCrew(response.cast)
                console.log(response)
            })
    }, []);

    const fetchCrewHandler = () => {
        setActorToggle(!ActorToggle);
    }



    return (
        <div>
            {/* Header */}
            {Movie && <MainImage
                image={`${IMAGE_URL}/w1280${Movie.backdrop_path}`}
                title={Movie.title}
                text={Movie.overview}
            />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auth' }}>

                {/* Movie Info */}
                {Movie && <MovieInfo
                    movie={Movie}
                />
                }


                <br />

                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={fetchCrewHandler}> Toggle Actor View </button>
                </div>
                {ActorToggle && <Row gutter={[16, 16]}>
                                    {Crew && Crew.map((cast, index) => {
                                        console.log(cast)
                                        console.log(index)

                                        return (
                                            <React.Fragment key={index}>
                                                <GridCards
                                                    image={cast.profile_path ?
                                                        `${IMAGE_URL}/w500${cast.profile_path}`
                                                        : null}
                                                    characterName={cast.name}
                                                />
                                            </React.Fragment>
                                        )
                                    })}
                                </Row>
                }
                

            </div>

        </div>
    )
}

export default MovieDetail