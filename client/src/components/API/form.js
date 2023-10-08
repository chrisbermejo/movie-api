import { useEffect, useState } from "react";

const genresList = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'Game-Show',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'Western',
];

export default function Form({ value, setValue, setJson }) {
    const [title, setTitle] = useState('');
    const [range, setRange] = useState(null);
    const [genres, setGenres] = useState([]);
    const [title_type, setTitle_type] = useState('');
    const [user_rating, setRating] = useState({});
    const [release_date, setRelease_date] = useState({ min: '', max: '', minformat: '', maxformat: '' });
    const [submit, setSubmit] = useState(false);

    const handleGenreCheckboxChange = (event) => {
        const genre = event.target.value;
        setGenres((prevSelectedGenres) => {
            if (event.target.checked) {
                return [...prevSelectedGenres, genre];
            } else {
                return prevSelectedGenres.filter((g) => g !== genre);
            }
        });
    };

    const handleTitleTypeCheckBoxChange = (event) => {
        const newTitleType = event.target.value === title_type ? '' : event.target.value;
        setTitle_type(newTitleType);
    };

    function getLastDayOfMonth(year, month) {
        const nextMonth = new Date(year, month, 1);
        const lastDay = new Date(year, nextMonth.getMonth() + 1, 0);
        return lastDay.getDate();
    }

    const isDateValid = (date, type) => {
        const inputPattern = /^[0-9-]+$/;
        const datePattern1 = /^\d{4}-\d{2}-\d{2}$/;
        const datePattern2 = /^\d{4}-\d{2}$/;
        const datePattern3 = /^\d{4}$/;

        if (date === '') {
            setRelease_date(prev => { return { ...prev, [type + 'format']: '' } });
        } else if (!inputPattern.test(date)) {
            setRelease_date(prev => { return { ...prev, [type]: '', [type + 'format']: '' } })
        } if (datePattern3.test(date) && date.length === 4) {
            setRelease_date(prev => { return { ...prev, [type + 'format']: 'y' } });
        } else if (datePattern2.test(date) && date.length === 7) {
            const newDate = date.split('-');
            const month = parseInt(newDate[1]);
            if (month < 1 || month > 31) {
                setRelease_date(prev => { return { ...prev, [type]: '', [type + 'format']: '' } })
            } else {
                setRelease_date(prev => { return { ...prev, [type + 'format']: 'ym' } });
            }
        } else if (datePattern1.test(date) && date.length === 10) {
            const newDate = date.split('-');
            const month = parseInt(newDate[1]);
            const day = parseInt(newDate[2]);
            if ((month < 1 || month > 12) || (day < 1 || day > 31)) {
                setRelease_date(prev => { return { ...prev, [type]: '', [type + 'format']: '' } })
            } else {
                setRelease_date(prev => { return { ...prev, [type + 'format']: 'ymd' } });
            }
        } else {
            setRelease_date(prev => { return { ...prev, [type + 'format']: '' } });
        }
    }

    const checkDateFormat = (date) => {
        if (date.min && date.max && date.minformat && date.maxformat && date.minformat === 'ymd' && date.maxformat === 'ymd') {
            const date1 = new Date(date.min);
            const date2 = new Date(date.max);
            if (date1 > date2) {
                const temp = date.min;
                setRelease_date(prev => { return { ...prev, min: date.max, max: temp } });
            }
            return false;
        }
        if (date.min && date.max && date.minformat && date.maxformat) {
            if (date.minformat !== 'ymd') {
                if (date.minformat === 'ym') {
                    setRelease_date(prev => { return { ...prev, min: prev.min + '-01' } });
                }
                if (date.minformat === 'y') {
                    setRelease_date(prev => { return { ...prev, min: prev.min + '-01-01' } });
                }
            }
            if (date.maxformat !== 'ymd') {
                if (date.maxformat === 'ym') {
                    const newDate = date.max.split('-');
                    const day = getLastDayOfMonth(parseInt(newDate[0]), parseInt(newDate[1]));
                    setRelease_date(prev => { return { ...prev, max: prev.max + day } });
                }
                if (date.maxformat === 'y') {
                    const newDate = date.max.split('-');
                    const day = getLastDayOfMonth(parseInt(parseInt(newDate[0])), 11);
                    setRelease_date(prev => { return { ...prev, max: prev.max + '-' + 12 + '-' + day } });
                }
            }
            return false;
        }
        if (date.min && date.minformat && !date.max) {
            if (date.minformat === 'ym') {
                setRelease_date(prev => { return { ...prev, min: prev.min + '-01' } });
            }
            if (date.minformat === 'y') {
                setRelease_date(prev => { return { ...prev, min: prev.min + '-01-01' } });
            }
            return false;
        }
        if (!date.min && date.maxformat && date.max) {
            if (date.maxformat === 'ym') {
                const newDate = date.max.split('-');
                const day = getLastDayOfMonth(parseInt(newDate[0]), parseInt(newDate[1]));
                setRelease_date(prev => { return { ...prev, max: prev.max + day } });
            }
            if (date.maxformat === 'y') {
                const newDate = date.max.split('-');
                const day = getLastDayOfMonth(parseInt(parseInt(newDate[0])), 11);
                setRelease_date(prev => { return { ...prev, max: prev.max + '-' + 12 + '-' + day } });
            }
            return false;
        }
        return true;
    }

    const getObjectSize = (obj) => {
        let count = 0;
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== '') {
                count++;
            }
        }
        return count;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title && !title_type && !range && !genres.length && !user_rating.length && !getObjectSize(release_date)) {
            setJson({ message: 'Please fill out at least one of the fields' });
            return;
        }
        if (getObjectSize(release_date) && checkDateFormat(release_date)) {
            setJson({ message: 'Invalid date' });
            return;
        }
        const date1 = new Date(release_date.min);
        const date2 = new Date(release_date.max);
        if (date1 > date2) {
            setRelease_date(prev => { return { ...prev, min: prev.max, max: prev.min } });
        }
        setSubmit(prev => { return true });
    };

    const handleRatingChange = (e) => {
        setRating(prev => { return { ...prev, [e.target.name]: e.target.value } });
    };

    const handleReleaseDateChange = (e) => {
        setRelease_date(prev => { return { ...prev, [e.target.name]: e.target.value } });
    };

    useEffect(() => {
        if (release_date.max) {
            isDateValid(release_date.max, 'max');
        }
        if (release_date.min) {
            isDateValid(release_date.min, 'min');
        }
    }, [release_date.max, release_date.min])

    useEffect(() => {
        if (submit) {
            setValue({
                title,
                genres,
                title_type,
                range,
                user_rating: [user_rating.min, user_rating.max],
                release_date: [release_date.min, release_date.max]
            });
            setSubmit(prev => { return false });
        }
    }, [submit])

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="title-container">
                <label>Title: </label>
                <input value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div className="title-type-container">
                <label>
                    <input
                        type="checkbox"
                        value="feature"
                        onChange={handleTitleTypeCheckBoxChange}
                    />
                    Movie
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="tv_series"
                        onChange={handleTitleTypeCheckBoxChange}
                    />
                    TV Show
                </label>
            </div>
            <div className="genres-container">
                {genresList.map((genre) => (
                    <label key={genre}>
                        <input
                            type="checkbox"
                            value={genre}
                            onChange={handleGenreCheckboxChange}
                        />
                        {genre}
                    </label>
                ))}
            </div>
            <div className="rating-container">
                <label>Rating: </label>
                <div className="rating-input-container">
                    <select name="min" onChange={handleRatingChange}>
                        <option value="" defaultValue={true}>-</option>
                        {Array.from({ length: 101 }, (_, index) => (
                            <option key={index} value={(index / 10).toFixed(1)}>
                                {(index / 10).toFixed(1)}
                            </option>
                        ))}
                    </select>
                    <div>to</div>
                    <select name="max" onChange={handleRatingChange}>
                        <option value="" defaultValue={true}>-</option>
                        {Array.from({ length: 101 }, (_, index) => (
                            <option key={index} value={(index / 10).toFixed(1)}>
                                {(index / 10).toFixed(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="date-container">
                <label>Release Date: </label>
                <div className="date-input-container">
                    <input type="text" name='min' value={release_date.min} onChange={handleReleaseDateChange} />
                    <div>to</div>
                    <input type="text" name='max' value={release_date.max} onChange={handleReleaseDateChange} />
                </div>
            </div>
            <div className="range-container">
                <label>Range: </label>
                <input type="number" min="1" max="30" onChange={e => setRange(e.target.value)} />
            </div>
            <div className="genres-selected-container">
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
}
