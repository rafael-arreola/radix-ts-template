import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { PropsWithChildren, useEffect, useState } from 'react';

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@/utils/envs';

import { AuthContext } from '../auth-provider';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthFirebaseWrapperProvider(props: PropsWithChildren) {
  return <AuthWrapper>{props.children}</AuthWrapper>;
}

function AuthWrapper(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {};

  const logout = async () => {
    await signOut(auth);
  };

  const adaptedUser = user
    ? {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      }
    : undefined;

  return (
    <AuthContext.Provider
      value={{
        user: adaptedUser,
        login: login,
        logout: logout,
        isLoading: isLoading,
        isAuthenticated: !!user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
