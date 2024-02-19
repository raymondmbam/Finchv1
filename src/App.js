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
import Transfer from "./Pages/Transfer";
import ApproveTransfer from "./Pages/ApproveTransfer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/voice" element={<Voice />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route
        path="/approve-transfer/:user/:amount"
        element={<ApproveTransfer />}
      />
    </Route>,
  ),
);
/* huuu */
/* huuu 2 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
