const JWT_SECRET = 'movie-finder-secret'; 

export const signToken = (email) => {
  return btoa(JSON.stringify({ 
    email, 
    expires: Date.now() + 86400000 
  }));
};

export const verifyToken = (token) => {
  try {
    const data = JSON.parse(atob(token));
    return data.expires > Date.now() ? data : null;
  } catch {
    return null;
  }
};