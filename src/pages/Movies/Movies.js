import React, { useEffect, useState } from 'react'
import Crud from "../../services/crud.js";
import SingleMovie from '../SingleMovie/SingleMovie.js';

import './Movies.scss'

function Movies() {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        (async () => {
            const res = await Crud.get('http://localhost:4000/movies')
            setMovies(res)
        })()
    }, [])
    return (
        <div>
            {movies.map((film) => <SingleMovie film={film} key={film.id} />)}
        </div>
    )
}

export default Movies
