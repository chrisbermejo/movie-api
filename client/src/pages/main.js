import React from 'react';
import Genres from '../components/genres';
import Nav from '../components/nav';
import Trailers from '../components/trailers';
import '../App.css';

export default function Search() {
    const genreList = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Thriller', 'Horror'];

    return (
        <div className="App">
            <Nav />
            <div className='App-Body'>
                <Trailers />
                <header className="App-header">
                    <h1>Trending in</h1>
                </header>
                {genreList.map(genreItem => (
                    <Genres key={genreItem} genre={genreItem} />
                ))}
            </div>
        </div>
    );
}