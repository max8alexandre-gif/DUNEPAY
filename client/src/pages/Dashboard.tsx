import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Wallet, TrendingUp, ArrowDownRight, ArrowUpLeft, Plus, Minus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuth();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Fetch user profile with wallet
  const { data: profile, isLoading } = trpc.user.getProfile.useQuery();

  // Mock data for charts
  const salesData = [
    { date: "16 Mai", vendas: 5000 },
    { date: "17 Mai", vendas: 7200 },
    { date: "18 Mai", vendas: 6800 },
    { date: "19 Mai", vendas: 9100 },
    { date: "20 Mai", vendas: 8500 },
    { date: "21 Mai", vendas: 11200 },
    { date: "22 Mai", vendas: 13500 },
  ];

  const paymentMethods = [
    { name: "PIX", percentage: 72, color: "#a78bfa" },
    { name: "Cartão", percentage: 21, color: "#8b5cf6" },
    { name: "Boleto", percentage: 4, color: "#7c3aed" },
    { name: "Outros", percentage: 3, color: "#6d28d9" },
  ];

  const transactions = [
    { id: 1, type: "venda", desc: "Venda de produto", amount: 150.00, date: "Hoje", status: "completo" },
    { id: 2, type: "saque", desc: "Saque PIX", amount: -500.00, date: "Ontem", status: "completo" },
    { id: 3, type: "deposito", desc: "Depósito PIX", amount: 1000.00, date: "2 dias", status: "completo" },
    { id: 4, type: "taxa", desc: "Taxa de venda", amount: -0.80, date: "Hoje", status: "completo" },
  ];

  if (isLoading) {
    return <DashboardLayout>Carregando...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Visão geral da sua plataforma</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-2">Saldo disponível</p>
                <p className="text-3xl font-bold text-purple-400">R$ 14.392,50</p>
              </div>
              <Wallet className="w-8 h-8 text-purple-500/50" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-2">Vendas</p>
                <p className="text-3xl font-bold text-green-400">R$ 28.754,90</p>
                <p className="text-xs text-green-500 mt-2">+23.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500/50" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-2">Transações</p>
                <p className="text-3xl font-bold">1.482</p>
                <p className="text-xs text-blue-500 mt-2">+18.2%</p>
              </div>
              <ArrowDownRight className="w-8 h-8 text-blue-500/50" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm mb-2">Clientes</p>
                <p className="text-3xl font-bold">932</p>
                <p className="text-xs text-purple-500 mt-2">+16.7%</p>
              </div>
              <ArrowUpLeft className="w-8 h-8 text-purple-500/50" />
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Plus className="w-4 h-4 mr-2" />
                Depositar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fazer Depósito</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    placeholder="100.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    toast.success("Depósito iniciado! Escaneie o QR Code.");
                    setShowDepositModal(false);
                  }}
                >
                  Gerar QR Code PIX
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                <Minus className="w-4 h-4 mr-2" />
                Sacar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar Saque</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    placeholder="100.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Taxa de saque: R$ 1,00
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    toast.success("Saque solicitado! Será processado em breve.");
                    setShowWithdrawModal(false);
                  }}
                >
                  Solicitar Saque
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Vendas nos últimos 7 dias</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #8b5cf6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vendas"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  dot={{ fill: "#a78bfa", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Métodos mais usados</h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{method.name}</span>
                    <span className="text-sm font-semibold">{method.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${method.percentage}%`, backgroundColor: method.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Transactions */}
        <Card className="bg-slate-800/50 border-purple-500/20 p-6">
          <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === "venda"
                        ? "bg-green-500/20"
                        : tx.type === "saque"
                          ? "bg-red-500/20"
                          : "bg-blue-500/20"
                    }`}
                  >
                    {tx.type === "venda" && <TrendingUp className="w-5 h-5 text-green-400" />}
                    {tx.type === "saque" && <ArrowDownRight className="w-5 h-5 text-red-400" />}
                    {tx.type === "deposito" && <ArrowUpLeft className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <p className="font-medium">{tx.desc}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      tx.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}R$ {Math.abs(tx.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
