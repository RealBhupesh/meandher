/**
 * Surprise Generator Screen
 * Random surprise ideas to delight your partner
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Animated as RNAnimated,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { SurpriseService, Surprise } from '../services/surpriseService';

const SurpriseGeneratorScreen = () => {
  const [currentSurprise, setCurrentSurprise] = useState<Surprise | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    category?: Surprise['category'];
    difficulty?: Surprise['difficulty'];
    cost?: Surprise['cost'];
  }>({});
  const [showFilters, setShowFilters] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  // Animation values
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const handleGenerateSurprise = () => {
    // Trigger animation
    scale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    rotate.value = withSequence(
      withTiming(360, { duration: 500 }),
      withTiming(0, { duration: 0 })
    );

    // Generate surprise
    const surprise = SurpriseService.getRandomSurprise();
    setCurrentSurprise(surprise);
    setGeneratedCount(prev => prev + 1);
  };

  const handleFilteredGenerate = () => {
    const surprises = SurpriseService.getFilteredSurprises(selectedFilters);
    if (surprises.length > 0) {
      const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
      setCurrentSurprise(randomSurprise);
      setGeneratedCount(prev => prev + 1);
    }
    setShowFilters(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'romantic': return colors.primary.tulipRed;
      case 'thoughtful': return colors.primary.sharedPurple;
      case 'fun': return colors.primary.tulipYellow;
      case 'practical': return colors.primary.bBlue;
      case 'grand': return colors.primary.gayuPink;
      default: return colors.text.light.secondary;
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return colors.semantic.success;
      case 'low': return colors.primary.tulipYellow;
      case 'medium': return colors.primary.sharedPurple;
      case 'high': return colors.primary.tulipRed;
      default: return colors.text.light.secondary;
    }
  };

  const batmanWisdom = SurpriseService.getBatmanSurpriseWisdom();
  const randomWisdom = batmanWisdom[Math.floor(Math.random() * batmanWisdom.length)];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            🎁 Surprise Generator
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Random ideas to delight your partner
          </Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard} variant="pink">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{generatedCount}</Text>
              <Text variant="caption">Surprises Generated</Text>
            </View>
            <View style={styles.statItem}>
              <Animated.View style={animatedStyle}>
                <Text variant="h1">🎁</Text>
              </Animated.View>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">∞</Text>
              <Text variant="caption">Possibilities</Text>
            </View>
          </View>
        </Card>

        {/* Generate Button */}
        <View style={styles.generateContainer}>
          <Button
            title="✨ Generate Random Surprise"
            onPress={handleGenerateSurprise}
            variant="primary"
            style={styles.generateButton}
          />
          <Button
            title="🎯 Filter & Generate"
            onPress={() => setShowFilters(true)}
            variant="secondary"
            style={styles.filterButton}
          />
        </View>

        {/* Current Surprise */}
        {currentSurprise && (
          <Card style={styles.surpriseCard}>
            <View style={styles.surpriseHeader}>
              <Text variant="h1">{currentSurprise.icon}</Text>
              <View style={styles.categoryBadge}>
                <Text
                  variant="caption"
                  style={[styles.categoryText, { color: getCategoryColor(currentSurprise.category) }]}
                >
                  {currentSurprise.category.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text variant="h2" style={styles.surpriseTitle}>
              {currentSurprise.title}
            </Text>
            <Text variant="body" style={styles.surpriseDescription}>
              {currentSurprise.description}
            </Text>

            {/* Meta Info */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="cash-outline" size={20} color={getCostColor(currentSurprise.cost)} />
                <Text variant="bodySmall" style={{ color: getCostColor(currentSurprise.cost) }}>
                  {currentSurprise.cost.toUpperCase()}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={20} color={colors.text.light.secondary} />
                <Text variant="bodySmall">{currentSurprise.timeNeeded}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons
                  name={
                    currentSurprise.difficulty === 'easy' ? 'star-outline' :
                    currentSurprise.difficulty === 'medium' ? 'star-half-outline' :
                    'star'
                  }
                  size={20}
                  color={colors.text.light.secondary}
                />
                <Text variant="bodySmall">{currentSurprise.difficulty}</Text>
              </View>
            </View>

            {/* How To */}
            <Text variant="h3" style={styles.sectionTitle}>
              📋 How To Do It
            </Text>
            {currentSurprise.howTo.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text variant="body">
                  {index + 1}. {step}
                </Text>
              </View>
            ))}

            {/* Tips */}
            <Text variant="h3" style={styles.sectionTitle}>
              💡 Pro Tips
            </Text>
            {currentSurprise.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text variant="body">• {tip}</Text>
              </View>
            ))}

            <Button
              title="Generate Another Surprise"
              onPress={handleGenerateSurprise}
              variant="secondary"
              style={styles.anotherButton}
            />
          </Card>
        )}

        {!currentSurprise && (
          <Card style={styles.emptyCard}>
            <Text variant="h1">🎁</Text>
            <Text variant="h3" style={styles.emptyTitle}>
              Ready to Surprise?
            </Text>
            <Text variant="body" style={styles.emptyText}>
              Click the button above to generate a random surprise idea!
            </Text>
          </Card>
        )}

        {/* Batman Wisdom */}
        <Card style={styles.batmanCard}>
          <Text variant="h2">🦇</Text>
          <Text variant="h3" style={styles.batmanTitle}>
            Batman's Surprise Wisdom
          </Text>
          <Text variant="body" style={styles.batmanText}>
            "{randomWisdom}"
          </Text>
        </Card>

        {/* Categories Quick Guide */}
        <Card style={styles.guideCard}>
          <Text variant="h3" style={styles.guideTitle}>
            Surprise Categories
          </Text>
          <View style={styles.categoryRow}>
            <View style={styles.categoryItem}>
              <Text variant="h2">💕</Text>
              <Text variant="caption">Romantic</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text variant="h2">🤗</Text>
              <Text variant="caption">Thoughtful</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text variant="h2">🎉</Text>
              <Text variant="caption">Fun</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text variant="h2">🔧</Text>
              <Text variant="caption">Practical</Text>
            </View>
            <View style={styles.categoryItem}>
              <Text variant="h2">✨</Text>
              <Text variant="caption">Grand</Text>
            </View>
          </View>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h2">🎯 Filter Surprises</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={28} color={colors.text.light.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text variant="h3" style={styles.filterSectionTitle}>
                Category
              </Text>
              <View style={styles.filterRow}>
                {(['romantic', 'thoughtful', 'fun', 'practical', 'grand'] as const).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterChip,
                      selectedFilters.category === category && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedFilters({
                        ...selectedFilters,
                        category: selectedFilters.category === category ? undefined : category,
                      })
                    }
                  >
                    <Text
                      variant="bodySmall"
                      color={
                        selectedFilters.category === category
                          ? colors.primary.sharedPurple
                          : colors.text.light.secondary
                      }
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text variant="h3" style={styles.filterSectionTitle}>
                Difficulty
              </Text>
              <View style={styles.filterRow}>
                {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.filterChip,
                      selectedFilters.difficulty === difficulty && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedFilters({
                        ...selectedFilters,
                        difficulty: selectedFilters.difficulty === difficulty ? undefined : difficulty,
                      })
                    }
                  >
                    <Text
                      variant="bodySmall"
                      color={
                        selectedFilters.difficulty === difficulty
                          ? colors.primary.sharedPurple
                          : colors.text.light.secondary
                      }
                    >
                      {difficulty}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text variant="h3" style={styles.filterSectionTitle}>
                Budget
              </Text>
              <View style={styles.filterRow}>
                {(['free', 'low', 'medium', 'high'] as const).map((cost) => (
                  <TouchableOpacity
                    key={cost}
                    style={[
                      styles.filterChip,
                      selectedFilters.cost === cost && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedFilters({
                        ...selectedFilters,
                        cost: selectedFilters.cost === cost ? undefined : cost,
                      })
                    }
                  >
                    <Text
                      variant="bodySmall"
                      color={
                        selectedFilters.cost === cost
                          ? colors.primary.sharedPurple
                          : colors.text.light.secondary
                      }
                    >
                      {cost.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalActions}>
                <Button
                  title="Clear Filters"
                  onPress={() => setSelectedFilters({})}
                  variant="ghost"
                  style={{ flex: 1 }}
                />
                <Button
                  title="Generate"
                  onPress={handleFilteredGenerate}
                  variant="primary"
                  style={{ flex: 1 }}
                />
              </View>
            </ScrollView>
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
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
    textAlign: 'center',
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  generateContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  generateButton: {
    marginBottom: spacing.sm,
  },
  filterButton: {},
  surpriseCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  surpriseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    backgroundColor: colors.primary.tulipWhite,
  },
  categoryText: {
    fontWeight: '600',
  },
  surpriseTitle: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.sm,
  },
  surpriseDescription: {
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  stepItem: {
    paddingVertical: spacing.xs,
  },
  tipItem: {
    paddingVertical: spacing.xs,
  },
  anotherButton: {
    marginTop: spacing.lg,
  },
  emptyCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    color: colors.primary.sharedPurple,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.light.secondary,
  },
  batmanCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.accent.batmanDark + '10',
  },
  batmanTitle: {
    color: colors.accent.batmanDark,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  batmanText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
  },
  guideCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  guideTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
    textAlign: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryItem: {
    alignItems: 'center',
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
  filterSectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  filterChipActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});

export default SurpriseGeneratorScreen;
