import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">Context Engineering</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">{t('nav.home')}</Link>
          </li>
          <li>
            <Link to="/about">{t('nav.about')}</Link>
          </li>
          <li>
            <Link to="/contact">{t('nav.contact')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;