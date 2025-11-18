/**
 * Pinterest Boards Screen
 * Sync Pinterest boards with bucket list
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { PinterestService, PinterestBoard, PinterestPin } from '../services/pinterestService';
import { useStore } from '../store/useStore';
import { Dream } from '../types';

const PinterestBoardsScreen = ({ navigation }: any) => {
  const [boards, setBoards] = useState<PinterestBoard[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const { addDream } = useStore();

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    setLoading(true);
    try {
      const boards = await PinterestService.getBoards();
      setBoards(boards);
      setConnected(true);
    } catch (error) {
      console.error('Error loading Pinterest boards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      const success = await PinterestService.authenticate();
      if (success) {
        setConnected(true);
        await loadBoards();
        Alert.alert('Success!', 'Pinterest account connected! 📌');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncBoard = async (board: PinterestBoard) => {
    Alert.alert(
      `Sync "${board.name}"?`,
      'This will add all pins from this board to your bucket list as dreams.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sync',
          onPress: async () => {
            setLoading(true);
            try {
              let syncedCount = 0;

              await PinterestService.syncBoardWithBucketList(
                board.id,
                (pin: PinterestPin) => {
                  const dream: Dream = {
                    id: `pinterest-${pin.id}`,
                    ...PinterestService.pinToDream(pin),
                    createdBy: 'user-id',
                    createdAt: new Date(),
                  };

                  addDream(dream);
                  syncedCount++;
                }
              );

              Alert.alert(
                'Synced!',
                `Added ${syncedCount} dreams from "${board.name}" to your bucket list! 🎯`
              );
            } catch (error: any) {
              Alert.alert('Error', error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.connectContainer}>
          <Text variant="hero">📌</Text>
          <Text variant="h1" style={styles.connectTitle}>
            Connect Pinterest
          </Text>
          <Text variant="body" style={styles.connectSubtitle}>
            Sync your Pinterest boards with your bucket list and turn your pins into dreams!
          </Text>

          <Card style={styles.benefitsCard}>
            <Text variant="h3" style={styles.benefitsTitle}>
              What you can do:
            </Text>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={24} color={colors.semantic.success} />
              <Text variant="body" style={styles.benefitText}>
                Import pins as bucket list dreams
              </Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={24} color={colors.semantic.success} />
              <Text variant="body" style={styles.benefitText}>
                Two-way sync between boards and goals
              </Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={24} color={colors.semantic.success} />
              <Text variant="body" style={styles.benefitText}>
                Share dreams directly to Pinterest
              </Text>
            </View>
            <View style={styles.benefit}>
              <Ionicons name="checkmark-circle" size={24} color={colors.semantic.success} />
              <Text variant="body" style={styles.benefitText}>
                Organize inspiration in one place
              </Text>
            </View>
          </Card>

          <Button
            title="Connect Pinterest"
            onPress={handleConnect}
            loading={loading}
            variant="primary"
            icon={
              <Ionicons
                name="logo-pinterest"
                size={20}
                color="#fff"
                style={{ marginRight: spacing.sm }}
              />
            }
          />

          <Text variant="caption" style={styles.privacyText}>
            We'll never post without your permission
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h2" style={styles.title}>
            📌 Pinterest Boards
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Sync your inspiration with your bucket list
          </Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard} variant="purple">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{boards.length}</Text>
              <Text variant="caption">Boards</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">
                {boards.reduce((sum, b) => sum + b.pinCount, 0)}
              </Text>
              <Text variant="caption">Total Pins</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.semantic.success} />
              <Text variant="caption">Connected</Text>
            </View>
          </View>
        </Card>

        {/* Boards List */}
        <Text variant="h3" style={styles.sectionHeader}>
          YOUR BOARDS
        </Text>

        {boards.map((board) => (
          <Card key={board.id} style={styles.boardCard}>
            <View style={styles.boardHeader}>
              <View style={styles.boardInfo}>
                <Text variant="h3">{board.name}</Text>
                <Text variant="bodySmall" numberOfLines={2}>
                  {board.description}
                </Text>
                <Text variant="caption">{board.pinCount} pins</Text>
              </View>
              <Button
                title="Sync"
                onPress={() => handleSyncBoard(board)}
                variant="secondary"
                size="small"
              />
            </View>
          </Card>
        ))}

        {/* Info */}
        <Card style={styles.infoCard} variant="pink">
          <Text variant="h3" style={styles.infoTitle}>
            💡 Pro Tip
          </Text>
          <Text variant="body">
            Syncing a board will add all pins as "Someday" dreams in your bucket list. You can then move them to "Upcoming" or "In Progress" as you plan!
          </Text>
        </Card>

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
  connectContainer: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectTitle: {
    color: colors.primary.tulipRed,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  connectSubtitle: {
    color: colors.text.light.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  benefitsCard: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  benefitsTitle: {
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  benefit: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
  },
  privacyText: {
    marginTop: spacing.md,
    color: colors.text.light.tertiary,
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
  boardCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  boardInfo: {
    flex: 1,
  },
  infoCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  infoTitle: {
    marginBottom: spacing.md,
    color: colors.primary.tulipRed,
  },
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default PinterestBoardsScreen;
