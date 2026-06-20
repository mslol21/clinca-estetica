"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, isFirebaseConfigured } from "@/services/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

interface UserProfile {
  email: string | null;
  role: "admin";
  uid?: string;
}

interface AuthContextProps {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase is configured, listen to Firebase Auth
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            email: firebaseUser.email,
            role: "admin",
            uid: firebaseUser.uid,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Mock Authentication logic using localStorage session
      const mockSession = localStorage.getItem("luxe_clinic_admin_session");
      if (mockSession) {
        setUser({
          email: mockSession,
          role: "admin",
        });
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, email, password);
        // User state will be updated by onAuthStateChanged listener
        return true;
      } else {
        // Mock Login: matches admin@luxe.com / admin123
        if (email.toLowerCase() === "admin@luxe.com" && password === "admin123") {
          setUser({
            email: "admin@luxe.com",
            role: "admin",
          });
          localStorage.setItem("luxe_clinic_admin_session", "admin@luxe.com");
          setLoading(false);
          return true;
        }
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        await signOut(auth);
      } else {
        localStorage.removeItem("luxe_clinic_admin_session");
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
