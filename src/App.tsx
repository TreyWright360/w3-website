import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ProductionVibeCoding } from './pages/services/ProductionVibeCoding';
import { AIBusinessWebsite } from './pages/services/AIBusinessWebsite';
import AIReceptionistDashboard from './pages/dashboard/AIReceptionistDashboard';
import { DemoLayout } from './layouts/DemoLayout';
import { DemoHub } from './pages/demos/DemoHub';
import { LeadMagnetsDemo } from './pages/demos/LeadMagnetsDemo';
import { MassOutreachDemo } from './pages/demos/MassOutreachDemo';
import { PhoneSupportDemo } from './pages/demos/PhoneSupportDemo';
import { TextSupportDemo } from './pages/demos/TextSupportDemo';
import { PersonalizedOutreachDemo } from './pages/demos/PersonalizedOutreachDemo';
import { RagDemo } from './pages/demos/RagDemo';
import { AppointmentSettingDemo } from './pages/demos/AppointmentSettingDemo';
import { ProductizedInfoDemo } from './pages/demos/ProductizedInfoDemo';
import { SalesAnalysisDemo } from './pages/demos/SalesAnalysisDemo';
import { ContentRepurposingDemo } from './pages/demos/ContentRepurposingDemo';
import { RecruitmentDemo } from './pages/demos/RecruitmentDemo';
import { RestaurantDemo } from './pages/industries/RestaurantDemo';
import { DentalDemo } from './pages/industries/DentalDemo';

function Layout() {
  // const location = useLocation();

  // Reset scroll on route change
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary] font-sans selection:bg-[--primary] selection:text-white">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/production-vibe-coding" element={<ProductionVibeCoding />} />
          <Route path="/services/ai-business-website" element={<AIBusinessWebsite />} />
          <Route path="/dashboard" element={<AIReceptionistDashboard />} />

          {/* Industry Vertical Routes */}
          <Route path="/industries/restaurants" element={<RestaurantDemo />} />
          <Route path="/industries/dental" element={<DentalDemo />} />

          {/* Demo Hub Routes (Legacy/Functional) */}
          <Route path="/demos" element={<DemoLayout />}>
            <Route index element={<DemoHub />} />
            <Route path="lead-magnets" element={<LeadMagnetsDemo />} />
            <Route path="mass-outreach" element={<MassOutreachDemo />} />
            <Route path="phone-support" element={<PhoneSupportDemo />} />
            <Route path="text-support" element={<TextSupportDemo />} />
            <Route path="personalized-outreach" element={<PersonalizedOutreachDemo />} />
            <Route path="information-retrieval" element={<RagDemo />} />
            <Route path="appointment-setting" element={<AppointmentSettingDemo />} />
            <Route path="productized-info" element={<ProductizedInfoDemo />} />
            <Route path="sales-analysis" element={<SalesAnalysisDemo />} />
            <Route path="content-repurposing" element={<ContentRepurposingDemo />} />
            <Route path="recruitment" element={<RecruitmentDemo />} />
            {/* We will add individual demo routes here as we build them */}
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
