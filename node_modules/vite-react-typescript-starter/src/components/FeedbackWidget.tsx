import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '12px 18px',
          backgroundColor: '#7e22ce',
          color: '#fff',
          borderRadius: 50,
          border: 'none',
          zIndex: 9999,
          cursor: 'pointer',
        }}
      >
        Feedback
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}
        >
          <div style={{ position: 'relative', width: '90%', maxWidth: 400 }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 15,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              &times;
            </button>
            <FeedbackForm />
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
