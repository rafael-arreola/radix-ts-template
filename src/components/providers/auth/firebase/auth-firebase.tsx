import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { PropsWithChildren, useEffect, useState } from 'react';

import { AuthContext } from '../auth-provider';
import { FirebaseAuth } from './firebase';

export default function AuthFirebaseWrapperProvider(props: PropsWithChildren) {
  return <AuthWrapper>{props.children}</AuthWrapper>;
}

function AuthWrapper(props: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(FirebaseAuth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
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
        getToken: () =>
          new Promise((resolve, reject) => {
            if (!user) {
              reject(new Error('User is not authenticated'));
              return;
            }
            user
              .getIdTokenResult(true)
              .then((access) => resolve(access.token))
              .catch(reject);
          }),
        user: adaptedUser,
        login: login,
        logout: logout,
        isLoading: loading,
        isAuthenticated: !!user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
