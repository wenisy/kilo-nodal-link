import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" aria-label="Context Engineering - Go to homepage">
            <img src="/favicon.svg" alt="Context Engineering Logo" className="nav-logo" />
            Context Engineering
          </Link>
        </div>
        <ul className="nav-links" role="list">
          <li role="listitem">
            <Link to="/" aria-current={window.location.pathname === '/' ? 'page' : undefined}>
              {t('nav.home')}
            </Link>
          </li>
          <li role="listitem">
            <Link to="/about" aria-current={window.location.pathname === '/about' ? 'page' : undefined}>
              {t('nav.about')}
            </Link>
          </li>
          <li role="listitem">
            <Link to="/blog" aria-current={window.location.pathname === '/blog' ? 'page' : undefined}>
              {t('nav.blog')}
            </Link>
          </li>
          <li role="listitem">
            <Link to="/contact" aria-current={window.location.pathname === '/contact' ? 'page' : undefined}>
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;