import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { fetchAllUsers } from "../../../../redux/LoginRegister/authSlice";
import { createNotification } from "../../../../redux/Notification/notificationSlice";

export default function ListStudents() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.allUsers);

  const [selectedClass, setSelectedClass] = useState("all");
  const [searchParent, setSearchParent] = useState("");
  const [searchChild, setSearchChild] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Notification Modal
  const [showModal, setShowModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isBroadcast, setIsBroadcast] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Filter users
  const filteredUsers = allUsers.filter((user) => {
    if (selectedClass !== "all" && !user.children?.some((c) => String(c.class) === selectedClass))
      return false;

    const matchesParent = user.parentName?.toLowerCase().includes(searchParent.toLowerCase());
    const matchesChild = user.children?.some((c) =>
      c.name?.toLowerCase().includes(searchChild.toLowerCase())
    );

    return matchesParent && (matchesChild || searchChild === "");
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openNotificationModal = (user = null, broadcast = false) => {
    setSelectedUser(user);
    setIsBroadcast(broadcast);
    setNotificationMsg("");
    setShowModal(true);
  };

  const sendNotification = () => {
    if (!notificationMsg.trim()) return alert("Veuillez saisir un message.");

    if (isBroadcast) {
  dispatch(createNotification({
    title: "Notification générale", // you can allow user to enter title too
    message: notificationMsg,
    isForAll: true,
    recipients: [] // optional
  }))
  .unwrap()
  .then(() => {
    alert("✅ Notification envoyée à tous les parents !");
  })
  .catch((err) => {
    alert("❌ Erreur: " + err.message);
  });
}else if (selectedUser) {
  dispatch(createNotification({
    title: "Notification personnelle",
    message: notificationMsg,
    isForAll: false,
    recipients: [selectedUser._id]
  }))
  .unwrap()
  .then(() => {
    alert(`✅ Notification envoyée à ${selectedUser.parentName}`);
  })
  .catch((err) => {
    alert("❌ Erreur: " + err.message);
  });
}

    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      {/* Header */}
     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-primary mb-1">
            👩‍🎓 Liste des Étudiants
          </h3>
          <p className="text-muted mb-0">
            {filteredUsers.length} parent(s) trouvé(s)
            {filteredUsers.length !== allUsers.length && ` sur ${allUsers.length}`}
          </p>
        </div>

      
      </div>

      {/* Enhanced Search Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-semibold text-primary">
                <MDBIcon fas icon="user" className="me-2" />
                Rechercher Parent
              </label>
              <div className="input-group input-group-sm">
                <MDBInput
                  value={searchParent}
                  onChange={(e) => {
                    setSearchParent(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-grow-1"
                />
                {searchParent && (
                  <MDBBtn 
                    color="light" 
                    size="sm" 
                    onClick={() => setSearchParent("")}
                    className="border"
                  >
                    <MDBIcon fas icon="times" />
                  </MDBBtn>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold text-primary">
                <MDBIcon fas icon="child" className="me-2" />
                Rechercher Enfant
              </label>
              <div className="input-group input-group-sm">
                <MDBInput
                  value={searchChild}
                  onChange={(e) => {
                    setSearchChild(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-grow-1"
                />
                {searchChild && (
                  <MDBBtn 
                    color="light" 
                    size="sm" 
                    onClick={() => setSearchChild("")}
                    className="border"
                  >
                    <MDBIcon fas icon="times" />
                  </MDBBtn>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold text-primary">
                <MDBIcon fas icon="graduation-cap" className="me-2" />
                Filtre par Classe
              </label>
              <select
                className="form-select form-select-sm"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">Toutes les classes</option>
                <option value="1">1ère année</option>
                <option value="2">2ème année</option>
                <option value="3">3ème année</option>
                <option value="4">4ème année</option>
                <option value="5">5ème année</option>
                <option value="6">6ème année</option>
              </select>
            </div>

            <div className="col-md-3">
             <MDBBtn
          color="success"
          size="sm"
          onClick={() => openNotificationModal(null, true)}
          className="mb-3 mb-md-0"
        >
          <MDBIcon fas icon="bullhorn" className="me-2" />
          Envoyer à tous
        </MDBBtn>
            </div>
          </div>

          {/* Active filters indicator */}
          {(searchParent || searchChild || selectedClass !== "all") && (
            <div className="mt-3">
              <small className="text-muted">
                Filtres actifs: 
                {searchParent && <MDBBadge color="primary" className="ms-2">Parent: {searchParent}</MDBBadge>}
                {searchChild && <MDBBadge color="success" className="ms-2">Enfant: {searchChild}</MDBBadge>}
                {selectedClass !== "all" && <MDBBadge color="info" className="ms-2">Classe: {selectedClass}ème</MDBBadge>}
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-3">
        <MDBTable align="middle" hover>
          <MDBTableHead light>
            <tr>
              <th>Parent</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Enfants</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="fw-bold">{user.parentName || "—"}</span>
                    </div>
                  </td>
                  <td>{user.email || "—"}</td>
                  <td>{user.phoneNumber || "—"}</td>
                  <td>{user.address || "—"}</td>
                  <td>
                    {user.children && user.children.length > 0 ? (
                      user.children.map((child, i) => (
                        <div key={i}>
                          👦 <strong>{child.name}</strong> — {child.class}ème
                        </div>
                      ))
                    ) : (
                      <span className="text-muted">Aucun enfant</span>
                    )}
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <MDBBtn
                      color="info"
                      size="sm"
                      rounded
                      onClick={() => openNotificationModal(user, false)}
                    >
                      <MDBIcon fas icon="bell" className="me-2" />
                      Envoyer
                    </MDBBtn>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Précédent
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Notification Modal */}
      <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon fas icon="bell" className="me-2 text-primary" />
                {isBroadcast ? "Notification à tous les parents" : "Nouvelle Notification"}
              </MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowModal(false)} />
            </MDBModalHeader>

            <MDBModalBody>
              {!isBroadcast && selectedUser && (
                <p className="fw-semibold">
                  Destinataire :{" "}
                  <span className="text-primary">{selectedUser.parentName}</span>
                </p>
              )}
              {isBroadcast && (
                <p className="fw-semibold text-success">
                  <MDBIcon fas icon="users" className="me-2" />
                  Envoyer à tous les parents
                </p>
              )}
              <MDBTextArea
                label="Contenu de la notification"
                rows={4}
                value={notificationMsg}
                onChange={(e) => setNotificationMsg(e.target.value)}
              />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setShowModal(false)}>
                Annuler
              </MDBBtn>
              <MDBBtn color={isBroadcast ? "success" : "primary"} onClick={sendNotification}>
                <MDBIcon fas icon="paper-plane" className="me-2" />
                Envoyer
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}
