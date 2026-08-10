import { Link } from "react-router-dom";


function Home(){


return(

<div className="home">



<section className="hero-content">


<h1>

TYSON & CO

</h1>


<h2>

Logistics China → Cameroon

</h2>



<p>

Votre partenaire pour le sourcing,
l'importation et la livraison internationale.

</p>




<div className="hero-buttons">


<Link to="/suivi">

<button>

Suivre un colis

</button>

</Link>




<Link to="/login-admin">

<button className="secondary-btn">

Administration

</button>

</Link>



</div>



</section>







<section className="services-section">


<h2>

Nos services

</h2>




<div className="services-grid">





<div className="service-card">


<h3>

Sourcing Chine

</h3>


<p>

Accès à un réseau de plus de 6500 fournisseurs en collaboration avec Tyson & Co.

</p>


</div>






<div className="service-card">


<h3>

Importation

</h3>


<p>

Achat, contrôle et accompagnement auprès des fournisseurs.

</p>


</div>






<div className="service-card">


<h3>

Logistique

</h3>


<p>

Transport sécurisé Chine → Afrique avec suivi des colis.

</p>


</div>





</div>


</section>









<section className="numbers-section">





<div className="number-card">


<h2>

6500+

</h2>


<p>

Fournisseurs partenaires

</p>


</div>






<div className="number-card">


<h2>

500+

</h2>


<p>

Colis suivis

</p>


</div>







<div className="number-card">


<h2>

24/7

</h2>


<p>

Support client

</p>


</div>





</section>






</div>


)


}


export default Home;