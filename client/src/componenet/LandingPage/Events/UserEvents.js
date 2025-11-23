import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  setFilters,
  clearError
} from '../../../redux/Events/eventsSlice';
import './UserEvents.css';
import Navbar from '../Navbar/Navbar';

const UserEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming'); // 'upcoming' ou 'all'

  useEffect(() => {
    dispatch(fetchEvents({ 
      category: selectedCategory, 
      upcoming: viewMode === 'upcoming'
    }));
  }, [dispatch, selectedCategory, viewMode]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < now) {
      return { type: 'past', message: 'Terminé', icon: '✅' };
    }
    
    if (event.registrationDeadline && new Date(event.registrationDeadline) < now) {
      return { type: 'closed', message: 'Inscriptions Fermées', icon: '🔒' };
    }
    
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return { type: 'full', message: 'Complet', icon: '🎫' };
    }
    
    return { type: 'active', message: 'Inscriptions Ouvertes', icon: '🎯' };
  };

  const categories = [
    { value: 'all', label: 'Tous les Événements', icon: '🎯', color: '#6366f1' },
    { value: 'workshop', label: 'Ateliers', icon: '🔧', color: '#10b981' },
    { value: 'seminar', label: 'Séminaires', icon: '🎓', color: '#f59e0b' },
    { value: 'social', label: 'Événements Sociaux', icon: '🎉', color: '#ef4444' },
    { value: 'academic', label: 'Académique', icon: '📚', color: '#8b5cf6' },
    { value: 'sports', label: 'Sports', icon: '⚽', color: '#06b6d4' },
    { value: 'other', label: 'Autre', icon: '📅', color: '#64748b' }
  ];

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const pastEvents = events.filter(event => new Date(event.date) <= new Date());

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : '#64748b';
  };

  return (
    <>
      <Navbar />
      <br/>
      <div className="user-events-container">
        {/* Section Hero */}
        <div className="events-hero">
          <div className="hero-content">
            <h1 className="hero-title">Événements </h1>
            <p className="hero-subtitle">
              Découvrez des événements passionnants, des ateliers et des activités organisés dans notre école. 
              Restez informé de tout ce qui se passe !
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">{upcomingEvents.length}</div>
              <div className="stat-label">Événements à Venir</div>
            </div>
            <div className="stat">
              <div className="stat-number">{pastEvents.length}</div>
              <div className="stat-label">Événements Passés</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Section Contrôles */}
        <div className="events-controls">
          {/* Filtres par Catégorie */}
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.value}
                className={`category-filter ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
                style={{ '--category-color': category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Toggle de Vue */}
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'upcoming' ? 'active' : ''}`}
              onClick={() => setViewMode('upcoming')}
            >
              📅 Événements à Venir
            </button>
            <button
              className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              📚 Tous les Événements
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des événements...</p>
          </div>
        ) : (
          <>
            {/* Section Événements à Venir */}
            {upcomingEvents.length > 0 && (
              <section className="events-section">
                <div className="section-header">
                  <h2>Événements à Venir</h2>
                  <span className="event-count">{upcomingEvents.length} événements</span>
                </div>
                <div className="events-grid">
                  {upcomingEvents.map(event => {
                    const status = getEventStatus(event);
                    return (
                      <div key={event._id} className="event-card">
                        <div 
                          className="event-category-badge"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        >
                          {event.category}
                        </div>
                        
                        <div className="event-header">
                          <h3 className="event-title">{event.title}</h3>
                          <div className={`event-status ${status.type}`}>
                            <span className="status-icon">{status.icon}</span>
                            {status.message}
                          </div>
                        </div>

                        <p className="event-description">{event.description}</p>

                        <div className="event-details">
                          <div className="detail-item">
                            <span className="detail-icon">📅</span>
                            <div className="detail-content">
                              <strong>{formatDate(event.date)}</strong>
                              <span>à {formatTime(event.time)}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <span className="detail-icon">📍</span>
                            <div className="detail-content">
                              <strong>Lieu</strong>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <div className="detail-item">
                            <span className="detail-icon">👤</span>
                            <div className="detail-content">
                              <strong>Organisateur</strong>
                              <span>{event.organizer}</span>
                            </div>
                          </div>

                          {event.maxParticipants && (
                            <div className="detail-item">
                              <span className="detail-icon">👥</span>
                              <div className="detail-content">
                                <strong>Participants</strong>
                                <span>{event.currentParticipants} / {event.maxParticipants} inscrits</span>
                              </div>
                            </div>
                          )}

                          {event.registrationDeadline && (
                            <div className="detail-item">
                              <span className="detail-icon">⏰</span>
                              <div className="detail-content">
                                <strong>Date limite d'inscription</strong>
                                <span>{formatDate(event.registrationDeadline)}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="event-contact">
                          <span className="contact-label">Contact : </span>
                          <a href={`mailto:${event.contactEmail}`} className="contact-email">
                            {event.contactEmail}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Section Événements Passés */}
            {viewMode === 'all' && pastEvents.length > 0 && (
              <section className="events-section past-events-section">
                <div className="section-header">
                  <h2>Événements Passés</h2>
                  <span className="event-count">{pastEvents.length} événements</span>
                </div>
                <div className="events-grid past-events-grid">
                  {pastEvents.map(event => (
                    <div key={event._id} className="event-card past-event">
                      <div 
                        className="event-category-badge"
                        style={{ backgroundColor: getCategoryColor(event.category) }}
                      >
                        {event.category}
                      </div>
                      
                      <div className="event-header">
                        <h3 className="event-title">{event.title}</h3>
                        <div className="event-status past">
                          <span className="status-icon">✅</span>
                          Terminé
                        </div>
                      </div>

                      <p className="event-description">{event.description}</p>

                      <div className="event-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <div className="detail-content">
                            <strong>{formatDate(event.date)}</strong>
                            <span>à {formatTime(event.time)}</span>
                          </div>
                        </div>
                        
                        <div className="detail-item">
                          <span className="detail-icon">📍</span>
                          <div className="detail-content">
                            <strong>Lieu</strong>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.maxParticipants && (
                          <div className="detail-item">
                            <span className="detail-icon">👥</span>
                            <div className="detail-content">
                              <strong>Participants</strong>
                              <span>{event.currentParticipants} participants</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {events.length === 0 && (
              <div className="no-events">
                <div className="no-events-icon">📅</div>
                <h3>Aucun événement trouvé</h3>
                <p>
                  {selectedCategory !== 'all' ? 
                    `Aucun ${categories.find(c => c.value === selectedCategory)?.label?.toLowerCase()} disponible pour le moment.` : 
                    'Aucun événement programmé actuellement. Revenez plus tard pour les mises à jour !'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserEvents;