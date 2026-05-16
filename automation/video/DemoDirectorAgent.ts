import { Page } from 'playwright';
import { PlaywrightRecorder } from './PlaywrightRecorder';

export class DemoDirectorAgent {
  private recorder: PlaywrightRecorder;

  constructor() {
    this.recorder = new PlaywrightRecorder();
  }

  async executeWalkthrough(url: string) {
    const page = await this.recorder.startRecording({
      url: url || "http://localhost:3000",
      outputDir: './videos/raw',
      filename: `aura_nexus_master_v5_${Date.now()}`
    });

    console.log("🎬 AURA NEXUS 2026: Starting Sovereign Bezier Conductor v5...");
    
    // Human-like Bezier Movement
    const humanMove = async (toX: number, toY: number, durationMs: number = 800) => {
      const fromX = (page.mouse as any)._x || 100;
      const fromY = (page.mouse as any)._y || 100;
      
      // Control point for curve
      const cpX = (fromX + toX) / 2 + (Math.random() - 0.5) * 200;
      const cpY = (fromY + toY) / 2 + (Math.random() - 0.5) * 200;

      const steps = 25;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Quadratic Bezier Formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        const x = Math.pow(1 - t, 2) * fromX + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * toX;
        const y = Math.pow(1 - t, 2) * fromY + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * toY;
        
        const jitterX = (Math.random() - 0.5) * 2;
        const jitterY = (Math.random() - 0.5) * 2;
        
        await page.mouse.move(x + jitterX, y + jitterY, { steps: 1 });
        await page.waitForTimeout(durationMs / steps);
      }
      (page.mouse as any)._x = toX;
      (page.mouse as any)._y = toY;
    };

    const humanFocus = async (selector: string, durationMs: number) => {
      const box = await page.locator(selector).boundingBox();
      if (box) {
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;
        await humanMove(centerX, centerY);
        
        const start = Date.now();
        while (Date.now() - start < durationMs) {
          await humanMove(
            centerX + (Math.random() - 0.5) * 40,
            centerY + (Math.random() - 0.5) * 40,
            1200
          );
          await page.waitForTimeout(500);
        }
      }
    };

    const highlight = async (selector: string) => {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement;
        if (el) {
          el.style.transition = 'all 0.5s ease-in-out';
          el.style.outline = '4px solid #38bdf8';
          el.style.outlineOffset = '8px';
          el.style.boxShadow = '0 0 50px rgba(56, 189, 248, 0.4)';
          setTimeout(() => {
            el.style.outline = 'none';
            el.style.boxShadow = 'none';
          }, 4000);
        }
      }, selector);
    };

    // --- SCENE 1: LANDING ---
    await humanMove(300, 100);
    await highlight('.sovereign-text');
    await humanFocus('.sovereign-text', 10000);
    
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(2000);
    await humanFocus('.mt-32', 8000);
    
    await page.mouse.wheel(0, -800);
    await page.waitForTimeout(2000);
    await humanMove(500, 750);
    const initBtn = page.locator('[data-testid="initialize-btn"]');
    await initBtn.click();
    await page.waitForTimeout(5000);

    // --- SCENE 2: DASHBOARD ---
    await highlight('#hero-tile');
    await humanFocus('#hero-tile', 12000);

    await humanMove(950, 120);
    await page.click('button:has-text("Simulate Crisis")');

    // --- SCENE 3: THE 1:00 - 1:40 GAP ---
    await highlight('#sovereign-trace');
    await humanFocus('#sovereign-trace', 15000);

    await highlight('#resilience-matrix');
    const matrixStart = Date.now();
    while (Date.now() - matrixStart < 45000) {
      await humanMove(1000, 250, 1500); // OpenAI Scan
      await page.waitForTimeout(4000);
      await humanMove(1000, 350, 1500); // Anthropic Scan
      await page.waitForTimeout(4000);
      await highlight('#resilience-matrix');
    }

    // --- SCENE 4: CONCLUSION ---
    await humanFocus('#intel-node', 10000);
    await humanFocus('#security-node', 10000);

    const videoPath = await this.recorder.stopRecording();
    return { videoPath };
  }

  getScript(): string[] {
    return [
      "In an emergency, every second counts. But what happens when the technology you rely on fails? Most AI systems today are brittle—collapsing when a primary server errors out or a global API browns out. Introducing Aura Nexus: the world's first resilient life-line assistant, engineered for zero-downtime performance in life-critical moments. We don't just process data; we protect the mission.",
      "Aura Nexus is built on a Sovereign Standard. Our decentralized network ensures that your data and your safety are never dependent on a single point of failure. Whether it's emergency medical coordination or travel crisis management, the Nexus remains vigilant. Let's initialize the life-line and observe the future of digital safety in action.",
      "Imagine you are coordinating an urgent emergency medical response. You trigger the mission, and our Sovereign Orchestrator immediately begins synthesizing local data and facility availability. But watch closely—we are about to simulate a critical infrastructure blackout. Notice the status indicators; we are monitoring the heartbeat of the connection every millisecond.",
      "Look at the Sovereign Trace. Our system has just detected a massive latency spike and pulse drop in the primary core. While traditional applications would throw a 'Service Unavailable' error and leave you stranded, Aura Nexus is engineered with a sub-500ms failover protocol. It detects the chaos before it becomes a failure, maintaining the integrity of the life-line.",
      "Our agentic switchboard immediately reroutes the entire mission to the Shadow Core—an Anthropic-powered pillar of resilience. Look at the Connection Health matrix; the primary core is degraded, but Aura Nexus has already self-healed and resumed coordination. The transition is seamless, and the mission continues without interruption. This is the power of Sovereign Resilience. This is Aura Nexus."
    ];
  }
}
