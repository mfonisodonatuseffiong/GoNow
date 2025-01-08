import React, { useState } from 'react';
import './Notifications.css'; // Import the CSS file for custom styles

const Notifications = () => {
  const [notifications] = useState([
    { id: 1, type: 'info', message: 'Flight AF123 is scheduled for departure at 10:00 AM.' },
    { id: 2, type: 'warning', message: 'Flight AF456 has been delayed due to weather conditions.' },
    { id: 3, type: 'error', message: 'Flight AF789 has been cancelled due to mechanical issues.' }
  ]);

  const renderNotification = (notification) => {
    let notificationClass = '';
    
    switch (notification.type) {
      case 'info':
        notificationClass = 'alert-info';
        break;
      case 'warning':
        notificationClass = 'alert-warning';
        break;
      case 'error':
        notificationClass = 'alert-danger';
        break;
      default:
        notificationClass = 'alert-secondary';
    }

    return (
      <div key={notification.id} className={`alert ${notificationClass} mt-2`}>
        {notification.message}
      </div>
    );
  };

  return (
    <div className="container mt-4 notifications-page">
      <h2>Notifications</h2>
      
      {notifications.length === 0 ? (
        <div className="alert alert-info">No new notifications.</div>
      ) : (
        notifications.map(renderNotification)
      )}
    </div>
  );
};

export default Notifications;
