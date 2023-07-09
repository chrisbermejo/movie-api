import React, { useState, useEffect } from 'react';

const YourComponent = ({ data }) => {

    const [updatedData, setUpdatedData] = useState([]);

    useEffect(() => {
        if (data.length !== 0) {
            let counter = 99;
            const jsonData = JSON.parse(JSON.stringify(data));
            const jsonDataEdit = JSON.parse(JSON.stringify(jsonData));
            const extractedElements = jsonDataEdit.splice(1, 5);
            jsonData.push(...extractedElements);
            const extractedElements2 = jsonDataEdit.splice(jsonDataEdit.length - 4, 2);
            jsonData.unshift(...extractedElements2);
            jsonData.forEach((element) => {
                counter++;
                element.key = counter;
            });
            setUpdatedData(jsonData);
            console.log(jsonData);
        }
    }, []);

    return (
        <>
            {updatedData.map((item, index) => (
                <div className='up-next-item' key={`${item.key}${item.key}`} datatype={item.key}>
                    <div className='up-next-item-img'>
                        <img src={item.posterURL} alt='poster' />
                    </div>
                    <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                        <div className='play-icon-container'>
                            <div className='play-icon-time' >
                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                </svg>
                                <div className='time' >{item.time}</div>
                            </div>
                            <div className='play-icon-header'>{item.title}</div>
                            <div className='play-icon-subheader'>{item.subText}</div>
                        </div>
                    </a>
                </div>
            ))}
        </>
    );
};

export default YourComponent;