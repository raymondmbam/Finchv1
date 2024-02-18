import logo from "./logo.svg";
import "./App.css";
import "@fontsource/dm-sans"; // Defaults to weight 400
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Voice from "./Pages/Voice";
import Savings from "./Pages/Savings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/voice" element={<Voice />} />
    </Route>,
  ),
);
/* huuu */
/* huuu 2 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
