import { useNavigate } from "react-router-dom";

function ContactItem({ contact, deleteContact, setEditingContact }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditingContact(contact);
    navigate("/ajouter");
  };

  return (
    <div className="card">
      <h3>{contact.firstname} {contact.name}</h3>
      <p>Email : {contact.email}</p>
      <p>Téléphone : {contact.phone}</p>
      <div className="buttons">
        <button onClick={handleEdit}>Modifier</button>
        <button className="btn-delete" onClick={() => deleteContact(contact.id)}>Supprimer</button>
      </div>
    </div>
  );
}

export default ContactItem;