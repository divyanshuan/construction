import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layout/AdminLayout";
import VillagePage from "./pages/Admin/VillagePage";
import HousePage from "./pages/Admin/HousePage";
import FilePage from "./pages/Admin/FilePage";
import VillageList from "./components/VillageList";
import VillageDetail from "./components/VillageDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/village" element={<VillageList />} />{" "}
          {/* Use element instead of component */}
          <Route path="/village/:villageId" element={<VillageDetail />} />{" "}
          {/* Use element instead of component */}
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin/village" element={<VillagePage />} />
          <Route path="/admin/houses" element={<HousePage />} />
          <Route path="/admin/files" element={<FilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
