import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AjoutContact from "./pages/AjoutContact";
import LoginPage from "./pages/LoginPage";
import { api } from "./lib/api";

function App() {

  const [contacts, setContacts]             = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // Vérifier si connecté
  const isLoggedIn = !!localStorage.getItem('token');

  // Charger les contacts depuis le backend
  useEffect(() => {
    if (isLoggedIn) {
      api.get('/contacts').then(setContacts);
    }
  }, []);

  // Ajouter
  const addContact = (newContact) => {
    api.post('/contacts', newContact).then((created) => {
      setContacts([...contacts, created]);
    });
  };

  // Modifier
  const updateContact = (id, updatedContact) => {
    api.put(`/contacts/${id}`, updatedContact).then(() => {
      setContacts(contacts.map((c) =>
        c.id === id ? { id, ...updatedContact } : c
      ));
    });
  };

  // Supprimer
  const deleteContact = (id) => {
    api.delete(`/contacts/${id}`).then(() => {
      setContacts(contacts.filter((c) => c.id !== id));
    });
  };

  return (
    <Routes>

      {/* Page login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Page accueil - protégée */}
      <Route
        path="/"
        element={
          isLoggedIn
            ? <HomePage
                contacts={contacts}
                deleteContact={deleteContact}
                setEditingContact={setEditingContact}
              />
            : <Navigate to="/login" />
        }
      />

      {/* Page ajouter/modifier - protégée */}
      <Route
        path="/ajouter"
        element={
          isLoggedIn
            ? <AjoutContact
                addContact={addContact}
                updateContact={updateContact}
                editingContact={editingContact}
                setEditingContact={setEditingContact}
              />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}

export default App;