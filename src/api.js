import axios from "axios";


const API = axios.create({

    // Backend local pendant les tests
    baseURL: "http://127.0.0.1:8000",

    headers: {
        "Content-Type": "application/json"
    }

});


// Gestion des erreurs API (optionnel mais utile)
API.interceptors.response.use(

    response => response,

    error => {

        console.log(
            "Erreur API :",
            error.response?.data || error.message
        );

        return Promise.reject(error);

    }

);


export default API;