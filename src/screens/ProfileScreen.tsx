/**
 * Profile Screen
 * User profile and settings
 */

import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';

const ProfileScreen = () => {
  const { currentUser, couple } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text variant="hero">👦</Text>
          </View>
          <Text variant="h2" style={styles.name}>
            Bhavesh (B)
          </Text>
          <Text variant="body" style={styles.level}>
            Level 12 - "Love Architect"
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '78%' }]} />
          </View>
          <Text variant="caption">78% to Level 13</Text>
        </View>

        {/* Bio */}
        <Card style={styles.bioCard}>
          <Text variant="body" style={styles.bio}>
            "Building dreams with Gayu, one day at a time. Batman fan. Pizza enthusiast. 🦇🍕"
          </Text>
          <View style={styles.connectionInfo}>
            <Text variant="bodySmall">Connected to: Gayu 💕</Text>
            <Text variant="caption">Together since: Jan 18, 2024</Text>
          </View>
        </Card>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <Text variant="h3" style={styles.sectionTitle}>
            📊 My Stats
          </Text>
          <View style={styles.statRow}>
            <Text variant="body">• Tasks Completed:</Text>
            <Text variant="body" style={styles.statValue}>127</Text>
          </View>
          <View style={styles.statRow}>
            <Text variant="body">• Dreams Achieved:</Text>
            <Text variant="body" style={styles.statValue}>4</Text>
          </View>
          <View style={styles.statRow}>
            <Text variant="body">• Memories Created:</Text>
            <Text variant="body" style={styles.statValue}>98</Text>
          </View>
          <View style={styles.statRow}>
            <Text variant="body">• Love Notes Sent:</Text>
            <Text variant="body" style={styles.statValue}>134</Text>
          </View>
          <View style={styles.statRow}>
            <Text variant="body">• Tulips Earned:</Text>
            <Text variant="body" style={styles.statValue}>428 🌷</Text>
          </View>
        </Card>

        {/* Achievements */}
        <Card style={styles.achievementsCard}>
          <Text variant="h3" style={styles.sectionTitle}>
            🏆 Achievements (24/50)
          </Text>
          <View style={styles.achievementGrid}>
            <View style={styles.achievementBadge}>
              <Text variant="h1">🌷</Text>
              <Text variant="caption">First Tulip</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text variant="h1">💯</Text>
              <Text variant="caption">100 Tasks</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text variant="h1">🦇</Text>
              <Text variant="caption">Batman Fan</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text variant="h1">❤️</Text>
              <Text variant="caption">True Love</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text variant="bodySmall" color={colors.primary.sharedPurple}>
              View All Achievements →
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Text variant="h3" style={styles.sectionTitle}>
            ⚙️ Settings
          </Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Appearance</Text>
            </View>
            <View style={styles.settingRight}>
              <Text variant="bodySmall" color={colors.text.light.tertiary}>Light</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="flower-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Tulip Density</Text>
            </View>
            <View style={styles.settingRight}>
              <Text variant="bodySmall" color={colors.text.light.tertiary}>Medium</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text variant="body">🦇</Text>
              <Text variant="body">Batman Appearances</Text>
            </View>
            <View style={styles.settingRight}>
              <Text variant="bodySmall" color={colors.text.light.tertiary}>Occasional</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="link-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Connected Accounts</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={20} color={colors.text.light.secondary} />
              <Text variant="body">Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.text.light.tertiary} />
          </TouchableOpacity>
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text variant="caption" style={styles.centered}>
            Gayu & B v1.0.0
          </Text>
          <Text variant="caption" style={styles.centered}>
            Made with 💕 for Gayu & B
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    marginBottom: spacing.xs,
  },
  level: {
    color: colors.primary.sharedPurple,
    marginBottom: spacing.md,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: colors.text.light.disabled,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.sharedPurple,
  },
  bioCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  bio: {
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  connectionInfo: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.text.light.disabled,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  statValue: {
    fontWeight: '600',
  },
  achievementsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  achievementBadge: {
    width: '22%',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.primary.tulipWhite,
    borderRadius: 12,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.light.disabled + '40',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  centered: {
    textAlign: 'center',
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default ProfileScreen;
