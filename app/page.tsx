'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenes = [
    {
      character: 'husband',
      text: "If I accidentally marry again?",
      duration: 2500
    },
    {
      character: 'wife-pin',
      text: "Accidents happen once… after that it's the morgue.",
      duration: 3000
    },
    {
      character: 'husband-scared',
      text: "I was joking! I only love you!",
      duration: 2500
    },
    {
      character: 'wife-calm',
      text: "Yes… that's why you're still alive.",
      duration: 2500
    }
  ];

  const playBonkSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const startVideo = () => {
    setIsPlaying(true);
    setScene(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (scene < scenes.length) {
      if (scene === 1) {
        playBonkSound();
      }

      const timer = setTimeout(() => {
        if (scene < scenes.length - 1) {
          setScene(scene + 1);
        } else {
          setIsPlaying(false);
          setScene(0);
        }
      }, scenes[scene].duration);

      return () => clearTimeout(timer);
    }
  }, [scene, isPlaying]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <audio ref={audioRef}>
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AH98e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAACBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/" type="audio/wav" />
      </audio>

      {!isPlaying ? (
        <motion.button
          onClick={startVideo}
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '3px solid white',
            borderRadius: '50px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ▶ Play Video
        </motion.button>
      ) : (
        <div style={{
          width: '900px',
          height: '600px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Kitchen Background */}
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #ffd89b 0%, #ff9a9e 100%)',
            position: 'relative'
          }}>
            {/* Kitchen Counter */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              width: '100%',
              height: '150px',
              background: '#8B4513',
              borderTop: '5px solid #654321'
            }} />

            {/* Wall Tiles */}
            <div style={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '300px',
              backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 60px, #e0e0e0 60px, #e0e0e0 62px), repeating-linear-gradient(0deg, #fff 0px, #fff 60px, #e0e0e0 60px, #e0e0e0 62px)',
              opacity: 0.3
            }} />

            <AnimatePresence mode="wait">
              {isPlaying && (
                <motion.div
                  key={scene}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    position: 'relative'
                  }}
                >
                  {/* Husband Character */}
                  {(scenes[scene].character.includes('husband')) && (
                    <motion.div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        scale: scenes[scene].character === 'husband-scared' ? [1, 0.95, 1, 0.95, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Husband Face */}
                      <div style={{
                        width: '150px',
                        height: '180px',
                        background: '#FFD7BA',
                        borderRadius: '50% 50% 45% 45%',
                        position: 'relative',
                        border: '4px solid #333'
                      }}>
                        {/* Eyes */}
                        <div style={{
                          position: 'absolute',
                          top: '50px',
                          left: '30px',
                          width: scenes[scene].character === 'husband-scared' ? '20px' : '15px',
                          height: scenes[scene].character === 'husband-scared' ? '25px' : '15px',
                          background: scenes[scene].character === 'husband-scared' ? 'white' : '#333',
                          borderRadius: '50%',
                          border: scenes[scene].character === 'husband-scared' ? '3px solid #333' : 'none'
                        }}>
                          {scenes[scene].character === 'husband-scared' && (
                            <div style={{
                              position: 'absolute',
                              width: '8px',
                              height: '8px',
                              background: '#333',
                              borderRadius: '50%',
                              top: '6px',
                              left: '4px'
                            }} />
                          )}
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '50px',
                          right: '30px',
                          width: scenes[scene].character === 'husband-scared' ? '20px' : '15px',
                          height: scenes[scene].character === 'husband-scared' ? '25px' : '15px',
                          background: scenes[scene].character === 'husband-scared' ? 'white' : '#333',
                          borderRadius: '50%',
                          border: scenes[scene].character === 'husband-scared' ? '3px solid #333' : 'none'
                        }}>
                          {scenes[scene].character === 'husband-scared' && (
                            <div style={{
                              position: 'absolute',
                              width: '8px',
                              height: '8px',
                              background: '#333',
                              borderRadius: '50%',
                              top: '6px',
                              right: '4px'
                            }} />
                          )}
                        </div>

                        {/* Mouth */}
                        <div style={{
                          position: 'absolute',
                          bottom: '40px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: scenes[scene].character === 'husband-scared' ? '40px' : '50px',
                          height: scenes[scene].character === 'husband-scared' ? '30px' : '20px',
                          border: '4px solid #333',
                          borderTop: scenes[scene].character === 'husband-scared' ? '4px solid #333' : 'none',
                          borderRadius: scenes[scene].character === 'husband-scared' ? '50%' : '0 0 50% 50%',
                          background: scenes[scene].character === 'husband-scared' ? 'transparent' : '#333'
                        }} />

                        {/* Sweat drops when scared */}
                        {scenes[scene].character === 'husband-scared' && (
                          <>
                            <motion.div
                              style={{
                                position: 'absolute',
                                top: '30px',
                                right: '20px',
                                width: '15px',
                                height: '20px',
                                background: '#4FC3F7',
                                borderRadius: '50% 0 50% 50%',
                                transform: 'rotate(-45deg)'
                              }}
                              animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            <motion.div
                              style={{
                                position: 'absolute',
                                top: '40px',
                                left: '15px',
                                width: '12px',
                                height: '16px',
                                background: '#4FC3F7',
                                borderRadius: '50% 0 50% 50%',
                                transform: 'rotate(-45deg)'
                              }}
                              animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                            />
                          </>
                        )}

                        {/* Hearts when saying "I only love you" */}
                        {scenes[scene].character === 'husband-scared' && (
                          <>
                            <motion.div
                              style={{
                                position: 'absolute',
                                top: '-30px',
                                left: '20px',
                                fontSize: '30px'
                              }}
                              animate={{ y: [-10, -30, -10], opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              ❤️
                            </motion.div>
                            <motion.div
                              style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '20px',
                                fontSize: '25px'
                              }}
                              animate={{ y: [-10, -25, -10], opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                            >
                              ❤️
                            </motion.div>
                          </>
                        )}
                      </div>

                      {/* Husband Body */}
                      <div style={{
                        width: '140px',
                        height: '160px',
                        background: '#4A90E2',
                        borderRadius: '20px 20px 30px 30px',
                        marginTop: '-10px',
                        border: '4px solid #333'
                      }} />
                    </motion.div>
                  )}

                  {/* Wife Character */}
                  {(scenes[scene].character.includes('wife')) && (
                    <motion.div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                      }}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Wife Face */}
                      <div style={{
                        width: '150px',
                        height: '180px',
                        background: '#FFCBA4',
                        borderRadius: '50% 50% 45% 45%',
                        position: 'relative',
                        border: '4px solid #333'
                      }}>
                        {/* Hair */}
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '-10px',
                          right: '-10px',
                          height: '100px',
                          background: '#4A2C2A',
                          borderRadius: '50% 50% 0 0',
                          border: '4px solid #333'
                        }} />

                        {/* Eyes */}
                        <div style={{
                          position: 'absolute',
                          top: '60px',
                          left: '30px',
                          width: scenes[scene].character === 'wife-pin' ? '8px' : '15px',
                          height: scenes[scene].character === 'wife-pin' ? '3px' : '15px',
                          background: '#333',
                          borderRadius: scenes[scene].character === 'wife-pin' ? '0' : '50%'
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '60px',
                          right: '30px',
                          width: scenes[scene].character === 'wife-pin' ? '8px' : '15px',
                          height: scenes[scene].character === 'wife-pin' ? '3px' : '15px',
                          background: '#333',
                          borderRadius: scenes[scene].character === 'wife-pin' ? '0' : '50%'
                        }} />

                        {/* Mouth */}
                        <div style={{
                          position: 'absolute',
                          bottom: '40px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '30px',
                          height: '15px',
                          border: '4px solid #333',
                          borderTop: 'none',
                          borderRadius: scenes[scene].character === 'wife-calm' ? '0 0 50% 50%' : '50% 50% 0 0',
                          background: scenes[scene].character === 'wife-calm' ? 'transparent' : '#333'
                        }} />
                      </div>

                      {/* Wife Body */}
                      <div style={{
                        width: '140px',
                        height: '160px',
                        background: '#E91E63',
                        borderRadius: '20px 20px 30px 30px',
                        marginTop: '-10px',
                        border: '4px solid #333',
                        position: 'relative'
                      }} />

                      {/* Rolling Pin */}
                      {scenes[scene].character === 'wife-pin' && (
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: '100px',
                            right: '-80px',
                            display: 'flex',
                            alignItems: 'center',
                            transformOrigin: 'left center'
                          }}
                          initial={{ scale: 1, rotate: -45 }}
                          animate={{
                            scale: [1, 1.5, 1.3, 1.5, 1.3],
                            rotate: [-45, -20, -45, -20, -45]
                          }}
                          transition={{
                            duration: 0.6,
                            times: [0, 0.2, 0.4, 0.6, 1]
                          }}
                        >
                          {/* Handle */}
                          <div style={{
                            width: '60px',
                            height: '15px',
                            background: '#8B4513',
                            borderRadius: '10px',
                            border: '3px solid #333'
                          }} />
                          {/* Roller */}
                          <div style={{
                            width: '120px',
                            height: '35px',
                            background: '#D2691E',
                            borderRadius: '20px',
                            border: '3px solid #333',
                            marginLeft: '-5px'
                          }} />
                          {/* Handle */}
                          <div style={{
                            width: '60px',
                            height: '15px',
                            background: '#8B4513',
                            borderRadius: '10px',
                            border: '3px solid #333',
                            marginLeft: '-5px'
                          }} />

                          {/* Impact effects */}
                          <motion.div
                            style={{
                              position: 'absolute',
                              fontSize: '40px',
                              top: '-30px',
                              left: '80px'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                            transition={{ duration: 0.6 }}
                          >
                            💥
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Dialog Box */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'white',
                      padding: '20px 30px',
                      borderRadius: '20px',
                      border: '4px solid #333',
                      maxWidth: '700px',
                      textAlign: 'center',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                    }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#333',
                      lineHeight: '1.4'
                    }}>
                      {scenes[scene].text}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
