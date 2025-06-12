// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axiosSetup from './axiosSetup';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axiosSetup.get("/user/profile");
//         setUser({
//           nom: response.data.data.Nom,
//           prenom: response.data.data.Prenom,
//           surnom: response.data.data.Alias,
//           email: response.data.data.Email,
//           affiliation: response.data.data.Affiliation,
//           points: response.data.data.Points || 0,
//           joinedAt: response.data.data.createdAt // si l'utilisateur est dev
//         });

//       } catch (error) {
//         console.error("Erreur lors de la récupération du profil utilisateur:", error.response ? error.response.data : error.message);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("idUtilisateur");
//     window.location.href = "/login";
//   };

//   if (loading) {
//     return (
//       <div className="p-8">
//         <div className="h-10 w-1/3 mb-4 bg-gray-300 rounded animate-pulse"></div>
//         <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
//         <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
//         <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <p className="text-red-500 p-8">Impossible de charger les informations de l'utilisateur. Veuillez réessayer.</p>;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-white p-8"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-black">Profil Utilisateur</h1>
//         <button className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
//           Déconnexion
//         </button>
//       </div>
//       <div className="max-w-xl mx-auto p-6 shadow-md bg-black text-white rounded-lg">
//         <div className="space-y-4">
//           <div>
//             <h2 className="text-lg font-semibold text-violet-400">Nom complet</h2>
//             <p className="text-white">{user.nom} {user.prenom}</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-violet-400">Surnom</h2>
//             <p className="text-white">{user.surnom}</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-violet-400">Email</h2>
//             <p className="text-white">{user.email}</p>
//           </div>
//           {user.affiliation && (
//             <div>
//               <h2 className="text-lg font-semibold text-violet-400">Affiliation</h2>
//               <p className="text-white">{user.affiliation}</p>
//             </div>
//           )}
//           {user.points !== undefined && (
//             <div>
//               <h2 className="text-lg font-semibold text-violet-400">Points</h2>
//               <p className="text-white">{user.points}</p>
//             </div>
//           )}
//           {/* {user.joinedAt && ( // Afficher la date d'inscription
//             <div>
//               <h2 className="text-lg font-semibold text-violet-400">Inscrit depuis</h2>
//               <p className="text-white">{new Date(user.joinedAt).toLocaleDateString()}</p>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSetup from './axiosSetup'; // Keep this import, but it won't be used for initial mock data

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestStatus, setRequestStatus] = useState({});
  const [message, setMessage] = useState('');

  // --- MOCK DATA FOR TESTING ---
  const mockUserData = {
    nom: "Dupont",
    prenom: "Jean",
    surnom: "JDoe",
    email: "jean.dupont@example.com",
    affiliation: "Epitech",
    points: 1500,
    joinedAt: new Date("2023-01-15T10:00:00Z").toISOString(), // ISO string format
    role: 'USER' // Set initial role to 'USER' for testing requests
    // You can test other roles by changing this: 'DEVEL', 'MANAG', 'ADMIN'
  };

  const mockRequestsData = [
    // Example: If a DEVEL request is pending
    // { requestedRole: 'DEVEL', status: 'pending' },
    // Example: If a MANAG request was rejected
    // { requestedRole: 'MANAG', status: 'rejected' }
  ];
  // --- END MOCK DATA ---


  useEffect(() => {
    const fetchUserAndRequests = async () => {
      try {
        // --- REMPLACEZ LES APPELS API PAR LA MOCK DATA POUR LE TEST ---

        // Simule la récupération du profil utilisateur
        // const userResponse = await axiosSetup.get("/user/profile");
        // const userData = userResponse.data.data;
        const userData = mockUserData; // Utilisez la donnée mock

        // Mappage des données (déjà fait dans mockUserData)
        const formattedUser = {
          nom: userData.nom,
          prenom: userData.prenom,
          surnom: userData.surnom,
          email: userData.email,
          affiliation: userData.affiliation,
          points: userData.points,
          joinedAt: userData.joinedAt,
          role: userData.role
        };
        setUser(formattedUser);

        // Simule la récupération des demandes de rôle en cours
        // const requestsResponse = await axiosSetup.get("/user/role-requests");
        // const currentRequests = requestsResponse.data.requests;
        const currentRequests = mockRequestsData; // Utilisez la donnée mock pour les demandes

        const statusMap = {};
        currentRequests.forEach(req => {
          statusMap[req.requestedRole] = req.status;
        });
        setRequestStatus(statusMap);

        // --- FIN DE LA REMPLACEMENT PAR LA MOCK DATA ---

      } catch (error) {
        console.error("Erreur lors de la récupération du profil ou des demandes:", error.response ? error.response.data : error.message);
        setMessage('Erreur lors du chargement du profil ou des demandes.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Simulate a slight delay to see the loading state
    const timer = setTimeout(() => {
      fetchUserAndRequests();
    }, 500); // 500ms delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUtilisateur");
    window.location.href = "/login";
  };

  const requestRole = async (roleType) => {
    setMessage('');
    setRequestStatus(prev => ({ ...prev, [roleType]: 'submitting' }));

    try {
      // Pour le test frontend, vous pouvez simuler une API call réussie
      // await axiosSetup.post("/user/request-role", { requestedRole: roleType });

      // Simuler une réponse réussie après un délai
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      setRequestStatus(prev => ({ ...prev, [roleType]: 'pending' }));
      setMessage(`Votre demande pour le rôle ${roleType} a été envoyée avec succès et est en attente d'approbation.`);
    } catch (error) {
      console.error(`Erreur lors de la demande de rôle ${roleType}:`, error.response ? error.response.data : error.message);
      setRequestStatus(prev => ({ ...prev, [roleType]: 'error' }));
      setMessage(`Erreur lors de l'envoi de votre demande pour le rôle ${roleType}: ${error.response?.data?.message || error.message}`);
    }
  };

  const hasRole = (role) => user?.role === role;
  const isRequestPending = (role) => requestStatus[role] === 'pending';
  const isRequestApproved = (role) => requestStatus[role] === 'approved';

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-10 w-1/3 mb-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-1/2 mb-2 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return <p className="text-red-500 p-8">Impossible de charger les informations de l'utilisateur. Veuillez réessayer.</p>;
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
        <button className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <div className="max-w-xl mx-auto p-6 shadow-md bg-black text-white rounded-lg">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Nom complet</h2>
            <p className="text-white">{user.nom} {user.prenom}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Surnom</h2>
            <p className="text-white">{user.surnom}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Email</h2>
            <p className="text-white">{user.email}</p>
          </div>
          {user.affiliation && (
            <div>
              <h2 className="text-lg font-semibold text-violet-400">Affiliation</h2>
              <p className="text-white">{user.affiliation}</p>
            </div>
          )}
          {user.points !== undefined && (
            <div>
              <h2 className="text-lg font-semibold text-violet-400">Points</h2>
              <p className="text-white">{user.points}</p>
            </div>
          )}
          {user.joinedAt && (
            <div>
              <h2 className="text-lg font-semibold text-violet-400">Inscrit depuis</h2>
              <p className="text-white">{new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-violet-400">Rôle Actuel</h2>
            <p className="text-white">{user.role}</p>
          </div>

          {message && (
            <div className={`p-2 rounded text-center ${message.includes('Erreur') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
              {message}
            </div>
          )}

          <div className="space-y-2 pt-4 border-t border-gray-700 mt-4">
            <h2 className="text-lg font-semibold text-violet-400">Demander un rôle supérieur</h2>

            <button
              onClick={() => requestRole('DEVEL')}
              className={`w-full py-2 px-4 rounded transition duration-300
                ${hasRole('DEVEL') ? 'bg-gray-500 cursor-not-allowed' :
                   isRequestPending('DEVEL') ? 'bg-yellow-600 cursor-not-allowed' :
                   requestStatus['DEVEL'] === 'submitting' ? 'bg-blue-400 cursor-wait' :
                   'bg-blue-600 hover:bg-blue-700'}
                text-white`}
              disabled={hasRole('DEVEL') || isRequestPending('DEVEL') || requestStatus['DEVEL'] === 'submitting'}
            >
              {hasRole('DEVEL') ? 'Vous êtes Développeur' :
               isRequestPending('DEVEL') ? 'Demande Développeur en attente...' :
               requestStatus['DEVEL'] === 'submitting' ? 'Envoi...' :
               'Devenir Développeur'}
            </button>

            <button
              onClick={() => requestRole('MANAG')}
              className={`w-full py-2 px-4 rounded transition duration-300
                ${hasRole('MANAG') ? 'bg-gray-500 cursor-not-allowed' :
                   isRequestPending('MANAG') ? 'bg-yellow-600 cursor-not-allowed' :
                   requestStatus['MANAG'] === 'submitting' ? 'bg-blue-400 cursor-wait' :
                   'bg-green-600 hover:bg-green-700'}
                text-white`}
              disabled={hasRole('MANAG') || isRequestPending('MANAG') || requestStatus['MANAG'] === 'submitting'}
            >
              {hasRole('MANAG') ? 'Vous êtes Manager' :
               isRequestPending('MANAG') ? 'Demande Manager en attente...' :
               requestStatus['MANAG'] === 'submitting' ? 'Envoi...' :
               'Devenir Manager'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;