import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../core/api/client';

export const useFollowedGames = (userId) => {
  const [followedGames, setFollowedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFollowed = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/followed/${userId}`);
      setFollowedGames(response.data);
      setError(null);
    } catch (err) {
      console.error("Error trayendo partidos seguidos:", err);
      setError("No pudimos cargar tu cartelera.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowed();
  }, [fetchFollowed]);

  const unfollowGame = async (matchId) => {
    try {
      await apiClient.delete(`/unfollow/${matchId}`);
      setFollowedGames(prevGames => prevGames.filter(game => game.id !== matchId));
      return true; 
    } catch (err) {
      console.error("Error al dejar de seguir:", err);
      return false; 
    }
  };

  return { followedGames, isLoading, error, unfollowGame, fetchFollowed };
};