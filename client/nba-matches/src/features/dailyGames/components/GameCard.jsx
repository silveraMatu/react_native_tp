import { getTeamLogo } from "../../../core/utils/getTeamLogo";

export const GameCard = ({
  date,
  homeTeam,
  visitorTeam,
  homeAcronym,
  visitorAcronym,
  actionText = "Seguir Partido",
  actionColor = "bg-orange-500 hover:bg-orange-600 text-white",
  onAction,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 transition-shadow hover:shadow-md">
      <div className="text-center mb-4">
        <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
          {date}
        </span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center flex-1">
          <img
            src={getTeamLogo(homeAcronym)}
            alt={homeTeam}
            className="w-16 h-16 object-contain mb-2 drop-shadow-sm"
          />
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">
            {homeTeam}
          </span>
        </div>

        <div className="px-4">
          <span className="text-lg font-black text-gray-300">@</span>
        </div>

        <div className="flex flex-col items-center flex-1">
          <img
            src={getTeamLogo(visitorAcronym)}
            alt={visitorTeam}
            className="w-16 h-16 object-contain mb-2 drop-shadow-sm"
          />
          <span className="text-sm font-bold text-gray-800 text-center leading-tight">
            {visitorTeam}
          </span>
        </div>
      </div>

      <button
        onClick={onAction}
        className={`w-full font-bold py-3 px-4 rounded-xl transition-colors active:scale-[0.98] ${actionColor}`}
      >
        {actionText}
      </button>
    </div>
  );
};
