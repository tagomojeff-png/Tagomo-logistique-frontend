import { useState } from "react";
import API from "./api";


function Admin() {


    const [form, setForm] = useState({

        client: "",
        telephone: "",
        produit: "",
        poids: "",
        destination: "",
        statut: "Reçu en Chine"

    });



    const [colisCree, setColisCree] = useState(null);

    const [erreur, setErreur] = useState("");




    function modifier(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }





    async function ajouterColis() {


        try {


            const response = await API.post(

                "/colis",

                {

                    ...form,

                    poids: String(form.poids)

                }

            );



            console.log("Réponse API :", response.data);



            setColisCree(response.data);

            setErreur("");




            setForm({

                client: "",
                telephone: "",
                produit: "",
                poids: "",
                destination: "",
                statut: "Reçu en Chine"

            });



        } catch (error) {


            console.log(

                "Erreur ajout colis :",

                error.response?.data || error.message

            );


            setErreur(
                "❌ Erreur lors de l'ajout du colis"
            );


            setColisCree(null);


        }


    }







    return (


        <div className="app">



            <header className="header">


                <h1>
                    TYSON & CO ADMIN
                </h1>


                <p>
                    Gestion des colis
                </p>


            </header>







            <div className="card">


                <h2>
                    Ajouter un colis
                </h2>





                <input

                    name="client"

                    placeholder="Nom client"

                    value={form.client}

                    onChange={modifier}

                />





                <input

                    name="telephone"

                    placeholder="Téléphone"

                    value={form.telephone}

                    onChange={modifier}

                />





                <input

                    name="produit"

                    placeholder="Produit"

                    value={form.produit}

                    onChange={modifier}

                />





                <input

                    name="poids"

                    placeholder="Poids"

                    value={form.poids}

                    onChange={modifier}

                />





                <input

                    name="destination"

                    placeholder="Destination"

                    value={form.destination}

                    onChange={modifier}

                />





                <input

                    name="statut"

                    value={form.statut}

                    onChange={modifier}

                />





                <button onClick={ajouterColis}>

                    Ajouter

                </button>






                {erreur && (

                    <p className="error">

                        {erreur}

                    </p>

                )}








                {colisCree && (


                    <div className="numero-box">


                        <h2>
                            ✅ Colis créé
                        </h2>



                        <p>
                            Client : {colisCree.client}
                        </p>



                        <h2>

                            📦 {colisCree.numero_suivi}

                        </h2>



                        <p>

                            Copiez ce numéro pour le suivi

                        </p>



                    </div>


                )}






            </div>



        </div>


    );


}


export default Admin;