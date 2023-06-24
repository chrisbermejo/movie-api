import './genres.css'
import React, { useEffect, useState } from 'react';
export default function Genres(props) {

    async function getGenres() {
        const response = await fetch('http://localhost:4000/api/genre/' + props.genre);
        const data = await response.json();
        return data;
    }

    const [movieData, setmovieData] = useState([]);

    useEffect(() => {
        getGenres().then(setmovieData);
    }, []);

    return (
        <>
            <div className='genre-container'>
                <div className='genre-header'>
                    <h2 className='genre-header-text'>{props.genre}</h2>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className='genre-header-svg' >
                        <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                        </path>
                    </svg>
                </div>
                <div className='genre-wrapper'>
                    {movieData.map(movie => (
                        <a key={movie.key} href={movie.link}>
                            <img src={movie.image} alt={movie.title} />
                        </a>
                    ))
                    }
                </div>
            </div>
        </>
    );
}