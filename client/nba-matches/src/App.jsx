import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute"; // <-- Importamos la ruta protegida
import { Layout } from "./core/components/Layout";
import { DailyGamesList } from "./features/dailyGames/components/DailyGamesList";
import { FollowedList} from "./features/followedGames/components/followedGames";
import { Login } from "./features/auth/components/Login";
import { Register } from "./features/auth/components/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<DailyGamesList />} />
              <Route path="seguidos" element={<FollowedList />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;