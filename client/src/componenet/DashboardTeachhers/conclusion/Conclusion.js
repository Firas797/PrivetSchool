import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConclusions,
  createConclusion,
  deleteConclusion,
} from "../../../redux/Conclu/concluSlice";

function CreateConclusion() {
  const dispatch = useDispatch();
  const { list: conclusions, loading } = useSelector(
    (state) => state.conclusion
  );

  const [Title, setTitle] = useState("");
  const [classe, setClasse] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [category, setCategory] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    dispatch(fetchConclusions());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Title || !classe || !category || !conclusion) return;

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("classe", classe);
    formData.append("conclusion", conclusion);
    formData.append("category", category);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    dispatch(createConclusion(formData));

    setTitle("");
    setClasse("");
    setConclusion("");
    setCategory("");
    setPdfFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette conclusion ?")) {
      dispatch(deleteConclusion(id));
    }
  };

  return (
    <div style={styles.container}>
      {/* Custom CSS inside same file */}
      <style>{`
        .fade-in { animation: fadeIn 0.4s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: scale(1.03);
        }
      `}</style>

      <div style={styles.wrapper}>
        <h1 style={styles.title}>📚 Espace Professeur – Ajouter une Conclusion</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form} className="fade-in">
          <div>
            <label style={styles.label}>Titre de la conclusion</label>
            <input
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Les fractions – Chapitre 2"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Classe</label>
              <input
                type="text"
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                placeholder="Ex : 5A"
                style={styles.input}
                required
              />
            </div>

            <div>
              <label style={styles.label}>Catégorie</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex : Mathématiques / Sciences"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div>
            <label style={styles.label}>Conclusion du jour</label>
            <textarea
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              placeholder="Conclusion du jour..."
              style={styles.textarea}
              required
            ></textarea>
          </div>

          <div>
            <label style={styles.label}>Fichier PDF (optionnel)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#9ca3af" : "#2563eb",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            className="btn"
          >
            {loading ? "⏳ En cours..." : "➕ Ajouter la conclusion"}
          </button>
        </form>

        <hr style={styles.hr} />

        {/* List */}
        <div style={styles.listContainer}>
          <h2 style={styles.subtitle}>📋 Liste des Conclusions</h2>

          {loading ? (
            <p style={styles.textCenter}>Chargement...</p>
          ) : conclusions.length === 0 ? (
            <p style={styles.textCenter}>Aucune conclusion disponible pour le moment.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {conclusions.map((item) => (
                <div key={item._id} style={styles.card} className="fade-in">
                  <div style={styles.cardHeader}>
                    <div>
                      <h3 style={styles.cardTitle}>{item.Title}</h3>
                      <p style={styles.cardMeta}>
                        Classe : <strong>{item.classe}</strong> | Catégorie :{" "}
                        <strong>{item.category}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={styles.deleteBtn}
                    >
                      Supprimer
                    </button>
                  </div>

                  <p style={styles.cardText}>{item.conclusion}</p>

                  {item.pdfFile?.data && (
                    <a
                      href={`data:application/pdf;base64,${Buffer.from(
                        item.pdfFile.data
                      ).toString("base64")}`}
                      download={`${item.Title}.pdf`}
                      style={styles.downloadLink}
                    >
                      📄 Télécharger le PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    background: "linear-gradient(to bottom right, #ebf8ff, #dbeafe)",
    minHeight: "100vh",
    padding: "40px 16px",
  },
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e40af",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    maxWidth: "600px",
    margin: "0 auto",
  },
  label: {
    display: "block",
    color: "#374151",
    fontWeight: "500",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "10px 14px",
    outline: "none",
    fontSize: "15px",
    transition: "0.2s",
  },
  textarea: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "10px 14px",
    height: "120px",
    outline: "none",
    resize: "none",
    fontSize: "15px",
  },
  fileInput: {
    width: "100%",
    color: "#4b5563",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  button: {
    width: "100%",
    padding: "12px 0",
    borderRadius: "10px",
    fontWeight: "600",
    color: "white",
    border: "none",
    marginTop: "10px",
  },
  hr: {
    margin: "40px 0",
    borderColor: "#e5e7eb",
  },
  listContainer: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  subtitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: {
    color: "#1d4ed8",
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardMeta: {
    color: "#4b5563",
    fontSize: "14px",
    marginTop: "4px",
  },
  cardText: {
    color: "#374151",
    marginTop: "12px",
    lineHeight: "1.6",
  },
  deleteBtn: {
    color: "#dc2626",
    fontWeight: "600",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  downloadLink: {
    display: "inline-block",
    marginTop: "10px",
    color: "#2563eb",
    textDecoration: "underline",
    fontWeight: "500",
  },
  textCenter: {
    textAlign: "center",
    color: "#6b7280",
  },
};

export default CreateConclusion;
