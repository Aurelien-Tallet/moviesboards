import React from 'react'
import { Link } from 'react-router-dom'
import './SingleMovie.scss'

function SingleMovie({ movie, openAlert }) {
    const { title, poster, description, release_date: date, id, categories } = movie
    return (
        <Link to={`/movies/${id}`} style={{ width: '100%' }}>
            <article className="singlemovie" >
                <img className="singlemovie__poster" src={poster} alt="" />
                <div className="singlemovie__infos">
                    <a className="singlemovie__infos__title" href={`/movies/${id}`}>{title}</a>
                    <p className="singlemovie__infos__desc">{description}</p>
                    <p className="singlemovie__infos__desc">{categories.join(' , ')}</p>
                    <p className="singlemovie__infos__date">{date}</p>

                </div>
                <div className="singlemovie__actions">
                    <button className="singlemovie__actions__edit"><span className="icon-edit" onClick={(e) => window.location = '/edit/' + id}></span></button>
                    <button className="singlemovie__actions__delete" onClick={(e)=> openAlert(e,id)}><span className="icon-delete" ></span></button>
                </div>
            </article >
        </Link>
    )
}

export default SingleMovie
