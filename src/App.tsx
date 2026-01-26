import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Public pages
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import VehicleDetail from "./pages/VehicleDetail";
import About from "./pages/About";
import Warranty from "./pages/Warranty";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import VehicleForm from "./pages/admin/VehicleForm";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with header/footer */}
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <Home />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
            <Route
              path="/stock"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <Stock />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
            <Route
              path="/stock/:id"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <VehicleDetail />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <About />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
            <Route
              path="/warranty"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <Warranty />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <Contact />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />

            {/* Admin login (no protection) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="vehicles/new" element={<VehicleForm />} />
              <Route path="vehicles/:id" element={<VehicleForm />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-1">
                    <NotFound />
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
