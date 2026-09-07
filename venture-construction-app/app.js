/**
 * Sri Sai Balaji Ventures and Construction - Video Streaming Controller
 * Natural Cinematic Code-Generated Video Animations (Normal Realistic Colors)
 * 2-Column Watch Page, Interactive Comments, Light & Dark Theme Support
 */

// Dataset of 4 Sri Sai Balaji Ventures and Construction Videos
const BALAJI_VIDEOS = [
  {
    id: 0,
    title: "Sri Sai Balaji Ventures - Project Introduction & Vision",
    durationSec: 30,
    durationStr: "0:30",
    views: "180K views • 2 days ago",
    likes: 14200,
    channel: "Sri Sai Balaji Ventures",
    description: "Welcome to Sri Sai Balaji Ventures. This presentation showcases our digital media platform with realistic code-rendered landscape cinematography, smooth timeline controls, and responsive user interaction.",
    renderScene: drawSunsetOceanScene
  },
  {
    id: 1,
    title: "Sri Sai Balaji Ventures - Coastal Horizon & Sunset Waves",
    durationSec: 30,
    durationStr: "0:30",
    views: "125K views • 4 days ago",
    likes: 9800,
    channel: "Sri Sai Balaji Ventures",
    description: "A tranquil coastal landscape visual created with code, featuring gentle ocean tide rollers, warm golden sun reflections on water, and serene shoreline scenery.",
    renderScene: drawCoastalWavesScene
  },
  {
    id: 2,
    title: "Sri Sai Balaji Ventures - Mountain Pine Sunrise",
    durationSec: 30,
    durationStr: "0:30",
    views: "95K views • 1 week ago",
    likes: 7400,
    channel: "Sri Sai Balaji Ventures",
    description: "Alpine mountain landscape visual rendered in real-time on canvas, showcasing mist-covered pine valleys, soft morning sky, and dawn light breaking over summits.",
    renderScene: drawMountainSunriseScene
  },
  {
    id: 3,
    title: "Sri Sai Balaji Ventures - Twilight City Lights",
    durationSec: 30,
    durationStr: "0:30",
    views: "140K views • 2 weeks ago",
    likes: 11200,
    channel: "Sri Sai Balaji Ventures",
    description: "Evening twilight skyline with natural deep navy tones, amber architectural illumination, river water reflections, and calming night atmosphere.",
    renderScene: drawTwilightCityScene
  }
];

// Playback State
let currentVideoId = 0;
let isPlaying = true;
let isMuted = false;
let playbackTime = 0;
let lastTimestamp = 0;
let animationReqId = null;

// Initial Comments Data
let commentsData = [
  {
    id: 1,
    author: "Arjun Verma",
    initials: "AV",
    time: "1 day ago",
    text: "The natural lighting and smooth motion on this video are fantastic. Sri Sai Balaji Ventures has built an incredible video platform here!",
    likes: 42,
    liked: false
  },
  {
    id: 2,
    author: "Priya Rao",
    initials: "PR",
    time: "2 days ago",
    text: "Love how clean the video player is. The timeline scrubbing feels so responsive, and no lag whatsoever.",
    likes: 19,
    liked: false
  },
  {
    id: 3,
    author: "Rohan Kumar",
    initials: "RK",
    time: "3 days ago",
    text: "Great work by Sri Sai Balaji Ventures! Solid presentation and the layout is easy to navigate on both mobile and laptop.",
    likes: 8,
    liked: false
  }
];

// Theme: Light Mode Only
let currentTheme = "light";
localStorage.setItem("balaji_theme", "light");

// DOM References
const homeView = document.getElementById("homeView");
const watchView = document.getElementById("watchView");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const natureVideoCanvas = document.getElementById("natureVideoCanvas");
const codePlayToggle = document.getElementById("codePlayToggle");
const playIconSvg = document.getElementById("playIconSvg");
const codeRestartBtn = document.getElementById("codeRestartBtn");
const codeMuteBtn = document.getElementById("codeMuteBtn");
const volumeIconSvg = document.getElementById("volumeIconSvg");
const videoSeekTrack = document.getElementById("videoSeekTrack");
const videoSeekProgress = document.getElementById("videoSeekProgress");
const videoTimeDisplay = document.getElementById("videoTimeDisplay");
const codeFullscreenBtn = document.getElementById("codeFullscreenBtn");
const playerViewport = document.getElementById("playerViewport");

