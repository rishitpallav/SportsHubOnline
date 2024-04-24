import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';

const ConfirmationPage = ({ eventName, eventDate, eventLocation, ticketType, totalPrice }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Booking Confirmation</h2>
      <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <h3>{eventName}</h3>
        <p>Date: {eventDate}</p>
        <p>Location: {eventLocation}</p>
        <p>Ticket Type: {ticketType}</p>
        <p>Total Price: ${totalPrice}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
        <p style={{ marginLeft: '10px', fontSize: '18px' }}>Your payment was successful!</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value={`Event: ${eventName}\nDate: ${eventDate}\nLocation: ${eventLocation}\nTicket Type: ${ticketType}\nTotal Price: $${totalPrice}`} />
      </div>
    </div>
  );
};
// {/* Dialog for Confirmation Page */}
// <Dialog open={open} onClose={handleClose}>
// <DialogContent>
//   <ConfirmationPage
//     eventName={name}
//     eventDate={`${Date} ${Time}`}
//     eventLocation={stadium}
//     ticketType={type}
//     onClose={handleClose} 
//   />
// </DialogContent>
// </Dialog>
export default ConfirmationPage;
