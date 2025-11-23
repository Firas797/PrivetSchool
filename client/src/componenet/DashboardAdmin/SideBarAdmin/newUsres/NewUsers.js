import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NewUsers = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch new users from backend
  const fetchNewUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("/user/new-inscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewUsers(response.data);
    } catch (err) {
      toast.error(
        err.response?.data?.msg ||
          "Erreur lors de la récupération des nouveaux utilisateurs."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to mark a user as seen
  const markAsSeen = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/user/mark-user-reviewed/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Utilisateur marqué comme vu !");
      // Remove user from list instantly (without refetch)
      setNewUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      toast.error(
        err.response?.data?.msg ||
          "Erreur lors du marquage de l'utilisateur comme vu."
      );
    }
  };

  useEffect(() => {
    fetchNewUsers();
  }, []);

  if (loading) return <p>Chargement des nouveaux utilisateurs...</p>;
  if (newUsers.length === 0)
    return <p>Pas de nouveaux utilisateurs pour le moment.</p>;

  return (
    <div className="container mt-4 mr-4">
      <h2 className="fw-bold pr-4 mr-4">Nouveaux utilisateurs inscrits</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Parent</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Enfants</th>
            <th>Date d'inscription</th>
            <th>Action</th> {/* ✅ new column */}
          </tr>
        </thead>
        <tbody>
          {newUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.parentName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>
                {user.children.map((child, index) => (
                  <div key={index}>
                    {child.name} - {child.age} ans - Classe {child.class}ème
                  </div>
                ))}
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => markAsSeen(user._id)}
                >
                  ✅ Marquer comme vu
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewUsers;
