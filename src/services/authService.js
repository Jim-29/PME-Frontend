// src/services/authService.js

// Simuler une base d'utilisateurs
const users = [
  { username: "tech1", password: "pass123", role: "technicien" },
  { username: "super1", password: "pass123", role: "superviseur" },
  { username: "admin1", password: "pass123", role: "administrateur" },
];

// Simuler une fonction de connexion async (comme une API)
export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        resolve({ username: user.username, role: user.role });
      } else {
        reject(new Error("Nom d’utilisateur ou mot de passe incorrect"));
      }
    }, 1000); // délai simulé d'1s
  });
}
