import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { fetchAllUsers } from "../../redux/LoginRegister/authSlice";
import { getAllTeachers } from "../../redux/Teachers/teacherSlice"; // Import teacher action
import './DashboardCEO.css';

const DashboardCEO = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.auth.allUsers);
  const teachers = useSelector((state) => state.teacher.teachers); // Get teachers from Redux
  
  const [stats, setStats] = useState({
    nouvellesInscriptions: 0,
    nombreEleves: 0,
    nombreEnseignants: 0,
    visiteursSite: 0,
    elevesActifs: 0
  });

  const [donneesChart, setDonneesChart] = useState([]);
  const [distributionClasses, setDistributionClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTeachersModal, setShowTeachersModal] = useState(false);

  // Fonction pour obtenir le numéro de classe
  const obtenirNumeroClasse = (classe) => {
    if (!classe && classe !== 0) return null;
    
    if (typeof classe === 'number') {
      return classe.toString();
    }
    
    if (typeof classe === 'string') {
      const match = classe.match(/(\d+)/);
      return match ? match[1] : null;
    }
    
    return null;
  };

  // Fonction pour calculer la distribution par classe
  const calculerDistributionClasses = (users) => {
    console.log("Calculating distribution for users:", users);
    
    const distribution = {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0
    };

    let totalStudents = 0;

    users.forEach(user => {
      if (user.children && Array.isArray(user.children)) {
        user.children.forEach(child => {
          if (child && (child.class || child.class === 0)) {
            const classeNumero = obtenirNumeroClasse(child.class);
            console.log(`Child: ${child.name}, Class: ${child.class}, Class Number: ${classeNumero}`);
            
            if (classeNumero && distribution.hasOwnProperty(classeNumero)) {
              distribution[classeNumero]++;
              totalStudents++;
            }
          }
        });
      }
    });

    console.log("Distribution result:", distribution);
    console.log("Total students:", totalStudents);

    const resultat = Object.entries(distribution).map(([classe, count]) => ({
      classe: `${classe}ème année`,
      count,
      pourcentage: totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0
    }));

    return resultat;
  };

  // Fonction pour récupérer les nouveaux utilisateurs
  const fetchNewUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/user/new-inscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Erreur nouveaux utilisateurs:", err);
      return [];
    }
  };

  // Calculer les statistiques uniquement à partir des données existantes
  const calculerStatsFromData = (users, newUsers, teachersList) => {
    console.log("Calculating stats from users:", users);
    console.log("Teachers list:", teachersList);
    
    // Compter le nombre total d'élèves
    const totalEleves = users.reduce((total, user) => {
      if (user.children && Array.isArray(user.children)) {
        return total + user.children.length;
      }
      return total;
    }, 0);

    console.log("Total students found:", totalEleves);

    // Utiliser le nombre réel d'enseignants au lieu d'estimer
    const actualTeachers = teachersList ? teachersList.length : 0;

    // Estimation des visiteurs (basé sur l'activité récente)
    const recentUsers = users.filter(user => {
      const userDate = new Date(user.createdAt);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return userDate > lastMonth;
    });
    const estimatedVisitors = recentUsers.length * 3; // Estimation

    // Élèves actifs (ceux avec des activités récentes)
    const activeStudents = totalEleves; // Pour l'instant, tous sont considérés actifs

    return {
      nouvellesInscriptions: newUsers.length,
      nombreEleves: totalEleves,
      nombreEnseignants: actualTeachers, // Utiliser le nombre réel
      visiteursSite: estimatedVisitors,
      elevesActifs: activeStudents
    };
  };

  // Générer des données de graphique basées sur les données existantes
  const genererDonneesGraphique = (users, newUsersCount) => {
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Prendre les 6 derniers mois
    const derniersMois = [];
    for (let i = 5; i >= 0; i--) {
      const moisIndex = (currentMonth - i + 12) % 12;
      derniersMois.push(mois[moisIndex]);
    }

    // Calculer les inscriptions par mois basé sur les dates de création
    const inscriptionsParMois = derniersMois.map((mois, index) => {
      const targetMonth = (currentMonth - (5 - index) + 12) % 12;
      
      const inscriptions = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate.getMonth() === targetMonth;
      }).length;

      // Pour le mois courant, ajouter les nouvelles inscriptions
      const actifs = index === 5 ? users.reduce((total, user) => {
        if (user.children && Array.isArray(user.children)) {
          return total + user.children.length;
        }
        return total;
      }, 0) : Math.floor(inscriptions * 0.8);

      return {
        mois,
        inscriptions,
        actifs
      };
    });

    return inscriptionsParMois;
  };

  // Fonction pour récupérer toutes les statistiques
  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Charger les utilisateurs ET les enseignants via Redux
      const [usersResult, teachersResult] = await Promise.all([
        dispatch(fetchAllUsers()),
        dispatch(getAllTeachers())
      ]);
      
      if (usersResult.payload && teachersResult.payload) {
        // Récupérer les nouveaux utilisateurs
        const newUsers = await fetchNewUsers();

        // Utiliser les données Redux directement du résultat
        const usersData = usersResult.payload;
        const teachersData = teachersResult.payload;
        
        console.log("Users data for stats:", usersData);
        console.log("Teachers data for stats:", teachersData);
        
        // Calculer toutes les statistiques à partir des données existantes
        const calculatedStats = calculerStatsFromData(usersData, newUsers, teachersData);
        
        // Calculer la distribution par classe
        const distribution = calculerDistributionClasses(usersData);
        setDistributionClasses(distribution);

        // Générer les données du graphique
        const donneesGraphique = genererDonneesGraphique(usersData, newUsers.length);

        // Mettre à jour les statistiques
        setStats(calculatedStats);
        setDonneesChart(donneesGraphique);
        setLoading(false);
      } else {
        console.error("No payload in result");
        setLoading(false);
      }

    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dispatch]);

  // Recalculer quand allUsers ou teachers changent
  useEffect(() => {
    console.log("allUsers changed:", allUsers);
    console.log("teachers changed:", teachers);
    
    if ((allUsers && allUsers.length > 0) && teachers) {
      console.log("AllUsers and Teachers updated with data");
      const distribution = calculerDistributionClasses(allUsers);
      const newUsers = [];
      
      const calculatedStats = calculerStatsFromData(allUsers, newUsers, teachers);
      const donneesGraphique = genererDonneesGraphique(allUsers, newUsers.length);
      
      setDistributionClasses(distribution);
      setStats(calculatedStats);
      setDonneesChart(donneesGraphique);
      setLoading(false);
    } else if (allUsers && allUsers.length === 0) {
      console.log("AllUsers is empty array");
      // Reset stats if no users
      setStats({
        nouvellesInscriptions: 0,
        nombreEleves: 0,
        nombreEnseignants: 0,
        visiteursSite: 0,
        elevesActifs: 0
      });
      setDistributionClasses([]);
      setDonneesChart([]);
      setLoading(false);
    }
  }, [allUsers, teachers]);

  // Composants restants
  const CarteStatistique = ({ titre, valeur, icone, couleur, loading, onClick }) => (
    <div 
      className={`carte-statistique ${couleur} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="icone-statistique">{icone}</div>
      <div className="contenu-statistique">
        <h3>{titre}</h3>
        {loading ? (
          <div className="squelette-chargement"></div>
        ) : (
          <div className="valeur">{valeur}</div>
        )}
      </div>
    </div>
  );

  const GraphiqueBarres = ({ donnees }) => {
    if (!donnees || donnees.length === 0) {
      return (
        <div className="graphique-barres">
          <h3>Évolution des inscriptions et élèves actifs</h3>
          <div className="aucune-donnee">
            <p>Aucune donnée disponible pour le moment</p>
          </div>
        </div>
      );
    }

    return (
      <div className="graphique-barres">
        <h3>Évolution des inscriptions et élèves actifs</h3>
        <div className="barres-container">
          {donnees.map((item, index) => (
            <div key={index} className="groupe-barres">
              <div className="barre-container">
                <div 
                  className="barre inscriptions" 
                  style={{ height: `${Math.max(item.inscriptions * 3, 20)}px` }}
                  title={`Inscriptions: ${item.inscriptions}`}
                >
                  <span className="valeur-barre">{item.inscriptions}</span>
                </div>
                <div 
                  className="barre actifs" 
                  style={{ height: `${Math.max(item.actifs * 3, 20)}px` }}
                  title={`Actifs: ${item.actifs}`}
                >
                  <span className="valeur-barre">{item.actifs}</span>
                </div>
              </div>
              <div className="label-mois">{item.mois}</div>
            </div>
          ))}
        </div>
        <div className="legende">
          <div className="item-legende">
            <div className="couleur-legende inscriptions"></div>
            <span>Nouvelles inscriptions</span>
          </div>
          <div className="item-legende">
            <div className="couleur-legende actifs"></div>
            <span>Élèves actifs</span>
          </div>
        </div>
      </div>
    );
  };

  const GraphiqueDistributionClasses = ({ distribution }) => {
    const totalEleves = distribution.reduce((sum, item) => sum + item.count, 0);
    
    if (totalEleves === 0) {
      return (
        <div className="graphique-distribution">
          <h3>Répartition des élèves par classe</h3>
          <div className="aucune-donnee">
            <p>Aucun élève trouvé</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="graphique-distribution">
        <h3>Répartition des élèves par classe</h3>
        <div className="distribution-container">
          {distribution.map((item, index) => (
            <div key={index} className="item-distribution-complet">
              <div className="info-classe">
                <span className="label-classe">{item.classe}</span>
                <span className="nombre-classe">{item.count} élèves ({item.pourcentage}%)</span>
              </div>
              <div className="barre-distribution-complet">
                <div 
                  className="remplissage-distribution"
                  style={{ width: `${item.pourcentage}%` }}
                  title={`${item.pourcentage}% - ${item.count} élèves`}
                >
                  <span className="pourcentage-text">{item.pourcentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="resume-distribution">
          <div className="total-eleves">
            📊 Total: <strong>{totalEleves}</strong> élèves répartis sur <strong>{distribution.filter(item => item.count > 0).length}</strong> classes
          </div>
        </div>
      </div>
    );
  };

  // Modal pour afficher la liste des enseignants
  const TeachersModal = () => (
    <div className={`modal-overlay ${showTeachersModal ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>👩‍🏫 Liste des Enseignants</h2>
          <button 
            className="close-button" 
            onClick={() => setShowTeachersModal(false)}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {teachers && teachers.length > 0 ? (
            <div className="teachers-list">
              {teachers.map((teacher, index) => (
                <div key={teacher._id} className="teacher-card">
                  <div className="teacher-header">
                    <img 
                      src="https://bootdey.com/img/Content/avatar/avatar1.png" 
                      alt={teacher.name}
                      className="teacher-avatar"
                    />
                    <div className="teacher-info">
                      <h4>{teacher.name}</h4>
                      <p className="teacher-subject">{teacher.subject || 'Matière non spécifiée'}</p>
                      <p className="teacher-email">{teacher.email}</p>
                    </div>
                  </div>
                  <div className="teacher-details">
                    {teacher.classes && teacher.classes.length > 0 && (
                      <p><strong>Classes:</strong> {teacher.classes.join(', ')}</p>
                    )}
                    {teacher.desc && (
                      <p><strong>Description:</strong> {teacher.desc}</p>
                    )}
                    {teacher.age && (
                      <p><strong>Âge:</strong> {teacher.age} ans</p>
                    )}
                    {teacher.numTel && (
                      <p><strong>Téléphone:</strong> {teacher.numTel}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-teachers">
              <p>Aucun enseignant trouvé</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button 
            className="btn btn-primary"
            onClick={() => setShowTeachersModal(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-ceo">
        <div className="chargement">
          <div className="spinner"></div>
          <p>Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-ceo">
      <header className="header-dashboard">
        <h1>Tableau de Bord Administrateur</h1>
        <div className="filtres">
          <select>
            <option>Ce mois-ci</option>
            <option>Ce trimestre</option>
            <option>Cette année</option>
          </select>
          <button className="btn-actualiser" onClick={fetchStats}>
            🔄 Actualiser
          </button>
        </div>
      </header>

      <div className="grille-statistiques">
        <CarteStatistique 
          titre="Nouvelles Inscriptions"
          valeur={stats.nouvellesInscriptions}
          icone="📈"
          couleur="bleu"
          loading={loading}
        />
        <CarteStatistique 
          titre="Nombre d'Élèves"
          valeur={stats.nombreEleves}
          icone="👨‍🎓"
          couleur="vert"
          loading={loading}
        />
        <CarteStatistique 
          titre="Enseignants"
          valeur={stats.nombreEnseignants}
          icone="👩‍🏫"
          couleur="orange"
          loading={loading}
          onClick={() => setShowTeachersModal(true)}
        />
        <CarteStatistique 
          titre="Visiteurs Site"
          valeur={stats.visiteursSite}
          icone="🌐"
          couleur="violet"
          loading={loading}
        />
        <CarteStatistique 
          titre="Élèves Actifs"
          valeur={stats.elevesActifs}
          icone="✅"
          couleur="rouge"
          loading={loading}
        />
      </div>

      <div className="section-graphiques">
        <div className="graphique-principal">
          <GraphiqueBarres donnees={donneesChart} />
        </div>
        
        <div className="widgets-secondaires">
          <div className="widget graphique-distribution-widget">
            <GraphiqueDistributionClasses distribution={distributionClasses} />
          </div>

          <div className="widget activite-recente">
            <h3>Activité Récente</h3>
            <div className="liste-activite">
              <div className="item-activite">
                <div className="icone-activite">🎓</div>
                <div className="details-activite">
                  <strong>{stats.nouvellesInscriptions} nouvelles inscriptions</strong>
                  <span>Ce mois-ci</span>
                </div>
              </div>
              <div className="item-activite">
                <div className="icone-activite">📚</div>
                <div className="details-activite">
                  <strong>{Math.round(stats.nombreEleves * 0.8)} devoirs soumis</strong>
                  <span>Cette semaine</span>
                </div>
              </div>
              <div className="item-activite">
                <div className="icone-activite">👨‍👩‍👧‍👦</div>
                <div className="details-activite">
                  <strong>{Math.round(stats.nombreEleves * 0.9)} parents connectés</strong>
                  <span>Hier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal des enseignants */}
      <TeachersModal />
    </div>
  );
};

export default DashboardCEO;