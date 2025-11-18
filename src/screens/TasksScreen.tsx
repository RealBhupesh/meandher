/**
 * Tasks Screen
 * To-Do List with tulip rewards
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button } from '../components';
import { colors, spacing } from '../theme';
import { useStore } from '../store/useStore';
import { Task } from '../types';

const TasksScreen = () => {
  const { tasks, toggleTask, deleteTask } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return colors.priority.urgent;
      case 'high':
        return colors.priority.high;
      case 'medium':
        return colors.priority.medium;
      case 'low':
        return colors.priority.low;
      default:
        return colors.text.light.tertiary;
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return '❤️❤️❤️';
      case 'high':
        return '🧡🧡';
      case 'medium':
        return '💛';
      case 'low':
        return '💚';
      default:
        return '';
    }
  };

  const renderTask = (task: Task) => (
    <TouchableOpacity
      key={task.id}
      onPress={() => toggleTask(task.id)}
      activeOpacity={0.8}
    >
      <Card style={[styles.taskCard, task.completed && styles.completedCard]}>
        <View style={styles.taskHeader}>
          <View style={styles.taskLeft}>
            <Ionicons
              name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={
                task.completed
                  ? colors.semantic.success
                  : colors.text.light.tertiary
              }
            />
            <View style={styles.taskContent}>
              <Text
                variant="body"
                style={[
                  styles.taskTitle,
                  task.completed && styles.completedText,
                ]}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text variant="bodySmall" numberOfLines={2}>
                  {task.description}
                </Text>
              )}
              <View style={styles.taskMeta}>
                <Text variant="caption">
                  Assigned to: {task.assignedTo === 'both' ? '👫 Both' : task.assignedTo === 'gayu' ? '👧 Gayu' : '👦 B'}
                </Text>
                {task.dueDate && (
                  <Text variant="caption">
                    {' • '}
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.taskRight}>
            <Text variant="caption">{getPriorityIcon(task.priority)}</Text>
          </View>
        </View>
        {task.completed && (
          <View style={styles.rewardBadge}>
            <Text variant="caption">🌷 +2 tulips earned</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
            onPress={() => setFilter('all')}
          >
            <Text
              variant="bodySmall"
              color={filter === 'all' ? colors.primary.sharedPurple : colors.text.light.secondary}
            >
              All ({tasks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'pending' && styles.filterTabActive]}
            onPress={() => setFilter('pending')}
          >
            <Text
              variant="bodySmall"
              color={filter === 'pending' ? colors.primary.sharedPurple : colors.text.light.secondary}
            >
              Pending ({pendingCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'completed' && styles.filterTabActive]}
            onPress={() => setFilter('completed')}
          >
            <Text
              variant="bodySmall"
              color={filter === 'completed' ? colors.primary.sharedPurple : colors.text.light.secondary}
            >
              Completed ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <Card style={styles.progressCard} variant="purple">
          <Text variant="bodySmall" style={styles.progressText}>
            Progress: {completedCount}/{tasks.length} tasks done
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text variant="caption" style={styles.centered}>
            {progress.toFixed(0)}%
          </Text>
        </Card>

        {/* Task List */}
        <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text variant="h2">🌷</Text>
              <Text variant="body" style={styles.emptyText}>
                No tasks yet!
              </Text>
              <Text variant="bodySmall" style={styles.emptySubtext}>
                Start adding tasks to build your tulip garden
              </Text>
            </View>
          ) : (
            <>
              {!filter || filter === 'pending' ? (
                <>
                  <Text variant="h3" style={styles.dateHeader}>
                    TODAY - {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </Text>
                  {filteredTasks
                    .filter((t) => !t.completed)
                    .map(renderTask)}
                </>
              ) : null}

              {!filter || filter === 'completed' ? (
                <>
                  {filteredTasks.filter((t) => t.completed).length > 0 && (
                    <>
                      <Text variant="h3" style={styles.dateHeader}>
                        COMPLETED ✓
                      </Text>
                      {filteredTasks
                        .filter((t) => t.completed)
                        .map(renderTask)}
                    </>
                  )}
                </>
              ) : null}
            </>
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Add Task Button */}
        <View style={styles.addButtonContainer}>
          <Button
            title="+ Add Task"
            onPress={() => {
              // TODO: Open add task modal
              console.log('Add task');
            }}
            variant="primary"
          />
        </View>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background.cardLight,
  },
  filterTabActive: {
    backgroundColor: colors.primary.tulipWhite,
    borderWidth: 1,
    borderColor: colors.primary.sharedPurple,
  },
  progressCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  progressText: {
    marginBottom: spacing.sm,
    color: colors.text.light.primary,
  },
  progressBar: {
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
  centered: {
    textAlign: 'center',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  dateHeader: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: colors.primary.sharedPurple,
  },
  taskCard: {
    marginBottom: spacing.md,
  },
  completedCard: {
    opacity: 0.6,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskLeft: {
    flexDirection: 'row',
    gap: spacing.md,
    flex: 1,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    marginBottom: spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.text.light.tertiary,
  },
  taskMeta: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  taskRight: {
    justifyContent: 'flex-start',
  },
  rewardBadge: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.text.light.disabled,
    alignItems: 'center',
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

export default TasksScreen;
