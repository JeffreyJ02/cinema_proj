'use client';

import React, { useState } from 'react';
import CustomNavbar from '../components/CustomNavbar';
import DateCarousel from '../components/DateCarousel';
import ShowtimeButtons from '../components/ShowtimeButtons';
import MovieInfo from '../components/MovieInfo';
import styles from './page.css';
import TicketView from '../components/TicketView';
import Button from '@mui/material/Button';

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [ticketCounts, setTicketCounts] = useState({
        adult: 0,
        child: 0,
        senior: 0,
    });

    const placeholderMovie = {
        img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
        id: 1,
        name: "Movie 1",
        trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E?si=w7ReOmp4NXxSyE3V",
        synopsis: "A movie about space",
        rating: "PG-13"
    };

    return (
        <div>
            <CustomNavbar />
            <div className="movie-details">
                <MovieInfo movie={placeholderMovie} />
            </div>
            <div className="main-container">
                <div className="user-interactable-content">
                    {/* Navtab component from Bootstrap*/}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                                id="home-tab"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected={activeTab === 'home'}
                                onClick={() => handleTabClick('home')}
                            >
                                Showtimes
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                                id="profile-tab"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected={activeTab === 'profile'}
                                onClick={() => handleTabClick('profile')}
                            >
                                Seats
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                                id="contact-tab"
                                type="button"
                                role="tab"
                                aria-controls="contact"
                                aria-selected={activeTab === 'contact'}
                                onClick={() => handleTabClick('contact')}
                            >
                                Tickets
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`}
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                        >
                            Showtimes content
                            <DateCarousel />
                            <ShowtimeButtons />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`}
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            Seats Content
                            <img src="./screen.svg" alt="Seats SVG" />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`}
                            id="contact"
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                        >
                            <TicketView />
                        </div>
                    </div>
                </div>
                <Button variant="contained" color="primary" disabled className='checkout'>Continue to Checkout</Button>
            </div>
        </div>
    );
}
