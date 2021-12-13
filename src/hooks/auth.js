import { onAuthStateChanged } from '@firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AuthContext = createContext()

const AuthProvider = (props) => {
  const auth = AuthService.auth;
  // console.log(auth)
  const [userNow, setuserNow] = useState(auth.currentUser)
  const [authError, setauthError] = useState(null)
  const [authCreds, setauthCreds] = useState(null)
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.warn('onauthstatechange')
      if (user) { setuserNow(user) }
      else { setuserNow(null) }
      setisLoading(false)
    })

    return unsubscribe;
  }, [auth])

  const RegisterEmail = async (email, password) => {
    const { user, error, credential } = await AuthService.registerViaEmail(email, password);
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error }
  }
  const LoginEmail = async (email, password) => {
    const { user, error, credential } = await AuthService.loginViaEmail(email, password);
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error }
  }
  const LoginGoogle = async () => {
    const { user, error, credential } = await AuthService.loginWithGoogle();
    // console.warn(result)
    // setuserNow(result.user)
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error }
  }
  const LoginFacebook = async () => {
    const { user, error, credential } = await AuthService.loginWithFacebook();
    setuserNow(user ?? null)
    setauthError(error ?? null)
    setauthCreds(credential ?? null)
    return { user: user, credential: credential, error: error }
  }
  const Logout = async () => {
    return await AuthService.logout();
  }

  const value = {
    auth, userNow, authError, authCreds,
    RegisterEmail, LoginEmail, LoginGoogle, LoginFacebook, Logout,
  }

  
  return (
    <>
      <Backdrop
        sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AuthContext.Provider value={value} {...props} />
    </>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth };