import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, BarChart3, FileText, Target, Settings, WandSparkles , User2Icon , UserCogIcon, UserCog2, UserCog2Icon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ThemeToogle";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Resume Builder", path: "/resume-builder", icon: FileText },
  { name: "Job Tracker", path: "/job-tracker", icon: Target },
  { name: "AI Jobs", path: "/ai-jobs", icon: WandSparkles },
  { name: "Personal Profile", path: "/profile-setting", icon: UserCog2Icon },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 nav-animated-bg backdrop-blur-md shadow-sm border-b border-glass-border z-50 transition-all duration-[3000ms]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-all duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Ai Resume
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 bg-nav/50 rounded-full px-2 py-1 backdrop-blur-sm border border-nav-border/50">
              {navLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
                    isActive(path)
                      ? "bg-nav-active text-nav-active-foreground shadow-sm"
                      : "text-nav-foreground hover:bg-nav-hover/20 hover:text-nav-hover-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                  {isActive(path) && (
                    <div className="absolute inset-0 bg-nav-active rounded-full -z-10 shadow-lg" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <ModeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-yellow-500 hover:text-yellow-500"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-secondary border-nav-border backdrop-blur-md shadow-sm border-b border-glass-border animated-gradient"
                >
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-2 pb-4 border-b border-nav-border">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">A</span>
                      </div>
                      <span className="text-lg font-semibold text-nav-foreground">Ai Resume</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {navLinks.map(({ name, path, icon: Icon }) => (
                        <Link
                          key={path}
                          to={path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                            isActive(path)
                              ? "bg-nav-active text-nav-active-foreground shadow-sm"
                              : "text-nav-foreground hover:bg-nav-hover/20 hover:text-nav-hover-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
