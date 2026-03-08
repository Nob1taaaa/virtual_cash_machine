import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";

export interface Transaction {
  id: number;
  type: "deposit" | "withdraw" | "balance";
  amount?: number;
  balance: number;
  timestamp: Date;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "deposit": return <ArrowUpCircle className="w-4 h-4 text-primary" />;
      case "withdraw": return <ArrowDownCircle className="w-4 h-4 text-destructive" />;
      default: return <Wallet className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => soundEffects.click()}
          className="w-full bg-secondary/50 hover:bg-secondary/80 border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-105 rounded-xl h-10 text-sm"
        >
          <History className="w-4 h-4 mr-2" />
          Transaction History
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border/50 atm-glow max-w-sm">
        <DialogHeader>
          <DialogTitle className="atm-glow-text flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[300px]">
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {[...transactions].reverse().map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center gap-2">
                    {getIcon(t.type)}
                    <div>
                      <p className="text-sm font-medium capitalize">{t.type}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(t.timestamp)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {t.amount && (
                      <p className={`text-sm font-bold ${t.type === "deposit" ? "text-primary" : "text-destructive"}`}>
                        {t.type === "deposit" ? "+" : "-"}₹{t.amount.toFixed(2)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">Bal: ₹{t.balance.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionHistory;
