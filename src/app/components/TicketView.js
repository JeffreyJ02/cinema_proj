import React from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './TicketView.css';
const TicketView = ({ ticketCounts, onTicketChange, maxVal }) => {
    return (
        <div className="tickets">
            <div className="adult-tickets">
                <div className="ticket-info">
                    <h3>Adult Tickets</h3>
                    <p>$10</p>
                </div>
                <div className="ticket-selector">
                    
                <IconButton aria-label="remove" onClick={() => onTicketChange("Adult", "Remove")}><RemoveIcon /></ IconButton>
                    <h3>{ticketCounts["Adult"]}</h3>
                    <IconButton aria-label="Add" onClick={() => onTicketChange("Adult", "Add", maxVal)}><AddIcon /></ IconButton>
                </div>
            </div>
            <div className="child-tickets">
                <div className="ticket-info">
                    <h3>Child Tickets</h3>
                    <p>$5</p>
                </div>
                <div className="ticket-selector">
                    <IconButton aria-label="remove" onClick={() => onTicketChange("Child", "Remove")}><RemoveIcon /></ IconButton>
                    <h3>{ticketCounts["Child"]}</h3>
                    <IconButton aria-label="Add" onClick={() => onTicketChange("Child", "Add", maxVal)}><AddIcon /></ IconButton>
                </div>
            </div>
            <div className="senior-tickets">
                <div className="ticket-info">
                    <h3>Senior Tickets</h3>
                    <p>$7</p>
                </div>
                <div className="ticket-selector">
                    <IconButton aria-label="remove" onClick={() => onTicketChange("Senior", "Remove")}><RemoveIcon /></ IconButton>
                    <h3>{ticketCounts["Senior"]}</h3>
                    <IconButton aria-label="Add" onClick={() => onTicketChange("Senior", "Add", maxVal)}><AddIcon /></ IconButton>
                </div>
            </div>
        </div>
    );
};
export default TicketView;