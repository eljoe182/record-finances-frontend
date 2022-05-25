import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PurchasesPage from "./pages/purchase/PurchasesPage";
import WalletsPage from "./pages/wallet/WalletsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
