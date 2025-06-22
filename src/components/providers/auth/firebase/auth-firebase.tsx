import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { PropsWithChildren, useEffect, useReducer } from 'react';

import { AuthContext, User as LocalUser, UserLoginPassword } from '../auth-provider';
import { FirebaseAuth } from './firebase';

interface IState {
  user: User | null;
  loading: boolean;
}

type IAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean };

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default function AuthFirebaseWrapperProvider(props: PropsWithChildren) {
  return <AuthWrapper>{props.children}</AuthWrapper>;
}

function AuthWrapper(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_LOADING', payload: false });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (props: unknown) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const { email, password } = props as UserLoginPassword;
    return signInWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const logout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    return signOut(FirebaseAuth);
  };

  const adaptedUser = state.user
    ? ({
        id: state.user.uid,
        name: state.user.displayName ?? state.user.email,
        email: state.user.email,
        picture: state.user.photoURL ?? undefined,
      } as LocalUser)
    : undefined;
  return (
    <AuthContext.Provider
      value={{
        getToken: () =>
          new Promise((resolve, reject) => {
            if (!state.user) {
              reject(new Error('User is not authenticated'));
              return;
            }
            state.user
              .getIdTokenResult(true)
              .then((access) => resolve(access.token))
              .catch(reject);
          }),
        user: adaptedUser,
        login: login,
        logout: logout,
        isLoading: state.loading,
        isAuthenticated: Boolean(state.user),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
