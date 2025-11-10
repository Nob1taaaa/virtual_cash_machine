import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Wallet, ArrowUpCircle, ArrowDownCircle, RotateCcw } from "lucide-react";

const ATMSimulation = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Welcome! Enter an amount and choose an action.");
  const [messageType, setMessageType] = useState<"default" | "success" | "error">("default");

  const updateMessage = (msg: string, type: "default" | "success" | "error" = "default") => {
    setMessage(msg);
    setMessageType(type);
  };

  const checkBalance = () => {
    updateMessage(`Your current balance is ₹${balance.toFixed(2)}`, "success");
    toast.success(`Balance: ₹${balance.toFixed(2)}`);
  };

  const deposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      updateMessage("Enter a valid deposit amount.", "error");
      toast.error("Invalid deposit amount");
      return;
    }
    const newBalance = balance + depositAmount;
    setBalance(newBalance);
    updateMessage(
      `Successfully deposited ₹${depositAmount.toFixed(2)}. New balance: ₹${newBalance.toFixed(2)}`,
      "success"
    );
    toast.success(`Deposited ₹${depositAmount.toFixed(2)}`);
    setAmount("");
  };

  const withdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      updateMessage("Enter a valid withdrawal amount.", "error");
      toast.error("Invalid withdrawal amount");
      return;
    }
    if (withdrawAmount > balance) {
      updateMessage("Insufficient balance!", "error");
      toast.error("Insufficient balance");
      return;
    }
    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    updateMessage(
      `Withdrew ₹${withdrawAmount.toFixed(2)}. Remaining balance: ₹${newBalance.toFixed(2)}`,
      "success"
    );
    toast.success(`Withdrew ₹${withdrawAmount.toFixed(2)}`);
    setAmount("");
  };

  const resetATM = () => {
    setBalance(1000);
    setAmount("");
    updateMessage("ATM has been reset to initial balance.", "success");
    toast.info("ATM Reset");
  };

  const getMessageClass = () => {
    switch (messageType) {
      case "success":
        return "atm-glow-text";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card atm-glow border-border/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wallet className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold atm-glow-text">ATM Simulation</h1>
          </div>

          <div className="bg-[hsl(var(--atm-screen))] rounded-lg p-6 mb-6 min-h-[100px] flex items-center justify-center border border-primary/20">
            <p className={`text-center font-semibold text-lg animate-slide-up ${getMessageClass()}`}>
              {message}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="text-lg bg-input border-border focus:border-primary transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  deposit();
                }
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={checkBalance}
                variant="outline"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-primary/30 hover:border-primary/50 transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Check Balance
              </Button>

              <Button
                onClick={deposit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105"
              >
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Deposit
              </Button>

              <Button
                onClick={withdraw}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105"
              >
                <ArrowDownCircle className="w-4 h-4 mr-2" />
                Withdraw
              </Button>

              <Button
                onClick={resetATM}
                variant="outline"
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-primary/30 hover:border-primary/50 transition-all"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Current Balance:</span>
              <span className="text-xl font-bold atm-glow-text">₹{balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ATMSimulation;
