import React, { useEffect, useState } from 'react'
import Crud from "../../services/crud.js";
import SingleMovie from '../../components/SingleMovie/SingleMovie';

import './Movies.scss'

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
        setMoviesList(movies)
        // if (name == "title") {
        //     searchByTitle(value)
        // }
        // if (name == "date") {
        //     searchByDate(value)
        // }

        // if (name == "categories") {
        //     searchByCategories(value)
        // }

    }
    useEffect(() => {
       searchByCategories(filters.categories)
      

    }, [filters.categories])
    useEffect(() => {
        searchByTitle(filters.title)
       
 
     }, [filters.title])

    const searchByTitle = (value) => {
        const filteredMovies = moviesList.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()))
        setMoviesList(filteredMovies)
    }
    const searchByDate = (value) => {
        const filteredMovies = moviesList.filter(movie => new Date(movie.release_date).getTime() >= new Date(value).getTime())
        setMoviesList(filteredMovies)
    }
    const searchByCategories = (value) => {
        const filteredMovies = moviesList.filter(movie => movie.categories.map(k => k.toLowerCase()).includes(value.toLowerCase()))
        setMoviesList(filteredMovies)
    }
    function filterArray(inputArr) {
        var found = {};
        var out = inputArr.filter(function (element) {
            return found.hasOwnProperty(element) ? false : (found[element] = true);
        });
        return out;
    }
    useEffect(() => {
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
    }, [])
    return (
        <section className="movies">
            <input type="text" name="title" id="" onChange={handleChange} value={filters.title} />
            <input type="date" name="date" id="" onChange={handleChange} value={filters.date} />
            <select id="lang" onChange={handleChange} name="categories" value={filters.categories}>
                <option value="">Selectionnez</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}

            </select>
            <ul className="movies__list">
                {moviesList.map((movie) => <SingleMovie movie={movie} key={movie.id} deleteFilm={deleteFilm} />)}
            </ul>
        </section>
    )
}

export default Movies
