"use client";

import { useState, ChangeEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/admin.service";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {
      const data = await adminLogin(email, password);

      if (data.success && data.token) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed due to an unexpected error.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Admin Panel</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5">
            <Input
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoggingIn}
              type="email"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoggingIn}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoggingIn}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="p-2 bg-red-100 border border-red-300 text-red-700 text-sm text-center rounded-md">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className={`
    w-full text-lg font-semibold relative overflow-hidden
    bg-gradient-to-r from-blue-500 to-blue-600
    hover:from-blue-600 hover:to-blue-700
    text-white py-3 rounded-lg shadow-lg
    transition-all duration-300 ease-out
    disabled:opacity-60 disabled:cursor-not-allowed
    active:scale-[0.98]
  `}
            >
              {/* Animated background glow */}
              <span
                className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-10 transition-opacity duration-300"
              ></span>

              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}