/**
 * Love Screen
 * Love Center with notes, stats, and games
 */

import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const LoveScreen = () => {
  const { loveNotes, couple } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            💕 Love Center
          </Text>
          <Text variant="body" style={styles.subtitle}>
            "The heart of Gayu & B"
          </Text>
        </View>

        {/* Together Counter */}
        <Card style={styles.counterCard} variant="pink">
          <View style={styles.counterContent}>
            <Text variant="h2">💗</Text>
            <Text variant="h2" style={styles.counterTitle}>
              TOGETHER FOR
            </Text>
            <Text variant="hero" color={colors.primary.tulipRed}>
              16
            </Text>
            <Text variant="body">months of pure love</Text>
          </View>
        </Card>

        {/* Love Notes Section */}
        <Card style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            💌 Love Notes
          </Text>

          {loveNotes.length === 0 ? (
            <View style={styles.emptyNotes}>
              <Text variant="body" style={styles.emptyText}>
                No love notes yet!
              </Text>
              <Text variant="bodySmall" style={styles.emptySubtext}>
                Send a love note to your partner
              </Text>
            </View>
          ) : (
            <>
              {loveNotes.slice(0, 3).map((note) => (
                <View key={note.id} style={styles.noteCard}>
                  <Text variant="bodySmall" color={colors.text.light.tertiary}>
                    From: {note.from === 'gayu' ? '👧 Gayu' : '👦 B'}
                  </Text>
                  <Text variant="body" style={styles.noteMessage}>
                    "{note.message}"
                  </Text>
                  <View style={styles.noteFooter}>
                    <Text variant="caption">
                      {new Date(note.sentAt).toLocaleDateString()}
                    </Text>
                    <Text variant="caption">💗 {note.hearts}</Text>
                  </View>
                </View>
              ))}
              <Button
                title="View All Notes"
                onPress={() => console.log('View all notes')}
                variant="ghost"
                size="small"
              />
            </>
          )}
        </Card>

        {/* Love Stats */}
        <Card style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            📊 Our Love Stats
          </Text>
          <View style={styles.statRow}>
            <Text variant="body">Compatibility Score:</Text>
            <Text variant="h3" color={colors.primary.tulipRed}>
              94% 💕
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '94%' }]} />
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="h3">247</Text>
              <Text variant="caption">Messages</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h3">127</Text>
              <Text variant="caption">Dates</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h3">34</Text>
              <Text variant="caption">Inside Jokes</Text>
            </View>
          </View>
        </Card>

        {/* Random Acts of Love */}
        <Card style={styles.section} variant="purple">
          <Text variant="h3" style={styles.sectionTitle}>
            🎁 Random Acts of Love
          </Text>
          <Text variant="body" style={styles.suggestionText}>
            Today's Suggestions:
          </Text>
          <View style={styles.suggestion}>
            <Text variant="body">• Send a voice message saying "I love you"</Text>
          </View>
          <View style={styles.suggestion}>
            <Text variant="body">• Order her favorite dessert surprise</Text>
          </View>
          <View style={styles.suggestion}>
            <Text variant="body">• Share a memory from exactly 1 year ago</Text>
          </View>
          <Button
            title="Surprise Me with an Idea"
            onPress={() => console.log('Generate surprise')}
            variant="secondary"
            size="small"
            style={styles.surpriseButton}
          />
        </Card>

        {/* Love Language */}
        <Card style={styles.section}>
          <Text variant="h3" style={styles.sectionTitle}>
            💝 Love Languages
          </Text>
          <Text variant="bodySmall" style={styles.languageTitle}>
            Gayu's Love Language:
          </Text>
          <Text variant="body">1. Quality Time ⭐⭐⭐⭐⭐</Text>
          <Text variant="body">2. Words of Affirmation ⭐⭐⭐⭐</Text>
          <Text variant="bodySmall" style={styles.languageTitle}>
            B's Love Language:
          </Text>
          <Text variant="body">1. Physical Touch ⭐⭐⭐⭐⭐</Text>
          <Text variant="body">2. Quality Time ⭐⭐⭐⭐</Text>
        </Card>

        {/* Batman Wisdom */}
        <View style={styles.batmanWisdom}>
          <Text variant="bodySmall" style={styles.batmanText}>
            💡 "Quality time is Gayu's #1 language! Plan an uninterrupted evening together." - Batman 🦇
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Send Love Note Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="💌 Send Love Note"
          onPress={() => console.log('Send love note')}
          variant="primary"
        />
      </View>
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
    color: colors.primary.tulipRed,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.text.light.secondary,
    textAlign: 'center',
  },
  counterCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  counterContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  counterTitle: {
    marginVertical: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  emptyNotes: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    color: colors.text.light.secondary,
  },
  emptySubtext: {
    marginTop: spacing.xs,
    color: colors.text.light.tertiary,
  },
  noteCard: {
    backgroundColor: colors.primary.tulipWhite,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  noteMessage: {
    marginVertical: spacing.sm,
    fontStyle: 'italic',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.text.light.disabled,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.tulipRed,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  suggestionText: {
    marginBottom: spacing.sm,
  },
  suggestion: {
    paddingVertical: spacing.xs,
  },
  surpriseButton: {
    marginTop: spacing.md,
  },
  languageTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  batmanWisdom: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.accent.batmanDark + '10',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent.batmanDark,
  },
  batmanText: {
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
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
});

export default LoveScreen;
