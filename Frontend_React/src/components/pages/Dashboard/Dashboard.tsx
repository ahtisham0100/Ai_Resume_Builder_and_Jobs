import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Target, Sparkles, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom"; 
import { useAuthProvider } from "@/contextProvider/AuthProvider";
import axios from "axios";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => (
  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  userName?: string;
}

export default function Dashboard() {

const {user} =  useAuthProvider();
console.log("User Data:", user);
const stats = [
    { title: "Resumes Created", value: user?.resumeCount || 0, icon: FileText },
    { title: "Jobs Applied", value: user?.jobCount || 0, icon: Target },
    { title: "AI Suggestions", value: user?.aiSuggestionCount || 0, icon: Sparkles },
  ];

  const actions = [
    {
      label: "Create New Resume",
      path: "/resume-builder",
      icon: Plus,
      variant: "default" as const,
    },
    {
      label: "Track New Job",
      path: "/job-tracker",
      icon: Target,
      variant: "secondary" as const,
    },
    {
      label: "Get AI Suggestions",
      path: "/ai-jobs",
      icon: Sparkles,
      variant: "outline" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6 mt-16">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome, {user?.displayName || "User"}!  
        </h1>
        <p className="text-lg text-muted-foreground">
          to AI Resume and Jobs Portal
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 mt-1 justify-center items-center">
        {actions.map((action) => (
          <Button
            key={action.path}
            variant={action.variant}
            size="lg"
            asChild
            className="w-full sm:w-auto min-w-[180px]"
          >
            <Link to={action.path} className="flex items-center space-x-2">
              <action.icon className="h-4 w-4" />
              <span>{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}