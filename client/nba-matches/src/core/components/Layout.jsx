import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { useAuth } from "../../features/auth/context/AuthContext"; // Ajustá la ruta según tu estructura

export const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">

          <h1 className="text-xl font-black text-gray-900 tracking-tighter">
            NBA<span className="text-orange-500">Tracker</span>
          </h1>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600 hidden sm:block">
                Hola, <span className="font-bold text-gray-900">{user.nickname}</span>
              </span>
              <button 
                onClick={logout}
                className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors active:scale-95 px-2 py-1 rounded-md hover:bg-red-50"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto pt-6 pb-24 px-4">
        <Outlet /> 
      </main>

      <BottomNavigation />
    </div>
  );
};