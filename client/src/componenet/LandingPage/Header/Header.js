import React from 'react'
import { useState } from "react";

function Header() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
        
<div className="fables-header fables-after-overlay overlay-lighter bg-rules" style={{backgroundImage: 'url(assets/custom/images/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
  <div className="container overflow-hidden">  
    <div className="owl-carousel owl-theme default-carousel fables-sqr-nav dots-0 wow fadeInUpBig" data-wow-duration="2s">
      <div>
        <h1 className="white-color bold-font mt-lg-5 mb-4">L'AVENIR DE NOS ENFANTS EST <br /> 
          <span className="fables-second-text-color"> NOTRE RESPONSABILITÉ</span>
        </h1>  
        <p className="fables-third-text-color mt-3 mb-5 light-font fables-header-slider-details">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        </p>
        <a href="#" className="btn fables-second-background-color fables-second-border-color white-color rounded-0 mr-4 px-md-4 py-2 btn-bg-hover white-color-hover">Our Services</a>
        <a href="#" className="btn fables-second-border-color white-color rounded-0 px-md-4 py-2 fables-second-hover-background-color">Learn More</a>  
      </div> 
      <div>
        <h1 className="white-color bold-font mt-lg-5 mb-4">NOURRIR LES LEADERS DE DEMAIN <br /> 
          <span className="fables-second-text-color">NEXT GENERATION</span>
        </h1>  
        <p className="fables-third-text-color mt-3 mb-5 light-font fables-header-slider-details">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        </p>
        <a href="#" className="btn fables-second-background-color fables-second-border-color white-color rounded-0 mr-4 px-md-4 py-2 btn-bg-hover  white-color-hover">Our Services</a>
        <a href="#" className="btn fables-second-border-color white-color rounded-0 px-md-4 py-2 fables-second-hover-background-color">Learn More</a>  
      </div> 
    </div>
  </div>
</div>

<div className="fables-page-content">  
  <div className="container overflow-hidden">
    <h2 className="text-center fables-main-text-color font-35 my-4 my-lg-5 smaller-head-text">
    NOUS TRAVAILLONS DUR POUR ENCADRER NOS ENFANTS ET NOS ÉTUDIANTS ET CRÉER UNE NOUVELLE GÉNÉRATION DORÉE.
</h2>
    <div className="row">
      <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
        <div className="image-container translate-effect-right">
          <a href="#"><img src="assets/custom/images/index1.jpg" alt className="img-fluid w-100" /></a>
        </div>
        <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
          <a href="#" className="fables-second-text-color fables-main-hover-color"> " LE FUTUR COMMENCE ICI          "</a>
        </h2>
        <p className="  d-none d-md-block">
        Apprends en t’amusant et prépare-toi aux défis de demain !

</p>
      </div>
      <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
        <div className="image-container translate-effect-right">
          <a href="#"><img src="assets/custom/images/index2.jpg" alt className="img-fluid w-100" /></a>
        </div>
        <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
          <a href="#" className="fables-second-text-color fables-main-hover-color">"EXPLORE, CRÉE, INNOVER         "</a>
        </h2>
        <p className=" d-md-block">
        Découvre la technologie, exprime ta créativité et innove sans limites !

</p>
  

      </div>
      <div className="col-12 col-sm-4 mb-4 wow fadeInUpBig" data-wow-duration="2s">
        <div className="image-container translate-effect-right">
          <a href="#"><img src="assets/custom/images/index3.jpg" alt className="img-fluid w-100" /></a>
        </div>
        <h2 className="font-22 mt-3 mb-2 d-block text-center text-md-left">
          <a href="#" className="fables-second-text-color fables-main-hover-color">" LES ÉCHECS "</a>
        </h2>
        <p className=" d-md-block">
        Un jeu de stratégie pour apprendre à penser et anticiper chaque coup !   </p>
  

      </div>
    </div>
  </div>
  <div className="container-fluid overflow-hidden">
    <div className="row mt-0 mt-lg-5">
      <div className="col-12 col-md-6 p-0"> 
        <div style={{backgroundImage: 'url(assets/custom/images/overlay1.jpg)'}}>
          <div className="fables-second-color-transparent p-6">
            <h2 className="white-color font-weight-bold mb-4 font-35 wow fadeInLeft">Découvrez <br /> Nos Bootcamp
            </h2>
            <p className="fables-third-text-color wow fadeInLeft">
            Notre bootcamp offre une expérience unique pour apprendre les bases de l'informatique, explorer l'IA, créer des sites web et développer leur esprit stratégique avec les échecs.
             Avec des niveaux adaptés et un apprentissage ludique,nous préparons vos enfants à un avenir numérique. Inscrivez-les dès aujourd'hui pour qu'ils explorent, créent et grandissent avec nous !

</p>
            <a href="#" className="btn border border-white white-color rounded-0 my-4 py-2 px-5  wow fadeInLeft bg-white-hover fables-second-hover-color">Commencer</a> 
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 px-6">
  <div className="row">
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <span className="fables-iconbussiness fables-second-text-color fa-3x" />
      <h2 className="fables-main-text-color font-18 my-2">DÉCOUVRE L’INTELLIGENCE ARTIFICIELLE</h2>
      <p className="fables-forth-text-color font-weight-light">
        L’IA façonne le monde de demain. Apprends à créer des projets innovants et deviens un expert du futur !
      </p>
    </div>
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <span className="fables-iconbussiness2 fables-second-text-color fa-3x" />
      <h2 className="fables-main-text-color font-18 my-2">DEVIENS UN JEUNE DÉVELOPPEUR</h2>
      <p className="fables-forth-text-color font-weight-light">
        Le code, c’est le super-pouvoir du 21ᵉ siècle ! Apprends à programmer et construis tes propres applications.
      </p>
    </div>
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <span className="fables-iconbussiness3 fables-second-text-color fa-3x" />
      <h2 className="fables-main-text-color font-18 my-2">EXPRIME TA CRÉATIVITÉ AVEC LE DESIGN</h2>
      <p className="fables-forth-text-color font-weight-light">
        Le design et le montage vidéo te permettent de donner vie à tes idées. Apprends à créer des visuels impressionnants !
      </p>
    </div>
    <div className="col-12 col-sm-6 my-4 text-center text-md-left wow fadeInRight">
      <span className="fables-iconbussiness4 fables-second-text-color fa-3x" />
      <h2 className="fables-main-text-color font-18 my-2">MAÎTRISE L’ART DES ÉCHECS</h2>
      <p className="fables-forth-text-color font-weight-light">
        La stratégie et la réflexion sont les clés du succès. Apprends à jouer aux échecs et deviens un maître du jeu !
      </p>
    </div>
  </div> 
</div>


    </div>
  </div>
  <div className="container">
  <h2 className="fables-main-text-color font-35 font-weight-bold text-center mt-4 mt-lg-5">
    Un Plan  <span className="fables-second-text-color">Pour les Enfants</span> 
  </h2>
  {/* <p className="fables-forth-text-color text-center mb-4 mb-lg-5">Apprenez et progressez avec notre bootcamp pour les enfants de 18 ans et plus.</p> */}
  
<div className="row mb-0 mb-lg-5 overflow-hidden">
  {/* Single Package for Kids */}
  <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-center mb-4 wow bounceInUp" data-wow-delay=".3s">
    <div className="table-block table-border-light py-4 py-lg-5 fables-second-hover-border">
      <h2 className="fables-second-text-color bold-font font-35 font-weight-bold position-relative">500 
        <span className="table-badge fables-fifth-text-color position-absolute">DT</span>
      </h2>
      <p className="mb-3 fables-fifth-text-color font-13"></p>
      <h2 className="fables-forth-text-color text-center bold-font table-title font-17 fables-third-after position-relative">
        Programme complet pour enfants
      </h2> 
      <p className="fables-forth-text-color my-4 px-4 line-height-large font-15">
        ♟️ Apprentissage des échecs et stratégies<br />
        🖥️ Initiation à l'informatique et au matériel<br />
        💻 Bases de la programmation (Scratch, HTML/CSS)<br />
        🎨 Design et art de la présentation<br />
        🌐 Sécurité sur Internet et réseaux sociaux<br />
        📝 Techniques de présentation professionnelle<br />
        🎯 Projets pratiques tout au long du programme<br />
       <hr/>
        📆 <strong>Durée :</strong><br />
        ☀️ <strong>Bootcamp d'été</strong> : 3 mois - 3 séances/semaine, 3h/séance <br />
        📚 <strong>Programme Annuel</strong> : Chaque samedi & dimanche, 3h/jour
      </p>
      <a href="/register?plan=Programme%20Enfant%20Complet" className="btn fables-second-background-color white-color white-color-hover fables-btn-rounded px-5 py-2">
        Inscrire maintenant
      </a>
    </div>
  </div>
</div>
</div>



  <div className="fables-testimonial fables-after-overlay bg-rules py-4 py-lg-5" style={{backgroundImage: 'url(assets/custom/images/index-overlay.jpg)'}}>
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2 text-center wow zoomIn position-relative z-index"> 
          <h3 className="fables-second-text-color mb-3 font-30 font-weight-bold">🔴 Offre Exclusive : Inscrivez-vous au Pack Global (Niveau 1 + Niveau 2 + Niveau 3) et bénéficiez d'une remise de 20% ! 🚀🎉</h3>  
          <p className="font-weight-light fables-third-text-color">💡 Un parcours complet pour maîtriser l’informatique, la programmation, le design, le montage vidéo et YouTube, tout en développant des compétences en stratégie avec les échecs ! ♟🔥

👉 Apprenez, créez et excellez avec nous ! 💻🎨🎬
          </p>
          <a href="#" className="btn fables-second-border-color fables-second-text-color rounded-0 my-4 py-2 px-5 position-relative z-index fables-second-hover-background-color">S'inscrire Pack Global</a> 
        </div> 
      </div>
    </div>
  </div>
  {/* <div className="container my-4 my-lg-5"> 
    <div className="row">
      <div className="col-12 col-md-8 offset-md-2">
        <div className="text-center">
          <h2 className="fables-main-text-color font-35 font-weight-bold mt-0 mb-4 ">Valeur Ajoutée !</h2>
          <p className="fables-forth-text-color mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos reiciendis cum aliquid quam, consequatur. quisquam consectetur culpa commodi maxime in harum sunt nam.
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right"> 
          <img src="assets/custom/images/blog-slider2.jpg" alt="image" className="img-fluid w-100" /> 
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink " /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider2.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right">
          <img src="assets/custom/images/blog-slider3.jpg" alt="image" className="img-fluid w-100" />
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink" /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider3.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right">
          <img src="assets/custom/images/blog-slider1.jpg" alt="image" className="img-fluid w-100" />
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink" /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider1.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right">
          <img src="assets/custom/images/blog-slider2.jpg" alt="image" className="img-fluid w-100" />
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink " /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider2.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right">
          <img src="assets/custom/images/blog-slider3.jpg" alt="image" className="img-fluid w-100" />
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink" /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider3.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 mb-4 mb-lg-0">
        <div className="filter-img-block position-relative image-container translate-effect-right">
          <img src="assets/custom/images/blog-slider1.jpg" alt="image" className="img-fluid w-100" />
          <div className="img-filter-overlay fables-main-color-transparent flex-center">
            <a href="#" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconlink mx-2" /></a>
            <a data-fancybox="gallery" href="assets/custom/images/blog-slider1.jpg" className="fables-third-text-color fables-second-hover-color work-icon mx-3"><span className="fables-iconsearch-icon" /></a>
          </div>
        </div>
      </div>
      <a href="#" className="btn fables-second-border-color fables-second-text-color rounded-0 mt-4 mx-auto px-5 py-2 fables-second-hover-background-color">See all projects</a>
    </div> 
  </div> */}
  {/* <div className="fables-testimonial fables-after-overlay bg-rules py-4 py-lg-5">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8"> 
          <h3 className="position-relative z-index white-color mb-3 font-25 font-weight-bold">We are the best business consulting company ever!!</h3>  
          <p className="position-relative z-index font-weight-light fables-third-text-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lorem pretium laoreet enim at, malesuada Class aptent taciti sociosqu.</p>
        </div> 
        <div className="col-12 col-md-4 offset-xl-2 col-xl-2 text-center">
          <a href="contactus1.html" className="btn fables-second-background-color fables-btn-rounded white-color mt-3 position-relative z-index font-19 px-5 white-color-hover">Contact us</a> 
        </div>
      </div> 
    </div>
  </div> */}
  <div className="container">
    <div className="row">
      <div className="col-12">
        <h2 className="font-35 font-weight-bold fables-main-text-color my-3 my-lg-5 my-md-4 text-center">Valeur Ajoutée !</h2>
      </div>
      <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".3s">
        <div className="position-relative"> 
          <div className="image-container translate-effect-right">
            <a href="#"><img src="assets/custom/images/chess.jpg" alt className="img-fluid w-100" /></a> 
            <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
              <span className="bold-font day">1</span>  <span className="month d-block">Pourquoi  les échecs</span>
            </span>
          </div> 
          <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">Pourquoi choisir les échecs comme activité essentielle ?          </a></h2>
          <p className="fables-forth-text-color font-14 mb-2">
          es échecs ne sont pas seulement un jeu, mais un véritable outil d’apprentissage qui développe la concentration, la mémoire et la logique chez les enfants. En jouant régulièrement, ils améliorent leur capacité de réflexion stratégique, leur patience et leur prise de décision. Chaque partie d’échecs est une nouvelle occasion d’apprendre à anticiper, analyser et résoudre des problèmes. En intégrant cette discipline dans leur quotidien, nous leur donnons la possibilité de devenir des champions, non seulement sur l’échiquier, mais aussi dans la vie, en cultivant des qualités essentielles comme la persévérance et la confiance en soi.          </p>
        </div> 
      </div>
      <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".6s">
        <div className="position-relative"> 
          <div className="image-container translate-effect-right">
            <a href="#"><img src="assets/custom/images/idea.jpg" alt className="img-fluid w-100" /></a> 
            <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
              <span className="bold-font day">27</span>  <span className="month d-block">JUNE</span>
            </span>
          </div>
          <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">Faisons de nos enfants des producteurs, pas seulement des consommateurs          </a></h2>
          <p className="fables-forth-text-color font-14 mb-2">
          Dans un monde numérique en constante évolution, il est crucial que nos enfants ne soient pas uniquement des consommateurs de contenu, mais aussi des créateurs. Pourquoi ne pas encourager nos jeunes à ouvrir leur propre chaîne YouTube, à apprendre le montage vidéo ou même à développer un site web vitrine ? Ils peuvent dire fièrement : "J’ai créé mon propre site internet !", "J’ai monté ma première vidéo !", ou encore "J’anime ma chaîne YouTube avec du contenu éducatif et créatif !". Ces compétences leur offrent des opportunités infinies pour s’exprimer, apprendre et même préparer leur avenir professionnel dans les domaines du digital.          </p>
        </div> 
      </div>
      <div className="col-12 col-md-4 mb-4 mb-lg-5 wow fadeIn" data-wow-delay=".9s">
        <div className="position-relative"> 
          <div className="image-container translate-effect-right">
            <a href="#"><img src="assets/custom/images/longterm.jpg" alt className="img-fluid w-100" /></a> 
            <span className="above-date position-absolute text-center fables-second-background-color white-color px-3 py-2">
              <span className="bold-font day">27</span>  <span className="month d-block">JUNE</span>
            </span>
          </div>
          <h2 className="font-18 my-3"><a href="#" className="fables-main-text-color fables-second-hover-color">Les effets positifs à long terme
          </a></h2>
          <p className="fables-forth-text-color font-14 mb-2">
          Pratiquer les échecs, la création de contenu ou le développement web ne sont pas seulement des activités ludiques, ce sont des leviers puissants qui rendent nos enfants plus intelligents et plus compétents. Ces apprentissages influencent positivement leur niveau éducatif et leur vie en général, en leur inculquant des capacités analytiques, une pensée critique et une meilleure gestion du temps. Un enfant qui s’exerce à ces disciplines dès son plus jeune âge acquiert des réflexes et des compétences qui lui serviront toute sa vie, lui permettant ainsi de s’adapter et d’innover dans un monde en perpétuelle transformation.          </p>
        </div> 
      </div>
    </div>
  </div>
  {/* <div className="fables-light-background-color py-3 py-md-4 py-lg-5">
    <div className="container">
      <div className="owl-carousel owl-theme nav-0 carousel-items-6 dots-0">
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="border-hover fables-partner-carousel-img" />  
        </div>
        <div> 
          <img src="assets/custom/images/brand-4.jpg" alt="Fables Template" className="fborder-hover ables-partner-carousel-img" />  
        </div>
      </div>  
    </div>
  </div> */}
</div>




    </div>
  )
}

export default Header