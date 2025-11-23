import React from "react";

function CultureModal({ item, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{item.title}</h2>
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.title}
          style={styles.image}
        />
        <p style={styles.description}>{item.description}</p>
        <button style={styles.closeBtn} onClick={onClose}>
          ❌ Fermer
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: { fontSize: "22px", fontWeight: "bold", color: "#1e3a8a" },
  image: { width: "100%", borderRadius: "10px", marginTop: "10px" },
  description: { marginTop: "15px", color: "#374151", lineHeight: "1.6" },
  closeBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default CultureModal;
