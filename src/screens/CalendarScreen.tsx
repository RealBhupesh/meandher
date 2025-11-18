/**
 * Calendar Screen
 * Our Life, Synchronized
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button, Input } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { CalendarEvent, TaskAssignee } from '../types';

const CalendarScreen = () => {
  const { events, addEvent, deleteEvent } = useStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Add form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [attendees, setAttendees] = useState<TaskAssignee>('both');

  const upcomingEvents = events
    .filter((e) => new Date(e.startTime) >= new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const pastEvents = events
    .filter((e) => new Date(e.startTime) < new Date())
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const handleAddEvent = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      description,
      startTime: date,
      endTime: new Date(date.getTime() + 2 * 60 * 60 * 1000), // +2 hours
      attendees,
      reminders: [],
      category: 'romance',
      createdBy: 'user-id',
      createdAt: new Date(),
    };

    addEvent(newEvent);
    setIsAddModalVisible(false);
    setTitle('');
    setDescription('');
    Alert.alert('Success', 'Event added! 📅');
  };

  const getEventIcon = (event: CalendarEvent) => {
    const title = event.title.toLowerCase();
    if (title.includes('date')) return '🍝';
    if (title.includes('movie')) return '🎬';
    if (title.includes('anniversary')) return '🎉';
    if (title.includes('workout')) return '🏃';
    return '📅';
  };

  const renderEvent = (event: CalendarEvent) => (
    <Card key={event.id} style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.eventLeft}>
          <Text variant="h2">{getEventIcon(event)}</Text>
          <View style={styles.eventContent}>
            <Text variant="h3">{event.title}</Text>
            {event.description && (
              <Text variant="bodySmall" numberOfLines={2}>
                {event.description}
              </Text>
            )}
            <View style={styles.eventMeta}>
              <Text variant="caption">
                {new Date(event.startTime).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
                {' • '}
                {new Date(event.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
              <Text variant="caption">
                {' • '}
                {event.attendees === 'both' ? '👫 Both' : event.attendees === 'gayu' ? '👧 Gayu' : '👦 B'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteEvent(event.id)}>
          <Ionicons name="trash-outline" size={20} color={colors.semantic.error} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" style={styles.title}>
          📅 Our Calendar
        </Text>
        <Text variant="body" style={styles.subtitle}>
          "Planning tomorrow, together"
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Card style={styles.statsCard} variant="purple">
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h2">{upcomingEvents.length}</Text>
              <Text variant="caption">Upcoming</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{pastEvents.length}</Text>
              <Text variant="caption">Past</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="h2">{events.length}</Text>
              <Text variant="caption">Total</Text>
            </View>
          </View>
        </Card>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 ? (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              🌟 UPCOMING EVENTS
            </Text>
            {upcomingEvents.map(renderEvent)}
          </>
        ) : (
          <View style={styles.emptySection}>
            <Text variant="body" style={styles.emptyText}>
              No upcoming events
            </Text>
          </View>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <>
            <Text variant="h3" style={styles.sectionHeader}>
              ✓ PAST EVENTS
            </Text>
            {pastEvents.slice(0, 5).map(renderEvent)}
          </>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="hero">📅</Text>
            <Text variant="h3" style={styles.emptyText}>
              No events yet!
            </Text>
            <Text variant="body" style={styles.emptySubtext}>
              Start planning your time together
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <Button
          title="+ Add Event"
          onPress={() => setIsAddModalVisible(true)}
          variant="primary"
        />
      </View>

      {/* Add Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="h2">Add Event</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text.light.primary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Title *"
              value={title}
              onChangeText={setTitle}
              placeholder="Date night, Movie marathon, etc."
            />

            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Add more details..."
              multiline
              numberOfLines={3}
            />

            <Text variant="bodySmall" style={styles.label}>
              Who's attending?
            </Text>
            <View style={styles.attendeeSelector}>
              {[
                { value: 'gayu', label: '👧 Gayu' },
                { value: 'b', label: '👦 B' },
                { value: 'both', label: '👫 Both' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.attendeeButton,
                    attendees === option.value && styles.attendeeButtonActive,
                  ]}
                  onPress={() => setAttendees(option.value as TaskAssignee)}
                >
                  <Text
                    variant="body"
                    color={
                      attendees === option.value
                        ? colors.primary.sharedPurple
                        : colors.text.light.secondary
                    }
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setIsAddModalVisible(false)}
                variant="ghost"
                style={{ flex: 1 }}
              />
              <Button
                title="Add Event"
                onPress={handleAddEvent}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
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
  },
  content: {
    flex: 1,
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  eventCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventLeft: {
    flexDirection: 'row',
    gap: spacing.md,
    flex: 1,
  },
  eventContent: {
    flex: 1,
  },
  eventMeta: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  emptySection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
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
  label: {
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  attendeeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  attendeeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.text.light.disabled,
  },
  attendeeButtonActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderColor: colors.primary.sharedPurple,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});

export default CalendarScreen;
