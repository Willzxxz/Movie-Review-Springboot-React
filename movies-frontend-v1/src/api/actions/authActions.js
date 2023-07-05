export const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setUser = (username, email) => ({
  type: "SET_USER",
  payload: { username, email },
});
