import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const response = await axios.get("/api/user/profile");
        // setUser(response.data);
        const data = {
          "username": "johndoe",
          "email": "johndoe@example.com",
          "points": 120,
          "joinedAt": "2024-10-21T12:34:56.000Z"
        }
        setUser(data);

      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUtilisateur");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-red-500 p-8">Impossible de charger les informations de l'utilisateur.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Profil Utilisateur</h1>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
      <Card className="max-w-xl mx-auto p-6 shadow-md bg-black text-white">
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Nom d'utilisateur</h2>
            <p className="text-white">{user.username}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Email</h2>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Points</h2>
            <p className="text-white">{user.points}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Inscrit depuis</h2>
            <p className="text-white">{new Date(user.joinedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfile;
