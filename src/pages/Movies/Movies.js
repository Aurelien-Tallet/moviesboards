import React, { useEffect, useState } from 'react'
import Crud from "../../services/crud.js";
import SingleMovie from '../../components/SingleMovie/SingleMovie';

import './Movies.scss'

function Movies() {
    const [movies, setMovies] = useState([])
    const deleteFilm = (e, id) => {
        e.preventDefault()
        Crud.delete(id)
    }
    useEffect(() => {

        (async () => {
            const res = await Crud.get('http://localhost:4000/movies')
            setMovies(res)
        })()
    }, [])
    return (
        <section className="movies">
            <ul className="movies__list">
                {movies.map((movie) => <SingleMovie movie={movie} key={movie.id} deleteFilm={deleteFilm} />)}
            </ul>
        </section>
    )
}

export default Movies
