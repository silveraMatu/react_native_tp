import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const initialState = {
  formData: {
    email: "",
    nickname: "",
    password: "",
  },
  error: null,
  isLoading: false,
};

function registerReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, isLoading: false };
    case 'REGISTER_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export const Register = () => {
  const { register } = useAuth();
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { formData, error, isLoading } = state;

  const handleChange = (e) => {
    dispatch({ 
      type: 'FIELD_CHANGE', 
      field: e.target.name, 
      value: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'REGISTER_START' });
    
    try {
      await register(formData.email, formData.nickname, formData.password);
      dispatch({ type: 'REGISTER_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'REGISTER_ERROR', payload: err.message });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Crear Cuenta</h1>
          <p className="text-gray-500 mt-2 text-sm">Comienza a seguir tus partidos favoritos</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm font-bold rounded-xl text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nickname</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Ej: Matute"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all mt-4 shadow-sm ${
              isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gray-900 hover:bg-black active:scale-[0.98]"
            }`}
          >
            {isLoading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-orange-500 font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};