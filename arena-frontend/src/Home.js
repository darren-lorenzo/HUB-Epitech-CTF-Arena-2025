import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, ListOrdered, PlusSquare } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const sections = [
    {
      title: "Challenges",
      description: "Explore and solve cybersecurity challenges to improve your skills.",
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
      action: () => alert("Go to Challenges")
    },
    {
      title: "Classement",
      description: "View the leaderboard and compare your rank with others.",
      icon: <ListOrdered className="h-8 w-8 text-green-600" />,
      action: () => alert("View Leaderboard")
    },
    {
      title: "Proposer un challenge",
      description: "Submit your own challenge to the community.",
      icon: <PlusSquare className="h-8 w-8 text-yellow-600" />,
      action: () => alert("Submit a Challenge")
    },
    {
      title: "Profil utilisateur",
      description: "Access and manage your user profile.",
      icon: <User className="h-8 w-8 text-purple-600" />,
      action: () => alert("Go to Profile")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Bienvenue sur Arena Ctf
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Card onClick={section.action} className="p-4 shadow-md hover:shadow-lg transition duration-300">
              <CardContent className="flex flex-col items-center text-center space-y-4">
                {section.icon}
                <h2 className="text-xl font-semibold text-gray-700">{section.title}</h2>
                <p className="text-gray-500 text-sm">{section.description}</p>
                <Button>{section.title}</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
