import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./api";


function AdminDashboard(){

    const [colis,setColis] = useState([]);

    const [stats,setStats] = useState({
        total:0,
        transit:0,
        arrive:0,
        livre:0
    });


    const [dernierNumero,setDernierNumero] = useState("");

    const [message,setMessage] = useState("");


    const [form,setForm] = useState({

        client:"",
        telephone:"",
        produit:"",
        poids:"",
        destination:"",
        statut:"Reçu en Chine"

    });


    const [loading,setLoading] = useState(false);



    if(localStorage.getItem("admin") !== "true"){

        return <Navigate to="/login-admin"/>;

    }





    async function chargerColis(){

        try{

            const res = await API.get("/colis");

            setColis(res.data || []);

        }
        catch(error){

            console.log("Erreur chargement colis",error);

        }

    }





    async function chargerStats(){

        try{

            const res = await API.get("/admin/stats");

            setStats(res.data);

        }
        catch(error){

            console.log("Erreur stats",error);

        }

    }





    useEffect(()=>{

        chargerColis();
        chargerStats();

    },[]);







    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }







    async function ajouterColis(){


        if(loading) return;


        setLoading(true);


        try{


            const res = await API.post(

                "/colis",

                {

                    ...form,

                    poids:String(form.poids)

                }

            );



            console.log("Nouveau colis :",res.data);



            setDernierNumero(

                res.data.numero_suivi

            );



            setMessage(

                "Colis créé avec succès ✅"

            );



            setForm({

                client:"",
                telephone:"",
                produit:"",
                poids:"",
                destination:"",
                statut:"Reçu en Chine"

            });



            await chargerColis();

            await chargerStats();



        }

        catch(error){

            console.log(error);


            setMessage(

                "Erreur création colis ❌"

            );

        }


        finally{

            setLoading(false);

        }

    }









    async function changerStatut(id,statut){


        try{


            await API.put(

                `/colis/${id}`,

                {

                    statut:statut

                }

            );



            setMessage(

                "Statut mis à jour ✅"

            );


            await chargerColis();

            await chargerStats();



        }

        catch(error){

            console.log(error);

            setMessage(

                "Erreur modification statut"

            );

        }


    }









    async function supprimerColis(id){


        if(!window.confirm("Supprimer ce colis ?")) return;



        try{


            await API.delete(

                `/colis/${id}`

            );



            chargerColis();

            chargerStats();


        }

        catch(error){

            console.log(error);

        }


    }








    function copierNumero(numero){


        navigator.clipboard.writeText(numero);


        setMessage(

            "Numéro copié ✅"

        );

    }








    function logout(){


        localStorage.removeItem("admin");


        window.location.href="/login-admin";


    }







    return(

    <div className="admin-container">





        <div className="admin-header">


            <h1>
                Administration Tyson & Co
            </h1>


            <button onClick={logout}>
                Déconnexion
            </button>


        </div>







        {message &&

            <div className="success-message">

                {message}

            </div>

        }








        <div className="admin-stats">


            <div className="mini-stat">

                <h2>{stats.total}</h2>

                <p>Total colis</p>

            </div>


            <div className="mini-stat">

                <h2>{stats.transit}</h2>

                <p>En transit</p>

            </div>


            <div className="mini-stat">

                <h2>{stats.arrive}</h2>

                <p>Arrivé Cameroun</p>

            </div>


            <div className="mini-stat">

                <h2>{stats.livre}</h2>

                <p>Livré</p>

            </div>


        </div>









        {dernierNumero &&


        <div className="numero-box">


            <p>
                Dernier colis créé :
            </p>


            <h2>
                {dernierNumero}
            </h2>


            <button onClick={()=>copierNumero(dernierNumero)}>

                Copier

            </button>


        </div>


        }








        <div className="admin-card">


            <h2>
                Ajouter un colis
            </h2>



            <div className="admin-form">



            {
            Object.keys(form)
            .filter(key=>key!=="statut")
            .map(key=>(

                <input

                key={key}

                name={key}

                placeholder={key}

                value={form[key]}

                onChange={handleChange}

                />

            ))

            }




            <select

            name="statut"

            value={form.statut}

            onChange={handleChange}

            >


            <option>Reçu en Chine</option>

            <option>Préparation expédition</option>

            <option>En transit</option>

            <option>Arrivé Cameroun</option>

            <option>Livré</option>


            </select>






            <button onClick={ajouterColis}>

                {loading ? "Création..." : "Ajouter le colis"}

            </button>



            </div>


        </div>









        <div className="admin-card">


            <h2>
                Tous les colis
            </h2>




            <div className="parcel-list">


            {

            colis.length === 0 ?

            <p>
                Aucun colis enregistré
            </p>


            :


            colis.map(item=>(


                <div

                className="parcel-item"

                key={item.id}

                >



                <div>


                    <h3>

                        {item.numero_suivi}

                    </h3>


                    <p>
                        Client : {item.client}
                    </p>


                    <p>
                        Produit : {item.produit}
                    </p>


                    <p>
                        Destination : {item.destination}
                    </p>



                    <p>
                        Statut : {item.statut}
                    </p>


                </div>





                <div>


                <select

                value={item.statut}

                onChange={(e)=>
                    changerStatut(
                        item.id,
                        e.target.value
                    )
                }

                >

                <option>Reçu en Chine</option>

                <option>Préparation expédition</option>

                <option>En transit</option>

                <option>Arrivé Cameroun</option>

                <option>Livré</option>


                </select>





                <button

                onClick={()=>copierNumero(item.numero_suivi)}

                >

                    Copier

                </button>





                <button

                className="delete-btn"

                onClick={()=>supprimerColis(item.id)}

                >

                    Supprimer

                </button>



                </div>




                </div>


            ))


            }



            </div>


        </div>





    </div>

    );

}


export default AdminDashboard;