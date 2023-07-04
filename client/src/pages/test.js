import React from 'react';
import Nav from '../components/nav';
import Trailers from '../components/trailersv2'
import Genres from '../components/genres';
import '../App.css';

export default function test() {
    return (
        <div className="App">
            <Nav />
            <div className='App-Body'>
                <Trailers />
                <div className='App-container' >
                    <header className="App-header">
                        <h2 className='App-header-text'>What to watch</h2>
                    </header>
                    <Genres key={1} genre='Action' />
                </div>
            </div>
        </div>
    );
}