const watchVideoTitle = document.getElementById("watchVideoTitle");
const watchVideoStats = document.getElementById("watchVideoStats");
const watchVideoDesc = document.getElementById("watchVideoDesc");
const recommendedVideosList = document.getElementById("recommendedVideosList");

// Actions
const subscribeBtn = document.getElementById("subscribeBtn");
const likeBtn = document.getElementById("likeBtn");
const likeCountText = document.getElementById("likeCountText");
const shareBtn = document.getElementById("shareBtn");

// Comments DOM
const commentsCountHeader = document.getElementById("commentsCountHeader");
const newCommentInput = document.getElementById("newCommentInput");
const commentActionsRow = document.getElementById("commentActionsRow");
const cancelCommentBtn = document.getElementById("cancelCommentBtn");
const submitCommentBtn = document.getElementById("submitCommentBtn");
const commentsList = document.getElementById("commentsList");

// Theme DOM
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIconSvg = document.getElementById("themeIconSvg");
const menuThemeToggleBtn = document.getElementById("menuThemeToggleBtn");
const menuThemeText = document.getElementById("menuThemeText");

// Birds in flight state
const birds = [
  { x: 0.2, y: 0.25, speed: 0.02 },
  { x: 0.35, y: 0.22, speed: 0.023 },
  { x: 0.65, y: 0.3, speed: 0.018 }
];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderFeedThumbnails();
  initCardClickEvents();
  initVideoControls();
  initCommentsSection();
  initActionButtons();
  initNavigation();
  initLightbox();
  initImageRetries();
  initNamedProjectsVideo();
});

/* ==========================================================================
   THEME MANAGEMENT (LIGHT MODE ONLY)
   ========================================================================== */
function initTheme() {
  applyTheme("light", false);
}

function applyTheme(theme, showNotice = false) {
  currentTheme = "light";
  localStorage.setItem("balaji_theme", "light");
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
}

/**
 * Render scenic thumbnails for each card in the feed
 */
function renderFeedThumbnails() {
  BALAJI_VIDEOS.forEach(video => {
    const canvas = document.getElementById(`thumbCanvas${video.id}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    video.renderScene(ctx, canvas.width, canvas.height, 5.0);
  });
}

/**
 * Feed card clicks -> Open watch view
 */
function initCardClickEvents() {
  const cards = document.querySelectorAll(".video-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.getAttribute("data-id"), 10);
      openWatchView(id);
    });
  });

  backToHomeBtn.addEventListener("click", () => {
    closeWatchView();
  });
}

/**
 * Open Watch Page for selected video
 */
function openWatchView(videoId) {
  currentVideoId = videoId;
  const video = BALAJI_VIDEOS[videoId];

  // Update Metadata
  watchVideoTitle.textContent = video.title;
  watchVideoStats.textContent = video.views;
  watchVideoDesc.textContent = video.description;
  likeCountText.textContent = formatNumber(video.likes);
  likeBtn.classList.remove("liked");

  // Render recommended list in sidebar
  renderRecommendedVideos(videoId);

  // Switch View
  homeView.classList.add("hidden");
  watchView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Reset and start playback
  playbackTime = 0;
  isPlaying = true;
  updatePlayButton(true);
  startVideoLoop();
}

/**
 * Return to Home Feed
 */
function closeWatchView() {
  stopVideoLoop();
  watchView.classList.add("hidden");
  homeView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Render Recommended Videos in right column
 */
function renderRecommendedVideos(activeId) {
  recommendedVideosList.innerHTML = "";
  const otherVideos = BALAJI_VIDEOS.filter(v => v.id !== activeId);

  otherVideos.forEach(video => {
    const card = document.createElement("div");
    card.className = "recommended-card";
    card.innerHTML = `
      <div class="rec-thumb">
        <canvas id="recThumbCanvas${video.id}" width="160" height="90"></canvas>
        <span class="rec-duration">${video.durationStr}</span>
      </div>
      <div class="rec-info">
        <div class="rec-title">${video.title}</div>
        <div class="rec-channel">Sri Sai Balaji Ventures</div>
        <div class="rec-stats">${video.views.split("•")[0].trim()}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      openWatchView(video.id);
    });

    recommendedVideosList.appendChild(card);

    // Draw mini thumb
    setTimeout(() => {
      const miniCanvas = document.getElementById(`recThumbCanvas${video.id}`);
      if (miniCanvas) {
        const ctx = miniCanvas.getContext("2d");
        video.renderScene(ctx, 160, 90, 8.0);
      }
    }, 0);
  });
}

