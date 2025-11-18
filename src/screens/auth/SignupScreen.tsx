/**
 * Signup Screen
 * Create new account with tulip theme
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, Input, Button, Card } from '../../components';
import { colors, spacing } from '../../theme';
import { AuthService } from '../../services/authService';
import { useStore } from '../../store/useStore';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setCurrentUser, setAuthenticated } = useStore();

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const user = await AuthService.signUp(email, password, name);
      setCurrentUser(user);
      setAuthenticated(true);
      Alert.alert('Success', 'Account created successfully! 🌷');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const user = await AuthService.signInWithGoogle();
      setCurrentUser(user);
      setAuthenticated(true);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[colors.primary.tulipWhite, colors.background.light]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="hero" style={styles.logo}>
              🌷
            </Text>
            <Text variant="h1" style={styles.title}>
              Join Gayu & B
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Start your love story today
            </Text>
          </View>

          {/* Signup Form */}
          <Card style={styles.formCard}>
            <Text variant="h2" style={styles.formTitle}>
              Create Account 💕
            </Text>

            <Input
              label="Your Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="words"
              leftIcon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.text.light.secondary}
                />
              }
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.text.light.secondary}
                />
              }
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry={!showPassword}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.text.light.secondary}
                />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.text.light.secondary}
                  />
                </TouchableOpacity>
              }
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!showPassword}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.text.light.secondary}
                />
              }
            />

            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              variant="primary"
              style={styles.signupButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text variant="caption" style={styles.dividerText}>
                or
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Signup */}
            <Button
              title="Continue with Google"
              onPress={handleGoogleSignup}
              variant="outline"
              icon={
                <Ionicons
                  name="logo-google"
                  size={20}
                  color={colors.primary.sharedPurple}
                  style={{ marginRight: spacing.sm }}
                />
              }
            />

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text variant="body">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text variant="body" color={colors.primary.sharedPurple} style={styles.loginLink}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Terms */}
          <Text variant="caption" style={styles.terms}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>

          {/* Batman Easter Egg */}
          <View style={styles.batmanContainer}>
            <Text variant="caption" style={styles.batmanText}>
              🦇 "Every hero needs an origin story" 💙
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
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
  },
  subtitle: {
    color: colors.text.light.secondary,
    marginTop: spacing.xs,
  },
  formCard: {
    marginBottom: spacing.md,
  },
  formTitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.primary.tulipRed,
  },
  signupButton: {
    marginTop: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.light.disabled,
  },
  dividerText: {
    marginHorizontal: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  loginLink: {
    fontWeight: '600',
  },
  terms: {
    textAlign: 'center',
    color: colors.text.light.tertiary,
    marginBottom: spacing.md,
  },
  batmanContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  batmanText: {
    fontStyle: 'italic',
    color: colors.accent.batmanDark,
  },
});

export default SignupScreen;
