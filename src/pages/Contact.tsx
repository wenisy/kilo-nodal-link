import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact">
      <div className="container">
        <h1>{t('nav.contact')}</h1>
        <p>This is the contact page for Context Engineering.</p>
        <p>Contact information will be added here.</p>
      </div>
    </div>
  );
};

export default Contact;