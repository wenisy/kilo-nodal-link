import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  sectionId: string;
}

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sample content data - in a real app, this would come from a more comprehensive source
  const contentData: SearchResult[] = useMemo(() => [
    {
      id: '1',
      title: t('sections.introduction.title'),
      content: t('sections.introduction.content'),
      sectionId: 'introduction'
    },
    {
      id: '2',
      title: t('sections.whatIsContext.title'),
      content: t('sections.whatIsContext.definition'),
      sectionId: 'what-is-context'
    },
    {
      id: '3',
      title: t('sections.whatIsContextEngineering.title'),
      content: t('sections.whatIsContextEngineering.definition'),
      sectionId: 'what-is-context-engineering'
    },
    {
      id: '4',
      title: t('sections.whyImportant.title'),
      content: t('sections.whyImportant.contextRot.description'),
      sectionId: 'why-important'
    },
    {
      id: '5',
      title: t('sections.corePractices.title'),
      content: t('sections.corePractices.writing.description'),
      sectionId: 'core-practices'
    }
  ], [t]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simple search implementation
    const filteredResults = contentData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
    setIsSearching(false);
  }, [query, contentData]);

  const handleResultClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setQuery('');
    setResults([]);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search-container" role="search">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="search-input"
          aria-label={t('search.placeholder')}
          aria-describedby="search-results"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="clear-button"
            aria-label={t('search.clear')}
          >
            ×
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="search-results" id="search-results" role="region" aria-label={t('search.results')}>
          <h4>{t('search.results')}</h4>
          <ul role="list">
            {results.map((result) => (
              <li key={result.id} className="search-result-item" role="listitem">
                <button
                  onClick={() => handleResultClick(result.sectionId)}
                  className="result-link"
                  aria-label={`Go to ${result.title}`}
                >
                  <strong>{result.title}</strong>
                  <p>{result.content.substring(0, 100)}...</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && results.length === 0 && !isSearching && (
        <div className="no-results" role="status" aria-live="polite">
          <p>{t('search.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;