import { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = await firestore().collection('users').doc(authUser.uid).get();
        setUser({ ...authUser, role: userDoc.exists ? userDoc.data().role : 'user' });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;

