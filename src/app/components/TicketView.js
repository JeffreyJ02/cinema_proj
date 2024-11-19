import React from "react";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './TicketView.css';
const TicketView = ({}) => {
    return (
        <div className="tickets">
            <div className="adult-tickets">
                <div className="ticket-info">
                    <h3>Adult Tickets</h3>
                    <p>$5</p>
                </div>
                <div className="ticket-selector">
                    <IconButton aria-label="remove"><RemoveIcon /></ IconButton>
                    <h3>0</h3>
                    <IconButton aria-label="Add"><AddIcon /></ IconButton>
                </div>
            </div>
            <div className="child-tickets">
                <div className="ticket-info">
                    <h3>Child Tickets</h3>
                    <p>$5</p>
                </div>
                <div className="ticket-selector">
                    <IconButton aria-label="remove"><RemoveIcon /></ IconButton>
                    <h3>0</h3>
                    <IconButton aria-label="Add"><AddIcon /></ IconButton>
                </div>
            </div>
            <div className="senior-tickets">
                <div className="ticket-info">
                    <h3>Senior Tickets</h3>
                    <p>$5</p>
                </div>
                <div className="ticket-selector">
                    <IconButton aria-label="remove"><RemoveIcon /></ IconButton>
                    <h3>0</h3>
                    <IconButton aria-label="Add"><AddIcon /></ IconButton>
                </div>
            </div>
            <div className="summary">
                <h3>Total</h3>
                <p>$0</p>
            </div>
        </div>
    );
};
export default TicketView;