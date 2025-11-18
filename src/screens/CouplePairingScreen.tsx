/**
 * Couple Pairing Screen
 * Create or join a couple with invite codes
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button, Input } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { FirestoreService } from '../services/firestoreService';
import { Couple } from '../types';

const CouplePairingScreen = ({ navigation }: any) => {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [partnerName, setPartnerName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser, setCouple } = useStore();

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateCouple = async () => {
    if (!partnerName) {
      Alert.alert('Error', 'Please enter your partner\'s name');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }

    setLoading(true);
    try {
      const code = generateInviteCode();
      const couple: Couple = {
        id: code,
        partner1Id: currentUser.id,
        partner2Id: '',
        coupleNames: [currentUser.name, partnerName],
        coupleEmojis: ['💕', '💙'],
        relationshipStart: new Date(),
        tulipCount: 0,
        anniversaries: [],
      };

      await FirestoreService.createCouple(couple);
      setCouple(couple);

      Alert.alert(
        'Couple Created! 💕',
        `Share this invite code with ${partnerName}:\n\n${code}\n\nThey can use it to join your couple!`,
        [
          {
            text: 'Copy Code',
            onPress: () => {
              // In a real app, use Clipboard API
              Alert.alert('Code Copied', code);
            },
          },
          {
            text: 'Done',
            onPress: () => navigation.navigate('MainTabs'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCouple = async () => {
    if (!inviteCode) {
      Alert.alert('Error', 'Please enter an invite code');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }

    setLoading(true);
    try {
      const couple = await FirestoreService.getCouple(inviteCode.toUpperCase());

      if (!couple) {
        Alert.alert('Error', 'Invalid invite code');
        return;
      }

      if (couple.partner2Id) {
        Alert.alert('Error', 'This couple is already complete');
        return;
      }

      // Update couple with partner 2
      await FirestoreService.updateCouple(couple.id, {
        partner2Id: currentUser.id,
        coupleNames: [couple.coupleNames[0], currentUser.name],
      });

      const updatedCouple = await FirestoreService.getCouple(couple.id);
      if (updatedCouple) {
        setCouple(updatedCouple);
        Alert.alert(
          'Success! 💕',
          `You're now connected with ${couple.coupleNames[0]}!`,
          [
            {
              text: 'Start Your Journey',
              onPress: () => navigation.navigate('MainTabs'),
            },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'choose') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.primary.tulipWhite, colors.background.light]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Text variant="hero" style={styles.logo}>
                💕
              </Text>
              <Text variant="h1" style={styles.title}>
                Connect with Your Partner
              </Text>
              <Text variant="body" style={styles.subtitle}>
                Start your love journey together
              </Text>
            </View>

            <Card style={styles.optionCard}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => setMode('create')}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="add-circle" size={48} color={colors.primary.sharedPurple} />
                </View>
                <Text variant="h3" style={styles.optionTitle}>
                  Create a Couple
                </Text>
                <Text variant="body" style={styles.optionDesc}>
                  Generate an invite code and send it to your partner
                </Text>
                <Ionicons name="chevron-forward" size={24} color={colors.text.light.tertiary} />
              </TouchableOpacity>
            </Card>

            <Card style={styles.optionCard}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => setMode('join')}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="heart-circle" size={48} color={colors.primary.tulipRed} />
                </View>
                <Text variant="h3" style={styles.optionTitle}>
                  Join a Couple
                </Text>
                <Text variant="body" style={styles.optionDesc}>
                  Enter the invite code your partner shared with you
                </Text>
                <Ionicons name="chevron-forward" size={24} color={colors.text.light.tertiary} />
              </TouchableOpacity>
            </Card>

            <View style={styles.batmanContainer}>
              <Text variant="caption" style={styles.batmanText}>
                🦇 "Every Robin needs their Batman" 💙
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (mode === 'create') {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.primary.tulipWhite, colors.background.light]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setMode('choose')}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text.light.primary} />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text variant="h1" style={styles.title}>
                Create Couple
              </Text>
              <Text variant="body" style={styles.subtitle}>
                Start your journey together
              </Text>
            </View>

            <Card style={styles.formCard}>
              <Input
                label="Your Partner's Name"
                value={partnerName}
                onChangeText={setPartnerName}
                placeholder="Enter their name"
                leftIcon={
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.text.light.secondary}
                  />
                }
              />

              <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color={colors.primary.bBlue} />
                <Text variant="bodySmall" style={styles.infoText}>
                  We'll generate a unique invite code that you can share with your partner
                </Text>
              </View>

              <Button
                title="Create & Get Code"
                onPress={handleCreateCouple}
                loading={loading}
                variant="primary"
              />
            </Card>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // Join mode
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary.tulipWhite, colors.background.light]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setMode('choose')}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.light.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text variant="h1" style={styles.title}>
              Join Couple
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Enter the code your partner shared
            </Text>
          </View>

          <Card style={styles.formCard}>
            <Input
              label="Invite Code"
              value={inviteCode}
              onChangeText={(text) => setInviteCode(text.toUpperCase())}
              placeholder="Enter 6-character code"
              autoCapitalize="characters"
              maxLength={6}
              leftIcon={
                <Ionicons
                  name="key-outline"
                  size={20}
                  color={colors.text.light.secondary}
                />
              }
            />

            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color={colors.primary.bBlue} />
              <Text variant="bodySmall" style={styles.infoText}>
                Ask your partner for the 6-character invite code they received
              </Text>
            </View>

            <Button
              title="Join Couple"
              onPress={handleJoinCouple}
              loading={loading}
              variant="primary"
            />
          </Card>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 80,
  },
  title: {
    color: colors.primary.sharedPurple,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text.light.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  optionCard: {
    marginBottom: spacing.md,
  },
  option: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  optionIcon: {
    marginBottom: spacing.md,
  },
  optionTitle: {
    marginBottom: spacing.sm,
    color: colors.primary.sharedPurple,
  },
  optionDesc: {
    textAlign: 'center',
    color: colors.text.light.secondary,
    marginBottom: spacing.md,
  },
  formCard: {
    marginTop: spacing.lg,
  },
  infoBox: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.primary.bBlue + '10',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  infoText: {
    flex: 1,
    color: colors.text.light.secondary,
  },
  batmanContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  batmanText: {
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
  },
});

export default CouplePairingScreen;
