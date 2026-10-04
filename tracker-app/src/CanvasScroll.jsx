import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 103;

const CanvasScroll = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;
    
    const images = [];
    let imagesLoaded = 0;
    
    // Preload images
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(3, '0');
      img.src = `/frames/${indexStr}.png`;
      img.onload = () => {
        imagesLoaded++;
      };
      images.push(img);
    }
    
    let currentFrame = 0;
    let animationFrameId;
    let lastTime = 0;
    const fps = 60; // 60 frames per second
    const interval = 1000 / fps;

    const playAnimation = (time) => {
      if (imagesLoaded < FRAME_COUNT) {
        animationFrameId = requestAnimationFrame(playAnimation);
        return;
      }

      const deltaTime = time - lastTime;
      if (deltaTime >= interval) {
        if (images[currentFrame] && images[currentFrame].complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
        }
        
        currentFrame = (currentFrame + 1) % FRAME_COUNT; // Loop
        lastTime = time - (deltaTime % interval);
      }

      animationFrameId = requestAnimationFrame(playAnimation);
    };

    animationFrameId = requestAnimationFrame(playAnimation);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1, // Places it strictly in the background behind everything
      background: '#000', 
      overflow: 'hidden' 
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      {/* Slight dark tint to keep the animation visible but text readable */}
      <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.45)', // Slight slate tint
          pointerEvents: 'none'
      }} />
    </div>
  );
};

export default CanvasScroll;
