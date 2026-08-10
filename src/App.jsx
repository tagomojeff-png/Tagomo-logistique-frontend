import { Routes, Route, Link } from "react-router-dom";


import Home from "./Home.jsx";
import Services from "./Services.jsx";
import Calculator from "./Calculator.jsx";
import Suivi from "./Suivi.jsx";
import LoginAdmin from "./LoginAdmin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";



function App(){


return(


<div className="app">





<nav className="navbar">



<div className="logo">

TYSON & CO

</div>






<div className="menu">



<Link to="/">

Accueil

</Link>





<Link to="/services">

Services

</Link>





<Link to="/calculateur">

Calculateur

</Link>





<Link to="/suivi">

Suivi colis

</Link>





<Link to="/login-admin">

Admin

</Link>





</div>




</nav>









<main>


<Routes>





<Route

path="/"

element={<Home />}

/>







<Route

path="/services"

element={<Services />}

/>







<Route

path="/calculateur"

element={<Calculator />}

/>







<Route

path="/suivi"

element={<Suivi />}

/>







<Route

path="/login-admin"

element={<LoginAdmin />}

/>







<Route

path="/admin"

element={<AdminDashboard />}

/>






</Routes>



</main>






</div>



)


}



export default App;