import ContactItem from "./ContactItem";

function ContactList({ contacts, setContacts, setEditingContact, deleteContact }) {
  if (contacts.length === 0) {
    return <p>Aucun contact trouvé</p>;
  }

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          deleteContact={deleteContact}
          setEditingContact={setEditingContact}
        />
      ))}
    </div>
  );
}

export default ContactList;