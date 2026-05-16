import { DemoDirectorAgent } from '../src/agents/video/DemoDirectorAgent';
import { VideoComposerAgent } from '../src/agents/video/VideoComposerAgent';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function generateAuraNexusDemo() {
  const director = new DemoDirectorAgent();
  const composer = new VideoComposerAgent();
  
  const AUDIO_PATH = path.join(process.cwd(), 'videos/narration.mp3');
  const SILENT_VIDEO = path.join(process.cwd(), 'videos/silent_master.mp4');
  const FINAL_OUTPUT = path.join(process.cwd(), 'public/videos/demo-cinematic.mp4');
  
  if (!fs.existsSync('videos')) fs.mkdirSync('videos');

  try {
    console.log("🚀 AURA NEXUS: Initializing Resilient Master Production...");

    // 1. Generate Sovereign Narration
    console.log("🎙️ AURA NEXUS: Generating 'Resilient Life-Line' audio...");
    const script = director.getScript().join(' ');
    const ttsCommand = `edge-tts --text "${script.replace(/"/g, '\\"')}" --write-media "${AUDIO_PATH}" --voice en-US-AvaNeural`;
    execSync(ttsCommand);
    console.log(`✅ AURA NEXUS VOICEOVER: Audio generated at ${AUDIO_PATH}`);

    // 2. Capture Sovereign Walkthrough
    console.log("🎬 AURA NEXUS: Narration ready. Executing Walkthrough with Sovereignty...");
    const result = await director.executeWalkthrough("http://localhost:3000");

    if (result && result.videoPath) {
      // 3. Post-process and Merge
      console.log("🎬 AURA NEXUS: Walkthrough captured. Starting final composition...");
      const TRIMMED_VIDEO = path.join(process.cwd(), 'videos/trimmed_master.mp4');
      const PUBLIC_VIDEOS = path.join(process.cwd(), 'public/videos');
      if (!fs.existsSync(PUBLIC_VIDEOS)) fs.mkdirSync(PUBLIC_VIDEOS, { recursive: true });

      await composer.finalizeDemo(result.videoPath, SILENT_VIDEO);
      await composer.trimVideo(SILENT_VIDEO, TRIMMED_VIDEO, 5);
      await composer.mergeAudioVideo(TRIMMED_VIDEO, AUDIO_PATH, FINAL_OUTPUT);
      
      console.log("\n🏆 AURA NEXUS: WORLD-CLASS MASTER DEMO COMPLETE!");
      console.log(`📍 Location: ${FINAL_OUTPUT}`);
    }
  } catch (error) {
    console.error("❌ AURA NEXUS: Production Failure", error);
  }
}

generateAuraNexusDemo();
