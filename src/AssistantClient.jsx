import { useState } from "react";
import "./AssistantClient.css";


const API_URL =
"https://tagomo-logistique-backend-production.up.railway.app/ai/chat";


function AssistantClient(){


    const [ouvert,setOuvert] = useState(false);

    const [message,setMessage] = useState("");

    const [loading,setLoading] = useState(false);


    const [messages,setMessages] = useState([

        {
            type:"bot",
            texte:
            "Bonjour 👋\n\nJe suis Tyson AI 🤖\nComment puis-je vous aider aujourd'hui ?"
        }

    ]);



    async function envoyerMessage(){


        if(!message.trim()) return;



        const userMessage = message;



        setMessages(prev => [

            ...prev,

            {
                type:"user",
                texte:userMessage
            }

        ]);



        setMessage("");

        setLoading(true);



        try{


            const response = await fetch(

                API_URL,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        message:userMessage,


                        history:messages.map(m=>({

                            role:
                            m.type==="user"
                            ?
                            "user"
                            :
                            "assistant",

                            content:m.texte

                        }))

                    })

                }

            );



            const data = await response.json();



            setMessages(prev=>[

                ...prev,

                {

                    type:"bot",

                    texte:data.reply

                }

            ]);



        }

        catch(error){


            setMessages(prev=>[

                ...prev,

                {

                    type:"bot",

                    texte:
                    "Désolé, Tyson AI est momentanément indisponible."

                }

            ]);


            console.log(error);


        }



        setLoading(false);


    }





    return (

        <div className="assistant-client">



            {

            ouvert &&

            <div className="assistant-window">


                <div className="assistant-header">


                    <div>


                        🤖 Tyson AI Business


                        <span className="online">

                            🟢 Online

                        </span>


                    </div>



                    <button

                    onClick={()=>setOuvert(false)}

                    >

                        ✕


                    </button>


                </div>





                <div className="assistant-body">



                {

                messages.map((m,index)=>(


                    <div

                    key={index}

                    className={

                        m.type==="bot"

                        ?

                        "bubble bot"

                        :

                        "bubble user"

                    }


                    >

                        {m.texte}


                    </div>


                ))

                }



                {

                loading &&

                <div className="bubble bot">

                    Tyson AI écrit...

                </div>

                }



                </div>





                <div className="assistant-input">


                    <input

                    value={message}

                    placeholder="Votre message..."

                    onChange={
                        e=>setMessage(e.target.value)
                    }


                    onKeyDown={

                        e=>{

                            if(e.key==="Enter")

                            envoyerMessage();

                        }

                    }


                    />


                    <button

                    onClick={envoyerMessage}

                    >

                        ➤

                    </button>


                </div>



            </div>

            }




            <button

            className="assistant-bulle"

            onClick={()=>setOuvert(!ouvert)}

            >

                {

                ouvert

                ?

                "✕"

                :

                "💬"

                }


            </button>



        </div>


    );


}



export default AssistantClient;