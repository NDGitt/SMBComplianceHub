import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Discovery from "@/pages/Discovery";
import Results from "@/pages/Results";
import Providers from "@/pages/Providers";
import NotFound from "@/pages/not-found";

// Get base path for GitHub Pages
const getBasePath = () => {
  // In production (GitHub Pages), use the repository name as base path
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
      return '/SMBComplianceHub';
    }
  }
  // In development, no base path needed
  return '';
};

function AppRouter() {
  const basePath = getBasePath();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Router base={basePath}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/discovery" component={Discovery} />
            <Route path="/results" component={Results} />
            <Route path="/providers" component={Providers} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
