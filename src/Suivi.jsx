import { useState } from "react";
import API from "./api";


function Suivi() {


    const [numero, setNumero] = useState("");

    const [colis, setColis] = useState(null);

    const [erreur, setErreur] = useState("");




    async function rechercherColis(){


        if(!numero.trim()){

            setErreur(
                "Veuillez entrer un numéro de suivi"
            );

            setColis(null);

            return;

        }



        try{


            const response = await API.get(
                `/suivi/${numero.trim()}`
            );



            setColis(response.data);

            setErreur("");



        }catch(error){


            console.log(error.response?.data || error);


            setColis(null);


            setErreur(
                "Colis introuvable"
            );


        }


    }




    return (

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

                    placeholder="Ex: TYC-1234567890"

                    value={numero}

                    onChange={
                        (e)=>setNumero(e.target.value)
                    }

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
                            Numéro :
                            {colis.numero_suivi}
                        </p>


                        <p>
                            Client :
                            {colis.client}
                        </p>


                        <p>
                            Téléphone :
                            {colis.telephone}
                        </p>


                        <p>
                            Produit :
                            {colis.produit}
                        </p>


                        <p>
                            Poids :
                            {colis.poids}
                        </p>


                        <p>
                            Destination :
                            {colis.destination}
                        </p>


                        <p>
                            Statut :
                            {colis.statut}
                        </p>


                    </div>

                }



            </div>


        </div>

    );


}



export default Suivi;