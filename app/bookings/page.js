'use client';
import { useEffect, useState } from "react";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [date, setDate] =useState("");
    const [timeSlot, setTimeSlot] = useState("")

    const fetchBookings = async () => {
        const token = localStorage.getItem("token");
        
        const res = await fetch("http://localhost:5000/api/bookings", {
            header: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
            setBookings(data);
        } else {
            setBookings([]);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const createBooking = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                date,
                time_slot: timeSlot,
            }),
        });

        const data = await res.json();
        console.log("POST response:",  data);

        if (!res.ok){
            alert('Failed to create booking: ' + JSON.stringify(data));
            return;
        }

        setDate("");
        setTimeSlot("");

        fetchBookings(); // refresh List
    };

    return (
        <div>
            <h1>Bookings</h1>

            {/* Create Bookings Form */}
            <form onSubmit={createBooking}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Time Slot (e.g 10:00 AM"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                />

                <button type="submit">Create Booking</button>

            </form>

            <hr />

            <ul>
                {bookings.map((b) => (
                    <li key={b.id}>
                        {b.date} - {b.time_slot} ({b.status})
                    </li>
                ))}
            </ul>

        </div>
    );

}




    