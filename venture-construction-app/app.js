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

/* ==========================================================================
   SITE PRELOADER CONTROLLER (HERO VIDEO SYNCHRONIZED)
   ========================================================================== */
const SiteLoader = {
  preloader: null,
  barFill: null,
  percentText: null,
  statusText: null,
  skipBtn: null,
  circularIndicator: null,
  heroVideo: null,
  currentProgress: 12,
  targetProgress: 18,
  isDismissed: false,
  minDisplayTimeMs: 1400, // Luxurious brand reveal
  startTime: Date.now(),
  progressAnimFrame: null,
  hasBoundVideo: false,

  init() {
    this.preloader = document.getElementById("sitePreloader");
    this.barFill = document.getElementById("preloaderBarFill");
    this.percentText = document.getElementById("preloaderPercent");
    this.statusText = document.getElementById("preloaderStatusText");
    this.skipBtn = document.getElementById("preloaderSkipBtn");
    this.circularIndicator = document.getElementById("preloaderCircularIndicator");
    this.heroVideo = document.getElementById("heroBgVideo");

    if (!this.preloader) return;

    this.renderProgress(this.currentProgress);
    this.startAnimationLoop();

    // Show skip button after 2.4 seconds if still buffering
    setTimeout(() => {
      if (!this.isDismissed && this.skipBtn) {
        this.skipBtn.classList.add("visible");
      }
    }, 2400);

    if (this.skipBtn) {
      this.skipBtn.addEventListener("click", () => {
        this.dismiss("Welcome to Sri Sai Balaji Ventures");
      });
    }

    // Safety timeout: 7 seconds max
    setTimeout(() => {
      if (!this.isDismissed) {
        this.dismiss("Welcome to Sri Sai Balaji Ventures");
      }
    }, 7000);
  },

  startAnimationLoop() {
    const tick = () => {
      if (this.isDismissed) return;
      if (this.currentProgress < this.targetProgress) {
        const step = (this.targetProgress - this.currentProgress) * 0.12;
        this.currentProgress += Math.max(0.35, step);
        if (this.currentProgress > this.targetProgress) {
          this.currentProgress = this.targetProgress;
        }
        this.renderProgress(this.currentProgress);
      }
      this.progressAnimFrame = requestAnimationFrame(tick);
    };
    this.progressAnimFrame = requestAnimationFrame(tick);
  },

  renderProgress(val) {
    const rounded = Math.min(100, Math.round(val));
    if (this.barFill) {
      this.barFill.style.width = `${rounded}%`;
    }
    if (this.percentText) {
      this.percentText.textContent = `${rounded}%`;
    }
    if (this.circularIndicator) {
      const circumference = 2 * Math.PI * 44; // ~276.46
      const offset = circumference - (rounded / 100) * circumference;
      this.circularIndicator.style.strokeDashoffset = offset;
    }
  },

  setProgress(target, msg) {
    if (this.isDismissed) return;
    if (target > this.targetProgress) {
      this.targetProgress = Math.min(target, 100);
    }
    if (msg && this.statusText) {
      this.statusText.textContent = msg;
    }
  },

  bindHeroVideo(videoEl) {
    if (!videoEl || this.isDismissed || this.hasBoundVideo) return;
    this.hasBoundVideo = true;
    this.heroVideo = videoEl;

    this.setProgress(55, "Loading background video...");

    const finish = () => {
      this.setProgress(100, "Welcome to Sri Sai Balaji Ventures");
      this.finishWhenReady();
    };

    // If already playable
    if (videoEl.readyState >= 3 || (!videoEl.paused && videoEl.currentTime > 0)) {
      finish();
      return;
    }

    const onProgress = () => {
      if (videoEl.buffered && videoEl.buffered.length > 0 && videoEl.duration > 0) {
        const bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
        const ratio = bufferedEnd / videoEl.duration;
        const mapped = Math.round(55 + ratio * 40); // 55% -> 95%
        this.setProgress(Math.min(mapped, 95), "Buffering visual experience...");
      }
    };

    videoEl.addEventListener("progress", onProgress);

    videoEl.addEventListener("loadedmetadata", () => {
      this.setProgress(65, "Preparing video playback...");
    }, { once: true });

    videoEl.addEventListener("loadeddata", () => {
      this.setProgress(85, "Visuals ready...");
    }, { once: true });

    videoEl.addEventListener("canplaythrough", finish, { once: true });
    videoEl.addEventListener("playing", finish, { once: true });

    videoEl.addEventListener("error", (err) => {
      console.warn("Video load notice (continuing):", err);
      finish();
    }, { once: true });
  },

  finishWhenReady() {
    if (this.isDismissed) return;
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.minDisplayTimeMs - elapsed);

    setTimeout(() => {
      this.dismiss("Welcome to Sri Sai Balaji Ventures");
    }, remaining);
  },

  dismiss(msg) {
    if (this.isDismissed) return;
    this.isDismissed = true;

    if (this.progressAnimFrame) {
      cancelAnimationFrame(this.progressAnimFrame);
    }

    this.targetProgress = 100;
    this.currentProgress = 100;
    this.renderProgress(100);

    if (msg && this.statusText) {
      this.statusText.textContent = msg;
    }

    setTimeout(() => {
      if (this.preloader) {
        this.preloader.classList.add("site-preloader--closing");
      }
      document.body.classList.remove("site-loading");

      if (this.heroVideo) {
        this.heroVideo.play().catch(() => {});
      }

      setTimeout(() => {
        if (this.preloader) {
          this.preloader.classList.add("site-preloader--hidden");
          this.preloader.setAttribute("aria-hidden", "true");
          this.preloader.setAttribute("inert", "");
        }
      }, 750);
    }, 280);
  }
};

