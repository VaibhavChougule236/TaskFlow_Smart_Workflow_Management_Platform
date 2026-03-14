import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

function Home() {
    const { user, logout } = useContext(AuthContext);

    const aboutRef = useRef(null);

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            <Header />
            <main className="flex-grow">
                <header className="max-w-7xl mx-auto px-8 py-24 text-center">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                        Focus on what <br /> <span className="text-blue-600">matters.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
                        A high-performance task management system built with the modern stack for developers who demand efficiency.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link
                            to={user ? "/dashboard" : "/register"}
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                        >
                            {user ? "Continue to App" : "Get Started"} <ArrowRight size={20} />
                        </Link>
                        <button
                            onClick={() => scrollTo(aboutRef)}
                            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
                        >
                            Technical Overview
                        </button>
                    </div>
                </header>
            </main>

            <Footer />
        </div>
    );
}

export default Home;