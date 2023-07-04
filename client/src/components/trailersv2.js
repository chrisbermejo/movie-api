import './trailersv2.css';
import React, { useState, useEffect, useRef } from 'react';
import itemPosterIMG from '../images/item-poster.jpg';

export default function GetTrailers() {

    const containerRef = useRef(null);
    const [counter, setCounter] = useState(1);

    const scrollToChild = (index) => {
        if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.3s ease';
            const childElements = containerRef.current.getElementsByClassName(
                'slide-trailer-card'
            );
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
                    childElement.offsetWidth / 2 +
                    parseFloat(getComputedStyle(childElement).marginLeft) +
                    parseFloat(getComputedStyle(childElement).marginRight);
                containerRef.current.style.transform = `translateX(${-scrollAmount}px)`;
            }
        }
    };

    const handleNextButtonClick = () => {
        setCounter((prevCounter) => {
            const newCount = prevCounter + 1;
            scrollToChild(newCount);
            return newCount;
        });
    };

    const handlePrevButtonClick = () => {
        setCounter((prevCounter) => {
            const newCount = prevCounter - 1;
            scrollToChild(newCount);
            return newCount;
        });
    }



    useEffect(() => {
        if (containerRef.current) {
            const childElements = containerRef.current.getElementsByClassName(
                'slide-trailer-card'
            );
            const childElement = childElements[1];
            const scrollAmount =
                childElement.offsetLeft -
                containerRef.current.offsetWidth / 2 +
                childElement.offsetWidth / 2 +
                parseFloat(getComputedStyle(childElement).marginLeft) +
                parseFloat(getComputedStyle(childElement).marginRight);
            containerRef.current.style.transform = `translateX(${-scrollAmount}px)`;
        }
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
                        <button className='trailer-next-button' onClick={handleNextButtonClick}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
                        </button>
                        <div className='trailer-wrapper' ref={containerRef}>
                            <div className='slide-trailer-card'>
                                <div className='slide-img'>
                                    <img className='slide-img-MAIN' alt="One Piece;" srcSet="https://m.media-amazon.com/images/M/MV5BZmQ0OGZkYzktZWZiYy00ZDliLThhNmMtODM0ZjU3ZTIxZmM5XkEyXkFqcGdeQXZ3ZXNsZXk@._CR53,74,1570,883_QL75_UY281_CR0,0,500,281_.jpg" width='165px' />
                                    <div className='slide-img-overlay-container'>
                                        <div className='slide-img-overlay-text'>
                                            <div className='slide-img-overlay-text-play'>
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                                <span className='slide-img-overlay-text-play-time' >1:29</span>
                                            </div>
                                            <div className='slide-img-ovelay-text-play-header-con'>
                                                <div className='slide-img-ovelay-text-play-header'>
                                                    <span >"One Piece 4"</span>
                                                    <span >1:29</span>
                                                </div>
                                                <div className='slide-img-ovelay-text-play-subheader'>The Manga Adaptation Comes to Netflix</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide-img-overlay'>
                                        <div className='slide-img-poster-ribbon'>
                                            <svg className="slide-img-poster-ribbon-svg" width="24px" height="34px" viewBox="0 0 24 34">
                                                <polygon className="svg-polygon-1" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-2" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-3" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                            <div className='slide-img-poster-ribbon-overlay' >
                                                <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                                            </div>
                                        </div>
                                        <div className='slide-img-poster'>
                                            <img alt="One Piece" srcSet="https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY207_CR4,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY311_CR6,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg 280w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="165px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='slide-trailer-card'>
                                <div className='slide-img'>
                                    <img className='slide-img-MAIN' alt="One Piece;" srcSet="https://m.media-amazon.com/images/M/MV5BZmQ0OGZkYzktZWZiYy00ZDliLThhNmMtODM0ZjU3ZTIxZmM5XkEyXkFqcGdeQXZ3ZXNsZXk@._CR53,74,1570,883_QL75_UY281_CR0,0,500,281_.jpg" width='165px' />
                                    <div className='slide-img-overlay-container'>
                                        <div className='slide-img-overlay-text'>
                                            <div className='slide-img-overlay-text-play'>
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                                <span className='slide-img-overlay-text-play-time' >1:29</span>
                                            </div>
                                            <div className='slide-img-ovelay-text-play-header-con'>
                                                <div className='slide-img-ovelay-text-play-header'>
                                                    <span >"One Piece"</span>
                                                    <span >1:29</span>
                                                </div>
                                                <div className='slide-img-ovelay-text-play-subheader'>The Manga Adaptation Comes to Netflix</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide-img-overlay'>
                                        <div className='slide-img-poster-ribbon'>
                                            <svg className="slide-img-poster-ribbon-svg" width="24px" height="34px" viewBox="0 0 24 34">
                                                <polygon className="svg-polygon-1" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-2" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-3" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                            <div className='slide-img-poster-ribbon-overlay' >
                                                <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                                            </div>
                                        </div>
                                        <div className='slide-img-poster'>
                                            <img alt="One Piece" srcSet="https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY207_CR4,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY311_CR6,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg 280w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="165px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='slide-trailer-card'>
                                <div className='slide-img'>
                                    <img className='slide-img-MAIN' alt="One Piece;" srcSet="https://m.media-amazon.com/images/M/MV5BZmQ0OGZkYzktZWZiYy00ZDliLThhNmMtODM0ZjU3ZTIxZmM5XkEyXkFqcGdeQXZ3ZXNsZXk@._CR53,74,1570,883_QL75_UY281_CR0,0,500,281_.jpg" width='165px' />
                                    <div className='slide-img-overlay-container'>
                                        <div className='slide-img-overlay-text'>
                                            <div className='slide-img-overlay-text-play'>
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                                <span className='slide-img-overlay-text-play-time' >1:29</span>
                                            </div>
                                            <div className='slide-img-ovelay-text-play-header-con'>
                                                <div className='slide-img-ovelay-text-play-header'>
                                                    <span >"One Piece 2"</span>
                                                    <span >1:29</span>
                                                </div>
                                                <div className='slide-img-ovelay-text-play-subheader'>The Manga Adaptation Comes to Netflix</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide-img-overlay'>
                                        <div className='slide-img-poster-ribbon'>
                                            <svg className="slide-img-poster-ribbon-svg" width="24px" height="34px" viewBox="0 0 24 34">
                                                <polygon className="svg-polygon-1" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-2" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-3" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                            <div className='slide-img-poster-ribbon-overlay' >
                                                <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                                            </div>
                                        </div>
                                        <div className='slide-img-poster'>
                                            <img alt="One Piece" srcSet="https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY207_CR4,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY311_CR6,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg 280w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="165px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='slide-trailer-card'>
                                <div className='slide-img'>
                                    <img className='slide-img-MAIN' alt="One Piece;" srcSet="https://m.media-amazon.com/images/M/MV5BZmQ0OGZkYzktZWZiYy00ZDliLThhNmMtODM0ZjU3ZTIxZmM5XkEyXkFqcGdeQXZ3ZXNsZXk@._CR53,74,1570,883_QL75_UY281_CR0,0,500,281_.jpg" width='165px' />
                                    <div className='slide-img-overlay-container'>
                                        <div className='slide-img-overlay-text'>
                                            <div className='slide-img-overlay-text-play'>
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                                <span className='slide-img-overlay-text-play-time' >1:29</span>
                                            </div>
                                            <div className='slide-img-ovelay-text-play-header-con'>
                                                <div className='slide-img-ovelay-text-play-header'>
                                                    <span >"One Piece 3"</span>
                                                    <span >1:29</span>
                                                </div>
                                                <div className='slide-img-ovelay-text-play-subheader'>The Manga Adaptation Comes to Netflix</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide-img-overlay'>
                                        <div className='slide-img-poster-ribbon'>
                                            <svg className="slide-img-poster-ribbon-svg" width="24px" height="34px" viewBox="0 0 24 34">
                                                <polygon className="svg-polygon-1" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-2" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-3" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                            <div className='slide-img-poster-ribbon-overlay' >
                                                <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                                            </div>
                                        </div>
                                        <div className='slide-img-poster'>
                                            <img alt="One Piece" srcSet="https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY207_CR4,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY311_CR6,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg 280w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="165px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='slide-trailer-card'>
                                <div className='slide-img'>
                                    <img className='slide-img-MAIN' alt="One Piece;" srcSet="https://m.media-amazon.com/images/M/MV5BZmQ0OGZkYzktZWZiYy00ZDliLThhNmMtODM0ZjU3ZTIxZmM5XkEyXkFqcGdeQXZ3ZXNsZXk@._CR53,74,1570,883_QL75_UY281_CR0,0,500,281_.jpg" width='165px' />
                                    <div className='slide-img-overlay-container'>
                                        <div className='slide-img-overlay-text'>
                                            <div className='slide-img-overlay-text-play'>
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                                <span className='slide-img-overlay-text-play-time' >1:29</span>
                                            </div>
                                            <div className='slide-img-ovelay-text-play-header-con'>
                                                <div className='slide-img-ovelay-text-play-header'>
                                                    <span >"One Piece 4"</span>
                                                    <span >1:29</span>
                                                </div>
                                                <div className='slide-img-ovelay-text-play-subheader'>The Manga Adaptation Comes to Netflix</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='slide-img-overlay'>
                                        <div className='slide-img-poster-ribbon'>
                                            <svg className="slide-img-poster-ribbon-svg" width="24px" height="34px" viewBox="0 0 24 34">
                                                <polygon className="svg-polygon-1" fill="#000000" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-2" points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
                                                <polygon className="svg-polygon-3" points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
                                            </svg>
                                            <div className='slide-img-poster-ribbon-overlay' >
                                                <svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path></svg>
                                            </div>
                                        </div>
                                        <div className='slide-img-poster'>
                                            <img alt="One Piece" srcSet="https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY207_CR4,0,140,207_.jpg 140w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY311_CR6,0,210,311_.jpg 210w, https://m.media-amazon.com/images/M/MV5BYzczMzllN2UtNDJmOS00MmE5LWE2MWYtNGEwODcwMDc2M2YyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg 280w" sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="165px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <aside className='trailer-aside'>
                        <div className='up-next-header'>
                            <span>Up next</span>
                        </div>
                        <div className='up-next-header-con'>
                            <div className='up-next-container'>
                                <div className='up-next-item'>
                                    <div className='up-next-item-img'>
                                        <img src='https://m.media-amazon.com/images/M/MV5BZjYxYWVjMDMtZGRjZS00ZDE4LTk0OWUtMjUyOTI4MmYxNjgwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX280_CR0,0,280,414_.jpg' alt='poster' />
                                    </div>
                                    <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                                        <div className='play-icon-container'>
                                            <div className='play-icon-time' >
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                                </svg>
                                                <div className='time' >1:10</div>
                                            </div>
                                            <div className='play-icon-header'>The 'Elemental' Cast Get Vocal</div>
                                            <div className='play-icon-subheader'>Behind the Scences of Disney's Newest M...</div>
                                        </div>
                                    </a>
                                </div>
                                <div className='up-next-item'>
                                    <div className='up-next-item-img'>
                                        <img src='https://m.media-amazon.com/images/M/MV5BZTc5MzQ2MTQtMmI5My00NzI1LTg2YzAtZDUxMGI4N2VhZDNiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY414_CR8,0,280,414_.jpg' alt='poster' />
                                    </div>
                                    <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E'>
                                        <div className='play-icon-container'>
                                            <div className='play-icon-time' >
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                                </svg>
                                                <div className='time' >1:38</div>
                                            </div>
                                            <div className='play-icon-header'>"3 Body Problem"</div>
                                            <div className='play-icon-subheader'>Watch the trailer</div>
                                        </div>
                                    </a>
                                </div>
                                <div className='up-next-item'>
                                    <div className='up-next-item-img'>
                                        <img src={itemPosterIMG} alt='poster' />
                                    </div>
                                    <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                                        <div className='play-icon-container'>
                                            <div className='play-icon-time' >
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                                </svg>
                                                <div className='time' >1:10</div>
                                            </div>
                                            <div className='play-icon-header'>"What We Do in the Shadows"</div>
                                            <div className='play-icon-subheader'>Watch the Season 5 trailer</div>
                                        </div>
                                    </a>
                                </div>
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