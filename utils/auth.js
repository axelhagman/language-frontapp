import { useEffect, useState, createContext, useContext } from 'react';
import { app, firestore } from 'utils/firebase/clientApp';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const auth = getAuth(app);

  const getUserData = async (user) => {
    await getDoc(doc(firestore, 'users', user.uid)).then((res) =>
      setUserData(res.data())
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getUserData(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [auth]);

  const login = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then(
        async (result) => {
          await setDoc(doc(firestore, 'users', result.user.uid), {
            uid: result.user.uid,
            displayName: result.user.displayName,
          });
          return;
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const state = useContext(AuthContext);
  if (state !== undefined) {
    return state;
  }
}