/**
 * Video Playback Engine (60 FPS Canvas)
 */
function startVideoLoop() {
  if (animationReqId) cancelAnimationFrame(animationReqId);
  lastTimestamp = performance.now();
  animationReqId = requestAnimationFrame(renderFrame);
}

function stopVideoLoop() {
  if (animationReqId) {
    cancelAnimationFrame(animationReqId);
    animationReqId = null;
  }
}

function renderFrame(now) {
  const dt = (now - lastTimestamp) / 1000;
  lastTimestamp = now;

  const current = BALAJI_VIDEOS[currentVideoId];
  const totalDuration = current.durationSec;

  if (isPlaying) {
    playbackTime += dt;
    if (playbackTime >= totalDuration) {
      playbackTime = 0; // Loop smoothly
    }
  }

  // Update seekbar and time
  const pct = (playbackTime / totalDuration) * 100;
  videoSeekProgress.style.width = `${pct}%`;
  videoTimeDisplay.textContent = `${formatTime(playbackTime)} / ${current.durationStr}`;

  // Render scene
  const ctx = natureVideoCanvas.getContext("2d");
  const w = natureVideoCanvas.width;
  const h = natureVideoCanvas.height;

  current.renderScene(ctx, w, h, playbackTime);

  animationReqId = requestAnimationFrame(renderFrame);
}

/* ==========================================================================
   4 SCENIC NATURAL VIDEO ANIMATIONS (NORMAL REALISTIC COLORS)
   ========================================================================== */

/**
 * 1. GOLDEN HOUR SUNSET OCEAN (Natural amber sun, deep blue water, mountain silhouette)
 */
function drawSunsetOceanScene(ctx, w, h, t) {
  const horizonY = h * 0.58;

  // Sky: Warm evening sunset gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, "#2c3e50");
  skyGrad.addColorStop(0.5, "#d35400");
  skyGrad.addColorStop(1, "#f39c12");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, horizonY);

  // Warm Golden Setting Sun
  const sunX = w * 0.5;
  const sunY = horizonY - 24;
  const sunR = 36;
  ctx.fillStyle = "#fff3cd";
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  // Distant Mountain Ridges
  ctx.fillStyle = "#34495e";
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(w * 0.15, horizonY - 45);
  ctx.lineTo(w * 0.35, horizonY - 15);
  ctx.lineTo(w * 0.48, horizonY - 50);
  ctx.lineTo(w * 0.7, horizonY - 20);
  ctx.lineTo(w * 0.88, horizonY - 60);
  ctx.lineTo(w, horizonY - 10);
  ctx.lineTo(w, horizonY);
  ctx.closePath();
  ctx.fill();

  // Birds in flight
  ctx.strokeStyle = "#2c3e50";
  ctx.lineWidth = 1.8;
  birds.forEach((b, idx) => {
    const bx = ((b.x + t * b.speed) % 1.2 - 0.1) * w;
    const by = b.y * h + Math.sin(t * 3 + idx) * 4;
    ctx.beginPath();
    ctx.moveTo(bx - 8, by);
    ctx.quadraticCurveTo(bx - 4, by - 5, bx, by);
    ctx.quadraticCurveTo(bx + 4, by - 5, bx + 8, by);
    ctx.stroke();
  });

  // Ocean Water: Deep Navy with Golden Shimmer
  const waterGrad = ctx.createLinearGradient(0, horizonY, 0, h);
  waterGrad.addColorStop(0, "#1a365d");
  waterGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, horizonY, w, h - horizonY);

  // Water Wave Reflections
  ctx.strokeStyle = "#fcd34d";
  for (let y = horizonY + 4; y < h; y += 7) {
    const depth = (y - horizonY) / (h - horizonY);
    const waveAmp = 2 + depth * 5;
    const shimmerWidth = (1 - depth) * 120 + 30;
    const leftX = sunX - shimmerWidth + Math.sin(y * 0.1 + t * 2) * 15;
    const rightX = sunX + shimmerWidth + Math.sin(y * 0.1 + t * 2) * 15;

    ctx.lineWidth = 1 + depth * 1.5;
    ctx.beginPath();
    ctx.moveTo(leftX, y);
    ctx.lineTo(rightX, y);
    ctx.stroke();
  }

  // Rolling foreground waves
  ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 20) {
    const wy = h - 28 + Math.sin(x * 0.015 + t * 2) * 8;
    ctx.lineTo(x, wy);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Clean Sri Sai Balaji Ventures and Construction Title Overlay
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SRI SAI BALAJI VENTURES", 36, 46);

  ctx.fillStyle = "#fef3c7";
  ctx.font = "500 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("PROJECT INTRODUCTION & VISION", 36, 68);
}

