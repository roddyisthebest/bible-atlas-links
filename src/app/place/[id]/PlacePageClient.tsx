"use client";

import { PlaceDetail } from "./types";
import Image from "next/image";
import { useKakaoAppLink } from "@/hooks/useKakaoAppLink";
import { Download } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

export default function PlacePageClient({ place, lang }: { place: PlaceDetail; lang?: string }) {
  useKakaoAppLink(place.id);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Enhanced spring animations
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-25, 25]), springConfig);
  const scale = useSpring(1, springConfig);
  
  // Floating animation
  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      floatY.set(Math.sin(Date.now() * 0.001) * 10);
      floatRotate.set(Math.sin(Date.now() * 0.0008) * 2);
    }, 16);
    return () => clearInterval(interval);
  }, [floatY, floatRotate]);

  const imageUrl = `https://a.openbible.info/geo/images/512/${place.imageTitle}`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) * 1.2);
    y.set((event.clientY - centerY) * 1.2);
    scale.set(1.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        ref={ref}
        className="relative"
        style={{ 
          perspective: 1200,
          y: floatY,
          rotate: floatRotate,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <motion.div
          className="relative bg-white rounded-3xl shadow-xl max-w-sm w-full overflow-hidden border border-gray-100"
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ 
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={place.name}
              fill
              sizes="400px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center space-y-4">
              <motion.h1 
                className="text-2xl font-bold text-gray-900"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {place.name}
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {place.koreanName}
              </motion.p>
              
              <motion.div 
                className="pt-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.a
                  href="https://apps.apple.com/kr/app/%EB%B0%94%EC%9D%B4%EB%B8%94-%EC%95%84%ED%8B%80%EB%9D%BC%EC%8A%A4/id6755648201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg text-white"
                  style={{ backgroundColor: '#8358FF' }}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: '0 25px 50px rgba(131, 88, 255, 0.4)',
                    y: -5,
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    y: 0,
                  }}
                  animate={{
                    boxShadow: [
                      '0 10px 30px rgba(131, 88, 255, 0.2)',
                      '0 15px 40px rgba(131, 88, 255, 0.3)',
                      '0 10px 30px rgba(131, 88, 255, 0.2)',
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Download className="h-4 w-4" />
                  </motion.div>
                  {lang === 'ko' ? 'App Store에서 다운로드' : 'Download on App Store'}
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced 3D Shadow */}
        <motion.div 
          className="absolute inset-0 bg-black/8 rounded-3xl -z-10 blur-sm"
          style={{
            x: useTransform(rotateY, [-25, 25], [-8, 8]),
            y: useTransform(rotateX, [-25, 25], [8, -8]),
            scale: useTransform(scale, [1, 1.1], [0.98, 1.02]),
          }}
        />
      </motion.div>
    </div>
  );
}