document.addEventListener("DOMContentLoaded", () => { 
  SiteLoader.init();
  try { initSupabase(); } catch(e) { console.error("Supabase Error:", e); SiteLoader.finishWhenReady(); }
  initTheme();
  renderFeedThumbnails();
  initCardClickEvents();
  initVideoControls();
  initCommentsSection();
  initActionButtons();
  initNavigation();
  initLightbox();
  initPhotoSliderControls();
  initVideoTheater();
  initImageRetries();
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
  const hamburgerBtn = document.getElementById("hamburgerMenuBtn");
  const luxuryDrawer = document.getElementById("luxuryNavDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const drawerNavItems = document.querySelectorAll(".drawer-nav-item");
  const headerNavLinks = document.querySelectorAll(".header-nav .nav-link");

  function openMenu() {
    if (!luxuryDrawer) return;
    if (hamburgerBtn) {
      hamburgerBtn.classList.add("is-open");
      hamburgerBtn.setAttribute("aria-expanded", "true");
    }
    luxuryDrawer.classList.add("is-open");
    luxuryDrawer.removeAttribute("inert");
    if (drawerBackdrop) drawerBackdrop.classList.add("is-open");
    document.body.classList.add("menu-open");

    // Accessibility: Set focus to close button
    setTimeout(() => {
      if (drawerCloseBtn) drawerCloseBtn.focus();
    }, 150);
  }

  function closeMenu() {
    if (!luxuryDrawer) return;
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove("is-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
    luxuryDrawer.classList.remove("is-open");
    luxuryDrawer.setAttribute("inert", "");
    if (drawerBackdrop) drawerBackdrop.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    // Restore focus to hamburger button
    if (hamburgerBtn) hamburgerBtn.focus();
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = hamburgerBtn.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeMenu);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeMenu);
  }

  // Handle Logo click
  if (logoBtn) {
    logoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
      closeWatchView();
      window.scrollTo({ top: 0, behavior: "smooth" });
      updateActiveNav("home");
    });
  }

  // Unified Section Navigation Handler
  function navigateToSection(targetId, sectionName) {
    closeMenu();
    if (watchView && !watchView.classList.contains("hidden")) {
      closeWatchView();
    }

    if (targetId === "heroSection" || sectionName === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    updateActiveNav(sectionName);
  }

  // Drawer Nav Items
  drawerNavItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const section = item.getAttribute("data-section") || targetId;
        navigateToSection(targetId, section);
      } else {
        closeMenu();
      }
    });
  });

  // Header Nav Links
  headerNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const section = link.getAttribute("data-section") || targetId;
        navigateToSection(targetId, section);
      }
    });
  });

  // Other internal scroll buttons (e.g. exploreProjectsBtn, scrollIndicatorBtn)
  const additionalScrollLinks = document.querySelectorAll('#exploreProjectsBtn, #scrollIndicatorBtn');
  additionalScrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToSection("projectsSection", "projects");
    });
  });

  function updateActiveNav(section) {
    // Update Header Nav
    document.querySelectorAll(".header-nav .nav-link").forEach(link => {
      if (link.getAttribute("data-section") === section) {
        link.classList.add("active");
      } else if (link.getAttribute("data-section")) {
        link.classList.remove("active");
      }
    });

    // Update Drawer Nav
    document.querySelectorAll(".drawer-nav-item").forEach(item => {
      if (item.getAttribute("data-section") === section) {
        item.classList.add("active");
      } else if (item.getAttribute("data-section")) {
        item.classList.remove("active");
      }
    });
  }

  // Active section spy on scroll
  const observedSectionIds = [
    { id: "heroSection", section: "home" },
    { id: "aboutSection", section: "about" },
    { id: "servicesSection", section: "services" },
    { id: "projectsSection", section: "projects" },
    { id: "whyUsSection", section: "why-us" },
    { id: "contactSection", section: "contact" }
  ];

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const matched = observedSectionIds.find(s => s.id === entry.target.id);
          if (matched) {
            updateActiveNav(matched.section);
          }
        }
      });
    }, { rootMargin: "-25% 0px -55% 0px" });

    observedSectionIds.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) sectionObserver.observe(el);
    });
  }

  // Global Escape key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (luxuryDrawer && luxuryDrawer.classList.contains("is-open")) {
        closeMenu();
      } else if (watchView && !watchView.classList.contains("hidden")) {
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
   TIME FORMATTER HELPER
   ========================================================================== */
function formatTime(sec) {
  if (isNaN(sec) || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/* ==========================================================================
   PRO IMAGE LIGHTBOX LOGIC (MULTI-IMAGE, ZOOM, SWIPE, CTAs)
   ========================================================================== */
let galleryImages = []; // Array of { url, title, category, label }
let currentLightboxIndex = 0;
let isLightboxZoomed = false;

function initLightbox() {
  const lightboxModal = document.getElementById("imageLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxImgWrapper = document.getElementById("lightboxImgWrapper");
  const closeBtn = document.getElementById("lightboxCloseBtn");
  const prevBtn = document.getElementById("lightboxPrevBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");
  const counterEl = document.getElementById("lightboxCounter");
  const captionEl = document.getElementById("lightboxCaption");
  const zoomBtn = document.getElementById("lightboxZoomBtn");
  const fsBtn = document.getElementById("lightboxFullscreenBtn");
  const waBtn = document.getElementById("lightboxWhatsAppBtn");
  const backdrop = document.getElementById("lightboxBackdrop");

  if (!lightboxModal || !lightboxImg) return;

  function updateLightboxView() {
    if (galleryImages.length === 0) return;
    const item = galleryImages[currentLightboxIndex];
    if (!item) return;

    // Reset zoom state on photo change
    isLightboxZoomed = false;
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove("zoomed");

    lightboxImg.src = item.url;
    if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
    if (captionEl) captionEl.textContent = `${item.title || 'Sri Sai Balaji Ventures'} • ${item.label || 'Venture Layout'}`;
    
    if (waBtn) {
      const text = encodeURIComponent(`Hi, I am interested in property photo #${currentLightboxIndex + 1} (${item.title || 'Venture Layout'}) on Sri Sai Balaji Ventures website. Please share more details.`);
      waBtn.href = `https://wa.me/918125900999?text=${text}`;
    }
  }

  function openLightbox(index = 0) {
    if (galleryImages.length === 0) return;
    currentLightboxIndex = Math.max(0, Math.min(index, galleryImages.length - 1));
    updateLightboxView();
    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxModal.classList.add("hidden");
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove("zoomed");
    isLightboxZoomed = false;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  function prevImage() {
    if (galleryImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxView();
  }

  function nextImage() {
    if (galleryImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightboxView();
  }

  function toggleZoom() {
    isLightboxZoomed = !isLightboxZoomed;
    if (lightboxImgWrapper) {
      lightboxImgWrapper.classList.toggle("zoomed", isLightboxZoomed);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      lightboxModal.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // Attach control clicks
  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (backdrop) backdrop.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); prevImage(); };
  if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); nextImage(); };
  if (zoomBtn) zoomBtn.onclick = (e) => { e.stopPropagation(); toggleZoom(); };
  if (fsBtn) fsBtn.onclick = (e) => { e.stopPropagation(); toggleFullscreen(); };
  if (lightboxImg) lightboxImg.ondblclick = (e) => { e.stopPropagation(); toggleZoom(); };

  // Keyboard Navigation
  document.addEventListener("keydown", (e) => {
    if (lightboxModal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") prevImage();
    else if (e.key === "ArrowRight") nextImage();
  });

  // Mobile Touch Swipe Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  lightboxModal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) prevImage();
      else nextImage();
    }
  }, { passive: true });

  window.openGalleryLightbox = openLightbox;
}

/* ==========================================================================
   PHOTO SLIDER CONTROLS (DESKTOP ARROWS & CATEGORY FILTERING)
   ========================================================================== */
function initPhotoSliderControls() {
  const container = document.getElementById("imageSliderGrid");
  const prevBtn = document.getElementById("sliderPrevBtn");
  const nextBtn = document.getElementById("sliderNextBtn");
  const thumb = document.getElementById("sliderPaginationThumb");
  const counterText = document.getElementById("sliderCounterText");
  const filterBtns = document.querySelectorAll(".photo-filter-btn");

  if (!container) return;

  function updateScrollProgress() {
    const maxScroll = container.scrollWidth - container.clientWidth;
    const current = container.scrollLeft;

    if (prevBtn) prevBtn.disabled = current <= 8;
    if (nextBtn) nextBtn.disabled = current >= maxScroll - 8;

    if (thumb && maxScroll > 0) {
      const progress = Math.min(1, Math.max(0, current / maxScroll));
      const thumbWidthPercent = Math.max(20, (container.clientWidth / container.scrollWidth) * 100);
      thumb.style.width = `${thumbWidthPercent}%`;
      const availableTrack = 100 - thumbWidthPercent;
      thumb.style.left = `${progress * availableTrack}%`;
    }

    if (counterText && galleryImages.length > 0) {
      const cardWidth = 380;
      const index = Math.min(galleryImages.length, Math.round(current / cardWidth) + 1);
      counterText.textContent = `Showing photo ${index} of ${galleryImages.length}`;
    }
  }

  container.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const step = container.clientWidth * 0.75;
      container.scrollBy({ left: -step, behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const step = container.clientWidth * 0.75;
      container.scrollBy({ left: step, behavior: "smooth" });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      filterGalleryCards(filter);
    });
  });

  setTimeout(updateScrollProgress, 150);
}

function filterGalleryCards(category) {
  const cards = document.querySelectorAll(".slider-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category") || "all";
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });

  const container = document.getElementById("imageSliderGrid");
  if (container) container.scrollTo({ left: 0, behavior: "smooth" });
}

