'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animFrameId: number;

    try {
      // Scene
      const scene = new THREE.Scene();

      // Camera
      const width = container.clientWidth || 360;
      const height = container.clientHeight || 360;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      // WebGL Renderer with alpha transparency and antialiasing
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Group holding the 3D sculpture
      const group = new THREE.Group();
      scene.add(group);

      // Materials: Antique Gold & Terracotta Henna
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.85,
        roughness: 0.25,
      });

      const hennaMaterial = new THREE.MeshStandardMaterial({
        color: 0x8f3d30,
        metalness: 0.35,
        roughness: 0.45,
      });

      const bronzeMaterial = new THREE.MeshStandardMaterial({
        color: 0xb35d4d,
        metalness: 0.5,
        roughness: 0.35,
      });

      // 1. Sculptural Henna Cone
      const coneGeo = new THREE.ConeGeometry(0.7, 3.2, 32);
      const coneMesh = new THREE.Mesh(coneGeo, hennaMaterial);
      coneMesh.rotation.z = Math.PI / 4;
      coneMesh.position.set(0, 0.2, 0);
      group.add(coneMesh);

      // Henna Cone Gold Tip & Band
      const tipGeo = new THREE.ConeGeometry(0.25, 0.8, 24);
      const tipMesh = new THREE.Mesh(tipGeo, goldMaterial);
      tipMesh.position.set(0, 1.25, 0);
      tipMesh.rotation.z = Math.PI / 4;
      group.add(tipMesh);

      // 2. Concentric Sacred Mandala Rings
      const ring1Geo = new THREE.TorusGeometry(2.2, 0.04, 16, 64);
      const ring1 = new THREE.Mesh(ring1Geo, goldMaterial);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(1.6, 0.03, 16, 48);
      const ring2 = new THREE.Mesh(ring2Geo, bronzeMaterial);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      // 3. Floating Lotus Petals around the Mandala
      const petalGeo = new THREE.SphereGeometry(0.28, 16, 16);
      petalGeo.scale(1, 2.2, 0.2); // Elongate into petal form
      const petalCount = 8;
      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const petal = new THREE.Mesh(petalGeo, goldMaterial);
        petal.position.set(Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0);
        petal.rotation.z = angle + Math.PI / 2;
        group.add(petal);
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.8);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xfff0d0, 2.5);
      dirLight1.position.set(5, 5, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xc5a059, 1.5);
      dirLight2.position.set(-5, -3, 3);
      scene.add(dirLight2);

      // Pointer interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 0.8;
        targetY = y * 0.8;
      };

      window.addEventListener('mousemove', handlePointerMove);

      // Resize handler
      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Animation loop
      let clock = new THREE.Clock();
      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation
        group.rotation.y = elapsedTime * 0.35 + mouseX;
        group.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + mouseY;
        group.rotation.z = Math.cos(elapsedTime * 0.3) * 0.08;

        // Smooth mouse damping
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        renderer?.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && container) {
          container.innerHTML = '';
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn('WebGL init failed, falling back to static 2D motif:', e);
      setHasWebGL(false);
    }
  }, [prefersReducedMotion]);

  // Graceful fallback if WebGL is disabled or reduced motion is preferred
  if (prefersReducedMotion || !hasWebGL) {
    return (
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center select-none pointer-events-none">
        <svg
          className="w-full h-full text-[#C5A059] opacity-90 drop-shadow-lg"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric layered mandala ornament */}
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="80" stroke="#B35D4D" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" stroke="#8F3D30" strokeWidth="2" />
          <circle cx="100" cy="100" r="10" fill="#C5A059" />
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <path
              key={idx}
              d="M100 20 C112 50, 112 70, 100 80 C88 70, 88 50, 100 20 Z"
              fill="#B35D4D"
              fillOpacity="0.4"
              stroke="#C5A059"
              strokeWidth="1"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
          {/* Central Henna Cone Motif */}
          <path
            d="M95 140 L105 140 L100 65 Z"
            fill="#8F3D30"
            stroke="#C5A059"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 pointer-events-none drop-shadow-xl"
      aria-label="Interactive 3D Mehndi sculptural motif"
      role="img"
    />
  );
}

