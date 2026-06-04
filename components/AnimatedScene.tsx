'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedScene() {
    const canvasRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2('#f5f0eb', 0.015);

        const sizes = {
            width: canvasRef.current.clientWidth,
            height: canvasRef.current.clientHeight,
        };

        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(0, 0, 12);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(sizes.width, sizes.height);
        renderer.setClearColor('#f5f0eb', 0);
        canvasRef.current.appendChild(renderer.domElement);

        // Warm ambient light
        const ambientLight = new THREE.AmbientLight('#f5f0eb', 0.8);
        scene.add(ambientLight);

        // Main point light — warm bronze
        const pointLight1 = new THREE.PointLight('#c4a882', 2, 30);
        pointLight1.position.set(5, 5, 10);
        scene.add(pointLight1);

        // Secondary light — soft cream
        const pointLight2 = new THREE.PointLight('#d4c5b0', 0.6, 20);
        pointLight2.position.set(-5, -3, 8);
        scene.add(pointLight2);

        // Main torus — dark elegant
        const torusGeometry = new THREE.TorusGeometry(3.2, 0.32, 48, 120);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: '#2a2a2a',
            emissive: '#1a1a1a',
            emissiveIntensity: 0.1,
            metalness: 0.85,
            roughness: 0.2,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide,
        });

        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.rotation.x = Math.PI / 2.7;
        scene.add(torus);

        // Secondary smaller torus ring — bronze accent
        const torus2Geometry = new THREE.TorusGeometry(4.5, 0.08, 32, 100);
        const torus2Material = new THREE.MeshStandardMaterial({
            color: '#8b7355',
            emissive: '#8b7355',
            emissiveIntensity: 0.2,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.35,
        });
        const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
        torus2.rotation.x = Math.PI / 2;
        scene.add(torus2);

        // Particles with warm tones
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 400;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const darkColor = new THREE.Color('#2a2a2a');
        const bronzeColor = new THREE.Color('#8b7355');
        const mutedColor = new THREE.Color('#c4b5a0');

        for (let i = 0; i < count * 3; i += 3) {
            const radius = 5 + Math.random() * 5;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 6;
            positions[i] = Math.cos(angle) * radius * (0.7 + Math.random() * 0.6);
            positions[i + 1] = height;
            positions[i + 2] = Math.sin(angle) * radius * (0.7 + Math.random() * 0.6);

            const rand = Math.random();
            const color = rand < 0.3 ? darkColor : rand < 0.6 ? bronzeColor : mutedColor;
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.NormalBlending,
        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        let frameId: number;
        const clock = new THREE.Clock();

        const resizeHandler = () => {
            if (!canvasRef.current) return;
            sizes.width = canvasRef.current.clientWidth;
            sizes.height = canvasRef.current.clientHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        };

        window.addEventListener('resize', resizeHandler);

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            torus.rotation.z = elapsed * 0.2;
            torus.rotation.x = Math.PI / 2.7 + Math.sin(elapsed * 0.5) * 0.15;
            torus2.rotation.z = -elapsed * 0.15;
            torus2.rotation.x = Math.PI / 2 + Math.cos(elapsed * 0.3) * 0.1;
            particles.rotation.y = elapsed * 0.06;
            pointLight1.position.x = Math.sin(elapsed * 0.7) * 6;
            pointLight1.position.y = Math.cos(elapsed * 0.5) * 4;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resizeHandler);
            renderer.dispose();
            torusGeometry.dispose();
            torusMaterial.dispose();
            torus2Geometry.dispose();
            torus2Material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            scene.clear();
            if (canvasRef.current) {
                canvasRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={canvasRef} className="hero-canvas" />;
}
