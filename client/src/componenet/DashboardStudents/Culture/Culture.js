import React, { useEffect, useState } from "react";

function Culture() {
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCultures = async () => {
    try {
      const res = await fetch("https://57.131.24.227/api/culture");
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
    <div style={styles.container}>
      <h1 style={styles.title}>📚 الثقافة العامة</h1>

      {loading ? (
        <p style={styles.text}>جاري التحميل...</p>
      ) : cultures.length === 0 ? (
        <p style={styles.text}>محتوى ثقافي متنوع قريباً...</p>
      ) : (
        <div style={styles.grid}>
          {cultures.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={`https://57.131.24.227${item.image}`}
                alt={item.title}
                style={styles.image}
              />
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
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
