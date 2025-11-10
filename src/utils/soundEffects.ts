class SoundEffects {
  private audioContext: AudioContext | null = null;

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    const ctx = this.initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  success() {
    setTimeout(() => this.playTone(523.25, 0.1), 0);
    setTimeout(() => this.playTone(659.25, 0.1), 100);
    setTimeout(() => this.playTone(783.99, 0.15), 200);
  }

  deposit() {
    setTimeout(() => this.playTone(880, 0.08), 0);
    setTimeout(() => this.playTone(1046.5, 0.12), 80);
  }

  withdraw() {
    setTimeout(() => this.playTone(659.25, 0.1), 0);
    setTimeout(() => this.playTone(523.25, 0.1), 100);
  }

  error() {
    setTimeout(() => this.playTone(392, 0.15), 0);
    setTimeout(() => this.playTone(329.63, 0.2), 150);
  }

  click() {
    this.playTone(800, 0.05, 'square');
  }

  balance() {
    this.playTone(1046.5, 0.1);
  }

  reset() {
    setTimeout(() => this.playTone(523.25, 0.08), 0);
    setTimeout(() => this.playTone(659.25, 0.08), 80);
    setTimeout(() => this.playTone(523.25, 0.12), 160);
  }
}

export const soundEffects = new SoundEffects();
