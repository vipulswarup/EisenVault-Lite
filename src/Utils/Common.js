// set the token and user from the local storage
export const setUserLocal = (id, userId) => {
  localStorage.setItem('id', JSON.stringify(id));
  localStorage.setItem('userId', JSON.stringify(userId));
}

// return the user data from the Local storage
export const getUser = () => {
    return localStorage.getItem('userId');
  }
   
  // return the token from the Local storage
  export const getToken = () => {
    return localStorage.getItem('id') || null;
  }
   
  // remove the token and user from the Local storage
  export const removeUserLocal = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('userId');
  }