import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🛠️ Tableau de Bord Administrateur</h1>
        <p className="welcome-message">Gérez votre plateforme éducative</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>📊 Vue d'ensemble du système</h3>
          <p>Supervisez toutes les activités de la plateforme</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="feature-card">
            <h4>👨‍🏫 Gestion des Professeurs</h4>
            <p>Ajoutez et gérez les comptes professeurs</p>
            <div className="feature-actions">
              <span className="action-badge">Création</span>
              <span className="action-badge">Liste</span>
            </div>
          </div>
          
          <div className="feature-card">
            <h4>👨‍🎓 Gestion des Étudiants</h4>
            <p>Consultez et gérez les étudiants inscrits</p>
            <div className="feature-actions">
              <span className="action-badge">Liste</span>
              <span className="action-badge">Statistiques</span>
            </div>
          </div>
          
          <div className="feature-card">
            <h4>📝 Nouveaux Inscrits</h4>
            <p>Approuvez les nouvelles demandes d'inscription</p>
            <div className="feature-actions">
              <span className="action-badge">Validation</span>
            </div>
          </div>
          
          <div className="feature-card">
            <h4>📅 Emploi du Temps</h4>
            <p>Créez et gérez les horaires des classes</p>
            <div className="feature-actions">
              <span className="action-badge">Création</span>
              <span className="action-badge">Modification</span>
            </div>
          </div>
          
          <div className="feature-card">
            <h4>🎉 Événements</h4>
            <p>Organisez et annoncez les événements scolaires</p>
            <div className="feature-actions">
              <span className="action-badge">Création</span>
              <span className="action-badge">Gestion</span>
            </div>
          </div>
          
          <div className="feature-card">
            <h4>📈 Statistiques</h4>
            <p>Consultez les rapports et statistiques de la plateforme</p>
            <div className="feature-actions">
              <span className="action-badge">Rapports</span>
              <span className="action-badge">Analyses</span>
            </div>
          </div>
        </div>
        
        {/* <div className="quick-stats">
          <div className="stat-card">
            <h4>Utilisateurs Actifs</h4>
            <div className="stat-number">245</div>
          </div>
          <div className="stat-card">
            <h4>Cours Créés</h4>
            <div className="stat-number">89</div>
          </div>
          <div className="stat-card">
            <h4>Événements à Venir</h4>
            <div className="stat-number">12</div>
          </div>
          <div className="stat-card">
            <h4>Nouvelles Demandes</h4>
            <div className="stat-number">5</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;