import React, { useState } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = ({ camperId }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Тут міг би бути реальний POST-запит, поки що симулюємо
    setTimeout(() => {
      setLoading(false);
      alert("✅ Your booking was successful!");
      setForm({ name: "", email: "", startDate: "", endDate: "" });
    }, 800);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Book this camper</h3>

      <input
        name="name"
        type="text"
        placeholder="Your name"
        required
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Your email"
        required
        value={form.email}
        onChange={handleChange}
      />

      <div className={styles.dates}>
        <label>
          From
          <input
            name="startDate"
            type="date"
            required
            value={form.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          To
          <input
            name="endDate"
            type="date"
            required
            value={form.endDate}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Booking…" : "Book now"}
      </button>
    </form>
  );
};

export default BookingForm;