/**
 * 2. COASTAL HORIZON & SUNSET WAVES (Natural sand shore, surf foam, ocean waves)
 */
function drawCoastalWavesScene(ctx, w, h, t) {
  // Clear Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
  skyGrad.addColorStop(0, "#1e3a8a");
  skyGrad.addColorStop(1, "#38bdf8");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h * 0.5);

  // Soft Clouds
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.beginPath();
  ctx.arc(w * 0.3, 70, 35, 0, Math.PI * 2);
  ctx.arc(w * 0.35, 60, 45, 0, Math.PI * 2);
  ctx.arc(w * 0.42, 70, 32, 0, Math.PI * 2);
  ctx.fill();

  // Ocean Mid-ground
  const seaY = h * 0.48;
  ctx.fillStyle = "#0284c7";
  ctx.fillRect(0, seaY, w, h - seaY);

  // Ocean Waves
  for (let i = 0; i < 4; i++) {
    const wy = seaY + 25 + i * 28;
    ctx.fillStyle = i % 2 === 0 ? "#0369a1" : "#0ea5e9";
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 15) {
      const waveOffset = Math.sin(x * 0.02 + t * (2 + i * 0.5)) * 10;
      ctx.lineTo(x, wy + waveOffset);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  // Sandy Shoreline (Natural warm sand tone)
  const shoreY = h * 0.78;
  const tideOffset = Math.sin(t * 1.5) * 18;
  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, shoreY + tideOffset);
  ctx.quadraticCurveTo(w * 0.5, shoreY - 10 + tideOffset, w, shoreY + 15 + tideOffset);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Surf Foam line
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, shoreY + tideOffset);
  ctx.quadraticCurveTo(w * 0.5, shoreY - 10 + tideOffset, w, shoreY + 15 + tideOffset);
  ctx.stroke();

  // Branding
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SRI SAI BALAJI VENTURES", 36, 46);

  ctx.fillStyle = "#e0f2fe";
  ctx.font = "500 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("COASTAL HORIZON & WAVES", 36, 68);
}

/**
 * 3. MOUNTAIN PINE SUNRISE (Mist valleys, evergreen pine silhouettes, dawn glow)
 */
