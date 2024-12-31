import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, FileSpreadsheet, Receipt, Wallet } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Hela360
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive financial management system for Kenyan businesses.
            Simplify tax filing, automate reports, and gain valuable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <BarChart3 className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
            <p className="text-muted-foreground">
              Automated reports with key financial metrics and AI-driven insights.
            </p>
          </Card>

          <Card className="p-6">
            <Receipt className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">KRA Integration</h3>
            <p className="text-muted-foreground">
              Seamless tax filing with TIMs and eTIMs API integration.
            </p>
          </Card>

          <Card className="p-6">
            <Wallet className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Bank Connection</h3>
            <p className="text-muted-foreground">
              Connect your bank accounts for real-time transaction analysis.
            </p>
          </Card>

          <Card className="p-6">
            <FileSpreadsheet className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">PDF to CSV</h3>
            <p className="text-muted-foreground">
              Convert bank statements to CSV with AI-powered OCR technology.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}