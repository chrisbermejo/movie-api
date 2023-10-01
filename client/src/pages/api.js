import { useEffect, useState } from 'react';
import Nav from '../components/API/nav';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';

export default function API() {

    const [my_json_object, setMy_json_object] = useState({});
    const [input, setInput] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        if (value.length > 0) {
            fetch(`http://localhost:4000/api/genre/${value}`)
                .then(res => res.json())
                .then(data => setMy_json_object(data))
                .catch(err => console.log(err))
        }
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue(input);
    }

    return (
        <div className="API">
            <Nav />
            <div className='api-input'>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                    <input value={input} onChange={e => setInput(e.target.value)}></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='json-container'>
                <JsonView value={my_json_object} style={darkTheme} displayDataTypes={false} />
            </div>
        </div>
    );
}