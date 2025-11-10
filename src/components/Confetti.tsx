import { useEffect, useState } from "react";

interface ConfettiProps {
  trigger: boolean;
}

const Confetti = ({ trigger }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
        color: ['#00ffaa', '#00ddff', '#ffaa00', '#ff00aa', '#00ff88'][Math.floor(Math.random() * 5)],
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 1000);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
