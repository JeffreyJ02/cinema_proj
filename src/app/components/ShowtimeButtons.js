import React from 'react';
import Button from 'react-bootstrap/Button';
function ShowtimeButtons() {
    return (
        <div>
            {/* Sample button list TODO make dynamic */}
            <Button class="btn btn-primary" data-bs-toggle="button" disabled type="button">1:00</Button>
            <Button class="btn btn-primary" data-bs-toggle="button" type="button">3:00</Button>
            <Button class="btn btn-primary" data-bs-toggle="button" type="button">5:00</Button>
        </div>
    );
};
export default ShowtimeButtons;