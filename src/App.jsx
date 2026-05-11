import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AjoutContact from "./pages/AjoutContact";
import LoginPage from "./pages/LoginPage";
import { api } from "./lib/api";

function App() {

  const [contacts, setContacts]             = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      api.get('/contacts').then((data) => {
        if (Array.isArray(data)) setContacts(data);
      });
    }
  }, []);

  const addContact = (newContact) => {
    api.post('/contacts', newContact).then((created) => {
      if (created.id) setContacts(prev => [...prev, created]);
    });
  };

  const updateContact = (id, updatedContact) => {
    api.put(`/contacts/${id}`, updatedContact).then(() => {
      setContacts(prev => prev.map((c) =>
        c.id === id ? { id, ...updatedContact } : c
      ));
    });
  };

  const deleteContact = (id) => {
    api.delete(`/contacts/${id}`).then(() => {
      setContacts(prev => prev.filter((c) => c.id !== id));
    });
  };

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          isLoggedIn
            ? <HomePage
                contacts={contacts}
                deleteContact={deleteContact}
                setEditingContact={setEditingContact}
              />
            : <Navigate to="/login" replace />
        }
      />

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
            : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;