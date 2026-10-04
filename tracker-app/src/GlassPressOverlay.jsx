import React, { useEffect, useRef } from 'react';

const GlassPressOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, animationId;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: -999, y: -999, active: false };
    let ripples = [];
    let trail = [];

    const handleMove = (e) => {
      mouse.active = true;
      mouse.x = e.clientX ?? e.touches?.[0]?.clientX;
      mouse.y = e.clientY ?? e.touches?.[0]?.clientY;
      
      // Add to trail for the "moving water layer"
      trail.push({ x: mouse.x, y: mouse.y, life: 1.0 });
    };

    const handleClick = (e) => {
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      const cy = e.clientY ?? e.touches?.[0]?.clientY;
      ripples.push({ x: cx, y: cy, radius: 10, life: 1.0 });
    };

    const handleLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('touchstart', handleClick);
    window.addEventListener('mouseleave', handleLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw wet trail (moving water layer)
      ctx.globalCompositeOperation = 'source-over';
      for (let i = trail.length - 1; i >= 0; i--) {
        let t = trail[i];
        t.life -= 0.02; // Trail fades out
        
        if (t.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const smudge = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 40);
        // Subtle water smudge effect
        smudge.addColorStop(0, `rgba(255, 255, 255, ${0.1 * t.life})`);
        smudge.addColorStop(0.5, `rgba(180, 150, 160, ${0.05 * t.life})`);
        smudge.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = smudge;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw active water pool at cursor
      if (mouse.active) {
        const pool = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, 60);
        pool.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        pool.addColorStop(0.6, 'rgba(200, 150, 170, 0.1)');
        pool.addColorStop(0.9, 'rgba(0, 0, 0, 0.05)'); // dark refraction edge
        pool.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = pool;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw expanding ripples on click
      for (let i = ripples.length - 1; i >= 0; i--) {
        let r = ripples[i];
        r.radius += 3; // Expand
        r.life -= 0.025; // Fade out
        
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * r.life})`;
        ctx.lineWidth = 2 * r.life;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius - 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(150, 100, 120, ${0.15 * r.life})`;
        ctx.lineWidth = 4 * r.life;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleClick);
      window.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'block',
        filter: 'blur(1.2px)' // Makes the water feel integrated and soft
      }}
    />
  );
};

export default GlassPressOverlay;
