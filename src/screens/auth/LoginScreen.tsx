/**
 * Login Screen
 * Beautiful login with tulip theme
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

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setCurrentUser, setAuthenticated } = useStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await AuthService.signIn(email, password);
      setCurrentUser(user);
      setAuthenticated(true);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await AuthService.signInWithGoogle();
      setCurrentUser(user);
      setAuthenticated(true);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await AuthService.resetPassword(email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
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
              Gayu & B
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Where Love Meets Productivity
            </Text>
          </View>

          {/* Login Form */}
          <Card style={styles.formCard}>
            <Text variant="h2" style={styles.formTitle}>
              Welcome Back! 💕
            </Text>

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
              placeholder="Enter your password"
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

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text
                variant="bodySmall"
                color={colors.primary.sharedPurple}
                style={styles.forgotPassword}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              variant="primary"
              style={styles.loginButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text variant="caption" style={styles.dividerText}>
                or
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login */}
            <Button
              title="Continue with Google"
              onPress={handleGoogleLogin}
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

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text variant="body">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text variant="body" color={colors.primary.sharedPurple} style={styles.signupLink}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Batman Easter Egg */}
          <View style={styles.batmanContainer}>
            <Text variant="caption" style={styles.batmanText}>
              🦇 "Even Batman needs a partner" 💙
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
    marginBottom: spacing.lg,
  },
  formTitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    color: colors.primary.tulipRed,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
  loginButton: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  signupLink: {
    fontWeight: '600',
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

export default LoginScreen;