function drawMountainSunriseScene(ctx, w, h, t) {
  // Dawn Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  skyGrad.addColorStop(0, "#334155");
  skyGrad.addColorStop(0.5, "#fda4af");
  skyGrad.addColorStop(1, "#fed7aa");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Morning Sun
  const sunX = w * 0.65;
  const sunY = h * 0.45;
  ctx.fillStyle = "#fffbeb";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
  ctx.fill();

  // Distant Mountain Ridge
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.52);
  ctx.lineTo(w * 0.22, h * 0.38);
  ctx.lineTo(w * 0.45, h * 0.5);
  ctx.lineTo(w * 0.65, h * 0.32);
  ctx.lineTo(w * 0.85, h * 0.48);
  ctx.lineTo(w, h * 0.36);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Midground Ridge
  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.62);
  ctx.lineTo(w * 0.35, h * 0.54);
  ctx.lineTo(w * 0.7, h * 0.65);
  ctx.lineTo(w, h * 0.55);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Evergreen Pine Trees Silhouette
  ctx.fillStyle = "#0f172a";
  for (let x = 10; x < w; x += 32) {
    const treeH = 50 + (Math.sin(x * 12) * 20);
    const treeY = h - 10;
    for (let layer = 0; layer < 3; layer++) {
      const ly = treeY - treeH * (1 - layer * 0.25);
      ctx.beginPath();
      ctx.moveTo(x, ly);
      ctx.lineTo(x - 14 + layer * 2, ly + 26);
      ctx.lineTo(x + 14 - layer * 2, ly + 26);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Branding
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SRI SAI BALAJI VENTURES", 36, 46);

  ctx.fillStyle = "#fed7aa";
  ctx.font = "500 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("MOUNTAIN PINE SUNRISE", 36, 68);
}

/**
 * 4. TWILIGHT CITY LIGHTS (Deep navy evening sky, amber windows, calm river reflections)
 */
function drawTwilightCityScene(ctx, w, h, t) {
  const riverY = h * 0.65;

  // Deep Navy Night Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, riverY);
  skyGrad.addColorStop(0, "#0b1120");
  skyGrad.addColorStop(1, "#1e293b");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, riverY);

  // Stars
  ctx.fillStyle = "#ffffff";
  for (let s = 0; s < 25; s++) {
    const sx = (s * 39) % w;
    const sy = (s * 27) % (riverY * 0.6);
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }

  // Skyline Buildings
  const skyline = [
    { x: 20, w: 60, h: 180 },
    { x: 90, w: 75, h: 220 },
    { x: 180, w: 55, h: 140 },
    { x: 250, w: 85, h: 260 },
    { x: 350, w: 70, h: 190 },
    { x: 440, w: 80, h: 230 },
    { x: 535, w: 65, h: 160 },
    { x: 615, w: 90, h: 250 },
    { x: 720, w: 75, h: 210 },
    { x: 810, w: 60, h: 150 },
    { x: 885, w: 65, h: 190 }
  ];

  skyline.forEach(b => {
    const by = riverY - b.h;
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(b.x, by, b.w, b.h);

    for (let wy = by + 16; wy < riverY - 10; wy += 18) {
      for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 14) {
        if ((wx * 3 + wy * 7) % 5 !== 0) {
          ctx.fillStyle = (wx + wy) % 3 === 0 ? "#fbbf24" : "#fef08a";
          ctx.fillRect(wx, wy, 6, 9);
        }
      }
    }
  });

  // Calm River
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, riverY, w, h - riverY);

  // River Reflections
  skyline.forEach(b => {
    const refX = b.x + b.w / 2;
    ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
    for (let ry = riverY + 6; ry < h; ry += 8) {
      const rw = (ry - riverY) * 0.3 + 10;
      const rx = refX + Math.sin(ry * 0.1 + t * 2) * 6;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx - rw, ry);
      ctx.lineTo(rx + rw, ry);
      ctx.stroke();
    }
  });

  // Branding
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SRI SAI BALAJI VENTURES", 36, 46);

  ctx.fillStyle = "#fde68a";
  ctx.font = "500 13px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("TWILIGHT CITY LIGHTS", 36, 68);
}

/* ==========================================================================
   VIDEO PLAYER CONTROLS
   ========================================================================== */
function initVideoControls() {
  codePlayToggle.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton(isPlaying);
  });

  codeRestartBtn.addEventListener("click", () => {
    playbackTime = 0;
    isPlaying = true;
    updatePlayButton(true);
  });

  // Mute / Unmute
  codeMuteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    if (isMuted) {
      volumeIconSvg.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="#ffffff"/>`;
      showToastNotice("Audio muted");
    } else {
      volumeIconSvg.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="#ffffff"/>`;
      showToastNotice("Audio unmuted");
    }
  });

  // Scrub bar click
  videoSeekTrack.addEventListener("click", (e) => {
    const rect = videoSeekTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (width > 0) {
      const current = BALAJI_VIDEOS[currentVideoId];
      playbackTime = (clickX / width) * current.durationSec;
    }
  });

  // Fullscreen
  codeFullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      playerViewport.requestFullscreen().catch(err => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen();
    }
  });
}

