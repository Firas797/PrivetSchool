import React from 'react';
import { useSelector } from 'react-redux';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const teacher = useSelector((state) => state.teacher.teacher);

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Bienvenue dans votre espace enseignant</h1>
        {teacher && (
          <p className="welcome-message">Bonjour, {teacher.name}!</p>
        )}
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>📊 Vue d'ensemble</h3>
          <p>Gérez vos cours, exercices et évaluations</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="feature-card">
            <h4>📚 Créer un cours</h4>
            <p>Ajoutez de nouveaux cours pour vos étudiants</p>
          </div>
          
          <div className="feature-card">
            <h4>📝 Exercices</h4>
            <p>Créez et assignez des exercices</p>
          </div>
          
          <div className="feature-card">
            <h4>🎯 Quiz & Examens</h4>
            <p>Créez des quiz et examens</p>
          </div>
          
          <div className="feature-card">
            <h4>📈 Évaluations</h4>
            <p>Suivez les progrès des étudiants</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;