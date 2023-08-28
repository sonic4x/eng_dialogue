import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { useState } from "react";
import { FloatButton } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import Audio from "./audio_component";
// import { useEffect, useCallback } from "react";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Contact() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const { contact } = useLoaderData();
  // const [isAudioAvailable, setIsAudioAvailable] = useState(false);

  // const checkAudioAvailable = useCallback(() => {

  //   if (contact.audio == 1)
  //   {
  //     console.log("true")
  //     setIsAudioAvailable(true);
  //   }
  //   else{
  //     console.log("false")
  //     setIsAudioAvailable(false);
  //   }

  //   // try{
      
  //   //   const file_path = "./dialog_voice/" + contact.audio;
  //   //   console.log(file_path)
  //   //   let xmlhttp;
  //   //   if (window.XMLHttpRequest){
  //   //     xmlhttp=new XMLHttpRequest();
  //   //   }else{
  //   //     // xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  //   //   }
      
  //   //   xmlhttp.open("GET",file_path,true);
  //   //   xmlhttp.send();
  //   //   if(xmlhttp.readyState === 4){
  //   //     if(xmlhttp.status === 200) 
  //   //     {
  //   //       console.log("true")
  //   //       setIsAudioAvailable(true);
  //   //     }
  //   //     else if(xmlhttp.status === 404) {
  //   //       console.log("false")
  //   //       setIsAudioAvailable(false);
  //   //     }
  //   //     else
  //   //     {
  //   //       console.log("false")
  //   //       setIsAudioAvailable(false);
  //   //     }
  //   //   }
  //   //   else {
  //   //     console.log("false")
  //   //   }
  //   // }
  //   // catch(err)
  //   // {
  //   //   console.log(err)
  //   //   setIsAudioAvailable(false)
  //   // }
    
  // },[contact]);

  // useEffect(() => {
  //   console.log("useEffect");
  //   checkAudioAvailable();
  // },[contact,checkAudioAvailable]);

  const toggleMusic = () => {
    var x = document.getElementById("myAudio");

    if (isMusicOn) {
      x.pause();
      setIsMusicOn(false);
    } else {
      x.play();
      setIsMusicOn(true);
    }
  };

  return (
    <div id='contact'>
      <div>
        <Audio />
      </div>
      <section>
        <img
          key={contact.id}
          src={require("./eng_pic/" + contact.id.toString() + ".jpeg")}
          alt=''
        />
      </section>
      <FloatButton
        style={{
          right: 20,
          top: 30,
        }}
        tooltip='原声'
        icon={<CustomerServiceOutlined />}
        onClick={toggleMusic}
      />
      {contact.audio === 1 && 
        <audio
          id='myAudio'
          src={require("./dialog_voice/" + contact.id.toString() + ".mp3")}
          loop='loop'
        ></audio>}

      
    </div>
  );
}
