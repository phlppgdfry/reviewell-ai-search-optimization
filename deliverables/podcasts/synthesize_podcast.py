#!/usr/bin/env python3
"""
Reviewell Podcast Audio Synthesizer
Uses ElevenLabs API to synthesize multi-speaker dialogue tracks for Reviewell Podcast.
Voices:
  - Alex (Host): Will / Julian
  - Sarah (Expert): Sarah (Mature, Reassuring, Confident)
"""

import os
import sys
import json
import re
from pathlib import Path
import urllib.request
import urllib.error

# Load ElevenLabs API key
ENV_FILE = Path("/Users/philippegodfroy/harborvoice-ai/.env.local")
API_KEY = os.getenv("ELEVENLABS_API_KEY", "")

if not API_KEY and ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        if line.startswith("ELEVENLABS_API_KEY="):
            API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

VOICES = {
    "ALEX": "bIHbv24MWmeRgasZH58o",  # Will - Relaxed Optimist
    "SARAH": "EXAVITQu4vr4xnSDxMaL", # Sarah - Mature, Reassuring, Confident
}

OUTPUT_DIR = Path("/Users/philippegodfroy/reviewell-ai-search-optimization/deliverables/podcasts/episodes")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def synthesize_line(voice_id: str, text: str, output_path: Path) -> bool:
    """Calls ElevenLabs Text-to-Speech API directly."""
    if not API_KEY:
        print("❌ Error: ELEVENLABS_API_KEY not found in environment or /Users/philippegodfroy/harborvoice-ai/.env.local")
        return False

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }
    payload = {
        "text": text,
        "model_id": "eleven_turbo_v2_5",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
        }
    }

    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            audio_bytes = resp.read()
            with open(output_path, "wb") as f:
                f.write(audio_bytes)
            print(f"  ✅ Saved: {output_path.name} ({len(audio_bytes)} bytes)")
            return True
    except urllib.error.HTTPError as e:
        print(f"  ❌ ElevenLabs API error {e.code}: {e.read().decode('utf-8')}")
        return False
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def main():
    print("=" * 65)
    print("🎙️ REVIEWELL PODCAST ELEVENLABS SYNTHESIS ENGINE")
    print("=" * 65)
    print(f"Output Directory: {OUTPUT_DIR}")
    print(f"ElevenLabs Key:   {'Configured ✅' if API_KEY else 'Missing ❌'}")

    sample_dialogues = [
        ("ALEX", "Welcome to The Reputation Signal. Today, we're exposing why traditional Google review disputes fail, and how Reviewell helps businesses legally remove illegitimate feedback."),
        ("SARAH", "Thanks Alex. When you face an unverified 1-star attack, front-line bots will reject you. But under Google Policy 7400114, documentary evidence changes everything."),
        ("ALEX", "And with Answer Engines like ChatGPT and Perplexity reading review sentiment in 2026, protecting your signal is more critical than ever.")
    ]

    print(f"\nSynthesizing {len(sample_dialogues)} dialogue stems for Episode 01...")
    for idx, (speaker, line) in enumerate(sample_dialogues, 1):
        voice_id = VOICES.get(speaker, VOICES["ALEX"])
        target_file = OUTPUT_DIR / f"ep01_part_{idx:02d}_{speaker.lower()}.mp3"
        print(f"[{idx}/{len(sample_dialogues)}] Synthesizing {speaker}...")
        synthesize_line(voice_id, line, target_file)

    print("\n🎉 Audio synthesis complete! Check deliverables/podcasts/episodes/")


if __name__ == "__main__":
    main()
