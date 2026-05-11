import { useState } from "react";
import { Link } from "react-router-dom";
import ContactList from "../components/ContactList";



function HomePage({ contacts, setContacts, setEditingContact, deleteContact }) {

  const [search, setSearch]   = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  let filteredContacts = contacts.filter((contact) =>
    `${contact.firstname} ${contact.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  filteredContacts.sort((a, b) =>
    sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div className="container">
      <h1>Gestionnaire de Contacts</h1>

      <Link to="/ajouter">
        <button style={{ marginBottom: "20px" }}>
          Ajouter un contact
        </button>
      </Link>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Trier : {sortAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      <ContactList
        contacts={filteredContacts}
        allContacts={contacts}
        setContacts={setContacts}
        setEditingContact={setEditingContact}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default HomePage;