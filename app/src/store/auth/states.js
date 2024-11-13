export const state ={
    loading: false,
    message: '',
    token: sessionStorage.getItem('authToken') || null,
    isAuthenticated: !!sessionStorage.getItem('authToken'),
    rol: sessionStorage.getItem('rol') || 'invitado',
    user: sessionStorage.getItem('authToken')
      ? {
          email: sessionStorage.getItem('email'),
          username: sessionStorage.getItem('username'),
          rol: sessionStorage.getItem('rol'),
        }
      : null,
  };
