import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TableOfContents from '../components/TableOfContents';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('hero.title')} - ${t('hero.subtitle')}`;
  }, [t]);

  return (
    <div className="home">
      <SearchBar />
      <TableOfContents />

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <h2>{t('hero.subtitle')}</h2>
          <p>{t('hero.description')}</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="section">
        <div className="container">
          <h2>{t('sections.introduction.title')}</h2>
          <p>{t('sections.introduction.content')}</p>
        </div>
      </section>

      {/* What is Context Section */}
      <section id="what-is-context" className="section">
        <div className="container">
          <h2>{t('sections.whatIsContext.title')}</h2>
          <p>{t('sections.whatIsContext.definition')}</p>

          <div className="context-categories">
            <div className="category-card">
              <h3>{t('sections.whatIsContext.categories.instructional.title')}</h3>
              <p>{t('sections.whatIsContext.categories.instructional.description')}</p>
            </div>
            <div className="category-card">
              <h3>{t('sections.whatIsContext.categories.informational.title')}</h3>
              <p>{t('sections.whatIsContext.categories.informational.description')}</p>
            </div>
            <div className="category-card">
              <h3>{t('sections.whatIsContext.categories.actionable.title')}</h3>
              <p>{t('sections.whatIsContext.categories.actionable.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Context Engineering Section */}
      <section id="what-is-context-engineering" className="section">
        <div className="container">
          <h2>{t('sections.whatIsContextEngineering.title')}</h2>
          <p>{t('sections.whatIsContextEngineering.definition')}</p>
          <p>{t('sections.whatIsContextEngineering.goal')}</p>
        </div>
      </section>

      {/* Why Important Section */}
      <section id="why-important" className="section">
        <div className="container">
          <h2>{t('sections.whyImportant.title')}</h2>

          <div className="subsection">
            <h3>{t('sections.whyImportant.contextRot.title')}</h3>
            <p>{t('sections.whyImportant.contextRot.description')}</p>
          </div>

          <div className="subsection">
            <h3>{t('sections.whyImportant.simpleAccumulation.title')}</h3>
            <p>{t('sections.whyImportant.simpleAccumulation.description')}</p>
          </div>
        </div>
      </section>

      {/* Core Practices Section */}
      <section id="core-practices" className="section">
        <div className="container">
          <h2>{t('sections.corePractices.title')}</h2>

          <div className="practices-grid">
            <div className="practice-card">
              <h3>{t('sections.corePractices.writing.title')}</h3>
              <p>{t('sections.corePractices.writing.description')}</p>
            </div>
            <div className="practice-card">
              <h3>{t('sections.corePractices.selection.title')}</h3>
              <p>{t('sections.corePractices.selection.description')}</p>
            </div>
            <div className="practice-card">
              <h3>{t('sections.corePractices.compression.title')}</h3>
              <p>{t('sections.corePractices.compression.description')}</p>
            </div>
            <div className="practice-card">
              <h3>{t('sections.corePractices.isolation.title')}</h3>
              <p>{t('sections.corePractices.isolation.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Strategies Section */}
      <section id="advanced-strategies" className="section">
        <div className="container">
          <h2>{t('sections.advancedStrategies.title')}</h2>

          <div className="subsection">
            <h3>{t('sections.advancedStrategies.twoStageRetrieval.title')}</h3>
            <p>{t('sections.advancedStrategies.twoStageRetrieval.description')}</p>
          </div>

          <div className="subsection">
            <h3>{t('sections.advancedStrategies.generativeBenchmarking.title')}</h3>
            <p>{t('sections.advancedStrategies.generativeBenchmarking.description')}</p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="section">
        <div className="container">
          <h2>{t('sections.conclusion.title')}</h2>
          <p>{t('sections.conclusion.content')}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;