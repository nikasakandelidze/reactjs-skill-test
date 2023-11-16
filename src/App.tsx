import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./router";
import { RouteData } from "./utils/types";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { SnackbarProvider } from "notistack";
import { SNACK_BAR_TIMEOUT } from "./utils/constants";
import { Provider } from "react-redux";
import { store } from "./store";
import { useLogin } from "./hooks/useLogin";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SnackbarProvider autoHideDuration={SNACK_BAR_TIMEOUT}>
          <Pages />
        </SnackbarProvider>
      </Provider>
    </div>
  );
}

const Pages = () => {
  const login = useLogin();
  const token = login.data?.token;

  return (
    <Routes>
      {routes.map((route: RouteData) => (
        <Route
          key={route.id}
          path={route.path}
          element={
            route.type === "public" ? (
              <route.element />
            ) : (
              <ProtectedRoute restriction={!token}>
                <route.element />
              </ProtectedRoute>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default App;
