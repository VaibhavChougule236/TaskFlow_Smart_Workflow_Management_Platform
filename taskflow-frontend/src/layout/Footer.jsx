import { Github, Linkedin, Heart, ExternalLink } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-100 dark:border-slate-800 py-4 px-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 font-medium text-sm">
          <span className="text-blue-600 dark:text-blue-500 font-bold tracking-tight">TaskFlow</span>
          <span className="text-gray-300 dark:text-slate-700">|</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 text-sm font-medium">
          Built with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by 
          <span className="text-gray-900 dark:text-slate-100 font-bold ml-1">Vaibhav Chougule</span>
        </div>

        <div className="flex items-center gap-5">
          <a 
            href="https://github.com/vaibhavchougule236" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors text-xs font-semibold"
          >
            <Github size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/vaibhavchougule124" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs font-semibold"
          >
            <Linkedin size={18} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-700"></div>

          <span className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-gray-400 dark:text-slate-500 font-bold uppercase tracking-tighter">
            v1.0.0
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;