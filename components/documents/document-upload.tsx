"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useState } from "react";
import { parsePDFStatement } from "@/lib/api/banking/parser";

export function DocumentUpload() {
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    try {
      const statement = await parsePDFStatement(file);
      // Handle the parsed statement
    } catch (error) {
      console.error("Error parsing statement:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, CSV (MAX. 10MB)
              </p>
            </div>
            <Input
              type="file"
              className="hidden"
              accept=".pdf,.csv"
              onChange={handleFileUpload}
              disabled={processing}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}