import './trailers.css';
import React, { useState, useEffect, useRef } from 'react';
import TrailerData from './getTrailerData';
import UpNext from './upNextItems';

export default function GetTrailers() {

    const containerRef = useRef(null);
    const asideRef = useRef(null);

    const [counter, setCounter] = useState(0);

    const intervalRef = useRef(null);

    const [dataFromChild, setDataFromChild] = useState([]);

    const handleDataFromChild = (data) => {
        setDataFromChild(data);
        console.log(dataFromChild);
    };

    const startInterval = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(handleNextButtonClick, 5000);
        }
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const scrollToChild = (index, button) => {
        if (containerRef.current) {
            containerRef.current.style.transition = '';
            if (button != false) {
                containerRef.current.style.transition = 'transform 0.5s ease';
            }
            const childElements = containerRef.current.getElementsByClassName('slide-trailer-card');
            const childCount = childElements.length;

            if (childCount > 0) {
                let adjustedIndex = index;

                if (index >= childCount) {
                    adjustedIndex = index % childCount;
                } else if (index < 0) {
                    adjustedIndex = childCount - Math.abs(index % childCount);
                }
                const childElement = childElements[adjustedIndex];
                const scrollAmount =
                    childElement.offsetLeft -
                    containerRef.current.offsetWidth / 2 +
                    childElement.offsetWidth / 2;

                // if (asideRef.current) {
                //     const asideContainer = asideRef.current;
                //     const asideChild = asideContainer.querySelector('.up-next-item');
                //     if (asideChild) {
                //         const asideItemHeight = asideChild.offsetHeight;
                //         const asideContainerHeight = asideContainer.offsetHeight;
                //         const asideScrollAmount = index * (((asideItemHeight - asideContainerHeight) / 2));
                //         asideContainer.style.transform = `translateY(${asideScrollAmount}px)`;
                //         console.log(index)
                //         console.log(asideItemHeight - asideContainerHeight)
                //         console.log(asideScrollAmount);
                //     }
                // }

                containerRef.current.style.transform = `translateX(${-scrollAmount}px)`;

                if (adjustedIndex === 0 && button === 'next') {
                    containerRef.current.style.transition = '';
                    adjustedIndex++;
                    const childElement = childElements[adjustedIndex];
                    const scrollAmount =
                        childElement.offsetLeft -
                        containerRef.current.offsetWidth / 2 +
                        childElement.offsetWidth / 2;
                    containerRef.current.style.transform = `translateX(${-scrollAmount}px)`;
                    containerRef.current.style.transition = 'transform 0.5s ease';
                    setCounter(1);
                } else if (adjustedIndex === childCount - 1 && button === 'prev') {
                    containerRef.current.style.transition = '';
                    adjustedIndex--;
                    const childElement = childElements[adjustedIndex];
                    const scrollAmount =
                        childElement.offsetLeft -
                        containerRef.current.offsetWidth / 2 +
                        childElement.offsetWidth / 2;
                    containerRef.current.style.transform = `translateX(${-scrollAmount}px)`;
                    containerRef.current.style.transition = 'transform 0.5s ease';
                    setCounter(childCount - 2);
                }
            }
        }
    };

    const handleNextButtonClick = () => {
        setCounter((prevCounter) => {
            const newCount = prevCounter + 1;
            scrollToChild(newCount, 'next');
            return newCount;
        });
    };

    const handlePrevButtonClick = () => {
        stopInterval();
        setCounter((prevCounter) => {
            const newCount = prevCounter - 1;
            scrollToChild(newCount, 'prev');
            return newCount;
        });
    }

    const handleResize = () => {
        const elements = document.getElementsByClassName('slide-img-MAIN');
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (window.innerWidth <= 1024) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.width = `${window.innerWidth - scrollbarWidth}px`;
            }
        } else {
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.width = '';
            }
        }
    };

    const handleDataFetched = () => {
        setCounter(() => {
            startInterval();
            handleResize();
            scrollToChild(1, 0);
            return 1;
        });
    };

    useEffect(() => {

        const handleDataFetched = () => {
            setCounter(() => {
                scrollToChild(1, 0);
                return 1;
            });
        };

        handleResize();

        window.addEventListener('resize', () => {
            stopInterval();
            handleResize();
            handleDataFetched();
        });
        return () => {
            window.addEventListener('resize', () => {
                stopInterval();
                handleResize();
            });
            stopInterval();
        };
    }, []);

    return (
        <>
            <div className='trailer-body'>
                <div className='trailer-container'>
                    <div className='trialer-wrapper-container'>
                        <button className='trailer-prev-button' onClick={handlePrevButtonClick}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                                <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
                            </svg>
                        </button>
                        <button className='trailer-next-button' onClick={() => { handleNextButtonClick(); stopInterval(); }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                        </button>
                        <div className='trailer-wrapper' ref={containerRef}>
                            <TrailerData onDataFetched={handleDataFetched} fetchedData={handleDataFromChild} />
                        </div>
                    </div>
                    <aside className='trailer-aside'>
                        <div className='up-next-header'>
                            <span>Up next</span>
                        </div>
                        <div className='up-next-header-con'>
                            <div className='up-next-container' ref={asideRef} style={{ transform: 'translateY(-444px)' }}>
                                <UpNext data={dataFromChild} />
                            </div>
                        </div>
                        <a href='https://www.imdb.com/trailers/?ref_=hm_hp_sm' className='up-next-footer'>
                            Browse trailers
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg>
                            </span>
                        </a>
                    </aside>
                </div>
            </div>
        </>
    );
}