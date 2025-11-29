import React, { useState } from "react";

function EmploiAdmin() {
  const [selectedClass, setSelectedClass] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !image) {
      setMessage("⚠️ Veuillez sélectionner une classe et une image.");
      return;
    }

    const formData = new FormData();
 formData.append("class", selectedClass);
formData.append("image", image);
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://privetschool-backend.ohbjmh.easypanel.host/api/emplois", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l’envoi.");

      setMessage("✅ Emploi du temps ajouté avec succès !");
      setImage(null);
      setPreview(null);
      setSelectedClass("");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "500px",
          transition: "transform 0.3s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2d3436",
            marginBottom: "30px",
            fontSize: "26px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
           Ajouter un <span style={{ color: "#0984e3" }}>Emploi du Temps</span>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Class selection */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Classe :
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "15px",
                outline: "none",
                transition: "0.3s",
                backgroundColor: "#f9fafc",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #0984e3")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            >
              <option value="">-- Sélectionner une classe --</option>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  Classe {num}
                </option>
              ))}
            </select>
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Image de l'emploi :
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#f9fafc",
              }}
            />
          </div>

          {/* Image preview */}
          {preview && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "contain",
                  borderRadius: "15px",
                  border: "2px solid #dfe6e9",
                  boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: loading
                ? "linear-gradient(90deg, #b2bec3, #636e72)"
                : "linear-gradient(90deg, #0984e3, #74b9ff)",
              color: "white",
              fontSize: "17px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {loading ? "⏳ Chargement..." : "📤 Envoyer l'emploi"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            style={{
              marginTop: "25px",
              textAlign: "center",
              color: message.startsWith("✅")
                ? "#00b894"
                : message.startsWith("⚠️")
                ? "#e1b12c"
                : "#d63031",
              fontWeight: "600",
              fontSize: "15px",
              transition: "0.3s",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmploiAdmin;
