import React from 'react'
import { useState } from "react";

function Header() {
  const [showMore, setShowMore] = useState(false);

  // School location coordinates (example: Tunis city center)
  const schoolLocation = {
    lat: 36.8065,
    lng: 10.1815,
    address: "123 Avenue Habib Bourguiba, Tunis 1000, Tunisie"
  };

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${schoolLocation.lat},${schoolLocation.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="fables-header fables-after-overlay overlay-lighter bg-rules" style={{backgroundImage: 'url(assets/custom/images/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
        <div className="container overflow-hidden">
          <div className="owl-carousel owl-theme default-carousel fables-sqr-nav dots-0 wow fadeInUpBig" data-wow-duration="2s">
            <div>
              <h1 className="white-color bold-font mt-lg-5 mb-4">L'EXCELLENCE ÉDUCATIVE <br /> 
                <span className="fables-second-text-color"> POUR CONSTRUIRE L'AVENIR</span>
              </h1>
              <p className="fables-third-text-color mt-3 mb-5 light-font fables-header-slider-details">
                Notre école privée offre un environnement éducatif d'exception où chaque enfant découvre ses talents, développe son potentiel et construit les fondations de sa réussite future.
              </p>
         <a
  href="#"
  className="btn fables-second-background-color fables-second-border-color white-color rounded-0 mr-4 px-md-4 py-2 btn-bg-hover white-color-hover"
  style={{ color: "white" }}
>
  Découvrir Notre École
</a>
<a 
  href="#" 
  className="btn fables-second-border-color white-color rounded-0 px-md-4 py-2 fables-second-hover-background-color" 
  style={{ color: "white" }}
>
  Admissions
</a>            </div>
            <div>
              <h1 className="white-color bold-font mt-lg-5 mb-4">UNE PÉDAGOGIE INNOVANTE <br /> 
                <span className="fables-second-text-color">POUR RÉUSSIR ENSEMBLE</span>
              </h1>
              <p className="fables-third-text-color mt-3 mb-5 light-font fables-header-slider-details">
                Un projet éducatif unique qui allie tradition académique et méthodes modernes pour former les citoyens épanouis et responsables de demain.
              </p>
             <a 
  href="#" 
  className="btn fables-second-background-color fables-second-border-color white-color rounded-0 mr-4 px-md-4 py-2 btn-bg-hover white-color-hover"
  style={{ color: "white" }}>
  Notre Pédagogie
</a>

<a 
  href="#" 
  className="btn fables-second-border-color white-color rounded-0 px-md-4 py-2 fables-second-hover-background-color" 
  style={{ color: "white" }}>
  Nous Visiter
</a> </div>
          </div>
        </div>
      </div>

      <div className="fables-page-content">
        <div className="container overflow-hidden">
       <h2 className="text-center fables-main-text-color font-35 my-4 my-lg-5 smaller-head-text">
  UN CADRE BIENVEILLANT OÙ CHAQUE ENFANT RÉVÈLE SON POTENTIEL ET CONSTRUIT SON AVENIR AVEC CONFIANCE.
</h2>
          <div className="row">
            <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
              <div className="image-container translate-effect-right">
                <a href="#"><img src="assets/custom/images/index1.jpg" alt className="img-fluid w-100" /></a>
              </div>
              <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
                <a href="#" className="fables-second-text-color fables-main-hover-color">" EXCELLENCE ACADÉMIQUE "</a>
              </h2>
              <p className=" d-none d-md-block">
                Un enseignement rigoureux et personnalisé pour atteindre le meilleur niveau scolaire.
              </p>
            </div>
            <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
              <div className="image-container translate-effect-right">
                <a href="#"><img src="assets/custom/images/index2.jpg" alt className="img-fluid w-100" /></a>
              </div>
              <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
                <a href="#" className="fables-second-text-color fables-main-hover-color">" DÉVELOPPEMENT PERSONNEL "</a>
              </h2>
              <p className=" d-md-block">
                Des activités variées pour épanouir les talents et construire la confiance en soi.
              </p>
            </div>
            <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
              <div className="image-container translate-effect-right">
                <a href="#"><img src="assets/custom/images/index3.jpg" alt className="img-fluid w-100" /></a>
              </div>
              <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
                <a href="#" className="fables-second-text-color fables-main-hover-color">" OUVERTURE INTERNATIONALE "</a>
              </h2>
              <p className=" d-md-block">
                Une éducation tournée vers le monde pour préparer les leaders de demain.
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid overflow-hidden">
          <div className="row mt-0 mt-lg-5">
            <div className="col-12 col-md-6 p-0">
              <div style={{backgroundImage: 'url(assets/custom/images/overlay1.jpg)'}}>
                <div className="fables-second-color-transparent p-6">
                  <h2 className="white-color font-weight-bold mb-4 font-35 wow fadeInLeft"><br />
                    Notre Mission Éducative
                  </h2>
                  <p className="fables-third-text-color wow fadeInLeft">
                    Fondée sur des valeurs d'excellence, de respect et d'innovation, notre école privée s'engage à offrir un environnement éducatif unique où chaque élève peut s'épanouir pleinement. Notre équipe pédagogique qualifiée accompagne les élèves dans leur parcours académique et personnel, en cultivant l'autonomie, la curiosité intellectuelle et l'engagement citoyen. Nous préparons nos élèves à relever les défis du monde moderne tout en préservant les valeurs fondamentales qui font de nos jeunes des adultes responsables et accomplis.
                  </p>
                  <a href="#" className="btn border border-white white-color rounded-0 my-4 py-2 px-5 wow fadeInLeft bg-white-hover fables-second-hover-color">Prendre Rendez-vous</a>
                </div>
              </div>
            </div>
        <div className="col-12 col-md-6 px-6">
  <div className="row">
    {/* Bilingual Teaching */}
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <div className="fables-second-text-color fa-3x mb-3">
        🌍 {/* Or use: 🗣️ */}
      </div>
      <h2 className="fables-main-text-color font-18 my-2">ENSEIGNEMENT BILINGUE</h2>
      <p className="fables-forth-text-color font-weight-light">
        Maîtrise parfaite du français et de l'anglais dès le plus jeune âge pour une ouverture internationale optimale.
      </p>
    </div>

    {/* Differentiated Pedagogy */}
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <div className="fables-second-text-color fa-3x mb-3">
        📊 {/* Or use: 🎯 */}
      </div>
      <h2 className="fables-main-text-color font-18 my-2">PÉDAGOGIE DIFFÉRENCIÉE</h2>
      <p className="fables-forth-text-color font-weight-light">
        Un accompagnement personnalisé qui s'adapte au rythme et aux besoins spécifiques de chaque élève.
      </p>
    </div>

    {/* Technological Innovation */}
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <div className="fables-second-text-color fa-3x mb-3">
        💻 {/* Or use: 🤖 */}
      </div>
      <h2 className="fables-main-text-color font-18 my-2">INNOVATION TECHNOLOGIQUE</h2>
      <p className="fables-forth-text-color font-weight-light">
        Des outils numériques modernes intégrés à l'apprentissage pour développer les compétences du 21ème siècle.
      </p>
    </div>

    {/* Sports & Culture */}
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <div className="fables-second-text-color fa-3x mb-3">
        ⚽🎨 {/* Or use: 🏃‍♂️ */}
      </div>
      <h2 className="fables-main-text-color font-18 my-2">SPORT & CULTURE</h2>
      <p className="fables-forth-text-color font-weight-light">
        Un programme riche d'activités sportives et artistiques pour l'épanouissement complet de l'enfant.
      </p>
    </div>
  </div>
</div>
          </div>
        </div>
        <br/>
        <div className="container">
          <div className="row mb-0 mb-lg-5 overflow-hidden justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 mb-4 wow bounceInUp" data-wow-delay=".3s">
              <div className="table-block table-border-light py-5 py-lg-5 fables-second-hover-border text-center position-relative" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)', border: '2px solid #4bc0e5', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                <div className="position-absolute top-0 start-50 translate-middle mt-3">
                  <span className="badge fables-second-background-color white-color px-4 py-2" style={{fontSize: '14px', borderRadius: '20px'}}>
                    🎓 Cycle Primaire
                  </span>
                </div>
                <h2 className="fables-second-text-color bold-font font-35 font-weight-bold mt-4">Primaire</h2>
                <p className="mb-3 fables-fifth-text-color font-16 fw-bold">6 à 11 ans</p>
                <h2 className="fables-forth-text-color text-center bold-font table-title font-20 fables-third-after position-relative">
                  Des Fondamentaux Solides pour un Avenir Brillant
                </h2>
                <p className="fables-forth-text-color my-4 px-4 line-height-large font-16">
                  📖 <strong>Maîtrise du français</strong> et des mathématiques<br />
                  🇬🇧 <strong>Anglais renforcé</strong> dès le CP<br />
                  🔬 <strong>Initiation aux sciences</strong> et à l'expérimentation<br />
                  💻 <strong>Culture numérique</strong> et programmation simple<br />
                  🎭 <strong>Arts plastiques</strong> et expression théâtrale<br />
                  ⚽ <strong>Éducation sportive</strong> quotidienne<br />
                  🌱 <strong>Éducation civique</strong> et environnementale<br />
                  🎵 <strong>Éveil musical</strong> et chorale<br />
                  🌍 <strong>Ouverture internationale</strong> et interculturelle
                </p>
                <div className="mt-4 pt-3 border-top">
                  <p className="fables-main-text-color font-14 mb-3">
                    <strong>📅 Horaires :</strong> 8h00 - 16h00<br />
                    <strong>🍽️ Cantines :</strong> Service de restauration scolaire<br />
                    <strong>📚 Effectifs :</strong> Classes à effectifs réduits
                  </p>
                </div>
                <a href="/register?plan=Primaire" className="btn fables-second-background-color white-color white-color-hover fables-btn-rounded px-5 py-3 mt-3 fw-bold" style={{fontSize: '16px'}}>
                  Inscrire Mon Enfant
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h2 className="font-35 font-weight-bold fables-main-text-color text-center mb-5">
                Notre <span className="fables-second-text-color">Emplacement</span>
              </h2>
            </div>
          </div>
          
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <div className="location-card p-4 rounded shadow-sm" style={{backgroundColor: '#f8f9fa', border: '2px solid #4bc0e5'}}>
                <h3 className="fables-second-text-color font-25 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Nous Trouver
                </h3>
                
                <div className="location-info mb-4">
                  <div className="info-item mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-map-pin fables-second-text-color mt-1 mr-3"></i>
                      <div>
                        <h4 className="fables-main-text-color font-16 mb-1">Adresse</h4>
                        <p className="fables-forth-text-color mb-0">{schoolLocation.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-item mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-clock fables-second-text-color mt-1 mr-3"></i>
                      <div>
                        <h4 className="fables-main-text-color font-16 mb-1">Horaires d'ouverture</h4>
                        <p className="fables-forth-text-color mb-0">
                          Lundi - Vendredi: 7h30 - 18h00<br/>
                          Samedi: 8h00 - 13h00<br/>
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-item mb-3">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-phone fables-second-text-color mt-1 mr-3"></i>
                      <div>
                        <h4 className="fables-main-text-color font-16 mb-1">Téléphone</h4>
                        <p className="fables-forth-text-color mb-0">+216 70 000 000</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="d-flex align-items-start">
                      <i className="fas fa-envelope fables-second-text-color mt-1 mr-3"></i>
                      <div>
                        <h4 className="fables-main-text-color font-16 mb-1">Email</h4>
                        <p className="fables-forth-text-color mb-0">contact@ecole-excellence.tn</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleOpenMaps}
                  className="btn fables-second-background-color white-color fables-btn-rounded px-4 py-2 w-100"
                  style={{fontSize: '16px'}}
                >
                  <i className="fas fa-directions mr-2"></i>
                  Voir sur Google Maps
                </button>
              </div>
            </div>
            
            <div className="col-12 col-lg-6">
              <div 
                className="map-container rounded shadow-sm overflow-hidden position-relative"
                style={{height: '400px', border: '2px solid #4bc0e5', cursor: 'pointer'}}
                onClick={handleOpenMaps}
              >
                {/* Static map image as fallback */}
                <img 
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${schoolLocation.lat},${schoolLocation.lng}&zoom=15&size=600x400&markers=color:red%7C${schoolLocation.lat},${schoolLocation.lng}&key=YOUR_API_KEY`}
                  alt="Carte de localisation de l'école"
                  className="img-fluid w-100 h-100"
                  style={{objectFit: 'cover'}}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMDAgMjAwQzMzMi4xNDkgMjAwIDM1OCAxNzQuMTQ5IDM1OCAxNDJDMzU4IDEwOS44NTEgMzMyLjE0OSA4NCAzMDAgODRDMjY3Ljg1MSA4NCAyNDIgMTA5Ljg1MSAyNDIgMTQyQzI0MiAxNzQuMTQ5IDI2Ny44NTEgMjAwIDMwMCAyMDBaIiBmaWxsPSIjNEJDMGU1Ii8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjE0MiIgcj0iMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHRleHQgeD0iMzAwIiB5PSIyNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NjY2NjYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiI+Q2xpY3F1ZXogcG91ciB2b2lyIHN1ciBHb29nbGUgTWFwczwvdGV4dD4KPC9zdmc+';
                  }}
                />
                
                {/* Overlay with click instruction */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="text-center bg-white p-3 rounded shadow-sm">
                    <i className="fas fa-map-marked-alt fables-second-text-color fa-2x mb-2"></i>
                    <p className="fables-main-text-color mb-0 font-14">
                      Cliquez pour ouvrir dans Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Info Section */}
        <div className="container mb-5">
          <div className="row">
            <div className="col-12">
              <div className="transportation-info p-4 rounded" style={{backgroundColor: '#f0f8ff'}}>
                <h3 className="fables-main-text-color text-center mb-4">
                  <i className="fas fa-bus mr-2"></i>
                  Accès et Transports
                  <br/>
                                    <br/>

                    <div className="transport-item">
                      <i className="fas fa-bus fables-second-text-color fa-2x mb-2"></i>
                      <h5 className="fables-main-text-color">Bus</h5>
                      <p className="fables-forth-text-color font-14 mb-0">Lignes Mourouj</p>
                    </div>
                </h3>
       
              </div>
            </div>
          </div>
        </div>

        <div className="fables-testimonial fables-after-overlay bg-rules py-4 py-lg-5" style={{backgroundImage: 'url(assets/custom/images/index-overlay.jpg)'}}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8 offset-lg-2 text-center wow zoomIn position-relative z-index">
                <h3 className="fables-second-text-color mb-3 font-30 font-weight-bold">🎓 Inscription 2024-2025 Ouverte !</h3>
                <p className="font-weight-light fables-third-text-color">
                  Rejoignez notre communauté éducative d'exception ! Des places limitées sont disponibles pour l'année scolaire prochaine. 
                  Bénéficiez de notre programme d'immersion linguistique et de notre accompagnement personnalisé pour la réussite de votre enfant.
                </p>
                <a href="#" className="btn fables-second-border-color fables-second-text-color rounded-0 my-4 py-2 px-5 position-relative z-index fables-second-hover-background-color">
                  Dossier d'Inscription
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="font-35 font-weight-bold fables-main-text-color my-3 my-lg-5 my-md-4 text-center">Nos Valeurs Éducatives</h2>
            </div>
            <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".3s">
              <div className="position-relative">
                <div className="image-container translate-effect-right">
                  <a href="#"><img src="assets/custom/images/chess.jpg" alt className="img-fluid w-100" /></a>
                  <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
                    <span className="bold-font day">1</span>
                    <span className="month d-block">Excellence</span>
                  </span>
                </div>
                <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">L'Excellence Académique</a></h2>
                <p className="fables-forth-text-color font-14 mb-2">
                  Nous cultivons l'excellence à travers un enseignement rigoureux et exigeant. Notre objectif est d'amener chaque élève à donner le meilleur de lui-même, en développant ses compétences intellectuelles et son esprit critique. Des résultats académiques remarquables témoignent de notre engagement pour la réussite de tous nos élèves, quel que soit leur parcours initial.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".6s">
              <div className="position-relative">
                <div className="image-container translate-effect-right">
                  <a href="#"><img src="assets/custom/images/idea.jpg" alt className="img-fluid w-100" /></a>
                  <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
                    <span className="bold-font day">2</span>
                    <span className="month d-block">Innovation</span>
                  </span>
                </div>
                <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">L'Innovation Pédagogique</a></h2>
                <p className="fables-forth-text-color font-14 mb-2">
                  Notre école intègre les méthodes pédagogiques les plus innovantes pour préparer nos élèves aux défis du monde moderne. Classes inversées, projets collaboratifs, utilisation raisonnée du numérique : nous adaptons constamment nos pratiques pour offrir un enseignement en phase avec son temps tout en préservant les fondamentaux qui garantissent la solidité des apprentissages.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".9s">
              <div className="position-relative">
                <div className="image-container translate-effect-right">
                  <a href="#"><img src="assets/custom/images/longterm.jpg" alt className="img-fluid w-100" /></a>
                  <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
                    <span className="bold-font day">3</span>
                    <span className="month d-block">Citoyenneté</span>
                  </span>
                </div>
                <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">La Formation du Citoyen</a></h2>
                <p className="fables-forth-text-color font-14 mb-2">
                  Au-delà de la transmission des savoirs, nous formons des citoyens responsables, ouverts sur le monde et respectueux des autres. Notre projet éducatif intègre l'apprentissage des valeurs républicaines, l'éducation au développement durable et l'engagement solidaire. Nous préparons nos élèves à devenir des acteurs positifs de la société de demain, conscients de leurs droits et de leurs devoirs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header