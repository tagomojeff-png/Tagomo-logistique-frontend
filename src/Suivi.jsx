import { useState } from "react";
import API from "./api";


function Suivi() {


    const [numero, setNumero] = useState("");
    const [colis, setColis] = useState(null);
    const [erreur, setErreur] = useState("");



    async function rechercherColis() {


        const numeroPropre = numero.trim();


        if (!numeroPropre) {

            setErreur("Veuillez entrer un numéro de suivi");
            return;

        }



        try {


            console.log("Recherche :", numeroPropre);



            const response = await API.get(
                `/suivi/${numeroPropre}`
            );



            console.log("Réponse backend :", response.data);



            setColis(response.data);

            setErreur("");



        } catch(error) {


            console.log(
                "Erreur API :",
                error.response?.data || error.message
            );


            setColis(null);

            setErreur("Colis introuvable");


        }


    }



    return (

        <div className="app">


            <header className="header">

                <h1>TYSON & CO</h1>

                <p>Suivi de colis</p>

            </header>



            <div className="card">


                <h2>Suivi colis</h2>



                <input

                    type="text"

                    placeholder="Ex: TYC-2089931241"

                    value={numero}

                    onChange={(e)=>setNumero(e.target.value)}

                />



                <button onClick={rechercherColis}>

                    Rechercher

                </button>




                {erreur && (

                    <p className="error">

                        {erreur}

                    </p>

                )}






                {colis && (

                    <div className="resultat-colis">


                        <h3>
                            Colis trouvé ✅
                        </h3>



                        <p>
                            Numéro suivi : {colis.numero_suivi}
                        </p>


                        <p>
                            Client : {colis.client}
                        </p>


                        <p>
                            Produit : {colis.produit}
                        </p>


                        <p>
                            Destination : {colis.destination}
                        </p>


                        <p>
                            Statut : {colis.statut}
                        </p>


                    </div>

                )}



            </div>


        </div>

    );

}


export default Suivi;