import React from 'react';
import Genres from '../components/genres';
import Nav from '../components/nav';
import '../App.css';

export default function Search() {
    const genreList = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Thriller', 'Horror'];

    return (
        <div className="App">
            <Nav />
            <header className="App-header">
                <h1>Trending in</h1>
            </header>
            <div className='App-Body'>
                {genreList.map(genreItem => (
                    <Genres key={genreItem} genre={genreItem} />
                ))}
            </div>
            <footer></footer>
        </div>
    );
}