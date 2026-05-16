import { DemoDirectorAgent } from '../agents/video/DemoDirectorAgent';
import { PlaywrightRecorder } from '../agents/video/PlaywrightRecorder';
import { VideoComposerAgent } from '../agents/video/VideoComposerAgent';
import path from 'path';
import fs from 'fs';

async function main() {
  console.log("🚀 AURA NEXUS: Initializing Resilient Master Production...");
  
  const director = new DemoDirectorAgent();
  const recorder = new PlaywrightRecorder();
  const composer = new VideoComposerAgent();

  const outputDir = path.join(process.cwd(), 'videos');
  const publicDir = path.join(process.cwd(), 'public', 'videos');
  
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  try {
    // 1. Narrate & Capture (Bezier Orchestration)
    const masterVideo = await director.executeWalkthrough(recorder, outputDir);
    
    // 2. Finalize & Sync
    const finalMaster = path.join(publicDir, 'demo-cinematic.mp4');
    await composer.finalizeDemo(masterVideo, finalMaster);

    console.log("🏆 AURA NEXUS: WORLD-CLASS MASTER DEMO COMPLETE!");
    console.log(`📍 Location: ${finalMaster}`);
  } catch (error) {
    console.error("❌ AURA NEXUS: Production Failure", error);
  }
}

main();
