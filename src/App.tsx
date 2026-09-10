import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ManicurePage from "./pages/ManicurePage";
import CosmetologyPage from "./pages/CosmetologyPage";
import SkincareWellnessPage from "./pages/SkincareWellnessPage";
import ArticlePage from "./pages/ArticlePage";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/manicure" element={<ManicurePage />} />
          <Route path="/cosmetology" element={<CosmetologyPage />} />
          <Route path="/wellness" element={<SkincareWellnessPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </BrowserRouter>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

export default App;
