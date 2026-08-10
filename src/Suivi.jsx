import { useState } from "react";
import API from "./api";


function Suivi() {


    const [numero, setNumero] = useState("");

    const [colis, setColis] = useState(null);

    const [erreur, setErreur] = useState("");



    async function rechercherColis() {


        if (!numero.trim()) {

            setErreur("Veuillez entrer un numéro de suivi");
            setColis(null);
            return;

        }


        try {


            const response = await API.get(
                `/suivi/${numero.trim()}`
            );


            setColis(response.data);

            setErreur("");


        } catch (error) {


            console.log(error.response?.data || error);

            setColis(null);

            setErreur("Colis introuvable");


        }

    }




    return (

        <div className="suivi-page">


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

                    placeholder="Ex: TYC-1234567890"

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
                            <strong>Numéro suivi :</strong> {colis.numero_suivi}
                        </p>


                        <p>
                            <strong>Client :</strong> {colis.client}
                        </p>


                        <p>
                            <strong>Téléphone :</strong> {colis.telephone}
                        </p>


                        <p>
                            <strong>Produit :</strong> {colis.produit}
                        </p>


                        <p>
                            <strong>Poids :</strong> {colis.poids} kg
                        </p>


                        <p>
                            <strong>Destination :</strong> {colis.destination}
                        </p>


                        <p>
                            <strong>Statut :</strong> {colis.statut}
                        </p>



                    </div>

                )}



            </div>



        </div>

    );


}


export default Suivi;