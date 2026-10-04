import React, { useEffect, useRef, useState } from 'react';

// ============================================================
// EDITORIAL HERO + GLASS FOG + RAIN
// Yevgeniya Grab editorial base underneath
// Canvas fog layer on top — mouse wipes it, it slowly re-freezes
// Raindrops slide down the glass surface
// ============================================================

const EditorialHero = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, animationId;
    let drops = [];

    // ---- Raindrop class (realistic bead on glass) ----
    class Drop {
      constructor(scatter = false) { this.reset(scatter); }

      reset(scatter = false) {
        this.x       = Math.random() * width;
        this.y       = scatter ? Math.random() * height : -20;
        const baseRadius = Math.random() * 4 + 2;
        this.rx      = baseRadius;
        this.ry      = baseRadius + (Math.random() * 2); // Thoda aur gol (less elongated)
        this.speed   = Math.random() * 0.6 + 0.12;
        this.wobble  = Math.random() * Math.PI * 2;
        this.trail   = [];
        this.maxTrail = Math.floor((this.ry * 6 + 30) * 1.6); // Original intro length
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

        // Drop body — clear hole in the fog
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.9)';
        ctx.fill();

        // Specular highlight (top-left shine)
        ctx.globalCompositeOperation = 'source-over';
        const shine = ctx.createRadialGradient(
          this.x - this.rx * 0.3, this.y - this.ry * 0.4, 0.5,
          this.x, this.y, this.rx * 1.2
        );
        shine.addColorStop(0, 'rgba(200, 200, 200, 0.6)');
        shine.addColorStop(0.3, 'rgba(200, 200, 200, 0.15)');
        shine.addColorStop(1, 'rgba(200, 200, 200, 0)');
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = shine;
        ctx.fill();

        // Thin dark rim
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    const resize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
      // Initial fog fill when resizing (blush pink)
      ctx.fillStyle = 'rgba(253, 246, 249, 0.92)';
      ctx.fillRect(0, 0, width, height);
    };

    const init = () => {
      drops = [];
      for (let i = 0; i < 14; i++) drops.push(new Drop(true)); // Original drops count
    };

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    resize();
    init();

    // ---- Mouse / touch position for wiping ----
    let mouse = { x: -999, y: -999, active: false, radius: 200 };

    const onMove = (e) => {
      mouse.active = true;
      mouse.x = e.clientX ?? e.touches?.[0]?.clientX;
      mouse.y = e.clientY ?? e.touches?.[0]?.clientY;
    };
    const onLeave = () => { mouse.active = false; };

    // Also track scroll position to clear fog along scroll
    const onScroll = () => {
      const sy = window.scrollY;
      mouse.active = true;
      // Center wipe where user is scrolled to
      mouse.x = width / 2;
      mouse.y = sy + height / 2;
      mouse.radius = 200; // Bigger wipe on scroll
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll);

    // ---- Render loop ----
    const render = () => {
      // Step 1: Slowly re-freeze the fog (medium rate)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(253, 246, 249, 0.007)'; // Medium refreeze rate
      ctx.fillRect(0, 0, width, height);

      // Step 2: Raindrops on the glass (drawn BEFORE wipe so wipe erases them)
      drops.forEach(d => {
        d.update();
        d.draw(ctx);
      });

      // Step 3: Wipe fog where mouse is (clear hole)
      if (mouse.active) {
        ctx.globalCompositeOperation = 'destination-out';
        const wipe = ctx.createRadialGradient(
          mouse.x, mouse.y, mouse.radius * 0.05,
          mouse.x, mouse.y, mouse.radius
        );
        wipe.addColorStop(0,   'rgba(0,0,0,0.18)'); // Strong clear at center
        wipe.addColorStop(0.5, 'rgba(0,0,0,0.06)');
        wipe.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = wipe;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      // Reset composite
      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // ---- Text animation helper ----
  const textStyle = (delay, extra = {}) => ({
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontWeight: '400',
    fontSize:   'clamp(2.2rem, 4.5vw, 4.2rem)',
    color:      '#2c2417',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 1.4s ease ${delay}s, transform 1.4s ease ${delay}s`,
    display:    'block',
    userSelect: 'none',
    ...extra,
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#FDF6F9', // Match main app blush pink completely
      overflow: 'hidden',
    }}>

      {/* ---- Soft blurred gradient blob (like their tulip) ---- */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width:  '60vmin',
        height: '80vmin',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'radial-gradient(ellipse at center, rgba(210,175,155,0.6) 0%, rgba(195,160,140,0.3) 45%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* ---- Editorial staggered text ---- */}
      <div style={{
        position: 'absolute',
        zIndex: 2,
        bottom: '28%',
        left: 0,
        padding: '0 6vw',
      }}>
        <span style={textStyle(0.3)}>Sometimes what you need</span>
        <span style={textStyle(0.9, { paddingLeft: '10vw', color: '#4a3728' })}>
          isn&apos;t a tutorial.
        </span>
        <span style={textStyle(1.5)}>It&apos;s not the algorithm.</span>
        <span style={textStyle(2.1, { paddingLeft: '8vw', color: '#6b4c36' })}>
          It&apos;s not the solution.
        </span>
        <span style={textStyle(2.9)}>It&apos;s the courage</span>
        <span style={textStyle(3.6, { paddingLeft: '14vw', color: '#4a3728' })}>
          to build it yourself.
        </span>
      </div>

      {/* ---- Top-left label ---- */}
      <div style={{
        position: 'absolute',
        top: '2.5rem', left: '3rem',
        fontFamily: 'Georgia, serif',
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        color: '#9a7c65',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2s ease 0.3s',
        zIndex: 2,
        userSelect: 'none',
      }}>
        DSA × Game Dev — Day 01
      </div>

      {/* ---- Secondary tagline top right ---- */}
      <div style={{
        position: 'absolute',
        top: '2.5rem', right: '3rem',
        fontFamily: 'Georgia, serif',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: '#b09880',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        transition: 'opacity 2.5s ease 2s',
        zIndex: 2,
        userSelect: 'none',
      }}>
        100 Days
      </div>

      {/* ---- Thin horizontal rule — appears late ---- */}
      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: '6vw',
        width: visible ? '88vw' : '0vw',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(160,130,110,0.35), transparent)',
        transition: 'width 2s ease 4s',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ---- Enter hint ---- */}
      <div
        onClick={onEnter}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          zIndex: 200, // Must be above fog canvas
          opacity: visible ? 1 : 0,
          transition: 'opacity 2.5s ease 5s',  // Appears very late — after all text
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#9a7c65',
        }}>
          Enter
        </span>
        <svg width="12" height="28" viewBox="0 0 12 28" fill="none"
          style={{ animation: 'bounce 2s ease-in-out infinite' }}>
          <line x1="6" y1="0" x2="6" y2="22" stroke="#9a7c65" strokeWidth="1"/>
          <polyline points="1,16 6,23 11,16" fill="none" stroke="#9a7c65" strokeWidth="1"/>
        </svg>
      </div>

      {/* ---- GLASS FOG CANVAS — on top of everything ---- */}
      {/* pointer-events: none so clicks pass through to the Enter button */}
      <canvas
        ref={canvasRef}
        style={{
          position:      'absolute',
          inset:         0,
          zIndex:        100,
          width:         '100%',
          height:        '100%',
          display:       'block',
          pointerEvents: 'none',
          // CSS blur makes the fog itself look soft, like condensation
          filter:        'blur(3px)',
        }}
      />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(7px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EditorialHero;
