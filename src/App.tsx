// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ManicurePage from "./pages/ManicurePage";
import EyelashesPage from "./pages/EyelashesPage";
import CosmetologyPage from "./pages/CosmetologyPage";
import SkincareWellnessPage from "./pages/SkincareWellnessPage";
import ArticlePage from "./pages/ArticlePage";
// import UserProfile from "./pages/UserProfile";
// import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

const App = () => (
  // <QueryClientProvider client={queryClient}>
  //   <TooltipProvider>
  //     <Toaster />
  //     <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/manicure" element={<ManicurePage />} />
          <Route path="/eyelashes" element={<EyelashesPage />} />
          <Route path="/cosmetology" element={<CosmetologyPage />} />
          <Route path="/skincare-wellness" element={<SkincareWellnessPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          {/* <Route path="/admin" element={<AdminPage />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  //   {/* </TooltipProvider>
  // </QueryClientProvider> */}
);

export default App;
