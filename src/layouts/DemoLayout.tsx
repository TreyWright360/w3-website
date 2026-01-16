import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function DemoLayout() {
    const location = useLocation();
    const isHome = location.pathname === '/demos';

    return (
        <div className="min-h-screen bg-[--bg-primary] text-[--text-primary] selection:bg-[--primary] selection:text-white">
            {/* We can reuse the main Header or create a specific one for Demos */}
            <Header />

            <main className="pt-20">
                {!isHome && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <Link to="/demos" className="text-sm text-[--text-secondary] hover:text-[--primary] transition-colors flex items-center gap-2">
                            ← Back to Demo Hub
                        </Link>
                    </div>
                )}
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
