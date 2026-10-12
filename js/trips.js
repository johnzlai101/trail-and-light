/* ── Your trips live here. ──────────────────────────────
   To add a trip: copy one block, change the details, save.
   Photos go in the /photos folder. Videos too (mp4).
   Photos are always shown at their original ratio — never cropped.
──────────────────────────────────────────────────────── */
const TRIPS = [
  {
    id: "chocorua-middle-sister-bald",
    title: "Mt. Chocorua via Middle Sister & Bald Mountain",
    location: "Albany, New Hampshire",
    date: "2026-10-11",
    cover: "photos/chocorua-09.jpg",
    distance: "10.5 mi",
    elevation: "3,300 ft",
    duration: "1 day",
    tags: ["hiking", "foliage", "White Mountains"],
    summary: "Peak-foliage loop over Middle Sister, Chocorua and Bald Mountain from Piper Trail — counter-clockwise over Carter Ledge.",
    story: [
      "The plan: out the door in Winchester by 4:40 AM for the ~2h 15m drive, boots on the trail at Piper Trailhead by 7:00 AM.",
      "Route: Piper Trailhead → Piper (1.2 mi) → Nickerson Ledge (0.8 mi) → Carter Ledge → Middle Sister summit → back across the ledges → Mt. Chocorua (3,475 ft) → down Liberty Trail → Hammond Trail → Bald Mountain ledges spur → Weetamoo → Piper back. About 10.5–11 mi, ~3,300 ft of gain, back at the car by 3–3:30 PM.",
      "Direction matters: counter-clockwise — up Carter Ledge, down Liberty. The Carter Ledge scramble is on the Terrifying 25 list and must not be descended, especially wet or icy. Frost before 9 AM means the morning ledges can be slick. Hard turnaround: summit Chocorua by 1 PM or skip the Bald Mountain spur; start descending by 2 PM at the latest.",
      "Packed 2.5–3 L of water (nothing reliable above treeline), headlamp, paper map plus offline maps, and traction for the icy morning ledges. Best photo light before 10:30 AM on Carter Ledge and the Middle Sister ledges; batteries in an inner pocket — cold drains them fast.",
      "Peak foliage week (Oct 5–11) and Columbus Day weekend — the busiest weekend of the year up here, hence the early start. Sunday itself looked doable: frost early, increasing clouds, rain only arriving Sunday night."
    ],
    photos: [
      { src: "photos/chocorua-01.jpg", caption: "Chocorua's summit cone in morning mist" },
      { src: "photos/chocorua-02.jpg", caption: "Mirror-still water and peak foliage" },
      { src: "photos/chocorua-03.jpg", caption: "The summit rising above the mist" },
      { src: "photos/chocorua-04.jpg", caption: "Alpenglow over the Sandwich Range" },
      { src: "photos/chocorua-05.jpg", caption: "Crimson blueberry bushes on the ledges" },
      { src: "photos/chocorua-06.jpg", caption: "Fall colors from the open ledges" },
      { src: "photos/chocorua-07.jpg", caption: "A mushroom among lichen and red leaves" },
      { src: "photos/chocorua-08.jpg", caption: "Mountain ash berries below the summit" },
      { src: "photos/chocorua-09.jpg", caption: "The rocky summit cone of Mt. Chocorua" },
      { src: "photos/chocorua-10.jpg", caption: "Peak foliage from the summit rocks" }
    ],
    videos: []  /* Osmo 360 MP4s go here */
  },
  {
    id: "coastal-sunrise",
    title: "Coastal Sunrise Walk",
    location: "North Shore, Massachusetts",
    date: "2026-09-20",
    cover: "photos/lake-reflection.jpg",
    distance: "4 mi",
    elevation: "200 ft",
    duration: "Half day",
    tags: ["walk", "sunrise", "coast"],
    summary: "An easy morning walk to test the new gallery layout. (Sample trip.)",
    story: [
      "Out before dawn with the 5D and the Osmo 360. Calm water, soft light, nobody else around."
    ],
    photos: [
      { src: "photos/lake-reflection.jpg", caption: "Still water at sunrise (sample photo)" }
    ],
    videos: []
  }
];
