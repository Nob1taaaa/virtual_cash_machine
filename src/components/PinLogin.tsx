import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Lock, Delete } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";
import bankLogo from "@/assets/bank-logo.png";

interface PinLoginProps {
  onSuccess: () => void;
}

const CORRECT_PIN = "1234";

const PinLogin = ({ onSuccess }: PinLoginProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    soundEffects.click();
    const newPin = pin + digit;
    setPin(newPin);
    setError("");

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          soundEffects.deposit();
          onSuccess();
        } else {
          soundEffects.error();
          setError("Incorrect PIN. Try again.");
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setPin("");
          }, 500);
        }
      }, 300);
    }
  };

  const handleDelete = () => {
    soundEffects.click();
    setPin(pin.slice(0, -1));
    setError("");
  };

  const handleClear = () => {
    soundEffects.click();
    setPin("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className={`w-full max-w-sm bg-card border-border/50 overflow-hidden atm-glow ${shake ? "animate-success-pulse" : ""}`}>
        <div className="p-8">
          <div className="flex flex-col items-center gap-3 mb-6 animate-bounce-in">
            <img
              src={bankLogo}
              alt="Bank Logo"
              className="w-20 h-20 drop-shadow-[0_0_15px_rgba(0,255,170,0.7)] rounded-lg bg-secondary/20 p-2 border-2 border-primary/40"
            />
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold atm-glow-text">ATM Login</h1>
            </div>
            <p className="text-muted-foreground text-sm">Enter your 4-digit PIN</p>
            <p className="text-muted-foreground text-xs">(Default: 1234)</p>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                  pin.length > i
                    ? "border-primary bg-primary/20 atm-glow-text"
                    : "border-border bg-secondary/30"
                }`}
              >
                {pin.length > i ? (
                  <Lock className="w-5 h-5 text-primary" />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-center text-destructive text-sm mb-4 animate-slide-up">{error}</p>
          )}

          <div className="grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <Button
                key={digit}
                variant="outline"
                onClick={() => handleDigit(digit)}
                className="h-14 text-xl font-bold bg-secondary/50 border-border hover:bg-primary/20 hover:border-primary/50 hover:scale-105 transition-all rounded-xl"
              >
                {digit}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={handleClear}
              className="h-14 text-sm font-bold bg-destructive/20 border-destructive/30 hover:bg-destructive/30 hover:scale-105 transition-all rounded-xl text-destructive"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDigit("0")}
              className="h-14 text-xl font-bold bg-secondary/50 border-border hover:bg-primary/20 hover:border-primary/50 hover:scale-105 transition-all rounded-xl"
            >
              0
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="h-14 bg-secondary/50 border-border hover:bg-primary/20 hover:border-primary/50 hover:scale-105 transition-all rounded-xl"
            >
              <Delete className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PinLogin;
