import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    workshop: "",
    participants: 1,
    preferredDate: "",
    attendanceType: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = "full name must contain at least 2 chars";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "valid email is required";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      newErrors.phone = "phone must contain exactly 10 digits";
    }
    if (!formData.workshop) {
      newErrors.workshop = "workshop selection is required";
    }
    const numParticipants = Number(formData.participants);
    if (!formData.participants || numParticipants < 1 || numParticipants > 5) {
      newErrors.participants = "participants must be between 1 and 5";
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = "preferred date is required";
    }
    if (!formData.attendanceType) {
      newErrors.attendanceType = "attendance type is required";
    }
    setErrors(newErrors);
  }

  function onSubmitForm(e) {
    e.preventDefault();
    validate();
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function getClassName(inputName) {
    if (errors[inputName]) {
      return "invalid";
    }
    return "valid";
  }

  return (
    <div className="container">
      <form onSubmit={onSubmitForm}>
        <h2>Workshop Registration Form</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleOnChange}
          className={getClassName("fullName")}
        />
        {errors.fullName && <p className="error-text">{errors.fullName}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          className={getClassName("email")}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleOnChange}
          className={getClassName("phone")}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <label>Workshop</label>
        <select
          name="workshop"
          value={formData.workshop}
          onChange={handleOnChange}
          className={getClassName("workshop")}
        >
          <option value="">Select workshop</option>
          <option value="עיצוב גרפי">עיצוב גרפי</option>
          <option value="צילום">צילום</option>
          <option value="פיתוח תוכנה">פיתוח תוכנה</option>
          <option value="בניית אתרים">בניית אתרים</option>
        </select>
        {errors.workshop && <p className="error-text">{errors.workshop}</p>}

        <label>Participants</label>
        <input
          type="number"
          name="participants"
          min="1"
          max="5"
          value={formData.participants}
          onChange={handleOnChange}
          className={getClassName("participants")}
        />
        {errors.participants && (
          <p className="error-text">{errors.participants}</p>
        )}

        <label>Preferred Date</label>
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleOnChange}
          className={getClassName("preferredDate")}
        />
        {errors.preferredDate && (
          <p className="error-text">{errors.preferredDate}</p>
        )}

        <label>Attendance Type</label>
        <div className="radio-container">
          <label>
            <input
              type="radio"
              name="attendanceType"
              value="פרונטלי"
              checked={formData.attendanceType === "פרונטלי"}
              onChange={handleOnChange}
            />{" "}
            פרונטלי
          </label>
          <label>
            <input
              type="radio"
              name="attendanceType"
              value="מקוון"
              checked={formData.attendanceType === "מקוון"}
              onChange={handleOnChange}
            />{" "}
            מקוון
          </label>
        </div>
        {errors.attendanceType && (
          <p className="error-text">{errors.attendanceType}</p>
        )}

        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleOnChange}
          className={getClassName("notes")}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
