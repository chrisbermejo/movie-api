import { useEffect, useState } from 'react';
import Nav from '../components/API/nav';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import Form from '../components/API/form';

export default function API() {

    const [my_json_object, setMy_json_object] = useState({});
    const [value, setValue] = useState({});

    useEffect(() => {
        if (Object.keys(value).length > 0) {

            const params = [];

            for (const key in value) {
                if (value.hasOwnProperty(key) && value[key]) {
                    if (key !== "genres" || (key === "genres" && value[key].length > 0)) {
                        if (Array.isArray(value[key])) {
                            if (key === 'user_rating' && !value[key][0] && !value[key][1]) {
                                continue;
                            }
                            else if (key === 'release_date' && !value[key][0] && !value[key][1]) {
                                continue;
                            }
                            else if (key === 'user_rating' && value[key][0] === value[key][1]) {
                                params.push(`${key}=${value[key][0]}`);
                            }
                            else if (key === 'user_rating' && (!value[key][0] || !value[key][1])) {
                                if (!value[key][0]) {
                                    params.push(`${key}=,${value[key][1]}`)
                                } else {
                                    params.push(`${key}=${value[key][0]},`)
                                }
                            } else {
                                params.push(`${key}=${value[key].join(',')}`);
                            }
                        } else {
                            if (key === 'title') {
                                params.push(`${key}=${value[key].split(' ').join('+')}`);
                            } else {
                                params.push(`${key}=${value[key]}`);
                            }
                        }
                    }
                }
            }

            const url = `http://localhost:4000/api/advancedsearch/?${params.join('&')}`;
            setMy_json_object({ message: 'Loading...' })
            fetch(url)
                .then(res => res.json())
                .then(data => setMy_json_object(data))
                .catch(err => console.log(err))
        }
    }, [value]);

    return (
        <div className="API">
            <Nav />
            <div className='api-input'>
                <Form value={value} setValue={setValue} setJson={setMy_json_object} />
            </div>
            <div className='json-container'>
                <JsonView value={my_json_object ? my_json_object : { API: 'unable to find anything' }} style={darkTheme} displayDataTypes={false} displayObjectSize={false} shortenTextAfterLength={45} />
            </div>
        </div>
    );
}