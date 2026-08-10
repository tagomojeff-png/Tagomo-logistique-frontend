import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";


function AdminDashboard(){


if(localStorage.getItem("admin") !== "true"){

return <Navigate to="/login-admin"/>

}



const [colis,setColis] = useState([]);


const [stats,setStats] = useState({

total:0,
transit:0,
arrive:0,
livre:0

});



const [dernierNumero,setDernierNumero] = useState("");

const [message,setMessage] = useState("");




const [form,setForm] = useState({

client:"",
telephone:"",
produit:"",
poids:"",
destination:"",
statut:"Reçu en Chine"

});






async function chargerColis(){


try{


const res = await API.get("/colis");


setColis(res.data);



}

catch(error){

console.log(error);

}


}







async function chargerStats(){


try{


const res = await API.get("/admin/stats");


setStats(res.data);



}

catch(error){

console.log(error);

}


}






useEffect(()=>{


chargerColis();

chargerStats();


},[]);









function handleChange(e){


setForm({

...form,

[e.target.name]:e.target.value


});


}








async function ajouterColis(){


try{


const res = await API.post(

"/colis",

form

);



setDernierNumero(

res.data.numero

);



setMessage(

"Colis créé avec succès"

);




setForm({

client:"",
telephone:"",
produit:"",
poids:"",
destination:"",
statut:"Reçu en Chine"

});



chargerColis();

chargerStats();



}

catch(error){

console.log(error);

}


}









async function changerStatut(id,statut){


try{


await API.put(

`/colis/${id}`,

{

statut:statut

}

);



chargerColis();

chargerStats();



}

catch(error){

console.log(error);

}


}









async function supprimerColis(id){


if(!window.confirm("Supprimer ce colis ?")) return;



try{


await API.delete(

`/colis/${id}`

);



chargerColis();

chargerStats();



}

catch(error){

console.log(error);

}



}









function copierNumero(numero){


navigator.clipboard.writeText(numero);


setMessage(

"Numéro copié"

);



}








function logout(){


localStorage.removeItem("admin");


window.location.href="/login-admin";


}








return(



<div className="admin-container">






<div className="admin-header">


<h1>

Administration Tyson & Co

</h1>



<button onClick={logout}>

Déconnexion

</button>


</div>








{
message &&

<div className="success-message">

{message}

</div>

}








<div className="admin-stats">



<div className="mini-stat">


<h2>

{stats.total}

</h2>


<p>

Total colis

</p>


</div>





<div className="mini-stat">


<h2>

{stats.transit}

</h2>


<p>

En transit

</p>


</div>





<div className="mini-stat">


<h2>

{stats.arrive}

</h2>


<p>

Arrivés Cameroun

</p>


</div>





<div className="mini-stat">


<h2>

{stats.livre}

</h2>


<p>

Livrés

</p>


</div>




</div>









{
dernierNumero &&


<div className="numero-box">


<p>

Dernier colis créé :

</p>


<h2>

{dernierNumero}

</h2>



<button

onClick={()=>copierNumero(dernierNumero)}

>

Copier

</button>



</div>


}









<div className="admin-content">








<div className="admin-card">


<h2>

Ajouter un colis

</h2>






<div className="admin-form">





<input

name="client"

placeholder="Nom client"

value={form.client}

onChange={handleChange}

/>





<input

name="telephone"

placeholder="Téléphone"

value={form.telephone}

onChange={handleChange}

/>





<input

name="produit"

placeholder="Produit"

value={form.produit}

onChange={handleChange}

/>





<input

name="poids"

placeholder="Poids"

value={form.poids}

onChange={handleChange}

/>





<input

name="destination"

placeholder="Destination"

value={form.destination}

onChange={handleChange}

/>





<select

name="statut"

value={form.statut}

onChange={handleChange}

>


<option>
Reçu en Chine
</option>


<option>
Préparation expédition
</option>


<option>
En transit
</option>


<option>
Arrivé Cameroun
</option>


<option>
Livré
</option>


</select>






<button onClick={ajouterColis}>

Ajouter le colis

</button>




</div>


</div>









<div className="admin-card">


<h2>

Colis récents

</h2>





<div className="parcel-list">



{

colis.length === 0 ?


<p className="empty">

Aucun colis enregistré

</p>



:


colis.map((item)=>(


<div className="parcel-item" key={item.id}>



<div className="parcel-info">



<h3>

{item.numero}

</h3>



<p>
Client : {item.client}
</p>



<p>
Produit : {item.produit}
</p>



<p>
Destination : {item.destination}
</p>



<p>
Statut : {item.statut}
</p>



</div>









<div className="parcel-control">



<select

value={item.statut}

onChange={(e)=>

changerStatut(

item.id,

e.target.value

)

}


>



<option>
Reçu en Chine
</option>


<option>
Préparation expédition
</option>


<option>
En transit
</option>


<option>
Arrivé Cameroun
</option>


<option>
Livré
</option>


</select>






<button

onClick={()=>copierNumero(item.numero)}

>

Copier

</button>






<button

className="delete-btn"

onClick={()=>supprimerColis(item.id)}

>

Supprimer

</button>



</div>




</div>



))


}



</div>




</div>






</div>




</div>


)


}


export default AdminDashboard;