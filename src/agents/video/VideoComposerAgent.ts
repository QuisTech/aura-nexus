import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

export class VideoComposerAgent {
  async finalizeDemo(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 MEDO COMPOSER: Post-processing video...");
      
      ffmpeg(inputPath)
        .outputOptions([
          '-y',
          '-vf scale=1920:1080',
          '-vcodec libx264',
          '-crf 23',
          '-preset fast'
        ])
        .on('end', () => {
          console.log(`✅ MEDO COMPOSER: Final demo exported to ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('❌ MEDO COMPOSER: Error processing video', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  async generateWebPLoop(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 MEDO COMPOSER: Generating high-fidelity WebP loop...");
      
      ffmpeg(inputPath)
        .outputOptions([
          '-y',
          '-vf scale=800:-1',
          '-vcodec libwebp',
          '-lossless 0',
          '-compression_level 6',
          '-q:v 50',
          '-loop 0'
        ])
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  async mergeAudioVideo(videoPath: string, audioPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("🎬 MEDO COMPOSER: Merging Sovereign Voice with Visuals...");
      
      ffmpeg(videoPath)
        .input(audioPath)
        .outputOptions([
          '-y',
          '-c:v libx264',
          '-b:v 12000k',
          '-c:a aac',
          '-b:a 192k',
          '-map 0:v:0',
          '-map 1:a:0',
          '-shortest'
        ])
        .on('end', () => {
          console.log(`✅ MEDO COMPOSER: Narrated Master Demo ready at ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('❌ MEDO COMPOSER: Error merging audio/video', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  async trimVideo(inputPath: string, outputPath: string, seconds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(`🎬 AURA NEXUS: Trimming initial ${seconds}s from master visuals...`);
      
      ffmpeg(inputPath)
        .setStartTime(seconds)
        .outputOptions(['-y', '-c copy'])
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }
}
