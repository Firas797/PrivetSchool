import React, { useEffect, useState } from "react";
import "./Culture.css";

function Culture() {
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCultures = async () => {
    try {
      const res = await fetch("https://privetschool-backend.ohbjmh.easypanel.host/api/culture");
      const data = await res.json();
      setCultures(data);
    } catch (err) {
      console.error("Error fetching cultures:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCultures();
  }, []);

  return (
    <div className="culture-container">
      <h1 className="culture-title">📚 الثقافة العامة</h1>

      {loading ? (
        <p className="culture-text">جاري التحميل...</p>
      ) : cultures.length === 0 ? (
        <p className="culture-text">محتوى ثقافي متنوع قريباً...</p>
      ) : (
        <div className="culture-grid">
          {cultures.map((item) => (
            <div key={item._id} className="culture-card">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="culture-image"
                onClick={() =>
                  setSelectedImage(`http://localhost:5000${item.image}`)
                }
              />

              <h3 className="culture-card-title">{item.title}</h3>

              <p className="culture-card-desc">
                {expanded[item._id]
                  ? item.description
                  : item.description.slice(0, 100) +
                    (item.description.length > 100 ? "..." : "")}

                {item.description.length > 100 && (
                  <span
                    className="read-more-btn"
                    onClick={() => toggleReadMore(item._id)}
                  >
                    {expanded[item._id] ? " إظهار أقل" : " اقرأ المزيد"}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} className="image-modal-content" alt="Full" />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: "40px 20px",
    textAlign: "center",
    direction: "rtl", // ✅ Arabic text direction
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "30px",
  },
  text: {
    color: "#4b5563",
    fontSize: "18px",
  },
  grid: {
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
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "10px",
    color: "#1e3a8a",
  },
  cardDesc: {
    color: "#374151",
    marginTop: "10px",
    lineHeight: "1.6",
  },
};

export default Culture;
