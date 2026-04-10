import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export const useTeamStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/stats');
        setStats(response.data);
      } catch (err) {
        console.error("Error cargando el historial de equipos", err);
      }
    };
    fetchStats();
  }, []);

  return stats;
};