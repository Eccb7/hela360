"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to Hela360</h1>
          <p className="text-muted-foreground">
            Sign in to manage your business finances
          </p>
        </div>

        <Button
          className="w-full mb-4"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
}