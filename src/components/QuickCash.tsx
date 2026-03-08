import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";

interface QuickCashProps {
  onSelect: (amount: number) => void;
}

const AMOUNTS = [500, 1000, 2000, 5000];

const QuickCash = ({ onSelect }: QuickCashProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Zap className="w-3 h-3 text-primary" />
        Quick Cash
      </p>
      <div className="grid grid-cols-4 gap-2">
        {AMOUNTS.map((amt) => (
          <Button
            key={amt}
            variant="outline"
            size="sm"
            onClick={() => {
              soundEffects.click();
              onSelect(amt);
            }}
            className="bg-secondary/30 border-border hover:bg-primary/20 hover:border-primary/50 hover:scale-105 transition-all rounded-lg text-xs font-semibold"
          >
            ₹{amt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickCash;
