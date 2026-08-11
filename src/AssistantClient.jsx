import { useState } from "react";


// =========================
// ASSISTANT CLIENT
// =========================
// Bulle flottante d'aide avec réponses préprogrammées.
// Fonctionne entièrement côté React, sans backend, sans IA.


const reponses = {

    suivi:
        "Pour suivre votre colis, utilisez votre numéro de suivi " +
        "commençant par TYC-.\n\n" +
        "Exemple :\nTYC-5780056577\n\n" +
        "Entrez ensuite ce numéro dans la page \"Suivi\".",

    prix:
        "Vous pouvez utiliser notre calculateur Tyson & Co " +
        "pour obtenir une estimation du prix de votre expédition.\n\n" +
        "Le prix dépend du type de colis et du poids.",

    delai:
        "Les délais dépendent du service choisi.\n\n" +
        "Colis normal : environ 21 jours\n" +
        "Colis sensible : environ 29 jours\n" +
        "Bateau : environ 70 jours\n\n" +
        "Les délais sont indicatifs.",

    contact:
        "Vous pouvez nous contacter via :\n\n" +
        "[Coordonnées Tyson & Co à compléter]\n\n" +
        "Téléphone / WhatsApp : à compléter\n" +
        "Email : à compléter",

};


const faqReponses = {

    faq_suivi:
        "Comment suivre mon colis ?\n\n" +
        "Rendez-vous sur la page \"Suivi\" et entrez votre numéro " +
        "de suivi commençant par TYC-.",

    faq_numero:
        "Comment obtenir un numéro de suivi ?\n\n" +
        "Votre numéro de suivi vous est communiqué par " +
        "l'administration Tyson & Co lors de la création de votre colis.",

    faq_prix:
        "Comment connaître le prix ?\n\n" +
        "Utilisez le Calculateur Tyson & Co. Sélectionnez votre " +
        "type de colis et, si nécessaire, indiquez le poids.",

    faq_delai:
        "Quels sont les délais ?\n\n" +
        "Colis normal : environ 21 jours\n" +
        "Colis sensible : environ 29 jours\n" +
        "Bateau : environ 70 jours",

};


function AssistantClient(){


    const [ouvert, setOuvert] = useState(false);

    const [messages, setMessages] = useState([
        {
            type: "bot",
            texte: "Bonjour 👋\nComment puis-je vous aider ?"
        }
    ]);

    const [afficherFaq, setAfficherFaq] = useState(false);


    function ajouterMessage(msg){

        setMessages(prev => [...prev, msg]);

    }


    function gererChoix(cle, libelle){

        ajouterMessage({ type: "user", texte: libelle });


        if (cle === "faq") {

            setAfficherFaq(true);

            ajouterMessage({
                type: "bot",
                texte: "Choisissez une question :"
            });

            return;

        }


        const reponse = reponses[cle];

        setAfficherFaq(false);

        ajouterMessage({ type: "bot", texte: reponse });

    }


    function gererFaqChoix(cle, libelle){

        ajouterMessage({ type: "user", texte: libelle });

        const reponse = faqReponses[cle];

        ajouterMessage({ type: "bot", texte: reponse });

    }


    function reinitialiser(){

        setMessages([
            {
                type: "bot",
                texte: "Bonjour 👋\nComment puis-je vous aider ?"
            }
        ]);

        setAfficherFaq(false);

    }


    return (

        <div className="assistant-client">


            {
                ouvert &&

                <div className="assistant-window">


                    <div className="assistant-header">

                        <span>Assistant Tyson & Co</span>

                        <button
                            className="assistant-close"
                            onClick={() => setOuvert(false)}
                        >
                            ✕
                        </button>

                    </div>


                    <div className="assistant-body">

                        {
                            messages.map((m, index) => (

                                <div
                                    key={index}
                                    className={
                                        m.type === "bot"
                                            ? "assistant-msg bot"
                                            : "assistant-msg user"
                                    }
                                >
                                    {
                                        m.texte.split("\n").map((ligne, i) => (
                                            <span key={i}>
                                                {ligne}
                                                <br />
                                            </span>
                                        ))
                                    }
                                </div>

                            ))
                        }


                        <div className="assistant-options">

                            {
                                !afficherFaq &&

                                <>

                                    <button
                                        onClick={() =>
                                            gererChoix("suivi", "📦 Suivre mon colis")
                                        }
                                    >
                                        📦 Suivre mon colis
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererChoix("prix", "💰 Calculer le prix")
                                        }
                                    >
                                        💰 Calculer le prix
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererChoix("delai", "🚚 Voir les délais")
                                        }
                                    >
                                        🚚 Voir les délais
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererChoix("contact", "📞 Contacter Tyson & Co")
                                        }
                                    >
                                        📞 Contacter Tyson & Co
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererChoix("faq", "❓ Questions fréquentes")
                                        }
                                    >
                                        ❓ Questions fréquentes
                                    </button>

                                </>
                            }


                            {
                                afficherFaq &&

                                <>

                                    <button
                                        onClick={() =>
                                            gererFaqChoix(
                                                "faq_suivi",
                                                "Comment suivre mon colis ?"
                                            )
                                        }
                                    >
                                        Comment suivre mon colis ?
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererFaqChoix(
                                                "faq_numero",
                                                "Comment obtenir un numéro de suivi ?"
                                            )
                                        }
                                    >
                                        Comment obtenir un numéro de suivi ?
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererFaqChoix(
                                                "faq_prix",
                                                "Comment connaître le prix ?"
                                            )
                                        }
                                    >
                                        Comment connaître le prix ?
                                    </button>


                                    <button
                                        onClick={() =>
                                            gererFaqChoix(
                                                "faq_delai",
                                                "Quels sont les délais ?"
                                            )
                                        }
                                    >
                                        Quels sont les délais ?
                                    </button>


                                    <button
                                        className="assistant-retour"
                                        onClick={() => {
                                            setAfficherFaq(false);
                                            ajouterMessage({
                                                type: "bot",
                                                texte: "Comment puis-je vous aider ?"
                                            });
                                        }}
                                    >
                                        ⬅ Retour
                                    </button>

                                </>
                            }

                        </div>


                        <button
                            className="assistant-reset"
                            onClick={reinitialiser}
                        >
                            🔄 Recommencer
                        </button>

                    </div>

                </div>
            }


            <button
                className="assistant-bulle"
                onClick={() => setOuvert(!ouvert)}
                aria-label="Assistant client"
            >
                {ouvert ? "✕" : "💬"}
            </button>


        </div>

    );

}


export default AssistantClient;
