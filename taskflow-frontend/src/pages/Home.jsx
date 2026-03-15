import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

function Home() {
    const { user } = useContext(AuthContext); // Removed logout as it wasn't used in your JSX

    const aboutRef = useRef(null);

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                <header className="max-w-7xl mx-auto px-8 py-24 text-center">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                        Focus on what <br /> <span className="text-blue-600 dark:text-blue-500">matters.</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
                        A high-performance task management system built with the modern stack for developers who demand efficiency.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            to={user ? "/dashboard" : "/register"}
                            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                        >
                            {user ? "Continue to App" : "Get Started"} <ArrowRight size={20} />
                        </Link>
                        <button
                            onClick={() => scrollTo(aboutRef)}
                            className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Technical Overview
                        </button>
                    </div>
                </header>

                {/* Added the ref div so your scroll function has a target */}
                <div ref={aboutRef} />
            </main>

            <Footer />
        </div>
    );
}

export default Home;