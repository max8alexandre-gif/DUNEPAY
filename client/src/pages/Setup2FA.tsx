import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Smartphone, Copy, Check, AlertCircle } from "lucide-react";

export default function Setup2FA() {
  const [step, setStep] = useState<"setup" | "verify" | "backup">("setup");
  const [qrCode, setQrCode] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=otpauth://totp/DunePay:user@dunepay.com?secret=JBSWY3DPEBLW64TMMQ======&issuer=DunePay"
  );
  const [verifyCode, setVerifyCode] = useState("");
  const [backupCodes, setBackupCodes] = useState([
    "ABC12345",
    "DEF67890",
    "GHI11111",
    "JKL22222",
    "MNO33333",
    "PQR44444",
    "STU55555",
    "VWX66666",
    "YZA77777",
    "BCD88888",
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (verifyCode.length === 6 && /^\d+$/.test(verifyCode)) {
      setStep("backup");
      toast.success("✅ 2FA ativado com sucesso!");
    } else {
      toast.error("❌ Código inválido!");
    }

    setIsLoading(false);
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === "setup" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Ativar Autenticação 2FA</h1>
                <p className="text-gray-400">
                  Proteja sua conta com autenticação de dois fatores
                </p>
              </div>

              <Card className="bg-slate-800/50 border-purple-500/20 p-8">
                <div className="space-y-6">
                  {/* Step 1: Download App */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500/20">
                        <span className="text-lg font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Baixe um Autenticador</h3>
                      <p className="text-gray-400 mb-4">
                        Instale um dos aplicativos abaixo em seu smartphone:
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Button variant="outline" className="border-purple-500/20">
                          Google Authenticator
                        </Button>
                        <Button variant="outline" className="border-purple-500/20">
                          Authy
                        </Button>
                        <Button variant="outline" className="border-purple-500/20">
                          Microsoft Authenticator
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/10"></div>

                  {/* Step 2: Scan QR Code */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500/20">
                        <span className="text-lg font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Escaneie o QR Code</h3>
                      <div className="bg-white p-4 rounded-lg w-fit">
                        <img src={qrCode} alt="2FA QR Code" className="w-64 h-64" />
                      </div>
                      <p className="text-sm text-gray-400 mt-4">
                        Ou insira manualmente: <code className="bg-slate-900/50 px-2 py-1 rounded">JBSWY3DPEBLW64TMMQ======</code>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/10"></div>

                  {/* Step 3: Verify */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500/20">
                        <span className="text-lg font-bold">3</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-4">Verifique o Código</h3>
                      <form onSubmit={handleVerify} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Digite o código de 6 dígitos
                          </label>
                          <Input
                            type="text"
                            placeholder="000000"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value.slice(0, 6))}
                            maxLength={6}
                            className="bg-slate-900/50 border-purple-500/20 text-center text-2xl tracking-widest"
                            disabled={isLoading}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          disabled={isLoading || verifyCode.length !== 6}
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          {isLoading ? "Verificando..." : "Ativar 2FA"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {step === "backup" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Códigos de Backup</h1>
                <p className="text-gray-400">
                  Salve esses códigos em um local seguro para recuperação de conta
                </p>
              </div>

              <Card className="bg-slate-800/50 border-orange-500/20 p-6">
                <div className="flex gap-3 mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-200">
                    <p className="font-semibold">⚠️ Importante!</p>
                    <p>Salve esses códigos em um local seguro. Cada código pode ser usado apenas uma vez para acessar sua conta caso perca acesso ao seu autenticador.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {backupCodes.map((code, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-slate-900/50 border border-purple-500/20 rounded p-3 flex items-center justify-between group cursor-pointer hover:border-purple-500/50 transition"
                      onClick={() => copyBackupCode(code)}
                    >
                      <code className="font-mono text-sm">{code}</code>
                      {copiedCode === code ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    onClick={() => {
                      toast.success("✅ 2FA configurado com sucesso!");
                      window.location.href = "/dashboard";
                    }}
                  >
                    Concluir Configuração
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/20"
                    onClick={() => {
                      const text = backupCodes.join("\n");
                      navigator.clipboard.writeText(text);
                      toast.success("Todos os códigos copiados!");
                    }}
                  >
                    Copiar Todos os Códigos
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
