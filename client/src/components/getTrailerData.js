const YourComponent = ({ data }) => {

    return (
        <>
            {data && data.map((trailer, index) => (
                <div className='slide-trailer-card' key={trailer.key} datatype={trailer.key}>
                    <div className='slide-img'>
                        <img className='slide-img-MAIN' alt={trailer.title} srcSet={trailer.imageURL} width='165px' />
                        <div className='slide-img-overlay-container'>
                            <div className='slide-img-overlay-text'>
                                <div className='slide-img-overlay-text-play'>
                                    <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                                    <span className='slide-img-overlay-text-play-time' >{trailer.time}</span>
                                </div>
                                <div className='slide-img-ovelay-text-play-header-con'>
                                    <div className='slide-img-ovelay-text-play-header'>
                                        <span>{trailer.title}</span>
                                        <span >{trailer.time}</span>
                                    </div>
                                    <div className='slide-img-ovelay-text-play-subheader'>{trailer.subText}</div>
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
                                <img alt={trailer.title} srcSet={trailer.posterURL} width="165px" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default YourComponent;