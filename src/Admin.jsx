import { useEffect, useState } from "react";
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



  const [colis, setColis] = useState([]);

  const [resultat, setResultat] = useState("");




  async function chargerColis(){

    try{

      const response = await API.get("/colis");

      setColis(response.data);


    }catch(error){

      console.log(error);

    }

  }




  useEffect(()=>{

    chargerColis();

  },[]);





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

          poids: String(form.poids)

        }

      );



      setResultat(

        "✅ Colis créé : " + response.data.numero_suivi

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



    }catch(error){


      console.log(error.response?.data || error);


      setResultat(

        "❌ Erreur lors de l'ajout"

      );


    }


  }







  async function supprimerColis(numero){


    try{


      await API.delete(

        `/colis/${numero}`

      );


      setResultat(

        "✅ Colis supprimé"

      );


      chargerColis();



    }catch(error){


      console.log(error.response?.data || error);


      setResultat(

        "❌ Erreur suppression"

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



        <p>
          {resultat}
        </p>



      </div>






      <div className="card">


        <h2>
          Liste des colis
        </h2>



        {

          colis.map((item)=>(


            <div className="colis-item" key={item.id}>


              <p>
                <b>{item.numero_suivi}</b>
              </p>


              <p>
                Client : {item.client}
              </p>


              <p>
                Produit : {item.produit}
              </p>


              <p>
                Statut : {item.statut}
              </p>



              <button

                onClick={()=>supprimerColis(item.numero_suivi)}

              >

                Supprimer

              </button>



            </div>


          ))

        }



      </div>



    </div>


  );


}


export default Admin;