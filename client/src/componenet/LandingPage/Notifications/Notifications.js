import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBBadge,
  MDBSpinner,
  MDBContainer,
} from "mdb-react-ui-kit";
import { 
  fetchUserNotifications, 
  markNotificationAsRead, 
  markAllAsRead 
} from "../../../redux/Notification/notificationSlice";
import Navbar from "../Navbar/Navbar";

export default function Notifications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userNotifications: allNotifications, loading } = useSelector((state) => state.notifications);

  const [activeFilter, setActiveFilter] = useState("all"); // all, unread, read
  const [processingIds, setProcessingIds] = useState(new Set());

  // Fetch user notifications (personal + forall)
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserNotifications(user._id));
    }
  }, [dispatch, user]);

  // Map notifications to include read status for current user
  const notifications = allNotifications.map((notif) => ({
    ...notif,
    read: notif.readBy?.includes(user._id)
  }));

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "read") return n.read;
    return true;
  });

  const handleMarkAsRead = async (id) => {
    setProcessingIds(prev => new Set(prev).add(id));
    await dispatch(markNotificationAsRead({ notificationId: id, userId: user._id }));
    setProcessingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount > 0) {
      await dispatch(markAllAsRead(user._id));
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="text-center">
            <MDBSpinner size="lg" className="me-3" />
            <p className="mt-2 text-muted">Chargement des notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <MDBContainer className="py-4">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h1 className="h2 fw-bold text-primary mb-2">
              <MDBIcon fas icon="bell" className="me-3" />
              Mes Notifications
            </h1>
            <p className="text-muted mb-0">
              {unreadCount > 0 
                ? `${unreadCount} notification(s) non lue(s)`
                : "Toutes vos notifications sont à jour"}
            </p>
          </div>

          {/* Action buttons */}
          {notifications.length > 0 && (
            <div className="d-flex flex-wrap gap-2">
              {unreadCount > 0 && (
                <MDBBtn color="success" size="sm" onClick={handleMarkAllAsRead}>
                  <MDBIcon fas icon="check-double" className="me-2" />
                  Tout marquer comme lu
                </MDBBtn>
              )}
              <MDBBtn color="outline-primary" size="sm" onClick={() => dispatch(fetchUserNotifications(user._id))}>
                <MDBIcon fas icon="sync" className="me-2" />
                Actualiser
              </MDBBtn>
            </div>
          )}
        </div>

        {/* Filter tabs */}
        {notifications.length > 0 && (
          <div className="card shadow-sm mb-4">
            <div className="card-body py-3">
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span className="fw-semibold text-muted me-2">Filtrer:</span>
                {[
                  { key: "all", label: "Toutes", count: notifications.length },
                  { key: "unread", label: "Non lues", count: unreadCount },
                  { key: "read", label: "Lues", count: notifications.length - unreadCount }
                ].map(filter => (
                  <MDBBtn
                    key={filter.key}
                    color={activeFilter === filter.key ? "primary" : "light"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.key)}
                    className="d-flex align-items-center"
                  >
                    {filter.label}
                    <MDBBadge color={activeFilter === filter.key ? "light" : "primary"} className="ms-2">
                      {filter.count}
                    </MDBBadge>
                  </MDBBtn>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="card shadow-sm">
            <div className="card-body text-center py-5">
              <MDBIcon 
                fas 
                icon={activeFilter === "all" ? "inbox" : "bell-slash"} 
                size="3x" 
                className="mb-3 text-muted" 
              />
              <h5 className="text-muted mb-2">
                {activeFilter === "all" 
                  ? "Aucune notification" 
                  : `Aucune notification ${activeFilter === "unread" ? "non lue" : "lue"}`}
              </h5>
              <p className="text-muted mb-0">
                {activeFilter === "all" 
                  ? "Vous serez notifié ici des nouvelles activités."
                  : "Toutes les notifications sont marquées comme lues."}
              </p>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredNotifications
              .slice()
              .reverse()
              .map((notif) => (
                <MDBCard
                  key={notif._id}
                  className={`shadow-sm transition-hover ${notif.read ? "" : "border-start border-primary border-4"}`}
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }}
                >
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1 me-3">
                        <div className="d-flex align-items-center mb-2">
                          <MDBIcon
                            fas
                            icon={notif.read ? "envelope-open" : "envelope"}
                            className={`me-3 ${notif.read ? "text-muted" : "text-primary"}`}
                            size="lg"
                          />
                          <div className="flex-grow-1">
                            <h6 className={`fw-bold mb-1 ${notif.read ? "text-muted" : "text-dark"}`}>
                              {notif.message}
                            </h6>
                            <small className="text-muted">
                              <MDBIcon fas icon="clock" className="me-1" />
                              {new Date(notif.createdAt).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </small>
                          </div>
                        </div>
                      </div>

                      {!notif.read && (
                        <div className="d-flex">
                          <MDBBtn
                            color="outline-primary"
                            size="sm"
                            onClick={() => handleMarkAsRead(notif._id)}
                            disabled={processingIds.has(notif._id)}
                          >
                            {processingIds.has(notif._id) ? (
                              <MDBSpinner size="sm" />
                            ) : (
                              <>
                                <MDBIcon fas icon="check" className="me-1" />
                                Marquer lu
                              </>
                            )}
                          </MDBBtn>
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <MDBBadge color={notif.read ? "secondary" : "primary"} className="px-2 py-1">
                        <MDBIcon 
                          fas 
                          icon={notif.read ? "eye" : "eye-slash"} 
                          className="me-1" 
                          size="xs" 
                        />
                        {notif.read ? "Lu" : "Non lu"}
                      </MDBBadge>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))}
          </div>
        )}

        {/* Footer stats */}
        {notifications.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-muted">
              Affichage de {filteredNotifications.length} notification(s) 
              {activeFilter !== "all" && ` (${notifications.length} au total)`}
            </p>
          </div>
        )}
      </MDBContainer>
    </div>
  );
}
