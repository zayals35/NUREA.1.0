import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicePage from "./pages/tjenester/ServicePage.tsx";
import Tjenester from "./pages/Tjenester.tsx";
import Priser from "./pages/Priser.tsx";
import Arbeider from "./pages/Arbeider.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import OmOss from "./pages/OmOss.tsx";
import Metoden from "./pages/Metoden.tsx";
import Klarhetssjekk from "./pages/Klarhetssjekk.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tjenester" element={<Tjenester />} />
          <Route path="/tjenester/:slug" element={<ServicePage />} />
          <Route path="/priser" element={<Priser />} />
          <Route path="/arbeider" element={<Arbeider />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/om-oss" element={<OmOss />} />
          <Route path="/metoden" element={<Metoden />} />
          <Route path="/klarhetssjekk" element={<Klarhetssjekk />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
