import { config as loadEnv } from "dotenv";
import {
  config,
  higgsfield,
  AuthenticationError,
  NotEnoughCreditsError,
  ValidationError,
  BadInputError,
  APIError,
} from "@higgsfield/client/v2";

// Server-side only: credentials are read from .env.local at runtime and never printed.
loadEnv({ path: ".env.local", quiet: true });

const credentials = process.env.HF_CREDENTIALS;
if (!credentials) {
  console.error("HF_CREDENTIALS is not set. Add it to .env.local as key-id:key-secret.");
  process.exit(1);
}

config({
  credentials,
  // Video generation can exceed the SDK's 5 minute polling default.
  maxPollTime: 15 * 60 * 1000,
  pollInterval: 5000,
});

async function main(): Promise<void> {
  const result = await higgsfield.subscribe("bytedance/seedance-2.5/text-to-video", {
    input: {
      prompt: "A cinematic scene at sunset",
      duration: 5,
      resolution: "720p",
      aspect_ratio: "16:9",
    },
    withPolling: true,
  });

  // Typed statuses are completed | failed | nsfw | queued | in_progress; the API may
  // also report "canceled". Anything other than completed-with-URL is a failure.
  const status = result.status as string;
  const videoUrl = result.video?.url;

  if (status === "completed" && videoUrl) {
    console.log(`Request ${result.request_id} completed.`);
    console.log(`Video URL: ${videoUrl}`);
    return;
  }

  const reasons: Record<string, string> = {
    failed: "Generation failed (credits are refunded).",
    nsfw: "Request was rejected by moderation (credits are refunded).",
    canceled: "Request was canceled.",
    cancelled: "Request was canceled.",
    completed: "Request completed but no video URL was returned.",
  };
  console.error(`Request ${result.request_id} did not succeed: status "${status}".`);
  console.error(reasons[status] ?? "Unexpected non-terminal or unknown status.");
  process.exitCode = 1;
}

main().catch((error: unknown) => {
  if (error instanceof AuthenticationError) {
    console.error("Authentication failed: check HF_CREDENTIALS in .env.local.");
  } else if (error instanceof NotEnoughCreditsError) {
    console.error("Not enough credits for this generation.");
  } else if (error instanceof ValidationError || error instanceof BadInputError) {
    console.error("Invalid input:", error.message);
  } else if (error instanceof APIError) {
    console.error(`API error (${error.statusCode}):`, error.message);
  } else {
    console.error("Generation error:", error instanceof Error ? error.message : error);
  }
  process.exitCode = 1;
});