function updatePlayButton(playing) {
  if (playing) {
    playIconSvg.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#ffffff"/>`;
  } else {
    playIconSvg.innerHTML = `<polygon points="9,6 19,12 9,18" fill="#ffffff"/>`;
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/* ==========================================================================
   INTERACTIVE COMMENTS SECTION
   ========================================================================== */
function initCommentsSection() {
  newCommentInput.addEventListener("focus", () => {
    commentActionsRow.classList.remove("hidden");
  });

  cancelCommentBtn.addEventListener("click", () => {
    newCommentInput.value = "";
    commentActionsRow.classList.add("hidden");
  });

  function submitComment() {
    const text = newCommentInput.value.trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      initials: "BV",
      time: "Just now",
      text: text,
      likes: 0,
      liked: false
    };

    commentsData.unshift(newComment);
    renderCommentsList();

    newCommentInput.value = "";
    commentActionsRow.classList.add("hidden");
    showToastNotice("Comment posted!");
  }

  submitCommentBtn.addEventListener("click", submitComment);

  newCommentInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitComment();
    }
  });

  renderCommentsList();
}

function renderCommentsList() {
  commentsCountHeader.textContent = `${commentsData.length} Comments`;
  commentsList.innerHTML = "";

  commentsData.forEach(comment => {
    const item = document.createElement("div");
    item.className = "comment-item";
    item.innerHTML = `
      <div class="comment-avatar">${comment.initials}</div>
      <div class="comment-body">
        <div class="comment-author-row">
          <span class="comment-author">${comment.author}</span>
          <span class="comment-time">${comment.time}</span>
        </div>
        <div class="comment-content">${escapeHTML(comment.text)}</div>
        <div class="comment-actions">
          <button class="comment-like-btn ${comment.liked ? 'liked' : ''}" data-comment-id="${comment.id}">
            <svg viewBox="0 0 24 24" class="icon-xs"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/></svg>
            <span class="like-num">${comment.likes}</span>
          </button>
          <button class="reply-text-btn">Reply</button>
        </div>
      </div>
    `;

    const likeBtn = item.querySelector(".comment-like-btn");
    likeBtn.addEventListener("click", () => {
      comment.liked = !comment.liked;
      comment.likes += comment.liked ? 1 : -1;
      renderCommentsList();
    });

    const replyBtn = item.querySelector(".reply-text-btn");
    replyBtn.addEventListener("click", () => {
      newCommentInput.focus();
      newCommentInput.value = `@${comment.author} `;
      commentActionsRow.classList.remove("hidden");
    });

    commentsList.appendChild(item);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   VIDEO ACTION BUTTONS (Subscribe, Like, Share)
   ========================================================================== */
function initActionButtons() {
  let isSubscribed = false;
  subscribeBtn.addEventListener("click", () => {
    isSubscribed = !isSubscribed;
    if (isSubscribed) {
      subscribeBtn.textContent = "Subscribed";
      subscribeBtn.classList.add("subscribed");
      showToastNotice("Subscribed to Sri Sai Balaji Ventures");
    } else {
      subscribeBtn.textContent = "Subscribe";
      subscribeBtn.classList.remove("subscribed");
      showToastNotice("Unsubscribed");
    }
  });

  let videoLiked = false;
  likeBtn.addEventListener("click", () => {
    videoLiked = !videoLiked;
    const current = BALAJI_VIDEOS[currentVideoId];
    if (videoLiked) {
      likeBtn.classList.add("liked");
      likeCountText.textContent = formatNumber(current.likes + 1);
      showToastNotice("Liked video");
    } else {
      likeBtn.classList.remove("liked");
      likeCountText.textContent = formatNumber(current.likes);
    }
  });

  shareBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText(window.location.href);
    showToastNotice("Link copied to clipboard!");
  });
}

/* ==========================================================================
   TOPBAR SEARCH & MOBILE NAVIGATION
   ========================================================================== */
function initNavigation() {
  const logoBtn = document.getElementById("logoBtn");

  if (logoBtn) {
    logoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeWatchView();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Handle Home link
  const homeNavLink = document.querySelector('.nav-link[data-section="home"]');
  if (homeNavLink) {
    homeNavLink.addEventListener("click", (e) => {
      e.preventDefault();
      closeWatchView();
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateActiveNav("home");
    });
  }

  // Handle Projects smooth scrolling links
  const projectScrollLinks = document.querySelectorAll('a[href="#projectsSection"]');
  projectScrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (watchView && !watchView.classList.contains("hidden")) {
        closeWatchView();
      }
      const target = document.getElementById("projectsSection");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      updateActiveNav("projects");
    });
  });

  function updateActiveNav(section) {
    document.querySelectorAll(".header-nav .nav-link").forEach(link => {
      if (link.getAttribute("data-section") === section) {
        link.classList.add("active");
      } else if (link.getAttribute("data-section")) {
        link.classList.remove("active");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (watchView && !watchView.classList.contains("hidden")) {
        closeWatchView();
      }
    }
  });
}

