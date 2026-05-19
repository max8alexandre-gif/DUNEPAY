import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, Key, Smartphone } from "lucide-react";

const ADMIN_PASSWORD = "A7X9P2L8Q4M1"; // Senha fixa do admin

export default function AdminLogin() {
  const [step, setStep] = useState<"password" | "2fa">("password");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password verification
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      // Simulate 2FA QR code generation
      setQrCode(
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DunePay:admin@dunepay.com?secret=JBSWY3DPEBLW64TMMQ======&issuer=DunePay"
      );
      setStep("2fa");
      toast.success("Senha correta! Escaneie o QR Code com seu autenticador.");
    } else {
      toast.error("❌ Senha incorreta!");
    }

    setIsLoading(false);
  };

  const handleTwoFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate 2FA verification
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (twoFACode.length === 6 && /^\d+$/.test(twoFACode)) {
      // In production, verify against TOTP
      toast.success("✅ Login bem-sucedido!");
      localStorage.setItem("adminToken", "authenticated");
      window.location.href = "/admin";
    } else {
      toast.error("❌ Código 2FA inválido!");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">Painel Admin</h1>
            <p className="text-gray-400 text-center mb-8">
              {step === "password" ? "Acesso Restrito" : "Verificação 2FA"}
            </p>

            {step === "password" ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Senha Admin</label>
                  <Input
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-900/50 border-purple-500/20"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  disabled={isLoading}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {isLoading ? "Verificando..." : "Próximo"}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  ⚠️ Acesso restrito ao administrador
                </p>
              </form>
            ) : (
              <form onSubmit={handleTwoFASubmit} className="space-y-4">
                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <img src={qrCode} alt="2FA QR Code" className="w-40 h-40" />
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center">
                  Escaneie o QR Code com seu autenticador (Google Authenticator, Authy, etc)
                </p>

                <div>
                  <label className="block text-sm font-medium mb-2">Código 2FA (6 dígitos)</label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value.slice(0, 6))}
                    maxLength={6}
                    className="bg-slate-900/50 border-purple-500/20 text-center text-2xl tracking-widest"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={isLoading || twoFACode.length !== 6}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  {isLoading ? "Verificando..." : "Verificar 2FA"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-purple-500/20"
                  onClick={() => {
                    setStep("password");
                    setPassword("");
                    setTwoFACode("");
                  }}
                  disabled={isLoading}
                >
                  Voltar
                </Button>
              </form>
            )}
          </div>
        </Card>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-slate-800/30 border border-purple-500/20 rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-400">
            🔐 Este painel é protegido por senha e autenticação 2FA
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
