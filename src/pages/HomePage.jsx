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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="home-page">
      {/* Hero Header */}
      <div className="home-hero">
        <div className="hero-bg-circles">
          <div className="circle c1" />
          <div className="circle c2" />
          <div className="circle c3" />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-icon">👥</div>
            <div>
              <h1 className="hero-title">Mes Contacts</h1>
              <p className="hero-subtitle">Gérez tous vos contacts en un seul endroit</p>
            </div>
          </div>
          <button className="btn-hero-logout" onClick={handleLogout}>
            🚪 Déconnexion
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">{contacts.length}</span>
            <span className="hero-stat-label">Contacts</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-number">{filteredContacts.length}</span>
            <span className="hero-stat-label">Résultats</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-body">
        {/* Toolbar */}
        <div className="home-toolbar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher par nom ou prénom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-sort-home" onClick={() => setSortAsc(!sortAsc)}>
            {sortAsc ? "⬆ A → Z" : "⬇ Z → A"}
          </button>
          <Link to="/ajouter" className="btn-add-home">
            ＋ Nouveau contact
          </Link>
        </div>

        {/* Contact List */}
        <ContactList
          contacts={filteredContacts}
          allContacts={contacts}
          setContacts={setContacts}
          setEditingContact={setEditingContact}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default HomePage;