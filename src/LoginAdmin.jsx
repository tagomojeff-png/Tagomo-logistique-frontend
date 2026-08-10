import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginAdmin(){


const [password,setPassword]=useState("");

const navigate = useNavigate();



function connexion(){


if(password === "Tyson2026"){


localStorage.setItem(
"admin",
"true"
);


navigate("/admin");


}

else{


alert("Mot de passe incorrect");


}



}




return(


<div className="login-container">


<div className="login-card">


<h1>

Admin Tyson & Co

</h1>



<p>

Connexion sécurisée

</p>



<input

type="password"

placeholder="Mot de passe"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




<button onClick={connexion}>

Connexion

</button>



</div>


</div>


)


}


export default LoginAdmin;