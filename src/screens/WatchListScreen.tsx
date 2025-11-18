/**
 * Watch List Screen
 * Movie nights, planned
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button, Input } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { WatchItem } from '../types';

const WatchListScreen = () => {
  const { watchList, addWatchItem, markAsWatched, deleteWatchItem } = useStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WatchItem | null>(null);

  // Add form state
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'movie' | 'series' | 'documentary'>('movie');
  const [genre, setGenre] = useState('');

  // Rating state
  const [gayuRating, setGayuRating] = useState(0);
  const [bRating, setBRating] = useState(0);

  const upNext = watchList.filter((item) => !item.watched).slice(0, 3);
  const toWatch = watchList.filter((item) => !item.watched);
  const watched = watchList.filter((item) => item.watched);

  const handleAddItem = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    const newItem: WatchItem = {
      id: Date.now().toString(),
      title,
      type,
      poster: '',
      genre: genre.split(',').map((g) => g.trim()),
      duration: 120,
      addedBy: 'user-id',
      watched: false,
    };

    addWatchItem(newItem);
    setIsAddModalVisible(false);
    setTitle('');
    setGenre('');
    Alert.alert('Success', 'Added to watch list! 🎬');
  };

  const handleMarkWatched = (item: WatchItem) => {
    setSelectedItem(item);
    setIsRatingModalVisible(true);
  };

  const handleSaveRating = () => {
    if (!selectedItem) return;

    markAsWatched(selectedItem.id, {
      gayu: gayuRating,
      b: bRating,
    });

    setIsRatingModalVisible(false);
    setSelectedItem(null);
    setGayuRating(0);
    setBRating(0);
    Alert.alert('Awesome!', 'Added to watched list! 🌷');
  };

  const renderStarRating = (rating: number, setRating: (rating: number) => void) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={colors.primary.tulipYellow}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderWatchItem = (item: WatchItem, watched: boolean = false) => (
    <Card key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemLeft}>
          <Ionicons
            name="film"
            size={32}
            color={colors.primary.bBlue}
          />
          <View style={styles.itemContent}>
            <Text variant="h3">{item.title}</Text>
            <Text variant="caption">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.genre.join(', ')}
            </Text>
            {watched && item.ratings && (
              <View style={styles.ratings}>
                <Text variant="bodySmall">
                  👧 Gayu: {'⭐'.repeat(item.ratings.gayu || 0)} •{' '}
                  👦 B: {'⭐'.repeat(item.ratings.b || 0)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {!watched ? (
        <View style={styles.itemActions}>
          <Button
            title="✓ Watched"
            onPress={() => handleMarkWatched(item)}
            variant="secondary"
            size="small"
          />
          <TouchableOpacity onPress={() => deleteWatchItem(item.id)}>
            <Ionicons name="trash-outline" size={20} color={colors.semantic.error} />
          </TouchableOpacity>
        </View>
      ) : (
        <Text variant="caption" color={colors.semantic.success}>
          Watched on {item.watchedAt ? new Date(item.watchedAt).toLocaleDateString() : ''}
        </Text>
      )}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>
            🎬 Our Watch List
          </Text>
          <Text variant="body" style={styles.subtitle}>
            "Movies are better together" 🍿
          </Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard} variant="purple">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{toWatch.length}</Text>
              <Text variant="caption">To Watch</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{watched.length}</Text>
              <Text variant="caption">Watched</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">
                {watched.length > 0 ? Math.round((watched.reduce((acc, item) => {
                  const avgRating = ((item.ratings?.gayu || 0) + (item.ratings?.b || 0)) / 2;
                  return acc + avgRating;
                }, 0) / watched.length) * 10) / 10 : 0}
              </Text>
              <Text variant="caption">Avg Rating</Text>
            </View>
          </View>
        </Card>

        {/* Up Next */}
        {upNext.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              🔥 UP NEXT ({upNext.length})
            </Text>
            {upNext.map((item) => renderWatchItem(item))}
          </>
        )}

        {/* To Watch */}
        {toWatch.length > upNext.length && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              🍿 TO WATCH ({toWatch.length - upNext.length})
            </Text>
            {toWatch.slice(3).map((item) => renderWatchItem(item))}
          </>
        )}

        {/* Watched */}
        {watched.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              ✅ WATCHED TOGETHER ({watched.length})
            </Text>
            {watched.map((item) => renderWatchItem(item, true))}
          </>
        )}

        {/* Empty State */}
        {watchList.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="hero">🎬</Text>
            <Text variant="h3" style={styles.emptyText}>
              No movies yet!
            </Text>
            <Text variant="body" style={styles.emptySubtext}>
              Start adding movies to watch together
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="+ Add Movie/Show"
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h2">Add to Watch List</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text.light.primary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Title *"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter movie or show title"
            />

            <Text variant="bodySmall" style={styles.label}>
              Type:
            </Text>
            <View style={styles.typeSelector}>
              {['movie', 'series', 'documentary'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.typeButton,
                    type === t && styles.typeButtonActive,
                  ]}
                  onPress={() => setType(t as any)}
                >
                  <Text
                    variant="body"
                    color={type === t ? colors.primary.sharedPurple : colors.text.light.secondary}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label="Genre (comma separated)"
              value={genre}
              onChangeText={setGenre}
              placeholder="Action, Comedy, Romance"
            />

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setIsAddModalVisible(false)}
                variant="ghost"
                style={{ flex: 1 }}
              />
              <Button
                title="Add to List"
                onPress={handleAddItem}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal
        visible={isRatingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsRatingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h2">How was it?</Text>
              <TouchableOpacity onPress={() => setIsRatingModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text.light.primary} />
              </TouchableOpacity>
            </View>

            <Text variant="h3" style={styles.movieTitle}>
              {selectedItem?.title}
            </Text>

            <Text variant="bodySmall" style={styles.ratingLabel}>
              👧 Gayu's Rating:
            </Text>
            {renderStarRating(gayuRating, setGayuRating)}

            <Text variant="bodySmall" style={styles.ratingLabel}>
              👦 B's Rating:
            </Text>
            {renderStarRating(bRating, setBRating)}

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setIsRatingModalVisible(false)}
                variant="ghost"
                style={{ flex: 1 }}
              />
              <Button
                title="Save"
                onPress={handleSaveRating}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
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
  content: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.primary.bBlue,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  itemCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  itemHeader: {
    marginBottom: spacing.md,
  },
  itemLeft: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  ratings: {
    marginTop: spacing.xs,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.cardLight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  typeButtonActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  movieTitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.primary.tulipRed,
  },
  ratingLabel: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  star: {
    marginHorizontal: spacing.xs,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});

export default WatchListScreen;
