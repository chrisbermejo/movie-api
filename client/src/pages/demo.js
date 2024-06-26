import Genres from '../components/genres';
import Nav from '../components/nav';
import Trailers from '../components/trailers';
import '../App.css';

export default function Demo() {
    const genreList = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Thriller', 'Horror'];

    return (
        <div className='main'>
            <div className='return'>
                <a href='/'>Home</a>
            </div>
            <div className="App">
                <Nav />
                <div className='App-Body'>
                    <Trailers />
                    <div className='App-container' >
                        <header className="App-header">
                            <h2 className='App-header-text'>What to watch</h2>
                        </header>
                        {genreList.map(genreItem => (
                            <Genres key={genreItem} genre={genreItem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}