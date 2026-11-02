import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI, bannerAPI } from '../../../utils/api';
import Upcoming from '../../Components/Upcoming/Upcoming';
import Past from '../../Components/Past/Past';
import { motion } from 'framer-motion';
import style from './Dashboard.module.css';

export default function Dashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Banner States
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [currentBannerUrl, setCurrentBannerUrl] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(false);

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
  const pastRef = useRef(null);

  // Route protection check
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    } else {
      fetchEvents();
      fetchCurrentBanner();
    }
  }, [navigate, currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const [upcomingData, pastData] = await Promise.all([
        eventsAPI.getUpcomingEvents(),
        eventsAPI.getPastEvents(currentPage),
      ]);
      setUpcomingEvents(upcomingData);
      setPastEvents(pastData.events);
      setTotalPages(pastData.total);
    } catch (err) {
      setError('Failed to fetch events from backend API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Banner handlers
  const fetchCurrentBanner = async () => {
    try {
      const result = await bannerAPI.checkBannerExists();
      if (result.exists && result.data) {
        const url = URL.createObjectURL(result.data);
        setCurrentBannerUrl(url);
      } else {
        setCurrentBannerUrl(null);
      }
    } catch {
      setCurrentBannerUrl(null);
    }
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleBannerUpload = async () => {
    if (!bannerFile) return;
    setBannerLoading(true);
    try {
      await bannerAPI.uploadBanner(bannerFile);
      showSuccessMessage('Banner uploaded successfully!');
      setBannerFile(null);
      setBannerPreview(null);
      fetchCurrentBanner();
    } catch (err) {
      setError('Failed to upload banner.');
    } finally {
      setBannerLoading(false);
    }
  };

  const handleBannerDelete = async () => {
    if (!window.confirm('Are you sure you want to delete the banner? The homepage will show the default banner.')) return;
    setBannerLoading(true);
    try {
      await bannerAPI.deleteBanner();
      showSuccessMessage('Banner deleted. Default banner will now be shown.');
      setCurrentBannerUrl(null);
    } catch (err) {
      setError('Failed to delete banner.');
    } finally {
      setBannerLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (pastRef.current) {
      pastRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

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

        {/* Banner Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={style.bannerSection}
        >
          <h1 className={style.bannerSectionTitle}>WEBSITE BANNER</h1>
          <div className={style.headerLine}></div>

          <div className={style.bannerManagement}>
            {/* Current Banner Preview */}
            <div className={style.bannerPreviewArea}>
              <label className={style.bannerPreviewLabel}>Current Homepage Banner:</label>
              {currentBannerUrl ? (
                <div className={style.bannerImageWrapper}>
                  <img src={currentBannerUrl} alt="Current Banner" className={style.bannerPreviewImg} />
                  <span className={style.bannerBadge}>Custom Banner Active</span>
                </div>
              ) : (
                <div className={style.bannerPlaceholder}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <p>No custom banner uploaded. Default animated banner is active.</p>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className={style.bannerUploadControls}>
              <label className={style.bannerPreviewLabel}>Upload New Banner:</label>
              <div className={style.bannerFileRow}>
                <label className={style.bannerFileLabel}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  {bannerFile ? bannerFile.name : 'Choose Image File'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleBannerFileChange}
                    className={style.bannerFileInput}
                  />
                </label>
              </div>

              {/* New file preview */}
              {bannerPreview && (
                <div className={style.bannerNewPreview}>
                  <label className={style.bannerPreviewLabel}>Preview:</label>
                  <img src={bannerPreview} alt="New banner preview" className={style.bannerPreviewImg} />
                </div>
              )}

              <div className={style.bannerActions}>
                <button
                  onClick={handleBannerUpload}
                  disabled={!bannerFile || bannerLoading}
                  className={style.bannerUploadBtn}
                >
                  {bannerLoading ? 'Uploading...' : (currentBannerUrl ? 'Replace Banner' : 'Upload Banner')}
                </button>
                {currentBannerUrl && (
                  <button
                    onClick={handleBannerDelete}
                    disabled={bannerLoading}
                    className={style.bannerDeleteBtn}
                  >
                    {bannerLoading ? 'Deleting...' : 'Delete Banner'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className={style.events}>
          {/* Upcoming Events Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={style.event}
          >
            <div className={style.upcomingHeader}>
              <h1>UPCOMING EVENTS</h1>
              <button onClick={openAddModal} className={style.addEventBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create New Event
              </button>
            </div>
            <div className={style.headerLine}></div>
            
            {loading ? (
              <div className={style.loadingContainer}>
                <div className={style.spinner}></div>
                <p>Loading events...</p>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className={style.emptyState}>
                <p>No upcoming events. Create one to get started!</p>
              </div>
            ) : (
              <motion.div 
                className={style.cards}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
              >
                {upcomingEvents.map((event) => (
                  <div key={event._id} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
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
              </motion.div>
            )}
          </motion.div>

          {/* Past Events Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={style.event}
            ref={pastRef}
          >
            <h1>COMPLETED EVENTS</h1>
            <div className={style.headerLine}></div>
            
            {loading ? (
              <div className={style.loadingContainer}>
                <div className={style.spinner}></div>
                <p>Loading events...</p>
              </div>
            ) : pastEvents.length === 0 ? (
              <div className={style.emptyState}>
                <p>No completed events on record.</p>
              </div>
            ) : (
              <motion.div 
                className={style.cards}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                  }
                }}
              >
                {pastEvents.map((event) => (
                  <div key={event._id} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '500px' }}>
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
              </motion.div>
            )}

            {/* Pagination Controls */}
            <div className={style.pages}>
              <button 
                className={style.pagebtn}
                disabled={currentPage === 1}
                onClick={prevPage}
              >
                PREV
              </button>
              <span className={style.pageNumber}>{currentPage}</span>
              <button 
                className={style.pagebtn}
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                NEXT
              </button>
            </div>
          </motion.div>
        </div>
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
                    placeholder="Only add date in format: YYYY-MM-DD"
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
