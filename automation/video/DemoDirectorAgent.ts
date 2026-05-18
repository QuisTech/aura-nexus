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

    // Inject Virtual Cursor for Recording
    await page.addStyleTag({ content: `
      #fake-cursor {
        position: fixed;
        top: 0; left: 0;
        width: 24px; height: 24px;
        border-radius: 50%;
        background-color: rgba(16, 185, 129, 0.3);
        border: 1px solid #10b981;
        pointer-events: none;
        z-index: 2147483647;
        transform: translate(-50%, -50%);
        transition: transform 0.1s;
        display: flex; justify-content: center; align-items: center;
      }
      #fake-cursor::after {
        content: '';
        width: 6px; height: 6px;
        background-color: #10b981;
        border-radius: 50%;
        box-shadow: 0 0 12px #10b981;
      }
      .fake-cursor-clicking {
        transform: translate(-50%, -50%) scale(0.6) !important;
        background-color: rgba(16, 185, 129, 0.8) !important;
      }
    `});

    await page.evaluate(() => {
      const cursor = document.createElement('div');
      cursor.id = 'fake-cursor';
      document.body.appendChild(cursor);
      window.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      window.addEventListener('mousedown', () => cursor.classList.add('fake-cursor-clicking'));
      window.addEventListener('mouseup', () => cursor.classList.remove('fake-cursor-clicking'));
    });
    
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
          el.style.outline = '4px solid #10b981';
          el.style.outlineOffset = '8px';
          el.style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.4)';
          setTimeout(() => {
            el.style.outline = 'none';
            el.style.boxShadow = 'none';
          }, 4000);
        }
      }, selector);
    };

    // --- SCENE 1: LANDING ---
    await humanMove(300, 100);
    await highlight('.resilient-text');
    await humanFocus('.resilient-text', 10000);
    
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(2000);
    await humanFocus('#problem', 8000);
    
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
    await page.click('#test-failover-btn');

    // --- SCENE 3: THE 1:00 - 1:40 GAP ---
    await highlight('#resilience-trace');
    await humanFocus('#resilience-trace', 15000);

    await highlight('#resilience-matrix');
    const matrixStart = Date.now();
    while (Date.now() - matrixStart < 20000) {
      await humanMove(1000, 250, 1500); // OpenAI Scan
      await page.waitForTimeout(4000);
      await humanMove(1000, 350, 1500); // Anthropic Scan
      await page.waitForTimeout(4000);
      await highlight('#resilience-matrix');
    }

    // --- SCENE 4: PROTOCOLS CONFIGURATION ---
    console.log("🎬 AURA NEXUS: Navigating to Protocols page...");
    const protocolsBtn = page.locator('button:has-text("Protocols")');
    const sideBox = await protocolsBtn.boundingBox();
    if (sideBox) {
      await humanMove(sideBox.x + sideBox.width / 2, sideBox.y + sideBox.height / 2);
      await page.waitForTimeout(500);
      await protocolsBtn.click();
    } else {
      await page.goto("http://localhost:3001/dashboard/config");
    }
    await page.waitForTimeout(4000); // Wait for navigation transition
    
    await highlight('h2');
    await humanFocus('h2:has-text("Protocols")', 4000);

    // Hover over the Autonomous Failover toggle card
    await highlight('.glass-card');
    await humanMove(350, 400); // Move near the configuration inputs
    await page.waitForTimeout(4000);

    // Hover and click "Commit Changes"
    const commitBtn = page.locator('button:has-text("Commit Changes")');
    const commitBox = await commitBtn.boundingBox();
    if (commitBox) {
      await humanMove(commitBox.x + commitBox.width / 2, commitBox.y + commitBox.height / 2);
      await page.waitForTimeout(500);
      await commitBtn.click();
    }
    await page.waitForTimeout(5000); // Wait for the success toast message

    // --- SCENE 5: RETURN TO HOME VIA LOGO LINK ---
    console.log("🎬 AURA NEXUS: Returning home via sidebar branding logo...");
    const logoLink = page.locator('a[href="/"]');
    const logoBox = await logoLink.first().boundingBox();
    if (logoBox) {
      await humanMove(logoBox.x + logoBox.width / 2, logoBox.y + logoBox.height / 2);
      await page.waitForTimeout(500);
      await logoLink.first().click();
    } else {
      await page.goto("http://localhost:3001/");
    }
    await page.waitForTimeout(4000);

    const videoPath = await this.recorder.stopRecording();
    return videoPath as string;
  }

  getScript(): string[] {
    return [
      "In an emergency, every second counts. But what happens when the technology you rely on fails? Most AI systems today are brittle—collapsing when a primary server errors out or a global API browns out. Introducing Aura Nexus: the enterprise AI continuity infrastructure, engineered for zero-downtime performance in mission-critical workflows. We don't just process data; we protect the operation.",
      "Aura Nexus is built on a resilient standard. Our abstracted network ensures that your data and your routing are never dependent on a single point of failure. Whether it's emergency medical coordination or supply chain logistics, the Nexus remains vigilant. Let's deploy the infrastructure and observe the future of digital safety in action.",
      "Imagine you are coordinating an urgent emergency response. You initiate the mission, and our Control Plane immediately begins tracking multi-model telemetry. But watch closely—we are about to simulate a critical infrastructure blackout. Notice the status indicators; we are monitoring Time To First Token every millisecond.",
      "Look at the Failover Audit Trail. Our system has just detected a massive latency spike in the primary route. While traditional applications would throw a 'Service Unavailable' error and leave you stranded, Aura Nexus is engineered with sub-500 millisecond routing. It seamlessly reroutes to the shadow node without context loss.",
      "Beyond raw routing, the Aura Nexus Control Plane provides fully customizable System Protocols. Here, administrators can toggle autonomous self-healing, define exact latency triggers in milliseconds, and manage our core matrix. Let's commit these active parameters directly to our distributed configuration nodes.",
      "Every parameter committed and every hot-swap executed is hashed and written to a tamper-evident compliance ledger. This guarantees SOC2 and HIPAA readiness out of the box. By uniting multi-model active redundancy with state serialization, Aura Nexus sets a new benchmark for critical digital operations. This is absolute continuity."
    ];
  }
}
