import React, { useEffect, useState } from 'react'
import Crud from "../../services/crud.js";
import SingleMovie from '../../components/SingleMovie/SingleMovie';

import './Movies.scss'
import { containCategories, containDate, containTitle, filterArray } from 'services/utils.js';
import Modal from 'components/Modal/Modal.js';
import { Link } from 'react-router-dom';
const POSTER_URL =
    "https://firebasestorage.googleapis.com/v0/b/my-movies-list-23f59.appspot.com/o/images%2Fdefault-placeholder.png?alt=media&token=c6082f11-8efe-42cc-b43d-c7b23b75f9b0";
function Movies() {
    const [movies, setMovies] = useState([])
    const [moviesList, setMoviesList] = useState([])
    const [categories, setCategories] = useState([])
    const [alert, setAlert] = useState({ open: false, id: '', onConfirm: () => { }, onAbort: () => { } })
    const [filters, setFilters] = useState({ title: '', date: '', categories: '' })
    const deleteFilm = (id) => {

        Crud.delete(id)
        const newState = moviesList.filter(movie => movie.id !== id)
        setMoviesList(newState)
        onAbort()
    }
    const openAlert = (e, id = '') => {
        e.preventDefault()
        setAlert({ open: true, onConfirm: () => deleteFilm(id), onAbort })
    }
    const onAbort = () => {
        setAlert({ open: false, id: '', onConfirm: () => { }, onAbort: () => { } })
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
                const res = await Crud.get('http://192.168.1.58:3000/movies')
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
            {alert.open && <Modal onAbort={alert.onAbort} onConfirm={alert.onConfirm} message="Êtes vous sûr de vouloir supprimé ce film" />}
            <header className="movie-banner">
                <div className="bg">
                    <img src={movies.length ? movies[0].backdrop : POSTER_URL}  />
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
                <nav className="nav"> <Link to='/add'><span className="icon-plus"></span></Link></nav>
            </header>
            <div className="movies">
                <ul className="movies__list">
                    {moviesList.map((movie) => <SingleMovie movie={movie} key={movie.id} openAlert={openAlert} />)}
                </ul>
            </div>
        </section>
    )
}

export default Movies
