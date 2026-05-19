import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Plus, Trash2, Play, Square, Settings, Zap, DollarSign, Users, Bot } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminPanelEnhanced() {
  const { user } = useAuth();
  const [showNewBotModal, setShowNewBotModal] = useState(false);
  const [botName, setBotName] = useState("");
  const [botToken, setBotToken] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("pella");
  const [botCode, setBotCode] = useState("");

  // Mock data - Bot earnings
  const botEarnings = [
    {
      id: 1,
      name: "Bot Vendas Principal",
      provider: "pella",
      status: "online",
      users: 245,
      sales: 12500,
      salesTax: 1000,
      withdrawals: 2500,
      withdrawalsTax: 2500,
      deposits: 5000,
      depositsTax: 5000,
      totalEarnings: 8500,
    },
    {
      id: 2,
      name: "Bot Suporte",
      provider: "discloud",
      status: "online",
      users: 89,
      sales: 3200,
      salesTax: 256,
      withdrawals: 800,
      withdrawalsTax: 800,
      deposits: 1500,
      depositsTax: 1500,
      totalEarnings: 2556,
    },
    {
      id: 3,
      name: "Bot Teste",
      provider: "pella",
      status: "offline",
      users: 0,
      sales: 0,
      salesTax: 0,
      withdrawals: 0,
      withdrawalsTax: 0,
      deposits: 0,
      depositsTax: 0,
      totalEarnings: 0,
    },
  ];

  // Calculate totals
  const totalEarnings = botEarnings.reduce((sum, bot) => sum + bot.totalEarnings, 0);
  const totalSalesTax = botEarnings.reduce((sum, bot) => sum + bot.salesTax, 0);
  const totalWithdrawalsTax = botEarnings.reduce((sum, bot) => sum + bot.withdrawalsTax, 0);
  const totalDepositsTax = botEarnings.reduce((sum, bot) => sum + bot.depositsTax, 0);

  // Chart data
  const earningsData = [
    { name: "Seg", earnings: 1200 },
    { name: "Ter", earnings: 1900 },
    { name: "Qua", earnings: 1600 },
    { name: "Qui", earnings: 2200 },
    { name: "Sex", earnings: 2800 },
    { name: "Sab", earnings: 2100 },
    { name: "Dom", earnings: 1800 },
  ];

  const earningsByType = [
    { name: "Vendas", value: totalSalesTax, color: "#10b981" },
    { name: "Saques", value: totalWithdrawalsTax, color: "#f59e0b" },
    { name: "Depósitos", value: totalDepositsTax, color: "#3b82f6" },
  ];

  const stats = [
    { label: "Ganhos Totais", value: `R$ ${totalEarnings.toFixed(2)}`, icon: DollarSign, color: "from-green-600 to-green-700" },
    { label: "Bots Ativos", value: botEarnings.filter(b => b.status === "online").length, icon: Bot, color: "from-purple-600 to-purple-700" },
    { label: "Usuários Totais", value: botEarnings.reduce((sum, b) => sum + b.users, 0), icon: Users, color: "from-blue-600 to-blue-700" },
    { label: "Taxa Vendas", value: `R$ ${totalSalesTax.toFixed(2)}`, icon: Zap, color: "from-yellow-600 to-yellow-700" },
  ];

  const handleCreateBot = () => {
    if (!botName || !botToken || !botCode) {
      toast.error("Preencha todos os campos");
      return;
    }

    toast.success(`Bot "${botName}" criado com sucesso em ${selectedProvider}!`);
    setBotName("");
    setBotToken("");
    setBotCode("");
    setShowNewBotModal(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <p className="text-gray-500">Gerenciamento completo e ganhos por bot</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className={`bg-gradient-to-br ${stat.color} bg-opacity-10 border-purple-500/20 p-6`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 opacity-50" />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Ganhos Últimos 7 Dias</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #8b5cf6" }} />
                <Line type="monotone" dataKey="earnings" stroke="#a78bfa" strokeWidth={2} dot={{ fill: "#a78bfa", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Ganhos por Tipo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={earningsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {earningsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {earningsByType.map((type) => (
                <div key={type.name} className="flex justify-between text-sm">
                  <span className="text-gray-400">{type.name}</span>
                  <span className="font-semibold">R$ {type.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bots" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger value="bots">Bots & Ganhos</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="kyc">KYC</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Bots Tab with Earnings */}
          <TabsContent value="bots" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gerenciar Bots & Ganhos</h2>
              <Dialog open={showNewBotModal} onOpenChange={setShowNewBotModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Bot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Novo Bot</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nome do Bot</Label>
                      <Input placeholder="Bot Vendas" value={botName} onChange={(e) => setBotName(e.target.value)} />
                    </div>
                    <div>
                      <Label>Token Discord</Label>
                      <Input type="password" placeholder="Seu token aqui" value={botToken} onChange={(e) => setBotToken(e.target.value)} />
                    </div>
                    <div>
                      <Label>Plataforma de Hospedagem</Label>
                      <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pella">Pella</SelectItem>
                          <SelectItem value="discloud">Discloud</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Código (Git URL ou arquivo)</Label>
                      <Input placeholder="https://github.com/seu-repo/bot" value={botCode} onChange={(e) => setBotCode(e.target.value)} />
                    </div>
                    <Button onClick={handleCreateBot} className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                      Criar Bot
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="bg-slate-800/50 border-purple-500/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-500/20">
                    <TableHead>Bot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Vendas</TableHead>
                    <TableHead>Taxa Vendas</TableHead>
                    <TableHead>Saques</TableHead>
                    <TableHead>Taxa Saques</TableHead>
                    <TableHead>Depósitos</TableHead>
                    <TableHead>Taxa Depósitos</TableHead>
                    <TableHead>Ganhos Totais</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {botEarnings.map((bot) => (
                    <TableRow key={bot.id} className="border-purple-500/10">
                      <TableCell className="font-medium">{bot.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${bot.status === "online" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {bot.status}
                        </span>
                      </TableCell>
                      <TableCell>{bot.users}</TableCell>
                      <TableCell>R$ {bot.sales.toFixed(2)}</TableCell>
                      <TableCell className="text-green-400">R$ {bot.salesTax.toFixed(2)}</TableCell>
                      <TableCell>R$ {bot.withdrawals.toFixed(2)}</TableCell>
                      <TableCell className="text-yellow-400">R$ {bot.withdrawalsTax.toFixed(2)}</TableCell>
                      <TableCell>R$ {bot.deposits.toFixed(2)}</TableCell>
                      <TableCell className="text-blue-400">R$ {bot.depositsTax.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold text-purple-400">R$ {bot.totalEarnings.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            {bot.status === "online" ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Other tabs */}
          <TabsContent value="usuarios">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <p className="text-gray-400">Gerenciamento de usuários em desenvolvimento...</p>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <p className="text-gray-400">Logs do sistema em desenvolvimento...</p>
            </Card>
          </TabsContent>

          <TabsContent value="kyc">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <p className="text-gray-400">Revisão de documentos KYC em desenvolvimento...</p>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6 space-y-4">
              <div>
                <Label>Limite de KYC (R$)</Label>
                <Input type="number" defaultValue="5000" />
              </div>
              <div>
                <Label>Taxa de Venda (R$)</Label>
                <Input type="number" defaultValue="0.80" />
              </div>
              <div>
                <Label>Taxa de Saque (R$)</Label>
                <Input type="number" defaultValue="1.00" />
              </div>
              <div>
                <Label>Taxa de Depósito (R$)</Label>
                <Input type="number" defaultValue="1.00" />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                Salvar Configurações
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
