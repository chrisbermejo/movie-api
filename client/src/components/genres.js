import './genres.css'
import React, { useEffect, useState } from 'react';
export default function Genres(props) {

    async function getGenres() {
        const response = await fetch('http://localhost:4000/api/genre/' + props.genre);
        const data = await response.json();
        return data;
    }

    const [movieData, setmovieData] = useState([]);

    const container = document.querySelector(`div[data-set=${props.genre}]`);

    console.log(window.innerWidth - 15)

    let clickAmount = 0;

    function next() {
        container.scrollLeft += 1259;
    }

    function prev() {
        container.scrollLeft -= 1259;
    }


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
                <div className='genre-wrapper' data-set={props.genre}>
                    {movieData.map(movie => (
                        <div key={movie.key} className='genre-poster-card'>
                            <div className='genre-poster-card-image'>
                                <a href={movie.link}>
                                    <img className='genre-a-image' src={movie.image} alt={movie.title} />
                                </a>
                            </div>
                            <div className='genre-poster-card-info'>
                                <div className='genre-poster-card-info-rating'>
                                    <span className='genre-poster-card-info-rating-star-container'>
                                        <svg className='genre-poster-card-info-rating-star-svg' width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                                        {movie.rating}
                                    </span>
                                    <button className='genre-poster-card-info-rate-button'>
                                        <span className='genre-postercard-info-rate-button-svg-container'>
                                            <svg className='genre-poster-card-info-rate-button-svg' width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                                <div className='genre-poster-card-info-title'>
                                    <span className='genre-poster-card-info-title-span'>
                                        {movie.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <button onClick={() => prev()} id='prev-button'>PREV</button>
                <button onClick={() => next()} id='next-button'>NEXT</button>
            </div>
        </>
    );
}