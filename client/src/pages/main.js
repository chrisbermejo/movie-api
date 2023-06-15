import Genres from '../components/genres'
import '../App.css';

export default function search() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Trending in</h1>
            </header>
            <div className='App-Body'>
                <Genres genre={"Action"} />
                <Genres genre={"Adventure"} />
                <Genres genre={"Animation"} />
                <Genres genre={"Comedy"} />
                <Genres genre={"Crime"} />
                <Genres genre={"Thriller"} />
                <Genres genre={"Horror"} />
            </div>
            <footer></footer>
        </div>
    )
}