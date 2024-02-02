import React, { useState, useRef, useEffect } from "react";
import "./XModal.css"; // Import your CSS file for styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const modalContentRef = useRef();

  const validateForm = () => {
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const currentDate = new Date();
    const enteredDate = new Date(dob);

    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Fill Details</h4>
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

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
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
