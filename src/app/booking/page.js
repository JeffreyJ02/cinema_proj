'use client'
{/* use client, components are server*/}

import React, { useState } from 'react';
import CustomNavbar from '../components/CustomNavbar';
import DateCarousel from '../components/DateCarousel';
import ShowtimeButtons from '../components/ShowtimeButtons';
import BookingTabs from '../components/BookingTabs';

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <CustomNavbar />
            <h1>Booking</h1>
            <>
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
                    {/* Conditionally render content based on the active tab */}
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
                        Profile Content
                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`}
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                    >
                        Contact Content
                    </div>
                </div>
            </>
        </div>
    );
}