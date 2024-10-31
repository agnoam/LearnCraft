import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, User } from "firebase/auth";

import { signIn as _signIn, signOut as _signOut, onAuthStateChanged } from "../utils/auth";

export interface AuthContextType {
  signIn: (provider?: GoogleAuthProvider | FacebookAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  user?: User | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    console.log('isReady', isReady);
    onAuthStateChanged((user) => {
      console.log('Firebase Auth state changed!');
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser !== undefined)
      setReady(true);
  }, [currentUser])

  const signIn = async (
    provider: GoogleAuthProvider | FacebookAuthProvider = new GoogleAuthProvider()
  ): Promise<void> => {
      const user = await _signIn(provider);

      // Send the access token JWT to the server for authentication/sign-up
      /* const res = */ await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'authorization': await user.getIdToken()
        }
      });

      // setCurrentUser(await res.json());
  }

  const signOut = async (): Promise<void> => {
    await _signOut();
    setCurrentUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user: currentUser, signIn, signOut, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
