/* ==========================================================================
   PHOTO TEXT PARTICLE ASSEMBLY ANIMATION (6-Second Cinematic Version)
   Features:
   - Triggers WHENEVER user reaches the About Me section (replays on each visit)
   - Takes ~6 seconds to assemble from start to finish
   - Characters (01, JAVA, REACT, MTN, </>, {} etc.) fly in from random positions
   - While flying, they glow cyan (#00e5cc)
   - When each character lands on its target pixel, it takes on the actual color of that pixel
   - When ~98% of particles have landed, the real photo fades in smoothly over the canvas
   - The canvas then clears, leaving the photo with the float animation
   ========================================================================== */

(function () {
  'use strict';

  // Base64 thumbnail data URI (100% immune to file:// and CORS restrictions)
  const PROFILE_DATA_URI = "data:image/jpeg;base64,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";

  // Tokens specified by user
  const tokens = ['01', 'JAVA', 'REACT', 'MTN', '</>', '{}', '10', 'AUCA', 'SQL', 'DEV', 'JS', 'C#', 'GIT', 'API', '[]', '//', 'CSS', 'HTML', '0', '1'];

  let baseParticles = null;
  let particles = [];
  let animating = false;
  let fadingIn = false;
  let animId = null;
  let fadeTimeout = null;
  let startTimestamp = 0;
  let hasPlayedForCurrentEnter = false;
  let enterDebounceTimer = null;

  function getElements() {
    const pc = document.getElementById('photoCanvas');
    const realImg = document.getElementById('photoReal');
    const wrapper = document.getElementById('photoWrapper') || document.querySelector('.photo-wrapper');
    return { pc, realImg, wrapper };
  }

  function showPhotoFallback() {
    const { pc, realImg, wrapper } = getElements();
    if (realImg) {
      realImg.style.transition = 'opacity 0.6s ease';
      realImg.style.opacity = '1';
    }
    if (pc) pc.style.display = 'none';
    if (wrapper) wrapper.classList.add('floating');
  }

  // Pre-sample photo pixels once into a reusable base template
  function initTemplate(callback) {
    if (baseParticles && baseParticles.length > 0) {
      if (callback) callback();
      return;
    }

    const { pc, wrapper } = getElements();
    if (!pc) {
      showPhotoFallback();
      return;
    }

    const PW = (wrapper && wrapper.clientWidth) ? wrapper.clientWidth : 260;
    const PH = (wrapper && wrapper.clientHeight) ? wrapper.clientHeight : 300;

    pc.width = PW;
    pc.height = PH;

    const off = document.createElement('canvas');
    off.width = PW;
    off.height = PH;
    const octx = off.getContext('2d');

    const tmpImg = new Image();
    tmpImg.crossOrigin = 'anonymous';

    tmpImg.onerror = function () {
      showPhotoFallback();
    };

    tmpImg.onload = function () {
      try {
        octx.drawImage(tmpImg, 0, 0, PW, PH);
        const imgData = octx.getImageData(0, 0, PW, PH).data;

        const fontSize = PW < 200 ? 6 : 7;
        const step = fontSize;
        const cols = Math.floor(PW / step);
        const rows = Math.floor(PH / step);
        baseParticles = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = Math.floor(c * step + step / 2);
            const py = Math.floor(r * step + step / 2);
            const idx = (py * PW + px) * 4;
            const red = imgData[idx];
            const green = imgData[idx + 1];
            const blue = imgData[idx + 2];
            const alpha = imgData[idx + 3];

            // Sample pixels covering both subject and portrait backdrop
            if (alpha > 30 && (red + green + blue) / 3 > 12) {
              baseParticles.push({
                tx: c * step + step / 2,
                ty: r * step + step / 2,
                token: tokens[Math.floor(Math.random() * tokens.length)],
                color: 'rgb(' + red + ',' + green + ',' + blue + ')'
              });
            }
          }
        }

        if (baseParticles.length === 0) {
          showPhotoFallback();
          return;
        }

        if (callback) callback();
      } catch (err) {
        showPhotoFallback();
      }
    };

    tmpImg.src = PROFILE_DATA_URI;
  }

  // Reset visual state when user leaves the About section
  function resetForNextScroll() {
    if (animId) cancelAnimationFrame(animId);
    if (fadeTimeout) clearTimeout(fadeTimeout);
    animating = false;
    fadingIn = false;

    const { pc, realImg, wrapper } = getElements();
    if (realImg) {
      realImg.style.transition = 'none';
      realImg.style.opacity = '0';
    }
    if (pc) {
      pc.style.display = 'block';
      pc.style.opacity = '1';
      const ctx = pc.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, pc.width, pc.height);
    }
    if (wrapper) {
      wrapper.classList.remove('floating');
    }
  }

  // Main 5-Second Assembly Animation
  function startAssemblyAnimation() {
    if (!baseParticles) {
      initTemplate(startAssemblyAnimation);
      return;
    }

    if (animId) cancelAnimationFrame(animId);
    if (fadeTimeout) clearTimeout(fadeTimeout);

    const { pc, realImg, wrapper } = getElements();
    if (!pc || !realImg) {
      showPhotoFallback();
      return;
    }

    const PW = (wrapper && wrapper.clientWidth) ? wrapper.clientWidth : 260;
    const PH = (wrapper && wrapper.clientHeight) ? wrapper.clientHeight : 300;
    pc.width = PW;
    pc.height = PH;
    const ctx = pc.getContext('2d');

    // Reset visual state
    realImg.style.transition = 'none';
    realImg.style.opacity = '0';
    pc.style.display = 'block';
    pc.style.opacity = '1';
    if (wrapper) wrapper.classList.remove('floating');
    ctx.clearRect(0, 0, PW, PH);

    const fontSize = PW < 200 ? 6 : 7;

    // Seed animated particles from base template
    // Duration and delays calibrated so entire flight & landing takes ~6 seconds
    particles = new Array(baseParticles.length);
    for (let i = 0; i < baseParticles.length; i++) {
      const bp = baseParticles[i];
      const angle = Math.random() * Math.PI * 2;
      const distance = 300 + Math.random() * 480;
      const sx = bp.tx + Math.cos(angle) * distance;
      const sy = bp.ty + Math.sin(angle) * distance;

      particles[i] = {
        tx: bp.tx,
        ty: bp.ty,
        sx: sx,
        sy: sy,
        x: sx,
        y: sy,
        token: bp.token,
        color: bp.color,
        angle: angle,
        curveFactor: (Math.random() - 0.5) * 45,
        // Staggered launch delay (0 to 1800ms)
        delay: Math.random() * 1800,
        // Flight travel duration (3800 to 4200ms)
        // delay (max 1800) + duration (max 4200) = ~6000ms (6.0s)
        duration: 3800 + Math.random() * 400,
        landed: false
      };
    }

    animating = true;
    fadingIn = false;
    startTimestamp = performance.now();

    function frameLoop(now) {
      if (!animating && fadingIn) return;

      const elapsed = now - startTimestamp;
      ctx.clearRect(0, 0, PW, PH);
      ctx.font = '600 ' + fontSize + 'px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let landedCount = 0;
      const flying = [];
      const landed = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (elapsed < p.delay) {
          // Particle has not started flight yet
          continue;
        }

        const t = (elapsed - p.delay) / p.duration;

        if (t >= 1 || p.landed) {
          p.x = p.tx;
          p.y = p.ty;
          p.landed = true;
          landedCount++;
          landed.push(p);
        } else {
          // Smooth quartic ease-out: gentle deceleration into exact pixel position
          const ease = 1 - Math.pow(1 - t, 3.5);
          let curX = p.sx + (p.tx - p.sx) * ease;
          let curY = p.sy + (p.ty - p.sy) * ease;

          // Organic slight sine curve drift
          const wave = Math.sin(t * Math.PI) * p.curveFactor;
          curX += Math.cos(p.angle + Math.PI / 2) * wave;
          curY += Math.sin(p.angle + Math.PI / 2) * wave;

          p.x = curX;
          p.y = curY;
          flying.push(p);
        }
      }

      // 1. Draw flying particles (Glow cyan matching the accent color #00e5cc)
      if (flying.length > 0) {
        ctx.shadowColor = '#00e5cc';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#00e5cc';
        for (let i = 0; i < flying.length; i++) {
          const p = flying[i];
          ctx.fillText(p.token, p.x, p.y);
        }
      }

      // 2. Draw landed particles (Take on actual color of that pixel from the photo)
      ctx.shadowBlur = 0;
      for (let i = 0; i < landed.length; i++) {
        const p = landed[i];
        ctx.fillStyle = p.color;
        ctx.fillText(p.token, p.tx, p.ty);
      }

      // 3. When ~98% of particles have landed (or reaching 6.0 seconds), fade in real photo smoothly
      if (!fadingIn && (landedCount >= particles.length * 0.98 || elapsed >= 6000)) {
        fadingIn = true;
        realImg.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
        realImg.style.opacity = '1';

        // 4. The canvas then clears, leaving just your photo with the float animation
        fadeTimeout = setTimeout(function () {
          animating = false;
          if (animId) cancelAnimationFrame(animId);
          ctx.clearRect(0, 0, PW, PH);
          pc.style.display = 'none';

          if (wrapper) {
            wrapper.classList.add('floating');
          }
        }, 1200);
      }

      if (!fadingIn || landedCount < particles.length) {
        animId = requestAnimationFrame(frameLoop);
      }
    }

    animId = requestAnimationFrame(frameLoop);
  }

  // Pre-load template on initial page load
  initTemplate();

  // Trigger WHENEVER user reaches the About section
  const aboutSec = document.getElementById('about');
  if (aboutSec && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // User reached About section!
          if (!hasPlayedForCurrentEnter) {
            hasPlayedForCurrentEnter = true;
            clearTimeout(enterDebounceTimer);
            enterDebounceTimer = setTimeout(function () {
              startAssemblyAnimation();
            }, 120);
          }
        } else {
          // User scrolled away from About section -> reset for next visit
          hasPlayedForCurrentEnter = false;
          clearTimeout(enterDebounceTimer);
          resetForNextScroll();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(aboutSec);
  } else {
    // Fallback if IntersectionObserver is not available
    setTimeout(startAssemblyAnimation, 1000);
  }

  // Global helper if called programmatically
  window.replayPhotoAssembly = function () {
    resetForNextScroll();
    startAssemblyAnimation();
  };

})();
