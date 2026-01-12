import React, { useEffect, useState } from "react";
import "./Culture.css";

function Culture() {
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🖼️ Image Modal State
  const [selectedImage, setSelectedImage] = useState(null);

  // 📖 Read More State
  const [expanded, setExpanded] = useState({});

  // 📌 Toggle Read More
  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchCultures = async () => {
    try {
      const res = await fetch(
        "https://privetschool-backend.ohbjmh.easypanel.host/api/culture"
      );
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
              {/* IMAGE + MODAL TRIGGER */}
              <img
                src={`https://privetschool-backend.ohbjmh.easypanel.host${item.image}`}
                alt={item.title}
                className="culture-image"
                onClick={() =>
                  setSelectedImage(`https://privetschool-backend.ohbjmh.easypanel.host${item.image}`)
                }
              />

              {/* TITLE */}
              <h3 className="culture-card-title">{item.title}</h3>

              {/* DESCRIPTION + READ MORE */}
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

export default Culture;
