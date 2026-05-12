const BASE_URL = import.meta.env.VITE_API_URL;

function authHeaders() {
  return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
}

async function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }
  return res.json();
}

export const api = {
  get: (url) =>
    fetch(`${BASE_URL}${url}`, {
      headers: authHeaders()
    }).then(handleResponse),

  post: (url, body) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body)
    }).then(handleResponse),

  put: (url, body) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body)
    }).then(handleResponse),

  delete: (url) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: authHeaders()
    }).then(handleResponse),

  login: (email, password) =>
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }),
};