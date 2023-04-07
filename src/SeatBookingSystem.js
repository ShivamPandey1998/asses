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

  return (
    <div>
      <h1>Train Seat Booking System</h1>
      <div>
        <label htmlFor="numSeats">Number of Seats:</label>
        <input type="number" id="numSeats" value={numSeats} onChange={handleNumSeatsChange} />
        <button onClick={handleBookSeats}>Book</button>
      </div>
      <div>
        <h2>Seat Availability:</h2>
        {seats.map((seat, index) => (
          <span
            key={index}
            className={`seat ${seat ? 'booked' : ''}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
      {seatNumbers.length > 0 && (
        <div>
          <h2>Booked Seats:</h2>
          <p>{seatNumbers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default SeatBookingSystem;
