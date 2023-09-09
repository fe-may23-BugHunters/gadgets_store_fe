import React from 'react';
import './ContactsPage.scss';

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts">
      <h1 className="contacts__title">Contacts</h1>

      <p className="contacts__message">
        LinkedIn * Twitter * Telegram * WhatsApp *
      </p>
    </div>
  );
};
