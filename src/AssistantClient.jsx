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
"Bonjour 👋\n\nJe suis Tyson AI 🤖🎙️\nVotre assistant officiel Tyson Logistics.\n\nComment puis-je vous aider ?"
}

]);





// ==========================
// CONTACT HUMAIN WHATSAPP
// ==========================


function contacterHumain(){


const texte =

"Bonjour Tyson Logistics 👋\n\n" +

"Je viens de votre assistant IA et j'aimerais parler à un conseiller.";



const url =

"https://wa.me/8613092568896?text="

+

encodeURIComponent(texte);



window.open(url,"_blank");


}






// ==========================
// ENVOYER MESSAGE IA
// ==========================


async function envoyerMessage(){


if(!message.trim()) return;



const userMessage = message;



setMessages(prev=>[

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


history:messages.map(m=>(

{

role:

m.type==="user"

?

"user"

:

"assistant",


content:m.texte

}

))


})


}

);



const data = await response.json();



setMessages(prev=>[

...prev,

{

type:"bot",

texte:

data.reply ||

"Je n'ai pas reçu de réponse."

}

]);


}



catch(error){


console.log(error);


setMessages(prev=>[

...prev,

{

type:"bot",

texte:

"⚠️ Tyson AI est temporairement indisponible."

}

]);


}



setLoading(false);


}






return (

<div className="assistant-client">



{

ouvert &&


<div className="assistant-window">



<div className="assistant-header">



<div className="ai-brand">


<div className="ai-avatar">

🤖🎙️

</div>



<div>


<div className="ai-title">

Tyson AI

</div>


<div className="ai-role">

CHATBOT

</div>


<div className="online">

🟢 Online

</div>



</div>



</div>




<button

className="close-btn"

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


<div className="bubble bot typing">

Tyson AI écrit...

</div>


}





</div>







<div className="assistant-actions">


<button

className="human-button"

onClick={contacterHumain}

>

💬 Parler à un conseiller

</button>


</div>








<div className="assistant-input">


<input


value={message}


placeholder="Écrivez votre message..."


onChange={(e)=>setMessage(e.target.value)}



onKeyDown={(e)=>{


if(e.key==="Enter"){

envoyerMessage();

}


}}


/>




<button

onClick={envoyerMessage}

>

🎙️

</button>



</div>





</div>


}







<button

className="assistant-bulle"

onClick={()=>setOuvert(!ouvert)}

>


<div className="floating-ai">


<div>

🤖🎙️

</div>


<span>

CHATBOT

</span>


</div>


</button>





</div>


);


}



export default AssistantClient;