import React, { useState } from "react";
import "./XModal.css"; // Import your CSS file for styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setValidationErrors({ ...validationErrors, [id]: "" });
  };

  const validateForm = () => {
    const { username, email, dob, phone } = formData;

    const errors = {};

    if (!username) {
      errors.username = "Please enter a username.";
    }

    if (!email || !email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (!dob) {
      errors.dob = "Please enter a date of birth.";
    }

    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Perform submit logic here (e.g., send data to server)

      // Close the modal and reset form data
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <div className="error-message">{validationErrors.username}</div>

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="error-message">{validationErrors.email}</div>

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              <div className="error-message">{validationErrors.dob}</div>

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <div className="error-message">{validationErrors.phone}</div>

              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
