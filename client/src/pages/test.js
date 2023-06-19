import React from 'react';
import Nav from '../components/nav';
import Trailers from '../components/trailers'
import '../App.css';

export default function test() {
    return (
        <div className="App">
            <Nav />
            <div className='App-Body'>
                <Trailers />
            </div>
        </div>
    );
}