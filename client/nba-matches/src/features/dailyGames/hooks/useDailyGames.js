import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiClient } from '../../../core/api/client.js';

export const useDailyGames = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/today');
      console.log(response.data);
      setGames(response.data);
      setError(null);
    } catch (err) {
      console.error('Error trayendo los partidos:', err);
      setError('No se pudieron cargar los partidos de hoy. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const followGame = useCallback(async (userId, gameData) => {
    try {
      await apiClient.post('/follow', { userId, gameData });
      alert('¡Partido agregado a tus seguidos!');
      return true;
    } catch (err) {
      console.error('Error al seguir el partido:', err);
      alert('Hubo un problema al seguir el partido.');
      return false;
    }
  }, []);

  return useMemo(
    () => ({
      games,
      isLoading,
      error,
      followGame,
      fetchGames,
    }),
    [games, isLoading, error, followGame, fetchGames]
  );
};