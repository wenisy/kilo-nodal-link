import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="container">
        <h1>{t('nav.about')}</h1>
        <p>This is the about page for Context Engineering.</p>
        <p>More content will be added here based on your requirements.</p>
      </div>
    </div>
  );
};

export default About;