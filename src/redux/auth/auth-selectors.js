const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUsername = state => state.auth.user.name;
const isFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;
const getUserEmail = state => state.auth.user.email;
const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getUserEmail,
  isFetchingCurrentUser,
};

export default authSelectors;
