import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCultures,
  createCulture,
  deleteCulture,
} from "../../../redux/cultureSlice/cultureSlice";
import CultureModal from "./CultureModal";

function CultureDashboard() {
  const dispatch = useDispatch();
  const { cultures, loading } = useSelector((state) => state.culture);
  const [selected, setSelected] = useState(null);

  // 🆕 Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCultures());
  }, [dispatch]);

  // 🆕 Handle submit new culture
  const handleAddCulture = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Veuillez remplir tous les champs !");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("createdBy", "teacherId123"); // Replace with actual logged-in teacher ID

    dispatch(createCulture(formData)).then(() => {
      setTitle("");
      setDescription("");
      setImage(null);
    });
  };

  // 🆕 Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
      dispatch(deleteCulture(id));
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌍 Culture Générale</h1>

      {/* 🆕 Add new culture form */}
      <form onSubmit={handleAddCulture} style={styles.form}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.inputFile}
        />
        <button type="submit" style={styles.addButton}>
          ➕ Ajouter
        </button>
      </form>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div style={styles.grid}>
          {cultures?.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                style={styles.image}
              />
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <div style={styles.actions}>
                <button
                  style={styles.button}
                  onClick={() => setSelected(item)}
                >
                  📖 Lire
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(item._id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <CultureModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

const styles = {
  container: { padding: "40px", background: "#f9fafb", minHeight: "100vh" },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e40af",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "20px auto",
    maxWidth: "500px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    minHeight: "80px",
  },
  inputFile: { fontSize: "15px" },
  addButton: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "12px 0",
    color: "#1e3a8a",
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "8px",
  },
  actions: { display: "flex", justifyContent: "center" },
};

export default CultureDashboard;
