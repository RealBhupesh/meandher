/**
 * Notification Service
 * Push notifications for reminders and partner activity
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  /**
   * Request permission for notifications
   */
  static async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return false;
    }

    // Get push token for remote notifications
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FFB5DA',
      });
    }

    return true;
  }

  /**
   * Schedule a local notification
   */
  static async scheduleNotification(
    title: string,
    body: string,
    trigger: Date | number
  ): Promise<string> {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'reminder' },
      },
      trigger:
        typeof trigger === 'number'
          ? { seconds: trigger }
          : { date: trigger },
    });

    return notificationId;
  }

  /**
   * Schedule task reminder
   */
  static async scheduleTaskReminder(
    taskTitle: string,
    dueDate: Date,
    minutesBefore: number = 60
  ): Promise<string> {
    const reminderTime = new Date(dueDate.getTime() - minutesBefore * 60 * 1000);

    if (reminderTime < new Date()) {
      throw new Error('Reminder time is in the past');
    }

    return await this.scheduleNotification(
      '📋 Task Reminder',
      `"${taskTitle}" is due soon! 🌷`,
      reminderTime
    );
  }

  /**
   * Schedule dream milestone reminder
   */
  static async scheduleDreamReminder(
    dreamTitle: string,
    targetDate: Date
  ): Promise<string> {
    const reminderTime = new Date(targetDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before

    return await this.scheduleNotification(
      '🎯 Dream Reminder',
      `Your goal "${dreamTitle}" is tomorrow! 💫`,
      reminderTime
    );
  }

  /**
   * Schedule event reminder
   */
  static async scheduleEventReminder(
    eventTitle: string,
    eventDate: Date,
    minutesBefore: number = 120
  ): Promise<string> {
    const reminderTime = new Date(eventDate.getTime() - minutesBefore * 60 * 1000);

    return await this.scheduleNotification(
      '📅 Event Reminder',
      `"${eventTitle}" starts in ${minutesBefore} minutes! 💕`,
      reminderTime
    );
  }

  /**
   * Send partner activity notification
   */
  static async sendPartnerActivityNotification(
    partnerName: string,
    activity: string
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `💕 ${partnerName}`,
        body: activity,
        data: { type: 'partner-activity' },
      },
      trigger: null, // Send immediately
    });
  }

  /**
   * Schedule anniversary reminder
   */
  static async scheduleAnniversaryReminder(
    date: Date,
    months: number
  ): Promise<string> {
    return await this.scheduleNotification(
      '🎉 Anniversary Alert!',
      `${months} months together today! Celebrate your love! 💕`,
      date
    );
  }

  /**
   * Schedule daily love reminder
   */
  static async scheduleDailyLoveReminder(hour: number = 20): Promise<string[]> {
    const notificationIds: string[] = [];

    // Schedule for next 7 days
    for (let i = 1; i <= 7; i++) {
      const triggerDate = new Date();
      triggerDate.setDate(triggerDate.getDate() + i);
      triggerDate.setHours(hour, 0, 0, 0);

      const messages = [
        'Send a love note to your partner 💕',
        'Share a memory from today 📸',
        'Tell your partner you love them 💗',
        'Do something nice for your partner 🌷',
        'Check in on your shared goals 🎯',
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      const id = await this.scheduleNotification(
        '💕 Daily Love Reminder',
        randomMessage,
        triggerDate
      );

      notificationIds.push(id);
    }

    return notificationIds;
  }

  /**
   * Cancel a scheduled notification
   */
  static async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }

  /**
   * Cancel all scheduled notifications
   */
  static async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  /**
   * Get all scheduled notifications
   */
  static async getAllScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    return await Notifications.getAllScheduledNotificationsAsync();
  }

  /**
   * Batman surprise notification
   */
  static async sendBatmanSurprise(): Promise<void> {
    const messages = [
      'Gotham is safe... and so is your love! 🦇💕',
      'Even Batman takes time for love 🦇💗',
      'The Dark Knight approves of your relationship! 🦇',
      'Justice and love go hand in hand 🦇💕',
      'Your love is the hero Gotham needs! 🦇💙',
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🦇 Message from Batman',
        body: randomMessage,
        data: { type: 'batman' },
      },
      trigger: null,
    });
  }

  /**
   * Setup notification listeners
   */
  static setupListeners(
    onNotificationReceived: (notification: Notifications.Notification) => void,
    onNotificationResponse: (response: Notifications.NotificationResponse) => void
  ) {
    // Listener for notifications received while app is foregrounded
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      onNotificationReceived
    );

    // Listener for user tapping on notification
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }
}
