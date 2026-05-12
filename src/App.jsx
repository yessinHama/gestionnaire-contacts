import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AjoutContact from "./pages/AjoutContact";
import LoginPage from "./pages/LoginPage";
import { api } from "./lib/api";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  // Vérifier si le token JWT est expiré sans appel réseau
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {

  const [contacts, setContacts]             = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [authReady, setAuthReady]           = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setAuthReady(true); return; }

    api.get('/contacts').then((data) => {
      if (Array.isArray(data)) setContacts(data);
      setAuthReady(true);
    }).catch(() => setAuthReady(true));
  }, []);

  const addContact = (newContact) => {
    api.post('/contacts', newContact).then((created) => {
      if (created?.id) setContacts(prev => [...prev, created]);
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

  if (!authReady) return null;

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage
              contacts={contacts}
              setContacts={setContacts}
              deleteContact={deleteContact}
              setEditingContact={setEditingContact}
            />
          </PrivateRoute>
        }
      />

      <Route
        path="/ajouter"
        element={
          <PrivateRoute>
            <AjoutContact
              addContact={addContact}
              updateContact={updateContact}
              editingContact={editingContact}
              setEditingContact={setEditingContact}
            />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;