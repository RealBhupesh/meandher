/**
 * Global State Management with Zustand
 * Main store for Gayu & B app
 */

import { create } from 'zustand';
import { User, Couple, Task, Dream, WatchItem, Memory, LoveNote, CalendarEvent } from '../types';

interface AppState {
  // User & Couple
  currentUser: User | null;
  partner: User | null;
  couple: Couple | null;

  // Data
  tasks: Task[];
  dreams: Dream[];
  watchList: WatchItem[];
  memories: Memory[];
  loveNotes: LoveNote[];
  events: CalendarEvent[];

  // UI State
  isLoading: boolean;
  colorScheme: 'light' | 'dark';
  isAuthenticated: boolean;

  // Actions - User
  setCurrentUser: (user: User | null) => void;
  setPartner: (partner: User | null) => void;
  setCouple: (couple: Couple | null) => void;

  // Actions - Tasks
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;

  // Actions - Dreams
  addDream: (dream: Dream) => void;
  updateDream: (id: string, updates: Partial<Dream>) => void;
  deleteDream: (id: string) => void;
  updateDreamProgress: (id: string, progress: number) => void;

  // Actions - Watch List
  addWatchItem: (item: WatchItem) => void;
  updateWatchItem: (id: string, updates: Partial<WatchItem>) => void;
  deleteWatchItem: (id: string) => void;
  markAsWatched: (id: string, ratings?: { gayu?: number; b?: number }) => void;

  // Actions - Memories
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  toggleFavorite: (id: string) => void;

  // Actions - Love Notes
  addLoveNote: (note: LoveNote) => void;
  markLoveNoteAsRead: (id: string) => void;

  // Actions - Calendar
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;

  // Actions - UI
  setLoading: (isLoading: boolean) => void;
  setColorScheme: (scheme: 'light' | 'dark') => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial State
  currentUser: null,
  partner: null,
  couple: null,
  tasks: [],
  dreams: [],
  watchList: [],
  memories: [],
  loveNotes: [],
  events: [],
  isLoading: false,
  colorScheme: 'light',
  isAuthenticated: false,

  // User Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  setPartner: (partner) => set({ partner }),
  setCouple: (couple) => set({ couple }),

  // Task Actions
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      ),
    })),

  // Dream Actions
  addDream: (dream) => set((state) => ({ dreams: [...state.dreams, dream] })),
  updateDream: (id, updates) =>
    set((state) => ({
      dreams: state.dreams.map((dream) =>
        dream.id === id ? { ...dream, ...updates } : dream
      ),
    })),
  deleteDream: (id) =>
    set((state) => ({
      dreams: state.dreams.filter((dream) => dream.id !== id),
    })),
  updateDreamProgress: (id, progress) =>
    set((state) => ({
      dreams: state.dreams.map((dream) =>
        dream.id === id
          ? {
              ...dream,
              progress,
              status: progress === 100 ? 'completed' : dream.status,
              completedAt: progress === 100 ? new Date() : undefined,
            }
          : dream
      ),
    })),

  // Watch List Actions
  addWatchItem: (item) =>
    set((state) => ({ watchList: [...state.watchList, item] })),
  updateWatchItem: (id, updates) =>
    set((state) => ({
      watchList: state.watchList.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  deleteWatchItem: (id) =>
    set((state) => ({
      watchList: state.watchList.filter((item) => item.id !== id),
    })),
  markAsWatched: (id, ratings) =>
    set((state) => ({
      watchList: state.watchList.map((item) =>
        item.id === id
          ? {
              ...item,
              watched: true,
              watchedAt: new Date(),
              ratings,
            }
          : item
      ),
    })),

  // Memory Actions
  addMemory: (memory) =>
    set((state) => ({ memories: [...state.memories, memory] })),
  updateMemory: (id, updates) =>
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id ? { ...memory, ...updates } : memory
      ),
    })),
  deleteMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((memory) => memory.id !== id),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id ? { ...memory, favorite: !memory.favorite } : memory
      ),
    })),

  // Love Note Actions
  addLoveNote: (note) =>
    set((state) => ({ loveNotes: [...state.loveNotes, note] })),
  markLoveNoteAsRead: (id) =>
    set((state) => ({
      loveNotes: state.loveNotes.map((note) =>
        note.id === id ? { ...note, read: true } : note
      ),
    })),

  // Calendar Actions
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

  // UI Actions
  setLoading: (isLoading) => set({ isLoading }),
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
