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
import { TrendingUp, Plus, Trash2, Play, Square, Settings } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminPanel() {
  const { user } = useAuth();
  const [showNewBotModal, setShowNewBotModal] = useState(false);
  const [botName, setBotName] = useState("");
  const [botToken, setBotToken] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("pella");
  const [botCode, setBotCode] = useState("");

  // Mock data
  const stats = [
    { label: "Receita Total", value: "R$ 45.234,50", change: "+12.5%" },
    { label: "Bots Ativos", value: "12", change: "+2" },
    { label: "Usuários", value: "342", change: "+18" },
    { label: "Transações", value: "5.234", change: "+23%" },
  ];

  const bots = [
    {
      id: 1,
      name: "Bot Vendas Principal",
      provider: "pella",
      status: "online",
      users: 245,
      sales: "R$ 12.500",
    },
    {
      id: 2,
      name: "Bot Suporte",
      provider: "discloud",
      status: "online",
      users: 89,
      sales: "R$ 0",
    },
    {
      id: 3,
      name: "Bot Teste",
      provider: "pella",
      status: "offline",
      users: 0,
      sales: "R$ 0",
    },
  ];

  const logs = [
    {
      id: 1,
      topic: "transacao",
      action: "venda_completa",
      user: "user_123",
      description: "Venda de R$ 150.00 concluída",
      timestamp: "2026-05-18 14:32",
    },
    {
      id: 2,
      topic: "saque",
      action: "saque_solicitado",
      user: "user_456",
      description: "Saque de R$ 500.00 solicitado",
      timestamp: "2026-05-18 13:15",
    },
    {
      id: 3,
      topic: "seguranca",
      action: "kyc_enviado",
      user: "user_789",
      description: "Documento KYC enviado para revisão",
      timestamp: "2026-05-18 12:45",
    },
    {
      id: 4,
      topic: "bot",
      action: "bot_erro",
      user: "bot_001",
      description: "Erro crítico no bot de vendas",
      timestamp: "2026-05-18 11:20",
    },
    {
      id: 5,
      topic: "admin",
      action: "usuario_banido",
      user: "admin",
      description: "Usuário user_999 foi banido",
      timestamp: "2026-05-18 10:05",
    },
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

  const topicColors: Record<string, string> = {
    transacao: "bg-blue-500/20 text-blue-400",
    saque: "bg-red-500/20 text-red-400",
    deposito: "bg-green-500/20 text-green-400",
    seguranca: "bg-yellow-500/20 text-yellow-400",
    bot: "bg-purple-500/20 text-purple-400",
    kyc: "bg-indigo-500/20 text-indigo-400",
    admin: "bg-orange-500/20 text-orange-400",
    infracacao: "bg-red-600/20 text-red-300",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <p className="text-gray-500">Gerenciamento completo da plataforma</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-400">{stat.change}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bots" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger value="bots">Bots</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="kyc">KYC</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          {/* Bots Tab */}
          <TabsContent value="bots" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gerenciar Bots</h2>
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
                      <Input
                        placeholder="Bot Vendas"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Token Discord</Label>
                      <Input
                        type="password"
                        placeholder="Seu token aqui"
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                      />
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
                      <Input
                        placeholder="https://github.com/seu-repo/bot"
                        value={botCode}
                        onChange={(e) => setBotCode(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleCreateBot}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700"
                    >
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Vendas</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bots.map((bot) => (
                    <TableRow key={bot.id} className="border-purple-500/10">
                      <TableCell className="font-medium">{bot.name}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-slate-700 rounded text-xs">
                          {bot.provider.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            bot.status === "online"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {bot.status}
                        </span>
                      </TableCell>
                      <TableCell>{bot.users}</TableCell>
                      <TableCell>{bot.sales}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            {bot.status === "online" ? (
                              <Square className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
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

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <h2 className="text-xl font-semibold">Logs do Sistema</h2>
            <Card className="bg-slate-800/50 border-purple-500/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-500/20">
                    <TableHead>Tópico</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data/Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-purple-500/10">
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            topicColors[log.topic] || "bg-gray-500/20"
                          }`}
                        >
                          {log.topic}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{log.action}</TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell className="text-sm">{log.description}</TableCell>
                      <TableCell className="text-sm text-gray-500">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Usuarios Tab */}
          <TabsContent value="usuarios">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <p className="text-gray-400">Gerenciamento de usuários em desenvolvimento...</p>
            </Card>
          </TabsContent>

          {/* KYC Tab */}
          <TabsContent value="kyc">
            <Card className="bg-slate-800/50 border-purple-500/20 p-6">
              <p className="text-gray-400">Revisão de documentos KYC em desenvolvimento...</p>
            </Card>
          </TabsContent>

          {/* Configurações Tab */}
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
