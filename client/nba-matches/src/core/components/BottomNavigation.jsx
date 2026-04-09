import { NavLink } from "react-router-dom";

export const BottomNavigation = () => {
  const baseClass = "flex-1 text-center py-4 text-sm font-bold transition-colors";
  const activeClass = "text-orange-500 border-t-2 border-orange-500 bg-orange-50/50";
  const inactiveClass = "text-gray-400 hover:text-gray-600 border-t-2 border-transparent";

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <NavLink 
        to="/" 
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        Hoy
      </NavLink>
      
      <NavLink 
        to="/seguidos" 
        className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        Seguidos
      </NavLink>
    </nav>
  );
};