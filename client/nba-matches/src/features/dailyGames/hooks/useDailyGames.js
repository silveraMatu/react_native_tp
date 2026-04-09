import { useState, useEffect } from 'react';
import { apiClient } from '../../../core/api/client.js';

export const useDailyGames = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/today'); 
      console.log(response.data)
      setGames(response.data);
      setError(null);
    } catch (err) {
      console.error("Error trayendo los partidos:", err);
      setError("No se pudieron cargar los partidos de hoy. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
  
  const followGame = async (userId, gameData) => {
    try {
      await apiClient.post('/follow', { userId, gameData });
      alert('¡Partido agregado a tus seguidos!');
      return true;
    } catch (err) {
      console.error("Error al seguir el partido:", err);
      alert('Hubo un problema al seguir el partido.');
      return false;
    }
  };

  return { 
    games, 
    isLoading, 
    error, 
    followGame,
    // refreshGames: fetchGames
  };
};