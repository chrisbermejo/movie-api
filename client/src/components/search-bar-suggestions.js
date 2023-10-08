import { useEffect, useState, useRef } from 'react';
import './search-bar-suggestions.css';

const SearchBarSuggestions = ({ closeSearchBarFunc }) => {

    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const suggestionsContainerRef = useRef(null);
    const searchBarInputRef = useRef(null);

    let controller = null;

    async function getSearchSuggestions(query) {
        setLoading(true);

        if (controller) {
            controller.abort();
        }

        controller = new AbortController();

        try {
            const response = await fetch('http://192.168.1.38:4000/api/search/' + query, {
                signal: controller.signal,
            });
            const data = await response.json();
            setResults(data);
        } catch (err) {
            // console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        setQuery(value);
    };

    const handleInputFocus = () => {
        if (query.length > 0) {
            getSearchSuggestions(query);
        }
        const searchBar = document.querySelector('.search-bar');
        searchBar.classList.add('search-bar--focused');
    };

    const handleDocumentClick = (e) => {
        if (!suggestionsContainerRef.current.contains(e.target) && !searchBarInputRef.current.contains(e.target)) {
            setResults([]);
            const searchBar = document.querySelector('.search-bar');
            searchBar.classList.remove('search-bar--focused');
        }
    };

    useEffect(() => {
        if (query.length > 0) {
            const fetchSearchSuggestions = async () => {
                await getSearchSuggestions(query);
            };
            fetchSearchSuggestions();
        } else {
            setResults([]);
        }

        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [query]);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <div className='search-bar-input-container'>
            <input
                type='text'
                className='search-bar-input'
                placeholder='Search IMDb'
                value={inputValue}
                onChange={handleChange}
                onFocus={handleInputFocus}
                ref={searchBarInputRef}
            />
            {/* Since we are web scrapping and not using an api, I added loading text since fetching takes a whiel */}
            {loading && <div>Loading...</div>}
            <div className='search-bar-input-suggestions' ref={suggestionsContainerRef}>
                {results.map((result) => (
                    <a className='search-bar-input-suggestion-results' key={result.key} href={result.link}>
                        <div className='search-bar-input-suggestion-results-image-container'>
                            {result.image == undefined ?
                                <div className='suggestion-results-undefined-image'>
                                    <svg className='suggestion-results-undefined-image-svg' width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></svg>
                                </div>
                                :
                                <img
                                    className='search-bar-input-suggestion-results-image'
                                    src={result.image}
                                    loading='lazy'
                                    alt='movie-poster'
                                    sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw"
                                />}
                        </div>
                        <div className='search-bar-input-suggestion-results-info'>
                            <strong className='search-result-title'>{result.title}</strong>
                            <span>{result.year}</span>
                            <span>{result.starNames[0]}{result.starNames[1] == null ? " " : ', ' + result.starNames[1]}</span>
                        </div>
                    </a>
                ))}
                {results.length > 0 ? <div className='search-bar-input-suggestions-all'>See all results for "{query}"</div> : null}
            </div>
            <div className='close-search-bar' onClick={closeSearchBarFunc}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
            </div>
        </div>
    );
}


export default SearchBarSuggestions;