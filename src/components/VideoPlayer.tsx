/**
 * Video Player Component
 * Playback for video memories
 */

import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface VideoPlayerProps {
  uri: string;
  style?: any;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }

    setIsPlaying(!isPlaying);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
      videoRef.current?.setPositionAsync(0);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        useNativeControls={false}
      />
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlayPause}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
