import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (auth.currentUser) {
        const ref = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setProfile(snap.data());
      }
    }
    fetchProfile();
  }, [auth.currentUser]);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}
