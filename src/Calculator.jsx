import { useState } from "react";


function Calculator(){


const [poids,setPoids] = useState("");

const [type,setType] = useState("normal");





const services = {


normal:{

nom:"Colis normal",

prix:7800,

unite:"kg",

delai:"21 jours"

},



sensible:{

nom:"Colis sensible",

prix:8500,

unite:"kg",

delai:"29 jours"

},



telephone:{

nom:"Téléphone",

prix:10000,

unite:"fixe",

delai:"21 jours"

},



deux_telephone:{

nom:"2 Téléphones",

prix:15000,

unite:"fixe",

delai:"21 jours"

},



laptop:{

nom:"Laptop",

prix:40000,

unite:"fixe",

delai:"29 jours"

},



bateau:{

nom:"Transport bateau",

prix:7800,

unite:"kg",

delai:"70 jours"

}



};







let total=0;



if(type==="telephone" || type==="deux_telephone" || type==="laptop"){


total = services[type].prix;


}

else{


total = poids

? Number(poids)*services[type].prix

:0;


}









return(


<div className="calculator-page">



<div className="calculator-card">






<h1>

Calculateur Tyson & Co

</h1>




<p>

Obtenez une estimation rapide de votre expédition

</p>









<label>

Type de colis

</label>






<select

value={type}

onChange={(e)=>setType(e.target.value)}

>




<option value="normal">

📦 Colis normal - 7 800 FCFA/kg

</option>




<option value="sensible">

⚠️ Colis sensible - 8 500 FCFA/kg

</option>





<option value="telephone">

📱 Téléphone - 10 000 FCFA

</option>





<option value="deux_telephone">

📱📱 Deux téléphones - 15 000 FCFA

</option>





<option value="laptop">

💻 Laptop - environ 40 000 FCFA

</option>





<option value="bateau">

🚢 Bateau - 70 jours

</option>




</select>









{

services[type].unite==="kg" &&


<>


<label>

Poids du colis (kg)

</label>



<input


type="number"


placeholder="Exemple : 5 kg"


value={poids}


onChange={(e)=>setPoids(e.target.value)}


/>


</>


}









<div className="result-box">



<h3>

Service :

</h3>



<h2>

{services[type].nom}

</h2>





<h3>

Estimation :

</h3>



<h1>

{total.toLocaleString()}

FCFA

</h1>







<p>

Délai estimé :

{services[type].delai}

</p>







</div>









<div className="warning">


⚠️ Attention :

Cette estimation est indicative.

Le prix final peut varier selon le volume,
la nature du produit, le poids réel,
les frais supplémentaires et les conditions
de transport.


</div>







</div>



</div>


)

}


export default Calculator;