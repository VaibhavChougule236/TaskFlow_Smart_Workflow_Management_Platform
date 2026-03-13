import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle,
    ShieldCheck,
    BarChart3,
    ArrowRight,
    LayoutDashboard,
    LogOut,
    Database,
    Cpu
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import Footer from "../layout/Footer";

function Home() {
    const { user, logout } = useContext(AuthContext);

    const aboutRef = useRef(null);

    const scrollTo = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="flex justify-between items-center px-8 py-4 max-w-7xl w-full mx-auto">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">T</div>
                        <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <button onClick={() => scrollTo(aboutRef)} className="hover:text-blue-600 transition-colors">
                            Architecture & Overview
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} 
                                    className="flex items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors text-sm"
                                >
                                    <LayoutDashboard size={18} />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="font-semibold text-sm hover:text-blue-600 transition-colors">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                {/* Hero Section */}
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

                {/* Technical Overview Section */}
                <section ref={aboutRef} className="max-w-7xl mx-auto px-8 py-24 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Project Overview & Architecture</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">
                                TaskFlow is a robust full-stack ecosystem engineered for reliability. Built with a <strong>Spring Boot 3</strong> backend and <strong>React</strong> frontend, it leverages <strong>JWT</strong> for stateless security and <strong>MySQL</strong> for enterprise-grade data persistence.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Cpu size={20} /></div>
                                    <div>
                                        <h4 className="font-bold">Restful API Architecture</h4>
                                        <p className="text-sm text-slate-400">Clean separation of concerns with a decoupled React frontend and Java backend.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Database size={20} /></div>
                                    <div>
                                        <h4 className="font-bold">MySQL Relational Storage</h4>
                                        <p className="text-sm text-slate-400">Structured data modeling using JPA and Hibernate for optimized performance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-blue-200 aspect-video flex flex-col justify-center border border-slate-800">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <code className="text-blue-400 text-sm md:text-base leading-relaxed">
                                <span className="text-purple-400">@RestController</span><br />
                                <span className="text-purple-400">@RequestMapping</span>("/api/tasks")<br />
                                <span className="text-white">public class</span> <span className="text-yellow-400">TaskController</span> {"{"}<br />
                                &nbsp;&nbsp;<span className="text-gray-500">// Secured by Spring Security</span><br />
                                &nbsp;&nbsp;<span className="text-purple-400">@GetMapping</span><br />
                                &nbsp;&nbsp;<span className="text-white">public</span> ResponseEntity {"<List<Task>>"} getAll()...<br />
                                {"}"}
                            </code>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;