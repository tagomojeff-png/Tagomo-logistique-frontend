import { useState } from "react";
import API from "./api";


function Suivi(){


const [numero,setNumero]=useState("");

const [colis,setColis]=useState(null);

const [erreur,setErreur]=useState("");





async function rechercherColis(){


const numeroPropre = numero.trim();




if(!numeroPropre){


setErreur(
"Veuillez entrer un numéro de suivi"
);

setColis(null);

return;


}





try{


const response = await API.get(

`/suivi/${numeroPropre}`

);




setColis(response.data);

setErreur("");




}catch(error){


console.log(

error.response?.data || error

);


setColis(null);


setErreur(

"Colis introuvable"

);


}


}





return(


<div className="app">





<header className="header">


<h1>

TYSON & CO

</h1>


<p>

Suivi de colis

</p>


</header>






<div className="card">





<h2>

Suivi colis

</h2>





<input

type="text"

placeholder="Ex: TYC-7422086030"

value={numero}

onChange={(e)=>setNumero(e.target.value)}

/>





<button onClick={rechercherColis}>

Rechercher

</button>







{

erreur &&

<p className="error">

{erreur}

</p>

}









{

colis &&



<div className="resultat-colis">





<h3>

Colis trouvé ✅

</h3>






<p>

Numéro suivi :

{colis.numero_suivi}

</p>






<p>

Client :

{colis.client}

</p>







<p>

Produit :

{colis.produit}

</p>







<p>

Destination :

{colis.destination}

</p>







<h3>

Progression

</h3>






<div className="timeline">





<div className="step active">


<div className="circle">

✓

</div>



<div>

<h3>

Reçu en Chine

</h3>


<p>

Colis enregistré

</p>


</div>



</div>








<div className="step">


<div className="circle">

2

</div>


<div>

<h3>

Préparation

</h3>


<p>

En attente expédition

</p>


</div>


</div>









<div className="step">


<div className="circle">

3

</div>


<div>

<h3>

Expédié

</h3>


<p>

Départ Chine

</p>


</div>


</div>









<div className="step">


<div className="circle">

4

</div>


<div>

<h3>

En transit

</h3>


<p>

Transport international

</p>


</div>


</div>









<div className="step">


<div className="circle">

5

</div>


<div>

<h3>

Livré

</h3>


<p>

Colis reçu

</p>


</div>


</div>







</div>





</div>


}



</div>



);


}



export default Suivi;