// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('userId');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
   
  // return the token from the Local storage
  export const getToken = () => {
    return localStorage.getItem('id') || null;
  }
   
  // remove the token and user from the Local storage
  export const removeUserLocal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
   
  // set the token and user from the local storage
  export const setUserLocal = (id, userId) => {
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('userId', JSON.stringify(userId));
  }