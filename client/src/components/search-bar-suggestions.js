import React, { useEffect, useState } from 'react';
import './search-bar-suggestions.css';

export default function Search_Bar_Suggestions() {

    const [Query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    async function getSearchSuggestions(Query) {
        const response = await fetch('http://localhost:4000/search/' + Query);
        const data = await response.json();
        return data;
    }

    const handleChange = async (value) => {
        setQuery(value);
        if (value.length > 0) {
            setResults(await getSearchSuggestions(value));
        } else {
            setResults([]);
        }
    }

    return (
        <div className='search-bar-input-container'>
            <input type='text' className='search-bar-input' placeholder='Search IMDb' onChange={(e) => handleChange(e.target.value)}></input>
            <div className='search-bar-input-suggestions'>
                {results.map(result => (
                    <div className='search-bar-input-suggestion-results' key={result.key}>
                        <div className='search-bar-input-suggestion-results-image-container'>
                            <img className='search-bar-input-suggestion-results-image' src={result.image} alt='movie-poster' />
                        </div>
                        <div className='search-bar-input-suggestion-results-info'>
                            <strong className='search-result-title'>{result.title}</strong>
                            <span>{result.year}</span>
                            <span>{result.starNames[0]}, {result.starNames[1]}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}