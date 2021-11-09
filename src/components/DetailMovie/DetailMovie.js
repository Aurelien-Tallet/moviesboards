import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import Crud from 'services/crud'
import './DetailMovie.scss'

function DetailMovie() {
    const [movie, setMovie] = useState({})
    const id  = useParams().id
    useEffect(() => {
        (async () => {
            const res = await Crud.get(`http://localhost:4000/movies/${id}`)
            setMovie(res)
        })()
    }, [])
    return (
        <div>
            {movie && movie.title}
        </div>
    )
}

export default DetailMovie
