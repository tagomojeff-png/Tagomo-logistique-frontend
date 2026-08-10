import { useState } from "react";
import API from "./api";


function Suivi() {

    const [numero, setNumero] = useState("");
    const [colis, setColis] = useState(null);
    const [erreur, setErreur] = useState("");


    const etapes = [
        "Reçu en Chine",
        "Préparation expédition",
        "En transit",
        "Arrivé Cameroun",
        "Livré"
    ];


    async function rechercherColis() {

        const code = numero.trim();


        if (!code) {
            setErreur("Veuillez entrer un numéro de suivi");
            setColis(null);
            return;
        }


        try {

            const response = await API.get(`/suivi/${code}`);

            setColis(response.data);
            setErreur("");

        } catch(error) {

            console.log(error.response?.data || error);

            setErreur("Colis introuvable");
            setColis(null);

        }

    }



    function positionStatut(statut){

        const index = etapes.findIndex(
            e => e === statut
        );

        return index === -1 ? 0 : index;

    }



    return (

        <div className="suivi-page">


            <div className="suivi-card">


                <h1>
                    TYSON & CO
                </h1>


                <p>
                    Suivi de votre colis
                </p>



                <div className="tracking-search">


                    <input

                        placeholder="Ex: TYC-7422086030"

                        value={numero}

                        onChange={
                            e=>setNumero(e.target.value)
                        }

                    />


                    <button onClick={rechercherColis}>

                        Rechercher

                    </button>


                </div>




                {
                    erreur &&

                    <p className="error">

                        {erreur}

                    </p>

                }





                {
                    colis &&


                    <div className="result-card">


                        <h2>
                            Colis trouvé ✅
                        </h2>



                        <p>
                            Numéro :
                            {colis.numero_suivi}
                        </p>


                        <p>
                            Client :
                            {colis.client}
                        </p>


                        <p>
                            Destination :
                            {colis.destination}
                        </p>



                        <h2>
                            Progression
                        </h2>




                        <div className="timeline">


                        {
                            etapes.map((etape,index)=>(
                                
                                <div

                                key={etape}

                                className={
                                    index <= positionStatut(colis.statut)
                                    ?
                                    "step active"
                                    :
                                    "step"
                                }

                                >


                                    <div className="circle">

                                        {
                                            index <= positionStatut(colis.statut)
                                            ?
                                            "✓"
                                            :
                                            index+1
                                        }

                                    </div>


                                    <div>

                                        <h3>
                                            {etape}
                                        </h3>


                                        {
                                            index === positionStatut(colis.statut)
                                            &&
                                            <p>
                                                Statut actuel
                                            </p>
                                        }


                                    </div>


                                </div>

                            ))

                        }


                        </div>



                    </div>

                }



            </div>


        </div>

    );

}


export default Suivi;