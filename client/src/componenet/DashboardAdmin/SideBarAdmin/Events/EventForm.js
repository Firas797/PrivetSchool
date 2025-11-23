import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../../../../redux/Events/eventsSlice';

const EventForm = ({ event, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'atelier',
    targetAudience: ['tous'],
    maxParticipants: '',
    organizer: '',
    contactEmail: '',
    imageUrl: '',
    registrationDeadline: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        location: event.location || '',
        category: event.category || 'atelier',
        targetAudience: event.targetAudience || ['tous'],
        maxParticipants: event.maxParticipants || '',
        organizer: event.organizer || '',
        contactEmail: event.contactEmail || '',
        imageUrl: event.imageUrl || '',
        registrationDeadline: event.registrationDeadline
          ? new Date(event.registrationDeadline).toISOString().split('T')[0]
          : ''
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const currentValues = [...formData.targetAudience];
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          targetAudience: [...currentValues, value]
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          targetAudience: currentValues.filter((item) => item !== value)
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est obligatoire';
    if (!formData.description.trim()) newErrors.description = 'La description est obligatoire';
    if (!formData.date) newErrors.date = 'La date est obligatoire';
    if (!formData.time) newErrors.time = "L'heure est obligatoire";
    if (!formData.location.trim()) newErrors.location = 'Le lieu est obligatoire';
    if (!formData.organizer.trim()) newErrors.organizer = "L'organisateur est obligatoire";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "L'email de contact est obligatoire";
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "L'adresse email n'est pas valide";
    }
    if (formData.maxParticipants && formData.maxParticipants < 1) {
      newErrors.maxParticipants = 'Doit être au moins 1';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const submitData = {
        ...formData,
        maxParticipants: formData.maxParticipants
          ? parseInt(formData.maxParticipants)
          : undefined,
        registrationDeadline: formData.registrationDeadline || undefined
      };
      if (event) {
        await dispatch(updateEvent({ eventId: event._id, eventData: submitData })).unwrap();
      } else {
        await dispatch(createEvent(submitData)).unwrap();
      }
      onSuccess();
    } catch (error) {
      console.error('Échec de l’enregistrement de l’évènement :', error);
      alert("Échec de l'enregistrement de l'évènement : " + error);
    }
  };

  const categories = ['atelier', 'séminaire', 'social', 'académique', 'sportif', 'autre'];
  const audienceOptions = [
    { value: 'tous', label: 'Tous les étudiants' },
    { value: 'débutants', label: 'Nouveaux étudiants' },
    { value: 'deuxième année', label: 'Deuxième année' },
    { value: 'troisième année', label: 'Troisième année' },
    { value: 'quatrième année', label: 'Quatrième année' },
    { value: 'diplômés', label: 'Diplômés' }
  ];

  return (
    <>
      <style>
        {`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: #fff;
            border-radius: 12px;
            width: 600px;
            max-width: 95%;
            padding: 20px 25px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .modal-header h2 {
            margin: 0;
            color: #333;
          }
          .close-button {
            border: none;
            background: transparent;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          }
          .close-button:hover { color: #000; }
          .event-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .form-group {
            display: flex;
            flex-direction: column;
          }
          .form-group label {
            font-weight: 600;
            margin-bottom: 5px;
            color: #444;
          }
          .form-group input,
          .form-group textarea,
          .form-group select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.2s;
          }
          .form-group input:focus,
          .form-group textarea:focus,
          .form-group select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 4px rgba(0,123,255,0.3);
          }
          .form-row {
            display: flex;
            gap: 15px;
          }
          .form-row .form-group {
            flex: 1;
          }
          .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
          }
          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 15px;
          }
          .btn {
            padding: 10px 18px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
          }
          .btn-primary {
            background: #007bff;
            color: white;
          }
          .btn-primary:hover {
            background: #0056b3;
          }
          .btn-outline {
            background: white;
            border: 1px solid #ccc;
            color: #333;
          }
          .btn-outline:hover {
            background: #f1f1f1;
          }
          .error {
            border-color: #e74c3c;
          }
          .error-text {
            color: #e74c3c;
            font-size: 13px;
            margin-top: 3px;
          }
        `}
      </style>

      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{event ? 'Modifier un évènement' : 'Créer un nouvel évènement'}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label htmlFor="title">Titre de l’évènement *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-text">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Heure *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                />
                {errors.time && <span className="error-text">{errors.time}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Lieu *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Catégorie *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="maxParticipants">Nombre max. de participants</label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  className={errors.maxParticipants ? 'error' : ''}
                />
                {errors.maxParticipants && (
                  <span className="error-text">{errors.maxParticipants}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Public cible</label>
              <div className="checkbox-group">
                {audienceOptions.map((option) => (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={formData.targetAudience.includes(option.value)}
                      onChange={handleChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="organizer">Organisateur *</label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  className={errors.organizer ? 'error' : ''}
                />
                {errors.organizer && (
                  <span className="error-text">{errors.organizer}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Email de contact *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={errors.contactEmail ? 'error' : ''}
                />
                {errors.contactEmail && (
                  <span className="error-text">{errors.contactEmail}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="registrationDeadline">Date limite d’inscription</label>
              <input
                type="date"
                id="registrationDeadline"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">URL de l’image</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://exemple.com/image.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn btn-outline">
                Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                {event ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventForm;
