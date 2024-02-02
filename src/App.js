import React, { useState } from "react";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      alert("Please fill out all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date();
    const enteredDate = new Date(dob);

    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Please enter a past date.");
      return;
    }

    // Perform submit logic here (e.g., send data to server)

    // Close the modal and reset form data
    setIsOpen(false);
    setFormData({
      username: "",
      email: "",
      dob: "",
      phone: "",
    });
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1>User Details Modal</h1>
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
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />

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