function categorizeImage(fileName, index) {
  const lower = (fileName || "").toLowerCase();
  if (lower.includes("villa") || lower.includes("house") || lower.includes("home") || lower.includes("elevation")) {
    return { category: "villas", label: "Villa & Elevation", title: "Architectural Villa Elevation" };
  }
  if (lower.includes("work") || lower.includes("road") || lower.includes("site") || lower.includes("drain") || lower.includes("construct")) {
    return { category: "progress", label: "Site Development", title: "On-Site Infrastructure Work" };
  }
  if (lower.includes("plot") || lower.includes("venture") || lower.includes("layout") || lower.includes("dtcp") || lower.includes("gate")) {
    return { category: "ventures", label: "Venture & Plots", title: "Gated Venture Layout Plan" };
  }
  
  // Smart rotational fallback
  const cycle = [
    { category: "ventures", label: "Venture & Plots", title: "DTCP Approved Plotted Layout" },
    { category: "villas", label: "Villas & Elevations", title: "Luxury Duplex Elevation" },
    { category: "progress", label: "Site Progress", title: "Infrastructure & Blacktop Roads" }
  ];
  return cycle[index % cycle.length];
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
   SUPABASE INTEGRATION
   ========================================================================== */
const SUPABASE_URL = 'https://blsygxgnwlvdgxochvpj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsc3lneGdud2x2ZGd4b2NodnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTg2MTMsImV4cCI6MjEwNTM3NDYxM30.fcEUCtn3BNIMlZPIxxbWsxGMvhOyqFXstmB75YsOVeI';
let supabaseClient;




function initSupabase() { 
  if (typeof window.supabase !== 'undefined') {
    SiteLoader.setProgress(30, "Connecting to media server...");
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    loadPostImages();
    loadVideos();
  } else {
    console.error('Supabase library not loaded.'); 
    SiteLoader.finishWhenReady();
  }
}

async function loadPostImages() {
  const container = document.getElementById('imageSliderGrid');
  if (!container) return;

  const { data, error } = await supabaseClient.storage.from('post ssb').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) {
    console.error('Error fetching images:', error); 
    return;
  }

  const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder' && !file.name.startsWith('.'));

  if (files.length === 0) {
    container.innerHTML = '<p style="padding:2rem;">No images found.</p>';
    return;
  }

  container.innerHTML = "";
  galleryImages = [];

  files.forEach((file, index) => {
    const { data: publicUrlData } = supabaseClient.storage.from('post ssb').getPublicUrl(file.name);
    const publicUrl = publicUrlData.publicUrl;
    const meta = categorizeImage(file.name, index);

    galleryImages.push({
      url: publicUrl,
      title: meta.title,
      label: meta.label,
      category: meta.category,
      fileName: file.name
    });

    const article = document.createElement('article');
    article.className = 'slider-card';
    article.setAttribute('data-category', meta.category);
    
    article.innerHTML = `
      <div class="slider-card-header">
        <span class="slider-tag-pill">${meta.label}</span>
        <span class="slider-inspect-pill">
          <svg viewBox="0 0 24 24" class="icon-xs"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
          Inspect HD
        </span>
      </div>
      <div class="slider-media-box" data-image-index="${index}">
        <img src="${publicUrl}" alt="${meta.title}" class="slider-img" referrerpolicy="no-referrer">
        <div class="slider-hover-lens">
          <span>
            <svg viewBox="0 0 24 24" class="icon-sm"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
            Click to View Fullscreen
          </span>
        </div>
      </div>
      <div class="slider-actions">
        <a href="https://wa.me/918125900999?text=${encodeURIComponent('Hi, I am interested in ' + meta.title + ' from Sri Sai Balaji Ventures.')}" target="_blank" rel="noopener noreferrer" class="slider-btn slider-btn--wa">
          <svg viewBox="0 0 24 24" class="icon-xs"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8 1-.15.19-.3.21-.55.08-.25-.13-1.04-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.02 2.6c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.23-.19-.48-.31z" fill="currentColor"/></svg>
          <span>WhatsApp</span>
        </a>
        <a href="tel:8125900999" class="slider-btn slider-btn--call">
          <svg viewBox="0 0 24 24" class="icon-xs"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
          <span>Call Visit</span>
        </a>
      </div>
    `;

    const mediaBox = article.querySelector('.slider-media-box');
    mediaBox.addEventListener('click', () => {
      if (window.openGalleryLightbox) {
        window.openGalleryLightbox(index);
      }
    });

    container.appendChild(article);
  });
  
  setTimeout(() => {
    initLightbox();
    initPhotoSliderControls();
    initImageRetries();
  }, 100);
}

