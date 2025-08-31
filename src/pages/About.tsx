import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('about.title')} - Context Engineering`;
  }, [t]);

  return (
    <div className="about">
      <div className="container">
        <h1>{t('about.title')}</h1>

        {/* Introduction Section */}
        <section className="section">
          <h2>{t('about.introduction.title')}</h2>
          <p>{t('about.introduction.content')}</p>
        </section>

        {/* Vision Section */}
        <section className="section">
          <h2>{t('about.vision.title')}</h2>
          <p>{t('about.vision.content')}</p>
        </section>

        {/* What We Do Section */}
        <section className="section">
          <h2>{t('about.whatWeDo.title')}</h2>

          <div className="services-grid">
            <div className="service-card">
              <h3>{t('about.whatWeDo.memory.title')}</h3>
              <p>{t('about.whatWeDo.memory.description')}</p>
            </div>
            <div className="service-card">
              <h3>{t('about.whatWeDo.retrieval.title')}</h3>
              <p>{t('about.whatWeDo.retrieval.description')}</p>
            </div>
            <div className="service-card">
              <h3>{t('about.whatWeDo.optimization.title')}</h3>
              <p>{t('about.whatWeDo.optimization.description')}</p>
            </div>
            <div className="service-card">
              <h3>{t('about.whatWeDo.architecture.title')}</h3>
              <p>{t('about.whatWeDo.architecture.description')}</p>
            </div>
            <div className="service-card">
              <h3>{t('about.whatWeDo.evaluation.title')}</h3>
              <p>{t('about.whatWeDo.evaluation.description')}</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section">
          <h2>{t('about.team.title')}</h2>
          <p>{t('about.team.content')}</p>
        </section>

        {/* Contact Section */}
        <section className="section">
          <h2>{t('about.contact.title')}</h2>
          <p>{t('about.contact.content')}</p>
        </section>
      </div>
    </div>
  );
};

export default About;