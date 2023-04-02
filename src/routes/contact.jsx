import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { useState } from "react";
import { FloatButton } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import Audio from "./audio_component";

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
      <audio
        id='myAudio'
        src={require("./dialog_voice/" + contact.id.toString() + ".mp3")}
        loop='loop'
      ></audio>
    </div>
  );
}
