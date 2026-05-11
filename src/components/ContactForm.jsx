import { useEffect, useState } from "react";

function ContactForm({
  editingContact,
  setEditingContact,
  addContact,
  updateContact,
  onAfterSubmit,
}) {
  const [firstname, setFirstname] = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");

  useEffect(() => {
    if (editingContact) {
      setFirstname(editingContact.firstname);
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  const resetForm = () => {
    setFirstname("");
    setName("");
    setEmail("");
    setPhone("");
    setEditingContact(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstname.trim() || !name.trim() || !email.trim() || !phone.trim()) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("L'email n'est pas valide !");
      return;
    }

    if (!/^\d{8,}$/.test(phone)) {
      alert("Le téléphone doit contenir au moins 8 chiffres !");
      return;
    }

    if (editingContact) {
      updateContact(editingContact.id, { firstname, name, email, phone });
    } else {
      addContact({ firstname, name, email, phone });
    }

    resetForm();
    if (onAfterSubmit) onAfterSubmit();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Prénom"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Téléphone (8 chiffres min)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">
        {editingContact ? "Modifier Contact" : "Ajouter Contact"}
      </button>
      {editingContact && (
        <button
          type="button"
          className="btn-cancel"
          onClick={() => { resetForm(); if (onAfterSubmit) onAfterSubmit(); }}
        >
          Annuler
        </button>
      )}
    </form>
  );
}

export default ContactForm;