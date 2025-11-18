/**
 * Goals Screen
 * Bucket List with Pinterest-style layout
 */

import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const GoalsScreen = () => {
  const { dreams } = useStore();

  const inProgressDreams = dreams.filter((d) => d.status === 'progress');
  const upcomingDreams = dreams.filter((d) => d.status === 'upcoming');
  const completedDreams = dreams.filter((d) => d.status === 'completed');
  const somedayDreams = dreams.filter((d) => d.status === 'someday');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>
            🎯 Our Bucket List
          </Text>
          <Text variant="body" style={styles.subtitle}>
            "Together, we can do anything" - Batman 🦇
          </Text>
        </View>

        {/* Stats Card */}
        <Card style={styles.statsCard} variant="purple">
          <Text variant="h3" style={styles.sectionTitle}>
            📊 Our Progress
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text variant="h2">{dreams.length}</Text>
              <Text variant="caption">Total Dreams</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2" color={colors.semantic.success}>
                {completedDreams.length}
              </Text>
              <Text variant="caption">Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2" color={colors.primary.sharedPurple}>
                {inProgressDreams.length}
              </Text>
              <Text variant="caption">In Progress</Text>
            </View>
          </View>
        </Card>

        {/* In Progress Dreams */}
        {inProgressDreams.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              ✨ IN PROGRESS ({inProgressDreams.length})
            </Text>
            {inProgressDreams.map((dream) => (
              <Card key={dream.id} style={styles.dreamCard}>
                <Text variant="h3">{dream.title}</Text>
                <Text variant="bodySmall" style={styles.dreamDesc}>
                  {dream.description}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${dream.progress}%` },
                    ]}
                  />
                </View>
                <Text variant="caption">
                  Progress: {dream.progress}% done
                </Text>
              </Card>
            ))}
          </>
        )}

        {/* Upcoming Dreams */}
        {upcomingDreams.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              🌟 UPCOMING SOON ({upcomingDreams.length})
            </Text>
            {upcomingDreams.map((dream) => (
              <Card key={dream.id} style={styles.dreamCard}>
                <Text variant="h3">{dream.title}</Text>
                <Text variant="bodySmall" style={styles.dreamDesc}>
                  {dream.description}
                </Text>
                {dream.targetDate && (
                  <Text variant="caption">
                    Target: {new Date(dream.targetDate).toLocaleDateString()}
                  </Text>
                )}
              </Card>
            ))}
          </>
        )}

        {/* Completed Dreams */}
        {completedDreams.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              ✅ COMPLETED ({completedDreams.length})
            </Text>
            {completedDreams.map((dream) => (
              <Card key={dream.id} style={styles.dreamCard} variant="light">
                <Text variant="h3">✓ {dream.title}</Text>
                <Text variant="caption" color={colors.semantic.success}>
                  Completed: {dream.completedAt ? new Date(dream.completedAt).toLocaleDateString() : ''}
                </Text>
                <Text variant="caption">🌷🌷🌷🌷</Text>
              </Card>
            ))}
          </>
        )}

        {/* Empty State */}
        {dreams.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="h1">🎯</Text>
            <Text variant="h3" style={styles.emptyText}>
              No dreams yet!
            </Text>
            <Text variant="body" style={styles.emptySubtext}>
              Start adding your bucket list dreams
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Add Dream Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="+ Add Dream"
          onPress={() => {
            // TODO: Open add dream modal
            console.log('Add dream');
          }}
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
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  statsGrid: {
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
  dreamCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  dreamDesc: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.text.light.disabled,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.sharedPurple,
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
    textAlign: 'center',
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

export default GoalsScreen;
