import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = `${t('contact.title')} - Context Engineering`;
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="container">
        <h1>{t('contact.title')}</h1>
        <p className="contact-subtitle">{t('contact.subtitle')}</p>

        {/* Introduction */}
        <section className="section">
          <p>{t('contact.introduction')}</p>
        </section>

        {/* Contact Form */}
        <section className="section">
          <div className="contact-content">
            <div className="contact-form">
              <h2>{t('contact.form.submit')}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="info-card">
                <h3>{t('contact.info.title')}</h3>
                <p>{t('contact.info.email')}</p>
                <p>{t('contact.info.response')}</p>
              </div>
              <div className="info-card">
                <h3>{t('contact.social.title')}</h3>
                <p>{t('contact.social.description')}</p>
                {/* Add social media links here when available */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;