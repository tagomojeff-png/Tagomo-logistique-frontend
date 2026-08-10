import { useEffect, useState } from "react";
import API from "./api";


function Stats(){


const [stats,setStats]=useState({

total:0,
transit:0,
arrive:0,
livre:0

});





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


chargerStats();


},[]);







return(


<div className="stats-page">



<h1>

Statistiques Tyson & Co

</h1>





<div className="stats-container">





<div className="stat-card">


<h2>

{stats.total}

</h2>


<p>

Total colis

</p>


</div>







<div className="stat-card">


<h2>

{stats.transit}

</h2>


<p>

En transit

</p>


</div>







<div className="stat-card">


<h2>

{stats.arrive}

</h2>


<p>

Arrivés Cameroun

</p>


</div>







<div className="stat-card">


<h2>

{stats.livre}

</h2>


<p>

Livrés

</p>


</div>






</div>





</div>


)


}



export default Stats;