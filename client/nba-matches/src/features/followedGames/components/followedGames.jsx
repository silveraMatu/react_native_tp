import { useFollowedGames } from "../hooks/useFollowedGames";
import { GameCard } from "../../dailyGames/components/GameCard";
import { useAuth } from "../../auth/context/AuthContext";

export const FollowedList = () => {
  const { user } = useAuth();
  const { followedGames, isLoading, error, unfollowGame } = useFollowedGames(user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-400 font-bold animate-pulse">Cargando tu cartelera...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-500 text-center font-semibold">
        {error}
      </div>
    );
  }

  if (followedGames.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No estás siguiendo ningún partido todavía.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-black mb-6 text-gray-800">Mis Seguidos</h1>
      
      <div className="flex flex-col gap-2">
        {followedGames.map((game) => (
          <GameCard 
            key={game.id}
            date={game.match_date} 
            homeTeam={game.home_team_name}
            visitorTeam={game.visitor_team_name}
            homeAcronym={game.homeAcronym} 
            visitorAcronym={game.visitorAcronym}
            actionText="Dejar de seguir"
            actionColor="bg-gray-200 hover:bg-gray-300 text-gray-700"
            onAction={() => unfollowGame(game.id)}
          />
        ))}
      </div>
    </div>
  );
};