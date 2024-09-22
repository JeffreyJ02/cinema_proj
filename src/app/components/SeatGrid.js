
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const SeatGrid = ( {nSeats} ) => {
    // const [toggled, setToggled] = React.useState(false);

    const handleToggle = () => {
        // TODO toggle fix
        // setToggled(!toggled);
    };

    const renderGrid = () => {
        /* Creates a list of buttons for each row, then puts that list into the list buttons 
        to create a grid of buttons with A,B,C 1 etc */
        const buttons = [];
        for (let row = 0; row < nSeats; row++) {
            const buttonRow = [];
            for (let col = 0; col < nSeats; col++) {
                buttonRow.push(
                    <Button
                        variant="primary"
                        className="seat-button"
                    >
                        {/* Button text of the row and column */}
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[row]}{col}
                    </Button>
                );
            }
            {/* Adds the row of buttons to the list of buttons */}
            buttons.push(
                <div className="button-row" key={row}>
                    {buttonRow}
                </div>
            );
        }
        return buttons;
    };

    // Returns the grid of buttons
    return (
        <div className="seat-grid">
            {renderGrid()}
        </div>
    );
};

export default SeatGrid;
