import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainProvider } from "./context/MainProviderContext";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import NewPurchasePage from "./pages/purchase/NewPurchasePage";
import PurchasesPage from "./pages/purchase/PurchasesPage";
import ShowPurchasePage from "./pages/purchase/ShowPurchasePage";
import WalletsPage from "./pages/wallet/WalletsPage";

function App() {
  return (
    <MainProvider>
      <Toaster position="top-center" />
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
            <Route path="purchases/new" element={<NewPurchasePage />} />
            <Route path="purchases/show/:id" element={<ShowPurchasePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
}

export default App;
