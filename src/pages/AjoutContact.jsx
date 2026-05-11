import { useNavigate } from "react-router-dom";
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
    <div className="container">
      <h1>
        {editingContact ? "Modifier un contact" : "Ajouter un contact"}
      </h1>

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
  );
}

export default AjoutContact;