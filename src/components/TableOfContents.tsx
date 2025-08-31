import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const tocItems: TOCItem[] = [
    { id: 'hero', title: t('toc.introduction'), level: 1 },
    { id: 'introduction', title: t('toc.introduction'), level: 1 },
    { id: 'what-is-context', title: t('toc.whatIsContext'), level: 1 },
    { id: 'what-is-context-engineering', title: t('toc.whatIsContextEngineering'), level: 1 },
    { id: 'why-important', title: t('toc.whyImportant'), level: 1 },
    { id: 'core-practices', title: t('toc.corePractices'), level: 1 },
    { id: 'advanced-strategies', title: t('toc.advancedStrategies'), level: 1 },
    { id: 'conclusion', title: t('toc.conclusion'), level: 1 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }

      // Show/hide TOC based on scroll position
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="toc-container">
      <div className="toc">
        <h3 className="toc-title">{t('toc.title')}</h3>
        <nav aria-label={t('toc.title')}>
          <ul className="toc-list" role="list">
            {tocItems.map((item) => (
              <li key={item.id} className={`toc-item toc-level-${item.level}`} role="listitem">
                <button
                  className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? 'true' : 'false'}
                  aria-label={`Navigate to ${item.title} section`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;