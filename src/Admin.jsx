import { useState } from "react";
import API from "./api";


function Admin() {


    const [form, setForm] = useState({

        client:"",
        telephone:"",
        produit:"",
        poids:"",
        destination:"",
        statut:"Reçu en Chine"

    });



    const [resultat, setResultat] = useState("");



    function modifier(e){

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }




    async function ajouterColis(){


        try{


            const response = await API.post(

                "/colis",

                {

                    ...form,

                    poids:Number(form.poids)

                }

            );



            console.log(response.data);



            setResultat(

                `✅ Colis ajouté avec succès

Numéro de suivi :
${response.data.numero_suivi}`

            );




            setForm({

                client:"",
                telephone:"",
                produit:"",
                poids:"",
                destination:"",
                statut:"Reçu en Chine"

            });



        }catch(error){


            console.log(

                error.response?.data || error

            );


            setResultat(

                "❌ Erreur lors de la création du colis"

            );


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




<div className="numero-box">


<p style={{whiteSpace:"pre-line"}}>

{resultat}

</p>


</div>



</div>


</div>


);


}


export default Admin;