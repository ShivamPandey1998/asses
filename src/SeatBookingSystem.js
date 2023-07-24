import React, { useState } from 'react';

function SeatBookingSystem() {
  const [seats, setSeats] = useState(Array(80).fill(false));
  const [numSeats, setNumSeats] = useState(0);
  const [seatNumbers, setSeatNumbers] = useState([]);

  function handleNumSeatsChange(e) {
    setNumSeats(parseInt(e.target.value));
  }

  function handleBookSeats() {
    const seatsToBook = [];
    let i = 0;
    while (seatsToBook.length < numSeats && i < seats.length) {
      if (!seats[i] && (i % 7 !== 6 || numSeats === 1)) {
        seatsToBook.push(i);
      } else {
        seatsToBook.length = 0;
      }
      i++;
    }
    if (seatsToBook.length === numSeats) {
      setSeatNumbers(seatsToBook.map((seat) => seat + 1));
      setSeats(
        seats.map((seat, index) => (seatsToBook.includes(index) ? true : seat))
      );
    } else {
      alert('Unable to book seats. Please select a different number of seats.');
    }
  }

  // Divide seats into rows of seven
  const seatRows = [];
  for (let i = 0; i < seats.length; i += 7) {
    const rowSeats = seats.slice(i, i + 7);
    seatRows.push(rowSeats);
  }

  return (
    <div className="seat-booking-system">
      <h1 className="title">Train Seat Booking System</h1>
      <div className="centered-content">
        <div className="seat-selection">
          <label htmlFor="numSeats" className="label">Number of Seats:</label>
          <input type="number" id="numSeats" className="input" value={numSeats} onChange={handleNumSeatsChange} />
          <button className="button" onClick={handleBookSeats}>Book</button>
        </div>
      </div>
    <div className="coach-container">
      {/* Create rows with 7 seats each */}
      {seatRows.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {/* Display 7 seats in each row */}
          {row.map((seat, colIndex) => (
            <span
              key={colIndex}
              className={`seat ${seat ? 'booked' : ''}`}
            >
              {rowIndex * 7 + colIndex + 1}
            </span>
          ))}
        </div>
      ))}
    </div>
    {seatNumbers.length > 0 && (
       <div className="booked-seats">
       <h2>Booked Seats:</h2>
       <p>{seatNumbers.join(', ')}</p>
     </div>
    )}
  </div>
  );
}

export default SeatBookingSystem;
