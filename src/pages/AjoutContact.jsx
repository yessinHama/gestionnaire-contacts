import { useNavigate, Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";

function AjoutContact({
  contacts,
  setContacts,
  editingContact,
  setEditingContact,
  addContact,
  updateContact,
}) {

  const navigate = useNavigate();

  const handleAfterSubmit = () => {
    navigate("/");
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <Link to="/" className="btn-back">← Retour</Link>
        <span className="form-page-title">
          {editingContact ? "Modifier un contact" : "Nouveau contact"}
        </span>
      </div>

      <div className="form-page-body">
        <div className="form-card">
          <h2 className="form-card-title">
            {editingContact ? "✏️ Modifier le contact" : "➕ Ajouter un contact"}
          </h2>
          <ContactForm
            contacts={contacts}
            setContacts={setContacts}
            editingContact={editingContact}
            setEditingContact={setEditingContact}
            addContact={addContact}
            updateContact={updateContact}
            onAfterSubmit={handleAfterSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AjoutContact;