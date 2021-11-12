import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Crud from 'services/crud'
import './DetailMovie.scss'

function DetailMovie() {
    const [movie, setMovie] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = useParams().id
    useEffect(() => {
        (async () => {
            const res = await Crud.get(`http://localhost:4000/movies/${id}`)
            setMovie(res)
            setLoading(true)
        })()

    }, [id])
    return (
        <section>
            {movie && <div className="movie-wrapper" >
                <Link to="/movies" className="movie-wrapper__back"><span className="icon-arrow-left2"></span></Link>
                <div className="movie-wrapper__content"  >
                    <div className="movie-wrapper__content__poster">
                        <img src={movie.backdrop} />
                        <div className="movie-wrapper__content__texts">
                            <h1 className="movie-wrapper__content__title">{movie.title}</h1>
                            <p className="movie-wrapper__content__desc">{movie.release_date}  <span> • </span>  {movie.categories.join(', ')} </p>
                        </div>
                    </div>
                    <div className="movie-wrapper__content__infos">
                        <h2 className="movie-wrapper__content__infos__title">Synopsis</h2>
                        <p className="movie-wrapper__content__infos__summary">{movie.description}</p>
                    </div>
                    <div className="movie-wrapper__content__infos">
                        <h2 className="movie-wrapper__content__infos__title">Acteurs</h2>
                        <ul className="actors">
                            {movie.actors.map((actor, i) => <li className="actor" key={i}>
                                <img src={actor.photo} alt="" className="actor__picture" />
                                <p className="actor__name">{actor.name}</p>
                                <p className="actor__character">{actor.character}</p>
                            </li>)}
                        </ul>
                    </div>
                    <div className="movie-wrapper__content__infos">
                        <h2 className="movie-wrapper__content__infos__title">Film similaire</h2>
                        <ul className="similar-movies">
                            {movie.similar_movies.map((film, i) => <li className="film" key={i}>
                                <img src={film.poster} alt="" className="film__picture" />
                                <p className="film__name">{film.title}</p>
                                <p className="film__date">{film.release_date}</p>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>}
            {(!movie && loading) && <p>Ce film n'éxiste pas</p>}
        </section>
    )
}

export default DetailMovie
