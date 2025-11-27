import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function Emploi() {
  const user = useSelector((state) => state.auth.user);
  const [emplois, setEmplois] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Get all classes (for user or their children)
  const classes =
    user?.role === "student"
      ? [user.class]
      : user?.children?.map((child) => child.class) || [];

  const fetchEmplois = async () => {
    if (!classes.length) {
      setError("Aucune classe trouvée pour cet utilisateur");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const results = await Promise.all(
        classes.map(async (classe) => {
          const res = await fetch(`https://privetschool-backend.ohbjmh.easypanel.host/api/emplois/${classe}`);
          if (!res.ok) return { error: true, className: classe };
          const data = await res.json();
          return data;
        })
      );

      setEmplois(results.filter((r) => !r.error));
    } catch (err) {
      setError(err.message);
      setEmplois([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmplois();
  }, [user]);

  // 🧩 Format class name in French
  const formatClassName = (classNum) => {
    const num = parseInt(classNum);
    if (isNaN(num)) return `Classe ${classNum}`;
    return num === 1 ? `${num}ère année` : `${num}ème année`;
  };

  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            fontSize: "28px",
            marginBottom: "25px",
          }}
        >
          📚 Emploi du Temps
        </h1>

        {loading && <p style={{ textAlign: "center" }}>Chargement...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

        {emplois.length > 0 ? (
          emplois.map((emploi, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                marginTop: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "20px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ color: "#34495e" }}>
                {formatClassName(emploi.className || classes[index])}
              </h2>
              <img
                src={`https://57.131.24.227${emploi.emploiImage}`}
                alt={`Emploi classe ${emploi.className}`}
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <p style={{ textAlign: "center", color: "#555" }}>
              Aucun emploi du temps trouvé pour ces classes.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Emploi;
