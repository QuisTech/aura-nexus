import { DemoDirectorAgent } from '../automation/video/DemoDirectorAgent';
import { PlaywrightRecorder } from '../automation/video/PlaywrightRecorder';
import { VideoComposerAgent } from '../automation/video/VideoComposerAgent';
import { VoiceoverAgent } from '../automation/voice/VoiceoverAgent';
import path from 'path';
import fs from 'fs';

async function main() {
  console.log("🚀 AURA NEXUS: Initializing Resilient Master Production...");
  
  const director = new DemoDirectorAgent();
  const recorder = new PlaywrightRecorder();
  const composer = new VideoComposerAgent();
  const voiceover = new VoiceoverAgent();

  const outputDir = path.join(process.cwd(), 'videos');
  const publicDir = path.join(process.cwd(), 'public', 'videos');
  const audioPath = path.join(outputDir, 'narration.mp3');
  const silentVideoPath = path.join(outputDir, 'silent_master.mp4');
  const trimmedVideoPath = path.join(outputDir, 'trimmed_master.mp4');
  const finalMaster = path.join(publicDir, 'demo-cinematic.mp4');
  
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  try {
    // 1. Generate Narration FIRST for timing sync
    const scriptChunks = director.getScript();
    const fullScript = scriptChunks.join(" ");
    console.log("🎙️ AURA NEXUS: Generating 'Sovereign Narrative' audio...");
    await voiceover.generateNarration(fullScript, audioPath);

    // 2. Narrate & Capture (Bezier Orchestration)
    console.log("🎬 AURA NEXUS: Narration ready. Executing Walkthrough with Sovereignty...");
    const masterVideo = await director.executeWalkthrough("http://localhost:3001");
    
    // 3. Finalize & Sync (Trim white screen to sync audio)
    console.log("🎬 AURA NEXUS: Walkthrough captured. Starting final composition...");
    await composer.finalizeDemo(masterVideo, silentVideoPath);
    await composer.trimVideo(silentVideoPath, trimmedVideoPath, 5); // Trim 5s of white screen
    await composer.mergeAudioVideo(trimmedVideoPath, audioPath, finalMaster);

    console.log("🏆 AURA NEXUS: WORLD-CLASS MASTER DEMO COMPLETE!");
    console.log(`📍 Location: ${finalMaster}`);
  } catch (error) {
    console.error("❌ AURA NEXUS: Production Failure", error);
  }
}

main();