/* ==========================================================================
   VIDEO THEATER / CINEMA MODAL LOGIC
   ========================================================================== */
let projectVideosList = []; // stores { url, title, fileName, index }

function initVideoTheater() {
  const modal = document.getElementById("videoTheaterModal");
  const videoEl = document.getElementById("theaterVideoEl");
  const closeBtn = document.getElementById("theaterCloseBtn");
  const backdrop = document.getElementById("theaterBackdrop");
  const titleEl = document.getElementById("theaterVideoTitle");
  const playBtn = document.getElementById("theaterPlayBtn");
  const playIcon = document.getElementById("theaterPlayIcon");
  const centerBtn = document.getElementById("theaterCenterPlayBtn");
  const centerIcon = document.getElementById("theaterCenterIcon");
  const rewindBtn = document.getElementById("theaterRewindBtn");
  const muteBtn = document.getElementById("theaterMuteBtn");
  const volumeIcon = document.getElementById("theaterVolumeIcon");
  const timeDisplay = document.getElementById("theaterTimeDisplay");
  const fsBtn = document.getElementById("theaterFullscreenBtn");
  const seekTrack = document.getElementById("theaterSeekTrack");
  const seekProgress = document.getElementById("theaterSeekProgress");
  const seekBuffered = document.getElementById("theaterSeekBuffered");
  const videoWrap = document.getElementById("theaterVideoWrap");

  if (!modal || !videoEl) return;

  function updatePlayState(isPlaying) {
    if (isPlaying) {
      if (videoWrap) videoWrap.classList.add("playing");
      if (playIcon) playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
      if (centerIcon) centerIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
    } else {
      if (videoWrap) videoWrap.classList.remove("playing");
      if (playIcon) playIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
      if (centerIcon) centerIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
    }
  }

  function togglePlay() {
    if (videoEl.paused) {
      document.querySelectorAll(".project-video-element").forEach(v => v.pause());
      const hero = document.getElementById("heroBgVideo");
      if (hero) hero.muted = true;
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }

  function openTheater(videoIndex) {
    const item = projectVideosList[videoIndex];
    if (!item) return;

    document.querySelectorAll(".project-video-element").forEach(v => v.pause());

    if (titleEl) titleEl.textContent = item.title;
    videoEl.src = item.url;
    videoEl.currentTime = 0;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    videoEl.play().then(() => {
      updatePlayState(true);
    }).catch(() => {
      updatePlayState(false);
    });
  }

  function closeTheater() {
    modal.classList.add("hidden");
    videoEl.pause();
    videoEl.src = "";
    document.body.style.overflow = "";
    updatePlayState(false);
  }

  if (closeBtn) closeBtn.onclick = closeTheater;
  if (backdrop) backdrop.onclick = closeTheater;
  if (playBtn) playBtn.onclick = (e) => { e.stopPropagation(); togglePlay(); };
  if (centerBtn) centerBtn.onclick = (e) => { e.stopPropagation(); togglePlay(); };
  if (videoWrap) {
    videoWrap.onclick = (e) => {
      if (e.target.closest('.custom-video-controls')) return;
      togglePlay();
    };
  }

  if (rewindBtn) {
    rewindBtn.onclick = (e) => {
      e.stopPropagation();
      videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
    };
  }

  if (muteBtn) {
    muteBtn.onclick = (e) => {
      e.stopPropagation();
      videoEl.muted = !videoEl.muted;
      if (videoEl.muted) {
        volumeIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>`;
      } else {
        volumeIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>`;
      }
    };
  }

  if (fsBtn) {
    fsBtn.onclick = (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    };
  }

  if (seekTrack) {
    seekTrack.onclick = (e) => {
      e.stopPropagation();
      const rect = seekTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (videoEl.duration) {
        videoEl.currentTime = pos * videoEl.duration;
      }
    };
  }

  videoEl.addEventListener("timeupdate", () => {
    if (videoEl.duration) {
      const pct = (videoEl.currentTime / videoEl.duration) * 100;
      if (seekProgress) seekProgress.style.width = `${pct}%`;
      if (timeDisplay) timeDisplay.textContent = `${formatTime(videoEl.currentTime)} / ${formatTime(videoEl.duration)}`;
    }
  });

  videoEl.addEventListener("progress", () => {
    if (videoEl.buffered.length > 0 && videoEl.duration) {
      const bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
      const pct = (bufferedEnd / videoEl.duration) * 100;
      if (seekBuffered) seekBuffered.style.width = `${pct}%`;
    }
  });

  videoEl.addEventListener("play", () => updatePlayState(true));
  videoEl.addEventListener("pause", () => updatePlayState(false));
  videoEl.addEventListener("ended", () => updatePlayState(false));

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeTheater();
    else if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    }
  });

  window.openVideoTheaterModal = openTheater;
}

