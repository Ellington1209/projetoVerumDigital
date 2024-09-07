import { Routes, Route, Navigate } from "react-router-dom";
import { Agenda, Dashboard, Login, Register,} from "../pages";
import PrivateRouter from "./PrivateRouter";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Rotas admin */}
      <Route path="/dashboard" element={<PrivateRouter><Dashboard/></PrivateRouter>}/>
      <Route path="/agenda" element={<PrivateRouter><Agenda/></PrivateRouter>}/>
     
    </Routes>
  );
};
