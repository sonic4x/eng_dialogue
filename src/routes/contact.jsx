import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
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
  const { contact } = useLoaderData();

  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };

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
    </div>
  );
}
