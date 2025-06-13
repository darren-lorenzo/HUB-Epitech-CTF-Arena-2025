import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSetup from './axiosSetup';
import { Link } from 'react-router-dom';

const GlobalScoreboard = () => {
  const [globalScores, setGlobalScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Données Mockées pour le test ---
  const mockGlobalScoresData = [
    { _id: "score1", id_user: { _id: "u1", Alias: "AlphaCoder", Affiliation: "Université X" }, score: 5000 },
    { _id: "score2", id_user: { _id: "u2", Alias: "BugBuster", Affiliation: "Tech Solutions" }, score: 4800 },
    { _id: "score3", id_user: { _id: "u3", Alias: "CodeNinja", Affiliation: "Open Source Team" }, score: 4500 },
    { _id: "score4", id_user: { _id: "u4", Alias: "DataWizard", Affiliation: "DataCorp" }, score: 4200 },
    { _id: "score5", id_user: { _id: "u5", Alias: "ElectroDev", Affiliation: "Future Innovators" }, score: 3900 },
    { _id: "score6", id_user: { _id: "u6", Alias: "Firewall", Affiliation: "CyberGuard" }, score: 3700 },
    { _id: "score7", id_user: { _id: "u7", Alias: "GeekMaster", Affiliation: "Startup Hub" }, score: 3500 },
    { _id: "score8", id_user: { _id: "u8", Alias: "HackGenius", Affiliation: "SecureIT" }, score: 3300 },
    { _id: "score9", id_user: { _id: "u9", Alias: "Innovator", Affiliation: "Creative Minds" }, score: 3100 },
    { _id: "score10", id_user: { _id: "u10", Alias: "JediCode", Affiliation: "DevForce" }, score: 2900 },
  ];
