import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import CreateDisco from "@/pages/CreateDisco";
import JoinDisco from "@/pages/JoinDisco";
import DiscoSession from "@/pages/DiscoSession";
import Library from "@/pages/Library";
import Profile from "@/pages/Profile"; // Import the Profile page
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/create" element={<CreateDisco />} />
                    <Route path="/join" element={<JoinDisco />} />
                    <Route path="/session/:id" element={<DiscoSession />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;