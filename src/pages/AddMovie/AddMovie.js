import React, { useReducer, useRef, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import Crud from 'services/crud'
import { DEFAULT_MOVIE } from 'services/model'
import './AddMovie.scss'

function AddMovie() {
    const [movie, setNewMovie] = useState({ ...DEFAULT_MOVIE })
    const [result, setResult] = useState([])
    const [search, setSearch] = useState('')
    const [actor, setActor] = useState({ name: '', photo: '', character: '' })
    const [similarMovie, setSimilarMovie] = useState({})
    const [categories, setCategories] = useState('')
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setNewMovie({ ...movie, [name]: value })
    }

    const handleChangeSearch = (e) => {
        e.preventDefault()
        const { value } = e.target
        setSearch(value)
    }
    const chooseFilm = async (e, film) => {
        e.preventDefault()
        const imageBaseURL = 'https://image.tmdb.org/t/p/original/'
        let URL = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${'4f85342b8749c4d0e6c0f36d0481cbea'}`
        const res = await Crud.get(URL)
        const  { title , release_date , overview : description, genres } = res
        const categories = genres.map(k => k.name)
        console.log(res)
        // setNewMovie({title, release_date, description, categories : categories, })
    }

    const displayResults = async () => {
        if (search.length < 3) {
            setResult([])
            return
        }
        const res = await Crud.get(`https://api.themoviedb.org/3/search/movie?api_key=4f85342b8749c4d0e6c0f36d0481cbea&query=${search}&language=fr-FR`)
        if (res.results !== undefined) { setResult(res.results) }
        else {
            setResult([])
        }
    }
    const input = useRef()
    let timeout = null
    const searchDebounce = (e) => {
        e.preventDefault()
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            displayResults()
        }, 500);

    }
    const handleChangeActor = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setActor({ ...actor, [name]: value })
    }
    const handleChangeSimilarMovie = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setSimilarMovie({ ...similarMovie, [name]: value })
    }
    const handleChangeCategories = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setCategories(value)
    }
    const addItem = (e) => {
        e.preventDefault()
        const { name: type } = e.target
        const state = (type === "actors") ? actor : similarMovie
        setNewMovie({ ...movie, [type]: [...movie[type], state] })
    }
    const addCategories = (e) => {
        e.preventDefault()
        if (movie.categories.includes(categories.toLowerCase())) return
        const { name: type } = e.target
        setNewMovie({ ...movie, [type]: [...movie[type], categories.toLowerCase()] })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Crud.post(movie)
        setNewMovie(DEFAULT_MOVIE)

    }
    useEffect(() => {
    }, [movie])
    return (
        <section className="add" onClick={() => setResult([])}>
            <h1 className="add__title">Ajouter un film</h1>
            <div className="add__form__block search">
                <input type="text" name="title" ref={input} autoComplete="off" id="title" className={`text ${result.length > 0 ? 'active' : ''}`} onChange={handleChangeSearch} onKeyUp={searchDebounce} required />
                <div className={`result ${result.length > 0 ? 'active' : ''}`}>{result.map(film => <p onClick={(e) => chooseFilm(e, film)} key={film.id}>{film.title}</p>)}</div>
            </div>
            <form onSubmit={handleSubmit} className="add__form">
                <div className="title add__form__block">
                    <label htmlFor="title" className="add__form__label">Titre :</label>
                    <input type="text" name="title" id="title" className="text" onChange={handleChange} value={movie.title} required />
                </div>
                <div className="add__form__block">
                    <label htmlFor="description" className="add__form__label">Description :</label>
                    <textarea type="text" name="description" id="description" onChange={handleChange} required rows="5" value={movie.description} ></textarea>
                </div>
                <div className="add__form__block">
                    <label htmlFor="categories" className="add__form__label">Catégories :</label>
                    <input type="text" name="categories" id="categories" onChange={handleChangeCategories} value={categories} required />
                    <button name="categories" onClick={addCategories}>+</button>
                    <p className="catégories">{movie.categories.join(' , ')}</p>
                </div>
                <div className="date add__form__block">
                    <label htmlFor="date" className="add__form__label">Date de sortie :</label>
                    <input type="date" name="release_date" id="date" onChange={handleChange} required />
                </div>
                <div className="add__form__block">
                    <label htmlFor="actors " className="add__form__label">Acteurs</label>
                    <div className="actors__form" >
                        <label htmlFor="name" className="add__form__label">Nom :</label>
                        <input type="text" name="name" id="name" className="text" onChange={handleChangeActor} required />
                        <label htmlFor="character" className="add__form__label">Rôle :</label>
                        <input type="text" name="character" id="character" className="text" onChange={handleChangeActor} required />
                        <label htmlFor="photo" className="add__form__label">Photo :</label>
                        <input type="text" name="photo" id="photo" className="text" onChange={handleChangeActor} required />
                        <button name="actors" onClick={addItem}>Ajouter</button>
                    </div>
                    <ul className="actors">
                        {movie.actors.map((actor, i) => <li className="actor" key={i}>
                            <img src={actor.photo} alt="" className="actor__picture" />
                            <p className="actor__name">{actor.name}</p>
                            <p className="actor__character">{actor.character}</p>
                        </li>)}
                    </ul>

                </div>
                <div className="add__form__block">
                    <label htmlFor="actors " className="add__form__label">Film Similaire</label>
                    <div className="actors__form" >
                        <label htmlFor="title" className="add__form__label">Titre :</label>
                        <input type="text" name="title" id="title" className="text" onChange={handleChangeSimilarMovie} />
                        <label htmlFor="poster" className="add__form__label">Affiche :</label>
                        <input type="text" name="poster" id="poster" className="text" onChange={handleChangeSimilarMovie} />
                        <label htmlFor="date" className="add__form__label">Date de sortie :</label>
                        <input type="date" name="release_date" id="date" onChange={handleChangeSimilarMovie} />
                        <button name="similar_movies" onClick={addItem}>Ajouter</button>
                    </div>
                    <ul className="similar-movies">
                        {movie.similar_movies.map((film, i) => <li className="film" key={i}>
                            <img src={film.poster} alt="" className="film__picture" />
                            <p className="film__name">{film.title}</p>
                            <p className="film__date">{film.release_date}</p>
                        </li>)}
                    </ul>

                </div>
                <button type="submit">Créer</button>
            </form>
        </section>
    )
}

export default AddMovie
