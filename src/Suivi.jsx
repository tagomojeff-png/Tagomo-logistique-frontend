import { useState } from "react";
import "./style.css";


function Suivi(){


    const [numero,setNumero] = useState("");

    const [colis,setColis] = useState(null);

    const [erreur,setErreur] = useState("");



    async function rechercher(){


        if(!numero.trim()){

            setErreur("Veuillez entrer votre numéro de suivi.");

            return;

        }



        try{


            const response = await fetch(

            `https://tagomo-logistique-backend-production.up.railway.app/suivi/${numero}`

            );


            if(!response.ok){

                throw new Error();

            }



            const data = await response.json();


            setColis(data);

            setErreur("");



        }

        catch{


            setColis(null);

            setErreur("Colis introuvable. Vérifiez votre numéro TYC.");

        }


    }




    return (


<div className="tracking-page">



    <div className="tracking-nav">


        <button className="active">

            📦 Suivi colis

        </button>


        <button>

            🛡️ Admin

        </button>


    </div>





    <section className="tracking-hero">


        <div className="tracking-text">


            <h1>

                Suivi de votre colis

            </h1>


            <p>

                Entrez votre numéro de suivi <b>TYC</b>

                <br/>

                pour connaître l'état de votre colis en temps réel.

            </p>


        </div>



        <div className="package-icon">

            

        </div>


    </section>







    <div className="tracking-card">


        <div className="search-icon">

            

        </div>



        <h2>

            📦Rechercher un colis

        </h2>



        <p>

            Saisissez votre numéro de suivi

            <br/>

            Exemple : TYC-1234567890

        </p>



        <input

        value={numero}

        placeholder="Ex : TYC-1234567890"

        onChange={(e)=>setNumero(e.target.value)}

        />





        <button

        onClick={rechercher}

        >

             Rechercher

        </button>





        {

        erreur &&

        <div className="tracking-error">

            {erreur}

        </div>

        }





        {

        colis &&


        <div className="colis-result">


            <h3>

                 Informations colis

            </h3>


            <p>

                Client : {colis.client}

            </p>


            <p>

                Produit : {colis.produit}

            </p>


            <p>

                Destination : {colis.destination}

            </p>


            <span className="status">

                {colis.statut}

            </span>


        </div>


        }



    </div>






    <div className="security-box">

        🔐 Vos informations sont sécurisées et confidentielles.

    </div>





</div>



    );


}



export default Suivi;