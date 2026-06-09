import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../../../utils/api';
import Upcoming from '../../Components/Upcoming/Upcoming';
import Past from '../../Components/Past/Past';
import style from './Dashboard.module.css';

export default function Dashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form/Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    host: '',
    location: '',
    date: '',
    time: '',
    reglink: '',
    completed: false,
  });

  const navigate = useNavigate();

  // Route protection check
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    } else {
      fetchEvents();
    }
  }, [navigate]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const [upcomingData, pastData] = await Promise.all([
        eventsAPI.getUpcomingEvents(),
        eventsAPI.getPastEvents(),
      ]);
      setUpcomingEvents(upcomingData);
      setPastEvents(pastData);
    } catch (err) {
      setError('Failed to fetch events from backend API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsAPI.deleteEvent(id);
      showSuccessMessage('Event deleted successfully.');
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event.');
    }
  };

  const handleComplete = async (id) => {
    try {
      await eventsAPI.completeEvent(id);
      showSuccessMessage('Event marked as completed.');
      fetchEvents();
    } catch (err) {
      setError('Failed to mark event as completed.');
    }
  };

  const showSuccessMessage = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      host: '',
      location: '',
      date: '',
      time: '',
      reglink: '',
      completed: false,
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      host: event.host || '',
      location: event.location || '',
      date: event.date || '',
      time: event.time || '',
      reglink: event.reglink || '',
      completed: event.completed || false,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingEvent) {
        await eventsAPI.updateEvent(editingEvent._id, formData);
        showSuccessMessage('Event updated successfully.');
      } else {
        await eventsAPI.addEvent(formData);
        showSuccessMessage('Event added successfully.');
      }
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event.');
    }
  };

  return (
    <div className={style.dashboardContainer}>
      {/* Top Header */}
      <header className={style.header}>
        <div className={style.headerLeft}>
          <h1 className={style.headerTitle}>Bioryx Admin Panel</h1>
          <p className={style.headerSubtitle}>Manage your organization events</p>
        </div>
        <div className={style.headerRight}>
          <button onClick={() => navigate('/')} className={style.viewSiteBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Public Site
          </button>
          <button onClick={handleLogout} className={style.logoutBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={style.mainContent}>
        {/* Status Alerts */}
        {error && (
          <div className={style.alertError}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className={style.alertSuccess}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Dashboard Stats & Add Button */}
        <section className={style.controlBar}>
          <div className={style.statsRow}>
            <div className={style.statCard}>
              <div className={style.statNumber}>{upcomingEvents.length}</div>
              <div className={style.statLabel}>Upcoming Events</div>
            </div>
            <div className={style.statCard}>
              <div className={style.statNumber}>{pastEvents.length}</div>
              <div className={style.statLabel}>Past Events</div>
            </div>
          </div>
          <button onClick={openAddModal} className={style.addEventBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create New Event
          </button>
        </section>

        {loading ? (
          <div className={style.loadingContainer}>
            <div className={style.spinner}></div>
            <p>Loading events from database...</p>
          </div>
        ) : (
          <div className={style.eventsGridSection}>
            {/* Upcoming Section */}
            <div className={style.eventsSection}>
              <div className={style.sectionHeader}>
                <h2 className={style.sectionTitle}>Upcoming Events</h2>
                <span className={style.sectionCountBadge}>{upcomingEvents.length}</span>
              </div>
              {upcomingEvents.length === 0 ? (
                <div className={style.emptyState}>
                  <p>No upcoming events active. Create one to get started!</p>
                </div>
              ) : (
                <div className={style.cardsContainer}>
                  {upcomingEvents.map((event) => (
                    <div key={event._id} className={style.cardWrapper}>
                      <Upcoming
                        id={event._id}
                        title={event.title}
                        host={event.host}
                        location={event.location}
                        date={event.date}
                        time={event.time}
                        reglink={event.reglink}
                        isAdmin={true}
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                        onUpdate={() => openEditModal(event)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Section */}
            <div className={style.eventsSection}>
              <div className={style.sectionHeader}>
                <h2 className={style.sectionTitle}>Completed Events</h2>
                <span className={style.sectionCountBadge}>{pastEvents.length}</span>
              </div>
              {pastEvents.length === 0 ? (
                <div className={style.emptyState}>
                  <p>No completed events on record.</p>
                </div>
              ) : (
                <div className={style.cardsContainer}>
                  {pastEvents.map((event) => (
                    <div key={event._id} className={style.cardWrapper}>
                      <Past
                        id={event._id}
                        title={event.title}
                        host={event.host}
                        location={event.location}
                        date={event.date}
                        time={event.time}
                        isAdmin={true}
                        onDelete={handleDelete}
                        onUpdate={() => openEditModal(event)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Form Overlay */}
      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>
                {editingEvent ? 'Update Event Details' : 'Create New Event'}
              </h3>
              <button onClick={() => setShowModal(false)} className={style.closeModalBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className={style.form}>
              <div className={style.formField}>
                <label className={style.formLabel}>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className={style.formInput}
                  placeholder="e.g. Bio-Talk: Lichens & Fungi"
                  required
                />
              </div>

              <div className={style.formField}>
                <label className={style.formLabel}>Host / Speaker Details</label>
                <input
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleFormChange}
                  className={style.formInput}
                  placeholder="e.g. Dr. Stephen Sequiera - Associate Professor"
                  required
                />
              </div>

              <div className={style.formRow}>
                <div className={style.formField}>
                  <label className={style.formLabel}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    className={style.formInput}
                    placeholder="e.g. Google Meet or Room 102"
                    required
                  />
                </div>

                <div className={style.formField}>
                  <label className={style.formLabel}>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className={style.formInput}
                    placeholder="e.g. 14 June 2026"
                    required
                  />
                </div>
              </div>

              <div className={style.formRow}>
                <div className={style.formField}>
                  <label className={style.formLabel}>Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleFormChange}
                    className={style.formInput}
                    placeholder="e.g. 7:30 PM - 8:30 PM"
                    required
                  />
                </div>

                <div className={style.formField}>
                  <label className={style.formLabel}>Registration Link (Optional)</label>
                  <input
                    type="url"
                    name="reglink"
                    value={formData.reglink}
                    onChange={handleFormChange}
                    className={style.formInput}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className={style.formCheckboxField}>
                <label className={style.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleFormChange}
                    className={style.checkboxInput}
                  />
                  Mark as Completed (Move to Past Events)
                </label>
              </div>

              <div className={style.modalFooter}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={style.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={style.saveBtn}>
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
