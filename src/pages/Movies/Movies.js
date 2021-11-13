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
                const res = await Crud.get('http://192.168.1.58:4000/movies')
                const arr = []
                setMovies(res)
                res.map(film => {
                    film.categories.forEach(cat => {
                        arr.push(cat.toLowerCase())
                    })
                })
                setCategories(filterArray(arr))
                setMoviesList(res.reverse())
            })()
        }

    }, [])

    return (
        <section className="home">
            <div className="movie-banner">
                <div className="bg">
                    <img src={movies.length && movies[0].backdrop} alt="" srcset="" />
                </div>

                <h1 className="title">The Movies Collection</h1>
                <div className="filters">
                    <div className="filters__block">
                        <label htmlFor="title" className="filters__block__label">Titre :</label>
                        <input type="text" name="title" className="input" onChange={handleChange} value={filters.title} />
                    </div>
                    <div className="filters__block">
                        <label htmlFor="date" className="filters__block__label">Sortie à partir de :</label>
                        <input type="date" name="date" className="input" onChange={handleChange} value={filters.date} />

                    </div>
                    <div className="filters__block">
                        <label htmlFor="categories" className="filters__block__label">Catégorie</label>
                        <div className="select">
                            <select id="lang" onChange={handleChange} name="categories" value={filters.categories}>
                                <option value='' className="default">Selectionnez</option>
                                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}

                            </select>
                        </div>

                    </div>

                </div>
            </div>
            <div className="movies">
                <ul className="movies__list">
                    {moviesList.map((movie) => <SingleMovie movie={movie} key={movie.id} deleteFilm={deleteFilm} />)}
                </ul>
            </div>
        </section>
    )
}

export default Movies