let toastTimer = null;
function showToastNotice(msg) {
  const toast = document.getElementById("toastPopup");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

/* ==========================================================================
   IMAGE LIGHTBOX LOGIC
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const sliderImages = document.querySelectorAll(".slider-img");

  if (!lightboxModal || !lightboxImg || !closeBtn) return;

  function openLightbox(src) {
    lightboxImg.src = src;
    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling when open
  }

  function closeLightbox() {
    lightboxModal.classList.add("hidden");
    lightboxImg.src = ""; // Clear src so it doesn't flash old image next time
    document.body.style.overflow = ""; // Restore scrolling
  }

  sliderImages.forEach(img => {
    img.style.cursor = "pointer"; // Ensure it looks clickable
    img.addEventListener("click", () => {
      openLightbox(img.src);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  // Close when clicking outside the content (on the background overlay)
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   IMAGE ERROR RETRY LOGIC
   ========================================================================== */
function initImageRetries() {
  const allImages = document.querySelectorAll("img.slider-img, #lightboxImg");

  allImages.forEach(img => {
    img.dataset.retries = "0";

    img.addEventListener("error", function() {
      let attempts = parseInt(img.dataset.retries, 10) || 0;
      const maxRetries = 5;

      if (attempts < maxRetries) {
        attempts++;
        img.dataset.retries = attempts.toString();
        
        console.warn(`Image failed to load. Retrying (${attempts}/${maxRetries}):`, img.src);
        
        // Wait 1 second before retrying to avoid spamming the network
        setTimeout(() => {
          try {
            let url = new URL(img.src);
            url.searchParams.set("retry", attempts);
            img.src = url.toString();
          } catch (e) {
            // Fallback if URL parsing fails
            const separator = img.src.includes('?') ? '&' : '?';
            img.src = `${img.src}${separator}retry=${attempts}`;
          }
        }, 1500); // 1.5 seconds delay between retries
      } else {
        console.error("Failed to load image after maximum retries:", img.src);
        // Optionally show a broken image placeholder
        // img.src = "fallback-image.png"; 
      }
    });
  });
}

/* ==========================================================================
   PROJECTS VIDEO LOGIC
   ========================================================================== */
function initNamedProjectsVideo() {
  setupProjectVideo(
    "playBtn1", "stopBtn1", "iframe1", "thumb1", "overlay1", "fjkCi3CbQCg"
  );
  
  setupProjectVideo(
    "playBtn2", "stopBtn2", "iframe2", "thumb2", "overlay2", "cMsJo2xfBqs"
  );

  setupProjectVideo(
    "playBtn3", "stopBtn3", "iframe3", "thumb3", "overlay3", "jeJvs1U-GP8"
  );

  setupProjectVideo(
    "playBtn4", "stopBtn4", "iframe4", "thumb4", "overlay4", "Reqfg2yKj64"
  );

  setupProjectVideo(
    "playBtn5", "stopBtn5", "iframe5", "thumb5", "overlay5", "mkShyVmtehw"
  );
}

function setupProjectVideo(playBtnId, stopBtnId, iframeId, thumbId, overlayId, videoId) {
  const playBtn = document.getElementById(playBtnId);
  const stopBtn = document.getElementById(stopBtnId);
  const iframe = document.getElementById(iframeId);
  const thumb = document.getElementById(thumbId);
  const overlay = document.getElementById(overlayId);

  if (!playBtn || !iframe || !overlay || !stopBtn || !thumb) return;

  playBtn.addEventListener("click", () => {
    // Hide play button, hide thumbnail, show stop button
    playBtn.classList.add("hidden");
    thumb.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    overlay.classList.add("playing");

    // Set src with autoplay, audio on (mute=0), and all UI hidden
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1`;
  });

  stopBtn.addEventListener("click", () => {
    // Stop playback by clearing the iframe source
    iframe.src = "";
    
    // Reset UI to initial state
    playBtn.classList.remove("hidden");
    thumb.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    overlay.classList.remove("playing");
  });
}

