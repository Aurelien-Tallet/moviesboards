import React, { useEffect, useState } from 'react'
import Crud from "../../services/crud.js";
import SingleMovie from '../../components/SingleMovie/SingleMovie';

import './Movies.scss'
import { containCategories, containDate, containTitle, filterArray } from 'services/utils.js';

function Movies() {
    const [movies, setMovies] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({ title: '', date: '', categories: '' })
    const deleteFilm = (e, id) => {
        e.preventDefault()
        Crud.delete(id)
    }
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setFilters({ ...filters, [name]: value })
        const { title, date, categories } = { ...filters, [name]: value }
        const filteredMovies = movies.filter(movie => containTitle(movie, title) && containCategories(movie, categories) && containDate(movie, date))
        setMoviesList(filteredMovies)
    }

    useEffect(() => {
        if (!movies.length) {
            (async () => {
                const res = await Crud.get('http://localhost:4000/movies')
                const arr = []
                setMovies(res)
                res.map(film => {
                    film.categories.forEach(cat => {
                        arr.push(cat.toLowerCase())
                    })
                })
                setCategories(filterArray(arr))
                setMoviesList(res)
            })()
        }

    }, [])

    return (
        <section className="movies">
            <input type="text" name="title" id="" onChange={handleChange} value={filters.title} />
            <input type="date" name="date" id="" onChange={handleChange} value={filters.date} />
            <select id="lang" onChange={handleChange} name="categories" value={filters.categories}>
                <option value=''>Selectionnez</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}

            </select>
            <ul className="movies__list">
                {moviesList.map((movie) => <SingleMovie movie={movie} key={movie.id} deleteFilm={deleteFilm} />)}
            </ul>
        </section>
    )
}

export default Movies
