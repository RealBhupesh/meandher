/**
 * Firestore Sync Hook
 * Real-time synchronization between app and Firestore
 */

import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { FirestoreService } from '../services/firestoreService';

export const useFirestoreSync = (coupleId: string | undefined) => {
  const {
    setCouple,
    addTask,
    updateTask,
    deleteTask,
    addDream,
    updateDream,
    deleteDream,
    addWatchItem,
    updateWatchItem,
    deleteWatchItem,
    addMemory,
    updateMemory,
    deleteMemory,
    addLoveNote,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useStore();

  useEffect(() => {
    if (!coupleId) return;

    // Fetch initial couple data
    FirestoreService.getCouple(coupleId).then((couple) => {
      if (couple) setCouple(couple);
    });

    // Subscribe to tasks real-time updates
    const unsubscribeTasks = FirestoreService.onTasksSnapshot(coupleId, (tasks) => {
      // Update store with all tasks
      tasks.forEach((task) => {
        // Check if task exists in local store, if not add it
        const existingTask = useStore.getState().tasks.find((t) => t.id === task.id);
        if (!existingTask) {
          addTask(task);
        } else {
          // Update if different
          updateTask(task.id, task);
        }
      });

      // Remove tasks that are deleted from Firestore
      const localTaskIds = useStore.getState().tasks.map((t) => t.id);
      const firestoreTaskIds = tasks.map((t) => t.id);
      const deletedTaskIds = localTaskIds.filter((id) => !firestoreTaskIds.includes(id));
      deletedTaskIds.forEach((id) => deleteTask(id));
    });

    // Subscribe to dreams real-time updates
    const unsubscribeDreams = FirestoreService.onDreamsSnapshot(coupleId, (dreams) => {
      dreams.forEach((dream) => {
        const existingDream = useStore.getState().dreams.find((d) => d.id === dream.id);
        if (!existingDream) {
          addDream(dream);
        } else {
          updateDream(dream.id, dream);
        }
      });

      const localDreamIds = useStore.getState().dreams.map((d) => d.id);
      const firestoreDreamIds = dreams.map((d) => d.id);
      const deletedDreamIds = localDreamIds.filter((id) => !firestoreDreamIds.includes(id));
      deletedDreamIds.forEach((id) => deleteDream(id));
    });

    // Subscribe to watch list real-time updates
    const unsubscribeWatchList = FirestoreService.onWatchListSnapshot(coupleId, (items) => {
      items.forEach((item) => {
        const existingItem = useStore.getState().watchList.find((w) => w.id === item.id);
        if (!existingItem) {
          addWatchItem(item);
        } else {
          updateWatchItem(item.id, item);
        }
      });

      const localItemIds = useStore.getState().watchList.map((w) => w.id);
      const firestoreItemIds = items.map((w) => w.id);
      const deletedItemIds = localItemIds.filter((id) => !firestoreItemIds.includes(id));
      deletedItemIds.forEach((id) => deleteWatchItem(id));
    });

    // Subscribe to memories real-time updates
    const unsubscribeMemories = FirestoreService.onMemoriesSnapshot(coupleId, (memories) => {
      memories.forEach((memory) => {
        const existingMemory = useStore.getState().memories.find((m) => m.id === memory.id);
        if (!existingMemory) {
          addMemory(memory);
        } else {
          updateMemory(memory.id, memory);
        }
      });

      const localMemoryIds = useStore.getState().memories.map((m) => m.id);
      const firestoreMemoryIds = memories.map((m) => m.id);
      const deletedMemoryIds = localMemoryIds.filter((id) => !firestoreMemoryIds.includes(id));
      deletedMemoryIds.forEach((id) => deleteMemory(id));
    });

    // Subscribe to love notes real-time updates
    const unsubscribeLoveNotes = FirestoreService.onLoveNotesSnapshot(coupleId, (notes) => {
      notes.forEach((note) => {
        const existingNote = useStore.getState().loveNotes.find((n) => n.id === note.id);
        if (!existingNote) {
          addLoveNote(note);
        }
      });
    });

    // Subscribe to events real-time updates
    const unsubscribeEvents = FirestoreService.onEventsSnapshot(coupleId, (events) => {
      events.forEach((event) => {
        const existingEvent = useStore.getState().events.find((e) => e.id === event.id);
        if (!existingEvent) {
          addEvent(event);
        } else {
          updateEvent(event.id, event);
        }
      });

      const localEventIds = useStore.getState().events.map((e) => e.id);
      const firestoreEventIds = events.map((e) => e.id);
      const deletedEventIds = localEventIds.filter((id) => !firestoreEventIds.includes(id));
      deletedEventIds.forEach((id) => deleteEvent(id));
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeTasks();
      unsubscribeDreams();
      unsubscribeWatchList();
      unsubscribeMemories();
      unsubscribeLoveNotes();
      unsubscribeEvents();
    };
  }, [coupleId]);
};
