import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./router";
import { RouteData } from "./utils/types";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { SnackbarProvider } from "notistack";
import { SNACK_BAR_TIMEOUT } from "./utils/constants";

function App() {
  return (
    <div className="App">
      <SnackbarProvider autoHideDuration={SNACK_BAR_TIMEOUT}>
        <Routes>
          {routes.map((route: RouteData) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                route.type === "public" ? (
                  <route.element />
                ) : (
                  <ProtectedRoute restriction={true}>
                    <route.element />
                  </ProtectedRoute>
                )
              }
            />
          ))}
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
