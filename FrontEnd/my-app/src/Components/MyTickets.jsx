import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas'; // Import html2canvas library
import Header from "./PlainHeader";
const MyTickets = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        const response = await fetch("http://localhost:4000/getPurchases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"), 
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Purchases:", data);
          // Handle the received data here
          const past = [];
          const todayEvents = [];
          const upcoming = [];

          data.forEach(ticket => {
            const eventDate = ticket.eventDate;
            if (eventDate < today) {
              past.push(ticket);
            } else if (eventDate === today) {
              todayEvents.push(ticket);
            } else {
              upcoming.push(ticket);
            }
          });

          setPastEvents(past);
          setTodaysEvents(todayEvents);
          setUpcomingEvents(upcoming);
        } else {
          console.error("Error:", response.statusText);
          // Handle error response
        }
      } catch (error) {
        console.error("Error occurred:", error);
        // Handle errors
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleCancel = (ticketId, category) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this ticket?");
    if (confirmCancel) {
      let updatedEvents = [];
      switch (category) {
        case "past":
          updatedEvents = pastEvents.filter(ticket => ticket.eventId !== ticketId);
          setPastEvents(updatedEvents);
          break;
        case "today":
          updatedEvents = todaysEvents.filter(ticket => ticket.eventId !== ticketId);
          setTodaysEvents(updatedEvents);
          break;
        case "upcoming":
          updatedEvents = upcomingEvents.filter(ticket => ticket.eventId !== ticketId);
          setUpcomingEvents(updatedEvents);
          break;
        default:
          break;
      }
    }
  };

  const handleDownload = (ticketId) => {
    const ticketCard = document.getElementById(ticketId);
    if (ticketCard) {
      html2canvas(ticketCard, {
        useCORS: true // This will allow images from other domains to be rendered
      }).then(canvas => {
        // Convert canvas to image and trigger download
        const imageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = `ticket_${ticketId}.png`;
        link.href = imageURL;
        link.click();
      });
    }
  };

  return (
    <> <div style={{ marginBottom: "20px" }}>
    <Header/>
  </div>
    <div className="ticket-categories">
       
       <div className="ticket-category">
        <h2>Today's Events</h2>
        <div className="ticket-grid">
          {todaysEvents.map(ticket => (
            <TicketCard key={ticket.eventId} ticket={ticket} onCancel={() => handleCancel(ticket.eventId, "today")} onDownload={handleDownload} />
          ))}
        </div>
      </div>
      <div className="ticket-category">
        <h2>Upcoming Events</h2>
        <div className="ticket-grid">
          {upcomingEvents.map(ticket => (
            <TicketCard key={ticket.eventId} ticket={ticket} onCancel={() => handleCancel(ticket.eventId, "upcoming")} onDownload={handleDownload} />
          ))}
        </div>
      </div>
      <div className="ticket-category">
        <h2>Past Events</h2>
        <div className="ticket-grid">
          {pastEvents.map(ticket => (
            <TicketCard key={ticket.eventId} ticket={ticket} onCancel={() => handleCancel(ticket.eventId, "past")} onDownload={handleDownload} />
          ))}
        </div>
      </div>
     
    </div></>
  );
};

const TicketCard = ({ ticket, onCancel, onDownload }) => {
  return (
    <div className="ticket-card" id={ticket.eventId}>
      <img src={ticket.eventImage} alt="Event Thumbnail" />
      <div className="ticket-card-content">
        <h3>{ticket.eventName}</h3>
        <p>Event Date: {ticket.eventDate}</p>
        <p>No. of Tickets: {ticket.numTickets}</p>
        <p>Section: {ticket.section}</p>
        <p>Price: ${ticket.price}</p>
        <div className="button-container">
          {/* <button className="cancel-button" onClick={onCancel}>Cancel</button> */}
          <button className="download-button" onClick={() => onDownload(ticket.eventId)}>
            <i className="fa fa-download"></i> Download
          </button>
        </div>
        <div className="qr-code">
          <QRCode value={JSON.stringify(ticket)} />
        </div>
      </div>
    </div>
  );
};

export default MyTickets;

// Inline CSS remains the same

const styles = `
.ticket-categories {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ticket-category {
  margin-top: 40px;
}

.ticket-category h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.ticket-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ticket-card {
  flex: 1 1 300px; /* Set a flexible width with a minimum of 300px */
  margin-bottom: 20px;
  margin-right: 20px; 
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ticket-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.ticket-card-content {
  padding: 20px;
}

.ticket-card-content h3 {
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.ticket-card-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}

.ticket-card-content .qr-code {
  margin-top: 20px;
  text-align: center;
}

.qr-code canvas {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
}

@media (max-width: 768px) { /* Adjust styles for smaller screens */
  .ticket-card {
    flex-basis: calc(50% - 20px); /* Set the width to 50% of the container */
  }
}

@media (max-width: 480px) { /* Further adjust styles for even smaller screens */
  .ticket-card {
    flex-basis: 100%; /* Set the width to 100% of the container */
    min-width: auto; /* Remove the minimum width */
  }
}
`;

// Inject CSS
const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(styles));
document.head.appendChild(styleTag);
