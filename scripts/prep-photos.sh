#!/usr/bin/env bash
# prep-photos.sh — turn exported photos/videos into web-ready files for Trail & Light.
#
# Usage:
#   ./scripts/prep-photos.sh <inbox-dir> <name-prefix>
#
# Example:
#   ./scripts/prep-photos.sh inbox chocorua
#
# What it does:
#   - Reads JPG/PNG images and MP4 videos from <inbox-dir> (in filename order).
#   - Images: resizes so the longest edge is 1920px (keeps original aspect ratio,
#     never cropped), strips metadata, saves as <prefix>-<NN>.jpg in photos/.
#     Target ~200-400 KB per photo (China-access friendly).
#   - Videos: re-encodes to H.264, longest edge 1920px, saves as
#     <prefix>-360-<NN>.mp4 in photos/.
#   - Prints the JSON lines to paste into js/trips.js (photos / videos arrays).
#
# Export big, clean JPGs from your editor first (Canon 5D IV RAWs are fine to
# export from; Osmo 360 clips should already be reframed/exported as flat MP4s).

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <inbox-dir> <name-prefix>" >&2
  exit 1
fi

INBOX="$1"
PREFIX="$2"
PHOTOS_DIR="$(cd "$(dirname "$0")/../photos" && pwd)"

command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg not found — install it (e.g. brew install ffmpeg)." >&2; exit 1; }
[ -d "$INBOX" ] || { echo "Inbox dir not found: $INBOX" >&2; exit 1; }

i=0
v=0
photo_lines=()
video_lines=()

while IFS= read -r f; do
  lower="$(echo "$f" | tr '[:upper:]' '[:lower:]')"
  if [[ "$lower" == *.jpg || "$lower" == *.jpeg || "$lower" == *.png ]]; then
    i=$((i+1))
    n=$(printf "%02d" "$i")
    out="$PHOTOS_DIR/${PREFIX}-${n}.jpg"
    # Longest edge 1920, quality tuned for ~200-400 KB, metadata stripped.
    ffmpeg -hide_banner -loglevel error -y -i "$f" \
      -vf "scale=1920:1920:force_original_aspect_ratio=decrease" \
      -q:v 3 -map_metadata -1 "$out"
    size=$(du -h "$out" | cut -f1)
    echo "photo  $(basename "$out")  ($size)"
    photo_lines+=("      { src: \"photos/${PREFIX}-${n}.jpg\", caption: \"\" },")
  elif [[ "$lower" == *.mp4 ]]; then
    v=$((v+1))
    n=$(printf "%02d" "$v")
    out="$PHOTOS_DIR/${PREFIX}-360-${n}.mp4"
    ffmpeg -hide_banner -loglevel error -y -i "$f" \
      -vf "scale=1920:1920:force_original_aspect_ratio=decrease" \
      -c:v libx264 -crf 26 -preset medium -movflags +faststart \
      -c:a aac -b:a 128k -map_metadata -1 "$out"
    size=$(du -h "$out" | cut -f1)
    echo "video  $(basename "$out")  ($size)"
    video_lines+=("      { src: \"photos/${PREFIX}-360-${n}.mp4\", caption: \"\" },")
  else
    echo "skip   $(basename "$f")  (unsupported type)"
  fi
done < <(find "$INBOX" -maxdepth 1 -type f | sort)

echo ""
echo "── paste into js/trips.js (photos array) ──────────────────────"
printf "%s\n" "${photo_lines[@]:-      /* no photos found in inbox */}"
echo ""
echo "── paste into js/trips.js (videos array) ──────────────────────"
printf "%s\n" "${video_lines[@]:-      /* no videos found in inbox */}"
echo ""
echo "Add a caption between the quotes for each line. Then redeploy."
