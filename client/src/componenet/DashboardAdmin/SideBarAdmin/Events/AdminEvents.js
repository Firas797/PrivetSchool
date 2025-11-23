import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  deleteEvent,
  createEvent,
  updateEvent,
  clearError
} from '../../../../redux/Events/eventsSlice';
import EventForm from './EventForm';
import './Events.css';

const AdminEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
const [deletingId, setDeletingId] = useState(null); // 👈 add this at top with useState


  useEffect(() => {
    dispatch(fetchEvents({}));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

const handleDelete = async (eventId) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet évènement ?')) {
    try {
      setDeletingId(eventId); // show spinner only for that row
      await dispatch(deleteEvent(eventId)).unwrap();
      await dispatch(fetchEvents({})); // refresh events list
      alert('Évènement supprimé avec succès ✅');
    } catch (error) {
      alert("Échec de la suppression de l'évènement : " + error);
    } finally {
      setDeletingId(null);
    }
  }
};
  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEvent(null);
    dispatch(fetchEvents({}));
    alert(editingEvent ? 'Évènement mis à jour avec succès !' : 'Évènement créé avec succès !');
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);

    if (eventDate < now) return { text: 'Terminé', class: 'completed' };
    if (event.registrationDeadline && new Date(event.registrationDeadline) < now) {
      return { text: 'Inscriptions closes', class: 'closed' };
    }
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return { text: 'Complet', class: 'full' };
    }
    return { text: 'Actif', class: 'active' };
  };

  return (
    <div className="admin-events-container">
      <div className="admin-events-header">
        <h1>Gérer les évènements</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Créer un nouvel évènement
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="admin-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un évènement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="stats">
          <span>Total d’évènements : {events.length}</span>
          <span>Actifs : {events.filter(e => getStatus(e).class === 'active').length}</span>
        </div>
      </div>

      {showForm && (
        <EventForm
          event={editingEvent}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {loading ? (
        <div className="loading">Chargement des évènements...</div>
      ) : (
        <div className="admin-events-table">
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Date & Heure</th>
                <th>Lieu</th>
                <th>Participants</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => {
                const status = getStatus(event);
                return (
                  <tr key={event._id}>
                    <td>
                      <div className="event-title-cell">
                        <strong>{event.title}</strong>
                        <small>{event.organizer}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`event-category ${event.category}`}>
                        {event.category}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div>{formatDate(event.date)}</div>
                        <small>{event.time}</small>
                      </div>
                    </td>
                    <td>{event.location}</td>
                    <td>
                      {event.maxParticipants ? 
                        `${event.currentParticipants}/${event.maxParticipants}` : 
                        event.currentParticipants
                      }
                    </td>
                    <td>
                      <span className={`status-badge ${status.class}`}>
                        {status.text}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEdit(event)}
                        >
                          Modifier
                        </button>
               <button
  className="btn btn-danger btn-sm"
  onClick={() => handleDelete(event._id)}
  disabled={deletingId === event._id}
>
  {deletingId === event._id ? 'Suppression...' : 'Supprimer'}
</button>

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredEvents.length === 0 && (
            <div className="no-events">
              {searchTerm ? 
                'Aucun évènement trouvé pour cette recherche.' : 
                'Aucun évènement créé pour le moment. Créez votre premier évènement !'
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
