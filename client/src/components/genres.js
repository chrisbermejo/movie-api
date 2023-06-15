import '../App.css';
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
            <div className='container'>
                <h2>{props.genre}</h2>
                <div className='wrapper'>
                    {movieData.map(movie => (
                        <a href={movie.link}>
                            <img key={movie.key} src={movie.image} alt={movie.title}></img>
                        </a>
                    ))
                    }
                </div>
            </div>
        </>
    );
}

