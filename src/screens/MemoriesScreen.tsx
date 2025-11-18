/**
 * Memories Screen
 * Our Love Story Timeline
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button, Input } from '../components';
import { VideoPlayer } from '../components/VideoPlayer';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { Memory } from '../types';

const MemoriesScreen = () => {
  const { memories, addMemory, toggleFavorite, deleteMemory } = useStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  // Add form state
  const [caption, setCaption] = useState('');
  const [mood, setMood] = useState<'loved-it' | 'happy' | 'emotional' | 'hilarious' | 'grateful'>('happy');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');

  const favoriteMemories = memories.filter((m) => m.favorite);
  const filteredMemories = filter === 'favorites' ? favoriteMemories : memories;

  const pickMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Please allow access to your media library');
      return;
    }

    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: mediaType === 'photo'
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: mediaType === 'photo',
      quality: 0.8,
      videoMaxDuration: 60, // 60 seconds max for videos
    });

    if (!result.canceled && result.assets) {
      const newMedia = result.assets.map((asset) => asset.uri);
      if (mediaType === 'photo') {
        setSelectedPhotos([...selectedPhotos, ...newMedia]);
      } else {
        setSelectedVideos([...selectedVideos, ...newMedia]);
      }
    }
  };

  const handleAddMemory = () => {
    const hasMedia = selectedPhotos.length > 0 || selectedVideos.length > 0;
    if (!caption && !hasMedia) {
      Alert.alert('Error', 'Please add a caption or media');
      return;
    }

    const newMemory: Memory = {
      id: Date.now().toString(),
      type: selectedVideos.length > 0 ? 'video' : 'photo',
      content: selectedVideos.length > 0 ? selectedVideos : selectedPhotos,
      caption,
      date: new Date(),
      mood,
      tags: [],
      likes: 0,
      favorite: false,
      createdBy: 'user-id',
      createdAt: new Date(),
    };

    addMemory(newMemory);
    setIsAddModalVisible(false);
    setCaption('');
    setSelectedPhotos([]);
    setSelectedVideos([]);
    setMediaType('photo');
    Alert.alert('Success', 'Memory saved! 💝');
  };

  const moodEmojis = {
    'loved-it': '😍',
    'happy': '😊',
    'emotional': '🥹',
    'hilarious': '😂',
    'grateful': '🤗',
  };

  const renderMemory = (memory: Memory) => (
    <Card key={memory.id} style={styles.memoryCard}>
      {/* Photos */}
      {memory.type === 'photo' && Array.isArray(memory.content) && memory.content.length > 0 && (
        <View style={styles.photoGrid}>
          {memory.content.slice(0, 3).map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photo}
              resizeMode="cover"
            />
          ))}
          {memory.content.length > 3 && (
            <View style={styles.morePhotos}>
              <Text variant="h3">+{memory.content.length - 3}</Text>
            </View>
          )}
        </View>
      )}

      {/* Videos */}
      {memory.type === 'video' && Array.isArray(memory.content) && memory.content.length > 0 && (
        <View style={styles.videoContainer}>
          <VideoPlayer uri={memory.content[0]} style={styles.video} />
          {memory.content.length > 1 && (
            <Text variant="caption" style={styles.videoCount}>
              +{memory.content.length - 1} more video{memory.content.length - 1 > 1 ? 's' : ''}
            </Text>
          )}
        </View>
      )}

      {/* Caption */}
      {memory.caption && (
        <Text variant="body" style={styles.caption}>
          {memory.caption}
        </Text>
      )}

      {/* Meta */}
      <View style={styles.memoryMeta}>
        <Text variant="caption">
          {new Date(memory.date).toLocaleDateString()}
          {memory.mood && ` • ${moodEmojis[memory.mood]}`}
        </Text>
        <View style={styles.memoryActions}>
          <TouchableOpacity onPress={() => toggleFavorite(memory.id)}>
            <Ionicons
              name={memory.favorite ? 'heart' : 'heart-outline'}
              size={20}
              color={memory.favorite ? colors.primary.tulipRed : colors.text.light.tertiary}
            />
          </TouchableOpacity>
          <Text variant="caption">{memory.likes}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>
          💝 Our Memories
        </Text>
        <Text variant="body" style={styles.subtitle}>
          "Every moment with you is a treasure"
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
        >
          <Text
            variant="bodySmall"
            color={filter === 'all' ? colors.primary.sharedPurple : colors.text.light.secondary}
          >
            All ({memories.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'favorites' && styles.filterTabActive]}
          onPress={() => setFilter('favorites')}
        >
          <Text
            variant="bodySmall"
            color={filter === 'favorites' ? colors.primary.sharedPurple : colors.text.light.secondary}
          >
            Favorites ❤️ ({favoriteMemories.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Card style={styles.statsCard} variant="pink">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{memories.length}</Text>
              <Text variant="caption">Memories</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{favoriteMemories.length}</Text>
              <Text variant="caption">Favorites</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">
                {memories.reduce((sum, m) => sum + m.likes, 0)}
              </Text>
              <Text variant="caption">Hearts</Text>
            </View>
          </View>
        </Card>

        {/* Timeline */}
        {filteredMemories.length > 0 ? (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              ✨ TIMELINE
            </Text>
            {filteredMemories.map(renderMemory)}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text variant="hero">💝</Text>
            <Text variant="h3" style={styles.emptyText}>
              {filter === 'favorites' ? 'No favorite memories yet!' : 'No memories yet!'}
            </Text>
            <Text variant="body" style={styles.emptySubtext}>
              Start capturing your beautiful moments
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="+ Create Memory"
          onPress={() => setIsAddModalVisible(true)}
          variant="primary"
        />
      </View>

      {/* Add Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text variant="h2">Create Memory</Text>
                <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                  <Ionicons name="close" size={28} color={colors.text.light.primary} />
                </TouchableOpacity>
              </View>

              {/* Media Type Selector */}
              <View style={styles.mediaTypeSelector}>
                <TouchableOpacity
                  style={[
                    styles.mediaTypeButton,
                    mediaType === 'photo' && styles.mediaTypeButtonActive,
                  ]}
                  onPress={() => setMediaType('photo')}
                >
                  <Ionicons
                    name="images"
                    size={20}
                    color={mediaType === 'photo' ? colors.primary.sharedPurple : colors.text.light.secondary}
                  />
                  <Text
                    variant="bodySmall"
                    color={mediaType === 'photo' ? colors.primary.sharedPurple : colors.text.light.secondary}
                  >
                    Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.mediaTypeButton,
                    mediaType === 'video' && styles.mediaTypeButtonActive,
                  ]}
                  onPress={() => setMediaType('video')}
                >
                  <Ionicons
                    name="videocam"
                    size={20}
                    color={mediaType === 'video' ? colors.primary.sharedPurple : colors.text.light.secondary}
                  />
                  <Text
                    variant="bodySmall"
                    color={mediaType === 'video' ? colors.primary.sharedPurple : colors.text.light.secondary}
                  >
                    Video
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Media Picker */}
              <TouchableOpacity style={styles.photoPicker} onPress={pickMedia}>
                {(selectedPhotos.length > 0 || selectedVideos.length > 0) ? (
                  <View style={styles.selectedPhotos}>
                    {mediaType === 'photo' && selectedPhotos.slice(0, 3).map((photo, index) => (
                      <Image
                        key={index}
                        source={{ uri: photo }}
                        style={styles.selectedPhoto}
                      />
                    ))}
                    {mediaType === 'video' && selectedVideos.slice(0, 1).map((video, index) => (
                      <View key={index} style={styles.selectedVideo}>
                        <Ionicons name="videocam" size={32} color={colors.primary.sharedPurple} />
                        <Text variant="caption">Video selected</Text>
                      </View>
                    ))}
                    {selectedPhotos.length > 3 && mediaType === 'photo' && (
                      <View style={styles.moreSelected}>
                        <Text variant="body">+{selectedPhotos.length - 3}</Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={styles.photoPickerEmpty}>
                    <Ionicons
                      name={mediaType === 'photo' ? 'images-outline' : 'videocam-outline'}
                      size={48}
                      color={colors.text.light.tertiary}
                    />
                    <Text variant="body" color={colors.text.light.secondary}>
                      Add {mediaType === 'photo' ? 'Photos' : 'Video'}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <Input
                label="Caption"
                value={caption}
                onChangeText={setCaption}
                placeholder="Tell the story of this moment..."
                multiline
                numberOfLines={4}
                style={{ height: 100 }}
              />

              {/* Mood Selector */}
              <Text variant="bodySmall" style={styles.label}>
                How did you feel?
              </Text>
              <View style={styles.moodSelector}>
                {(Object.keys(moodEmojis) as Array<keyof typeof moodEmojis>).map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[
                      styles.moodButton,
                      mood === m && styles.moodButtonActive,
                    ]}
                    onPress={() => setMood(m)}
                  >
                    <Text variant="h2">{moodEmojis[m]}</Text>
                    <Text variant="caption">
                      {m.split('-').join(' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalActions}>
                <Button
                  title="Cancel"
                  onPress={() => setIsAddModalVisible(false)}
                  variant="ghost"
                  style={{ flex: 1 }}
                />
                <Button
                  title="Save Memory"
                  onPress={handleAddMemory}
                  variant="primary"
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.primary.tulipRed,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.cardLight,
  },
  filterTabActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderWidth: 1,
    borderColor: colors.primary.sharedPurple,
  },
  content: {
    flex: 1,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  memoryCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  morePhotos: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.text.light.disabled,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    marginBottom: spacing.md,
  },
  memoryMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memoryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.light.secondary,
  },
  emptySubtext: {
    marginTop: spacing.xs,
    color: colors.text.light.tertiary,
  },
  addButtonContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.light,
    borderTopWidth: 1,
    borderTopColor: colors.text.light.disabled,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.cardLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  photoPicker: {
    marginBottom: spacing.md,
  },
  photoPickerEmpty: {
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.text.light.disabled,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.light,
  },
  selectedPhotos: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  selectedPhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  moreSelected: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.text.light.disabled,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  moodSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  moodButton: {
    width: 60,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  moodButtonActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  mediaTypeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  mediaTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  mediaTypeButtonActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  videoContainer: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  videoCount: {
    marginTop: spacing.xs,
    color: colors.text.light.secondary,
  },
  selectedVideo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: colors.primary.tulipWhite,
    borderWidth: 2,
    borderColor: colors.primary.sharedPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MemoriesScreen;
