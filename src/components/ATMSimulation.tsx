import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Wallet, ArrowUpCircle, ArrowDownCircle, RotateCcw, Sparkles, Heart } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";
import Confetti from "@/components/Confetti";

const ATMSimulation = () => {
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("Welcome! Enter an amount and choose an action.");
  const [messageType, setMessageType] = useState<"default" | "success" | "error">("default");
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const updateMessage = (msg: string, type: "default" | "success" | "error" = "default") => {
    setMessage(msg);
    setMessageType(type);
  };

  const triggerAnimation = () => {
    setAnimateCard(true);
    setTimeout(() => setAnimateCard(false), 500);
  };

  const checkBalance = () => {
    soundEffects.balance();
    updateMessage(`Your current balance is ₹${balance.toFixed(2)}`, "success");
    toast.success(`Balance: ₹${balance.toFixed(2)}`, {
      icon: "💰",
    });
    triggerAnimation();
  };

  const deposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      soundEffects.error();
      updateMessage("Enter a valid deposit amount.", "error");
      toast.error("Invalid deposit amount", {
        icon: "❌",
      });
      return;
    }
    soundEffects.deposit();
    const newBalance = balance + depositAmount;
    setBalance(newBalance);
    updateMessage(
      `Successfully deposited ₹${depositAmount.toFixed(2)}. New balance: ₹${newBalance.toFixed(2)}`,
      "success"
    );
    toast.success(`Deposited ₹${depositAmount.toFixed(2)}`, {
      icon: "💵",
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 100);
    triggerAnimation();
    setAmount("");
  };

  const withdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      soundEffects.error();
      updateMessage("Enter a valid withdrawal amount.", "error");
      toast.error("Invalid withdrawal amount", {
        icon: "❌",
      });
      return;
    }
    if (withdrawAmount > balance) {
      soundEffects.error();
      updateMessage("Insufficient balance!", "error");
      toast.error("Insufficient balance", {
        icon: "⚠️",
      });
      return;
    }
    soundEffects.withdraw();
    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    updateMessage(
      `Withdrew ₹${withdrawAmount.toFixed(2)}. Remaining balance: ₹${newBalance.toFixed(2)}`,
      "success"
    );
    toast.success(`Withdrew ₹${withdrawAmount.toFixed(2)}`, {
      icon: "💸",
    });
    triggerAnimation();
    setAmount("");
  };

  const resetATM = () => {
    soundEffects.reset();
    setBalance(1000);
    setAmount("");
    updateMessage("ATM has been reset to initial balance.", "success");
    toast.info("ATM Reset", {
      icon: "🔄",
    });
    triggerAnimation();
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
    <>
      <Confetti trigger={showConfetti} />
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card 
          className={`w-full max-w-md bg-card border-border/50 overflow-hidden transition-all duration-300 ${
            animateCard ? 'animate-success-pulse atm-glow-strong' : 'atm-glow'
          }`}
        >
          <div className="p-8">
            <div className="flex items-center justify-center gap-3 mb-6 animate-bounce-in">
              <Wallet className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-3xl font-bold atm-glow-text">ATM Simulation</h1>
              <Heart className="w-6 h-6 text-pink-400 animate-pulse" fill="currentColor" />
            </div>

            <div className="bg-[hsl(var(--atm-screen))] rounded-xl p-6 mb-6 min-h-[100px] flex items-center justify-center border-2 border-primary/30 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Sparkles className="w-4 h-4 text-primary/50 animate-pulse" />
              </div>
              <p className={`text-center font-semibold text-lg animate-slide-up ${getMessageClass()}`}>
                {message}
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (₹)"
                className="text-lg bg-input border-2 border-border focus:border-primary transition-all rounded-xl h-12"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    soundEffects.click();
                    deposit();
                  }
                }}
                onFocus={() => soundEffects.click()}
              />

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => {
                    soundEffects.click();
                    checkBalance();
                  }}
                  variant="outline"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-105 rounded-xl h-12"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Check Balance
                </Button>

                <Button
                  onClick={() => {
                    soundEffects.click();
                    deposit();
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 hover:shadow-lg rounded-xl h-12 font-semibold"
                >
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  Deposit
                </Button>

                <Button
                  onClick={() => {
                    soundEffects.click();
                    withdraw();
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 hover:shadow-lg rounded-xl h-12 font-semibold"
                >
                  <ArrowDownCircle className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>

                <Button
                  onClick={() => {
                    soundEffects.click();
                    resetATM();
                  }}
                  variant="outline"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-2 border-primary/30 hover:border-primary/50 transition-all hover:scale-105 rounded-xl h-12"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-border/50">
              <div className="flex justify-between items-center text-sm bg-secondary/30 p-4 rounded-xl">
                <span className="text-muted-foreground font-medium">Current Balance:</span>
                <span className="text-2xl font-bold atm-glow-text flex items-center gap-2">
                  ₹{balance.toFixed(2)}
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ATMSimulation;
