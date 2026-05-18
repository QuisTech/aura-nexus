# 🛡️ Aura Nexus: Enterprise AI Continuity Infrastructure

Every year, millions in commercial operations depend on Large Language Models—yet modern AI infrastructure remains dangerously brittle. A single API timeout, rate-limit threshold, or server degradation doesn't just display an error; it completely wipes active conversational state, derails critical transactions, and leads to catastrophic context loss.

Aura Nexus was built to make that story impossible. It is the world’s first resilience-first AI routing middleware designed to protect enterprise workflows against LLM downtime.

🚀 **[Live Demo URL](https://aura-nexus-2ji1lkf6e-quistechs-projects.vercel.app/)**

---

## ⚡ Key Architectural Capabilities

- **Sub-500ms Stateful Failover:** Active telemetry monitors Time-To-First-Token (TTFT) and response entropy to predict degradation, instantly hot-swapping queries to fallback shadow nodes in under 500ms.
- **Semantic State Preservation:** Unlike standard load balancers that wipe user session data during failover, Aura Nexus serializes and synchronizes ongoing conversational context, prompts, and parameters. The switch is completely invisible to the user.
- **Sovereign Protocols Panel:** A centralized control plane allowing enterprise admins to toggle autonomous self-healing, customize latency triggers, and manage distributed active-active cores in real-time.
- **Tamper-Evident Audit Ledger:** Every failover, telemetry pulse, and system parameter change is SHA-256 hashed and logged in an immutable, compliance-ready ledger—guaranteeing SOC2 and HIPAA audit readiness out of the box.

---

## 🛠️ Code Architecture

Here is how easily developers can integrate Aura Nexus to guarantee zero-downtime AI pipelines:

```typescript
import { AuraNexusRouter } from '@aura-nexus/core';

// 1. Initialize the Resilient Stateful Router
const router = new AuraNexusRouter({
  primary: 'openai/gpt-4o',
  redundant: 'anthropic/claude-3-5-sonnet',
  latencyThresholdMs: 300,
  autoFailover: true,
  stateSerialization: true
});

// 2. Execute queries safely under sub-500ms telemetry monitoring
const session = await router.createSession({
  systemInstruction: "You are coordinating critical shipping logistics dispatch."
});

const response = await session.send("Dispatch ambulance to Sector 4 terminal immediately.");
// If OpenAI goes down, the session automatically hot-swaps to Claude-3.5 with 100% context preserved!
```

---

## 🏗️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (React 19, Lucide Icons, Framer Motion) |
| **Styling Engine** | Tailwind CSS v4 & Highly Optimized Custom Glassmorphism CSS |
| **Continuity Core** | TypeScript Async State Machine & Telemetry Router |
| **Deployment & Hosting**| Vercel edge-ready compilation & Serverless Functions |
| **Compliance Layer** | Tamper-Evident SHA-256 Log Hashing & Audit Ledgers |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/QuisTech/Aura-Nexus.git
   cd Aura-Nexus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the active console.

### Deploying to Production

The easiest way to deploy Aura Nexus is using the Vercel Platform:

```bash
npm install -g vercel
vercel --prod
```

---

## 🛡️ License

MIT License. Built for the developer community looking to secure high-stakes AI pipelines.
