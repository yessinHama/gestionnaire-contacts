import { useState } from "react";
  import { api } from "../lib/api";

function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res  = await api.login(email, password);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Identifiants incorrects.");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/";

    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-circle">📋</div>
          <h1>Gestionnaire de Contacts</h1>
          <p>Connectez-vous pour accéder à vos contacts</p>
        </div>

        <div className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label>Adresse email</label>
            <input
              type="email"
              placeholder="admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="login-field">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button className="btn-login" onClick={handleLogin} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>

        <p className="login-hint">Appuyez sur Entrée pour vous connecter</p>
      </div>
    </div>
  );
}

export default LoginPage;