/**
 * Date Suggestions Screen
 * AI-powered date ideas personalized for your relationship
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { DateSuggestionService, DateSuggestion } from '../services/dateSuggestionService';

const DateSuggestionsScreen = () => {
  const { tasks, dreams, memories, watchList, couple } = useStore();
  const [selectedMood, setSelectedMood] = useState<'any' | 'romantic' | 'adventurous' | 'relaxing'>('any');
  const [selectedBudget, setSelectedBudget] = useState<'any' | 'free' | 'low' | 'medium' | 'high'>('any');
  const [selectedSuggestion, setSelectedSuggestion] = useState<DateSuggestion | null>(null);

  // Calculate relationship months
  const relationshipMonths = useMemo(() => {
    if (!couple?.relationshipStart) return 1;
    const start = new Date(couple.relationshipStart);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  }, [couple]);

  // Generate suggestions
  const suggestions = useMemo(() => {
    return DateSuggestionService.generateSuggestions({
      tasks,
      dreams,
      memories,
      watchList,
      relationshipMonths,
      budget: selectedBudget,
      mood: selectedMood,
    });
  }, [tasks, dreams, memories, watchList, relationshipMonths, selectedBudget, selectedMood]);

  const batmanWisdom = DateSuggestionService.getBatmanWisdom();
  const randomWisdom = batmanWisdom[Math.floor(Math.random() * batmanWisdom.length)];

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return colors.semantic.success;
      case 'low': return colors.primary.tulipYellow;
      case 'medium': return colors.primary.sharedPurple;
      case 'high': return colors.primary.tulipRed;
      default: return colors.text.light.secondary;
    }
  };

  const renderSuggestionCard = (suggestion: DateSuggestion) => (
    <TouchableOpacity
      key={suggestion.id}
      onPress={() => setSelectedSuggestion(suggestion)}
      activeOpacity={0.7}
    >
      <Card style={styles.suggestionCard}>
        <View style={styles.suggestionHeader}>
          <Text variant="h1">{suggestion.icon}</Text>
          <View style={styles.suggestionInfo}>
            <Text variant="h3" style={styles.suggestionTitle}>
              {suggestion.title}
            </Text>
            <Text variant="bodySmall" numberOfLines={2}>
              {suggestion.description}
            </Text>
          </View>
        </View>

        <View style={styles.suggestionMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="cash-outline" size={16} color={getCostColor(suggestion.estimatedCost)} />
            <Text variant="caption" style={{ color: getCostColor(suggestion.estimatedCost) }}>
              {suggestion.estimatedCost.toUpperCase()}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={colors.text.light.secondary} />
            <Text variant="caption">{suggestion.estimatedDuration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name={
                suggestion.difficulty === 'easy' ? 'star-outline' :
                suggestion.difficulty === 'medium' ? 'star-half-outline' :
                'star'
              }
              size={16}
              color={colors.text.light.secondary}
            />
            <Text variant="caption">{suggestion.difficulty}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            💡 Date Ideas
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Personalized suggestions just for you two
          </Text>
        </View>

        {/* Filters */}
        <Card style={styles.filterCard}>
          <Text variant="h3" style={styles.filterTitle}>
            Filter by Mood
          </Text>
          <View style={styles.filterRow}>
            {['any', 'romantic', 'adventurous', 'relaxing'].map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.filterButton,
                  selectedMood === mood && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedMood(mood as any)}
              >
                <Text
                  variant="bodySmall"
                  color={selectedMood === mood ? colors.primary.sharedPurple : colors.text.light.secondary}
                >
                  {mood === 'any' ? '✨ Any' :
                   mood === 'romantic' ? '💕 Romantic' :
                   mood === 'adventurous' ? '🚀 Adventurous' :
                   '😌 Relaxing'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text variant="h3" style={[styles.filterTitle, { marginTop: spacing.md }]}>
            Filter by Budget
          </Text>
          <View style={styles.filterRow}>
            {['any', 'free', 'low', 'medium', 'high'].map((budget) => (
              <TouchableOpacity
                key={budget}
                style={[
                  styles.filterButton,
                  selectedBudget === budget && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedBudget(budget as any)}
              >
                <Text
                  variant="bodySmall"
                  color={selectedBudget === budget ? colors.primary.sharedPurple : colors.text.light.secondary}
                >
                  {budget === 'any' ? 'Any' : budget.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Stats */}
        <Card style={styles.statsCard} variant="purple">
          <Text variant="h3" style={styles.statsTitle}>
            Quick Stats
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{suggestions.length}</Text>
              <Text variant="caption">Suggestions</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{relationshipMonths}</Text>
              <Text variant="caption">Months Together</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{dreams.length}</Text>
              <Text variant="caption">Dreams</Text>
            </View>
          </View>
        </Card>

        {/* Suggestions */}
        <Text variant="h3" style={styles.sectionHeader}>
          ✨ RECOMMENDED FOR YOU
        </Text>
        {suggestions.map(renderSuggestionCard)}

        {/* Batman Wisdom */}
        <Card style={styles.batmanCard}>
          <Text variant="h2">🦇</Text>
          <Text variant="h3" style={styles.batmanTitle}>
            Batman's Dating Wisdom
          </Text>
          <Text variant="body" style={styles.batmanText}>
            "{randomWisdom}"
          </Text>
        </Card>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Detail Modal */}
      {selectedSuggestion && (
        <Modal
          visible={!!selectedSuggestion}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedSuggestion(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text variant="h1">{selectedSuggestion.icon}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedSuggestion(null)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={28} color={colors.text.light.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text variant="h2" style={styles.modalTitle}>
                  {selectedSuggestion.title}
                </Text>
                <Text variant="body" style={styles.modalDescription}>
                  {selectedSuggestion.description}
                </Text>

                <View style={styles.modalMetaRow}>
                  <View style={styles.modalMetaItem}>
                    <Ionicons name="cash" size={20} color={getCostColor(selectedSuggestion.estimatedCost)} />
                    <Text variant="bodySmall" style={{ color: getCostColor(selectedSuggestion.estimatedCost) }}>
                      {selectedSuggestion.estimatedCost.toUpperCase()} COST
                    </Text>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <Ionicons name="time" size={20} color={colors.primary.sharedPurple} />
                    <Text variant="bodySmall">{selectedSuggestion.estimatedDuration}</Text>
                  </View>
                </View>

                <Text variant="h3" style={styles.modalSectionTitle}>
                  📋 Activities
                </Text>
                {selectedSuggestion.activities.map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <Text variant="body">
                      {index + 1}. {activity}
                    </Text>
                  </View>
                ))}

                <Text variant="h3" style={styles.modalSectionTitle}>
                  💡 Tips
                </Text>
                {selectedSuggestion.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text variant="body">• {tip}</Text>
                  </View>
                ))}

                <Text variant="h3" style={styles.modalSectionTitle}>
                  ⏰ Best Time
                </Text>
                <Text variant="body" style={styles.bestTime}>
                  {selectedSuggestion.bestTime}
                </Text>

                <Button
                  title="Sounds Perfect!"
                  onPress={() => setSelectedSuggestion(null)}
                  variant="primary"
                  style={styles.closeModalButton}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
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
  filterCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterTitle: {
    marginBottom: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  filterButtonActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statsTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
    textAlign: 'center',
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
  suggestionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  suggestionHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionTitle: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.xs,
  },
  suggestionMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  batmanCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
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
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  modalTitle: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.sm,
  },
  modalDescription: {
    marginBottom: spacing.md,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  modalSectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  activityItem: {
    paddingVertical: spacing.xs,
  },
  tipItem: {
    paddingVertical: spacing.xs,
  },
  bestTime: {
    marginBottom: spacing.md,
  },
  closeModalButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});

export default DateSuggestionsScreen;
