import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './css/FloatingButton.css';

const FloatingButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_u19k564',
        'template_fjllnd3',
        e.target,
        'Clu803AqagLSYDhng'
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessage('');
          setShowPopup(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <button className="floating-button" onClick={() => setShowPopup(true)}>
      Un feedback ?
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={sendEmail}>
              <h2>Envoyer un feedback</h2>
              <textarea
                name="message"
                placeholder="Votre message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <input type="hidden" name="contact_email" value="benjilanery@gmail.com" />
              <button type="submit">Envoyer</button>
            </form>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
