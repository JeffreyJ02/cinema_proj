import React from 'react';

function ShowtimeButtons() {
    return (
        <div>
            {/* Sample button list TODO make dynamic */}
            <button class="btn btn-primary" data-bs-toggle="button" disabled type="button">1:00</button>
            <button class="btn btn-primary" data-bs-toggle="button" type="button">3:00</button>
            <button class="btn btn-primary" data-bs-toggle="button" type="button">5:00</button>
        </div>
    );
};
export default ShowtimeButtons;