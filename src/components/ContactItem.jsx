import { useNavigate } from "react-router-dom";

function ContactItem({ contact, deleteContact, setEditingContact }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditingContact(contact);
    navigate("/ajouter");
  };

  const initials = `${contact.firstname?.[0] ?? ""}${contact.name?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="card">
      <div className="card-avatar">{initials}</div>
      <div className="card-info">
        <h3>{contact.firstname} {contact.name}</h3>
        <div className="contact-detail">✉️ {contact.email}</div>
        <div className="contact-detail">📞 {contact.phone}</div>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={handleEdit}>✏️ Modifier</button>
        <button className="btn-delete" onClick={() => deleteContact(contact.id)}>🗑 Supprimer</button>
      </div>
    </div>
  );
}

export default ContactItem;