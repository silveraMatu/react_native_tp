import { useDailyGames } from "../hooks/useDailyGames";
import { useFollowedGames } from "../../followedGames/hooks/useFollowedGames";
import { GameCard } from "./GameCard";
import { useAuth } from "../../auth/context/AuthContext";

export const DailyGamesList = () => {
  const { user } = useAuth();
  const { games, isLoading: loadingDaily, error: errorDaily, followGame } = useDailyGames();
  const { followedGames, isLoading: loadingFollowed, unfollowGame, fetchFollowed } = useFollowedGames(user?.id);

  const handleFollow = async (game) => {
    console.log(user.id)
    const success = await followGame(user.id, {
      id: game.idGame,
      home_team: { full_name: game.home_team },
      visitor_team: { full_name: game.visitor_team },
      date: game.date
    });
    
    if (success) {
      fetchFollowed();
    }
  };

  const handleUnfollow = async (followedMatchId) => {
    await unfollowGame(followedMatchId);
  };

  if (loadingDaily || loadingFollowed) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-400 font-bold animate-pulse">Cargando cartelera...</span>
      </div>
    );
  }

  if (errorDaily) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-500 text-center font-semibold">
        {errorDaily}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No hay partidos programados para hoy.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-black mb-6 text-gray-800">Partidos de Hoy</h1>
      
      <div className="flex flex-col gap-2">
        {games.map((game) => {
          const followedMatch = followedGames.find(fg => fg.api_game_id === game.idGame);
          const isFollowed = !!followedMatch;

          return (
            <GameCard 
              key={game.idGame}
              date={game.date.split('T')[0]} 
              homeTeam={game.home_team}
              visitorTeam={game.visitor_team}
              homeAcronym={game.homeAcronym} 
              visitorAcronym={game.visitorAcronym}
              
              actionText={isFollowed ? "Siguiendo" : "Seguir Partido"}
              actionColor={
                isFollowed 
                  ? "bg-gray-800 hover:bg-black text-white" 
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }
              
              onAction={() => {
                if (isFollowed) {
                  handleUnfollow(followedMatch.id); 
                } else {
                  handleFollow(game); 
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};