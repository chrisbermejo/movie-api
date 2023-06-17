import './trailers.css';
import React from 'react';
import image1 from '../images/news_1.jpg';
import itemPosterIMG from '../images/item-poster.jpg';

export default function getTrailers() {
    return (
        <>
            <div className='trailer-body'>
                <div className='trailer-container' width="849px" height="548px">
                    <div className='slide-img-container'>
                        <div className='slide-img'>
                            <img src={image1} alt='news' />
                        </div>
                    </div>
                    <aside>
                        <div className='up-next-header'>
                            <span>Up next</span>
                        </div>
                        <div className='up-next-container'>
                            <div className='up-next-item'>
                                <div className='up-next-item-img'>
                                    <img src={itemPosterIMG} alt='poster' />
                                </div>
                                <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                                    <div>
                                        <div className='play-icon-time' >
                                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-d4cb23a2-14 ejjmJF editorial-play-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                            </svg>
                                            <div className='time' >1:10</div>
                                        </div>
                                        <div className='play-icon-header'>"What We Do in the Shadows"</div>
                                        <div className='play-icon-subheader'>Watch the Season 5 trailer</div>
                                    </div>
                                </a>
                            </div>
                            <div className='up-next-item'>
                                <div className='up-next-item-img'>
                                    <img src={itemPosterIMG} alt='poster' />
                                </div>
                                <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                                    <div>
                                        <div className='play-icon-time' >
                                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-d4cb23a2-14 ejjmJF editorial-play-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                            </svg>
                                            <div className='time' >1:10</div>
                                        </div>
                                        <div className='play-icon-header'>"What We Do in the Shadows"</div>
                                        <div className='play-icon-subheader'>Watch the Season 5 trailer</div>
                                    </div>
                                </a>
                            </div>
                            <div className='up-next-item'>
                                <div className='up-next-item-img'>
                                    <img src={itemPosterIMG} alt='poster' />
                                </div>
                                <a href='https://www.youtube.com/watch?v=0W8XKZQ5Z3E' target='_blank' rel='noopener noreferrer'>
                                    <div>
                                        <div className='play-icon-time' >
                                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-d4cb23a2-14 ejjmJF editorial-play-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                            </svg>
                                            <div className='time' >1:10</div>
                                        </div>
                                        <div className='play-icon-header'>"What We Do in the Shadows"</div>
                                        <div className='play-icon-subheader'>Watch the Season 5 trailer</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <a href='https://www.imdb.com/trailers/?ref_=hm_hp_sm' className='up-next-footer'>Browse trailers                 <span>></span></a>
                    </aside>
                </div>
            </div>
        </>
    );
}