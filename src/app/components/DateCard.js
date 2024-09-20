import React from 'react';

export default function DateCard( {current} ) {
    return (
        <div className='card'>
            <h2>{current.toLocaleDateString('en-US', {weekday: 'short'})}</h2>  {/* Shortened weekday */}
            <h5>{current.toLocaleDateString('en-US', {month: 'short'})}</h5>    {/* Shortened month */}
            <h3>{current.getDate()}</h3>                                  {/* Day of the month */}
        </div>
    );
};