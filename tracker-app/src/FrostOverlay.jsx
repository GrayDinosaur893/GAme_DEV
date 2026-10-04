import React, { useEffect, useRef } from 'react';

// ============================================================
// FROST OVERLAY — Same glass rain as EditorialHero
// Used as persistent background over the main app dashboard
// ============================================================

const FrostOverlay = ({ waterFaded }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, animationId;
    let drops = [];

    // ---- Raindrop (identical to EditorialHero) ----
    class Drop {
      constructor(scatter = false) { this.reset(scatter); }

      reset(scatter = false) {
        this.x       = Math.random() * width;
        this.y       = scatter ? Math.random() * height : -20;
        const baseRadius = Math.random() * 4 + 2;
        this.rx      = baseRadius;
        this.ry      = baseRadius + (Math.random() * 2);
        this.speed   = Math.random() * 0.6 + 0.12;
        this.wobble  = Math.random() * Math.PI * 2;
        this.trail   = [];
        this.maxTrail = Math.floor((this.ry * 6 + 30) * 1.6); // Exact intro length
        this.stuck   = Math.random() < 0.3;
        this.stuckFor = Math.random() * 400;
        this.isStraight = Math.random() > 0.6; // 60% wobble, 40% straight
      }

      update() {
        if (this.stuck) {
          this.stuckFor--;
          if (this.stuckFor <= 0) this.stuck = false;
          return;
        }
        this.wobble += 0.025;
        this.x += this.isStraight ? 0 : Math.sin(this.wobble) * 0.08;
        this.y += this.speed;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();
        if (this.y > height + 30) this.reset(false);
      }

      draw(ctx) {
        // Trail streak
        if (!this.stuck && this.trail.length > 2) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y - this.ry);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y - this.ry);
          }
          ctx.strokeStyle = 'rgba(0,0,0,0.06)';
          ctx.lineWidth   = this.rx * 0.5;
          ctx.lineCap     = 'round';
          ctx.stroke();
        }

        // Drop body — clear hole
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.9)';
        ctx.fill();

      }
    }

    const resize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
      // Heavy initial fog — matches the new app background perfectly
      ctx.fillStyle = 'rgba(227, 213, 219, 0.92)';
      ctx.fillRect(0, 0, width, height);
    };

    const init = () => {
      drops = [];
      for (let i = 0; i < 7; i++) drops.push(new Drop(true)); // Moderate drops count
    };

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    resize();
    init();

    // ---- Mouse wipe ----
    let mouse = { x: -999, y: -999, active: false };

    const onMove = (e) => {
      mouse.active = true;
      mouse.x = e.clientX ?? e.touches?.[0]?.clientX;
      mouse.y = e.clientY ?? e.touches?.[0]?.clientY;
    };
    const onLeave = () => { mouse.active = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseleave', onLeave);

    // ---- Render loop ----
    const render = () => {
      // Re-freeze fog — slow rate, using the exact app background color
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(227, 213, 219, 0.002)'; // Slow refreeze rate
      ctx.fillRect(0, 0, width, height);

      // Raindrops - ONLY draw if water hasn't faded
      if (!waterFaded) {
        drops.forEach(d => {
          d.update();
          d.draw(ctx);
        });
      }

      // Mouse wipe — intro wala effect exactly (drawn AFTER drops so it wipes drops away too)
      if (mouse.active) {
        ctx.globalCompositeOperation = 'destination-out';
        const wipe = ctx.createRadialGradient(
          mouse.x, mouse.y, 200 * 0.05,
          mouse.x, mouse.y, 200   // Increased intro radius
        );
        wipe.addColorStop(0,   'rgba(0,0,0,0.18)'); // Exact intro clear strength
        wipe.addColorStop(0.5, 'rgba(0,0,0,0.06)');
        wipe.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = wipe;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.globalCompositeOperation = 'source-over';
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas: fog + rain drops — permanent, but drops stop when waterFaded is true */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9991, /* Topmost layer — glass is in FRONT */
        pointerEvents: 'none',
        opacity: 1, // Canvas always visible for the fog!
      }}>
        <canvas
          ref={canvasRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            filter: 'blur(3px)' // Exact intro blur amount
          }}
        />
      </div>
    </>
  );
};

export default FrostOverlay;