/* ==========================================================================
   VIDEO GALLERY ENGINE (SMART SINGLE-ACTIVE, CONTROLS & ASPECT HANDLING)
   ========================================================================== */
async function loadVideos() {
  const container = document.getElementById('projectsVideoGrid');
  if (!container) return;

  SiteLoader.setProgress(45, "Loading architectural media...");

  const { data, error } = await supabaseClient.storage.from('videos ssb').list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) {
    console.error('Error fetching videos:', error); 
    SiteLoader.finishWhenReady();
    return;
  }

  const files = data.filter(file => file.name && file.name !== '.emptyFolderPlaceholder' && !file.name.startsWith('.'));

  if (files.length === 0) {
    container.innerHTML = '<p style="padding:2rem;">No videos found.</p>';
    SiteLoader.finishWhenReady();
    return;
  }

  const heroVideo = document.getElementById('heroBgVideo');
  if (heroVideo && files.length > 0) {
    const { data: publicUrlDataHero } = supabaseClient.storage.from('videos ssb').getPublicUrl(files[0].name);
    heroVideo.src = publicUrlDataHero.publicUrl;
    heroVideo.load();
    SiteLoader.bindHeroVideo(heroVideo);
    heroVideo.play().catch(e => console.error('Autoplay prevented:', e));
  } else {
    SiteLoader.finishWhenReady();
  }

  container.innerHTML = "";
  projectVideosList = [];

  files.forEach((file, index) => {
    const { data: publicUrlData } = supabaseClient.storage.from('videos ssb').getPublicUrl(file.name);
    const publicUrl = publicUrlData.publicUrl;
    const title = `Sri Sai Balaji Ventures - Drone Walkthrough ${index + 1}`;

    projectVideosList.push({
      url: publicUrl,
      title: title,
      fileName: file.name,
      index: index
    });
    
    const card = document.createElement('div');
    card.className = 'project-video-card';
    card.id = `pvCard${index}`;

    card.innerHTML = `
      <video 
        id="videoElem${index}"
        class="project-video-element" 
        src="${publicUrl}" 
        preload="metadata"
        playsinline
      ></video>

      <div class="pv-header-badges">
        <span class="pv-badge-walkthrough">WALKTHROUGH 0${index + 1}</span>
        <button type="button" class="pv-theater-badge-btn" id="theaterBtn${index}">
          <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/></svg>
          <span>Cinema</span>
        </button>
      </div>

      <button type="button" class="pv-center-play" id="centerPlay${index}" aria-label="Play Video">
        <svg viewBox="0 0 24 24" id="centerPlayIcon${index}"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
      </button>

      <div class="pv-controls-bar" id="controlsBar${index}">
        <div class="pv-seek-track" id="seekTrack${index}">
          <div class="pv-seek-buffered" id="seekBuffered${index}"></div>
          <div class="pv-seek-progress" id="seekProgress${index}"></div>
        </div>
        <div class="pv-controls-row">
          <div class="pv-controls-left">
            <button type="button" class="pv-btn" id="playBtn${index}" aria-label="Toggle Play">
              <svg viewBox="0 0 24 24" id="playIcon${index}"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
            </button>
            <button type="button" class="pv-btn" id="muteBtn${index}" aria-label="Toggle Mute">
              <svg viewBox="0 0 24 24" id="muteIcon${index}"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/></svg>
            </button>
            <span class="pv-time" id="timeDisplay${index}">0:00 / 0:00</span>
          </div>
          <div class="pv-controls-right">
            <button type="button" class="pv-btn" id="expandBtn${index}" aria-label="Cinema Mode" title="Watch in Cinema Mode">
              <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(card);

    const video = card.querySelector(`#videoElem${index}`);
    const centerBtn = card.querySelector(`#centerPlay${index}`);
    const centerPlayIcon = card.querySelector(`#centerPlayIcon${index}`);
    const playBtn = card.querySelector(`#playBtn${index}`);
    const playIcon = card.querySelector(`#playIcon${index}`);
    const muteBtn = card.querySelector(`#muteBtn${index}`);
    const muteIcon = card.querySelector(`#muteIcon${index}`);
    const timeDisplay = card.querySelector(`#timeDisplay${index}`);
    const seekTrack = card.querySelector(`#seekTrack${index}`);
    const seekProgress = card.querySelector(`#seekProgress${index}`);
    const seekBuffered = card.querySelector(`#seekBuffered${index}`);
    const theaterBtn = card.querySelector(`#theaterBtn${index}`);
    const expandBtn = card.querySelector(`#expandBtn${index}`);

    // Update aspect ratio dynamically if video is vertical
    video.addEventListener("loadedmetadata", () => {
      if (video.videoHeight > video.videoWidth) {
        card.style.aspectRatio = "9 / 16";
        card.style.maxHeight = "75vh";
      }
      timeDisplay.textContent = `0:00 / ${formatTime(video.duration)}`;
    });

    function setVideoPlayState(playing) {
      if (playing) {
        card.classList.add("playing");
        playIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
        centerPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
      } else {
        card.classList.remove("playing");
        playIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
        centerPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
      }
    }

    function togglePlayback() {
      if (video.paused) {
        document.querySelectorAll(".project-video-element").forEach(v => {
          if (v !== video) v.pause();
        });
        const hero = document.getElementById("heroBgVideo");
        if (hero) hero.muted = true;

        video.play().catch(e => console.error("Play error:", e));
      } else {
        video.pause();
      }
    }

    video.addEventListener("play", () => setVideoPlayState(true));
    video.addEventListener("pause", () => setVideoPlayState(false));
    video.addEventListener("ended", () => {
      setVideoPlayState(false);
      video.currentTime = 0;
    });

    video.addEventListener("timeupdate", () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        seekProgress.style.width = `${pct}%`;
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      }
    });

    video.addEventListener("progress", () => {
      if (video.buffered.length > 0 && video.duration) {
        const bufEnd = video.buffered.end(video.buffered.length - 1);
        seekBuffered.style.width = `${(bufEnd / video.duration) * 100}%`;
      }
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest('.pv-controls-bar') || e.target.closest('.pv-header-badges') || e.target.closest('.pv-center-play')) return;
      togglePlayback();
    });

    centerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePlayback();
    });

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePlayback();
    });

    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        muteIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>`;
      } else {
        muteIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor"/>`;
      }
    });

    seekTrack.addEventListener("click", (e) => {
      e.stopPropagation();
      const rect = seekTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (video.duration) {
        video.currentTime = pos * video.duration;
      }
    });

    const openCinema = (e) => {
      e.stopPropagation();
      video.pause();
      if (window.openVideoTheaterModal) {
        window.openVideoTheaterModal(index);
      }
    };

    theaterBtn.addEventListener("click", openCinema);
    expandBtn.addEventListener("click", openCinema);
  });
}
