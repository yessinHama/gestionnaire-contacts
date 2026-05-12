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
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    if (editingContact) {
      setFirstname(editingContact.firstname);
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
      setErrors({});
    }
  }, [editingContact]);

  const resetForm = () => {
    setFirstname("");
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
    setEditingContact(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!firstname.trim()) newErrors.firstname = "Le prénom est obligatoire.";
    if (!name.trim()) newErrors.name = "Le nom est obligatoire.";
    if (!email.trim()) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Le téléphone est obligatoire.";
    } else if (!/^\+?[\d\s\-().]{8,}$/.test(phone)) {
      newErrors.phone = "Le téléphone doit contenir au moins 8 chiffres.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      <div className="field-group">
        <label>Prénom</label>
        <input
          type="text"
          placeholder="Jean"
          value={firstname}
          onChange={(e) => { setFirstname(e.target.value); setErrors(prev => ({ ...prev, firstname: "" })); }}
          className={errors.firstname ? "input-error" : ""}
        />
        {errors.firstname && <span className="error-msg">{errors.firstname}</span>}
      </div>
      <div className="field-group">
        <label>Nom</label>
        <input
          type="text"
          placeholder="Dupont"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })); }}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>
      <div className="field-group">
        <label>Adresse email</label>
        <input
          type="text"
          placeholder="jean.dupont@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>
      <div className="field-group">
        <label>Téléphone</label>
        <input
          type="text"
          placeholder="0612345678"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: "" })); }}
          className={errors.phone ? "input-error" : ""}
        />
        {errors.phone && <span className="error-msg">{errors.phone}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingContact ? "✏️ Modifier le contact" : "✅ Ajouter le contact"}
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
      </div>
    </form>
  );
}

export default ContactForm;