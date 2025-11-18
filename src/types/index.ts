/**
 * TypeScript Types & Interfaces
 * Data models for Gayu & B app
 */

export type UserId = string;
export type CoupleId = string;
export type TaskId = string;
export type DreamId = string;
export type WatchItemId = string;
export type MemoryId = string;
export type EventId = string;
export type LoveNoteId = string;

// User & Couple Types
export interface User {
  id: UserId;
  name: string;
  avatar: string;
  partnerId?: UserId;
  coupleId?: CoupleId;
  joinedAt: Date;
  level: number;
  xp: number;
  achievements: Achievement[];
  settings: UserSettings;
}

export interface Couple {
  id: CoupleId;
  partner1Id: UserId;
  partner2Id: UserId;
  coupleNames: [string, string];
  coupleEmojis: [string, string];
  relationshipStart: Date;
  tulipCount: number;
  anniversaries: Anniversary[];
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  batmanFrequency: 'rare' | 'occasional' | 'often';
  tulipDensity: 'low' | 'medium' | 'high';
}

// Task Types
export type TaskAssignee = 'gayu' | 'b' | 'both';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'home' | 'work' | 'romance' | 'goals' | 'fun' | 'health' | 'custom';

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  assignedTo: TaskAssignee;
  dueDate?: Date;
  priority: TaskPriority;
  completed: boolean;
  category: TaskCategory;
  recurring?: RecurringPattern;
  subtasks?: Subtask[];
  reminders?: Reminder[];
  attachments?: Attachment[];
  createdBy: UserId;
  createdAt: Date;
  completedAt?: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  interval?: number;
  daysOfWeek?: number[];
}

export interface Reminder {
  id: string;
  type: 'push' | 'email' | 'sms';
  timeBeforeInMinutes: number;
}

export interface Attachment {
  id: string;
  type: 'file' | 'photo' | 'link' | 'location';
  url: string;
  name: string;
}

// Bucket List Types
export type DreamStatus = 'someday' | 'upcoming' | 'progress' | 'completed';
export type DreamCategory = 'travel' | 'adventure' | 'romance' | 'food' | 'learning' | 'experience' | 'custom';

export interface Dream {
  id: DreamId;
  title: string;
  description: string;
  category: DreamCategory;
  targetDate?: Date;
  priority: TaskPriority;
  status: DreamStatus;
  progress: number;
  actionPlan: ActionItem[];
  budget?: Budget;
  photos: string[];
  notes: string[];
  inspiration: string[];
  createdBy: UserId;
  createdAt: Date;
  completedAt?: Date;
}

export interface ActionItem {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: TaskAssignee;
}

export interface Budget {
  total: number;
  saved: number;
  breakdown: BudgetItem[];
}

export interface BudgetItem {
  category: string;
  amount: number;
  paid: boolean;
}

// Watch List Types
export type WatchItemType = 'movie' | 'series' | 'documentary';

export interface WatchItem {
  id: WatchItemId;
  title: string;
  type: WatchItemType;
  poster: string;
  genre: string[];
  duration: number;
  imdbId?: string;
  rating?: number;
  addedBy: UserId;
  watched: boolean;
  ratings?: {
    gayu?: number;
    b?: number;
  };
  watchedAt?: Date;
  notes?: string;
}

// Memory Types
export type MemoryType = 'photo' | 'video' | 'note' | 'song' | 'place' | 'achievement' | 'milestone' | 'love-note';
export type MemoryMood = 'loved-it' | 'happy' | 'emotional' | 'hilarious' | 'grateful';

export interface Memory {
  id: MemoryId;
  type: MemoryType;
  content: string | string[];
  caption?: string;
  date: Date;
  location?: Location;
  mood?: MemoryMood;
  tags: string[];
  linkedTo?: {
    type: 'dream' | 'task' | 'event';
    id: string;
  };
  likes: number;
  favorite: boolean;
  createdBy: UserId;
  createdAt: Date;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

// Calendar Types
export interface CalendarEvent {
  id: EventId;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees: TaskAssignee;
  reminders: Reminder[];
  category: TaskCategory;
  createdBy: UserId;
  createdAt: Date;
}

// Love Center Types
export interface LoveNote {
  id: LoveNoteId;
  from: UserId;
  to: UserId;
  message: string;
  style: 'romantic' | 'playful' | 'deep' | 'funny' | 'grateful' | 'custom';
  attachments?: Attachment[];
  sentAt: Date;
  read: boolean;
  hearts: number;
  scheduled?: Date;
}

export interface LoveLanguage {
  wordsOfAffirmation: number;
  qualityTime: number;
  gifts: number;
  actsOfService: number;
  physicalTouch: number;
}

export interface CoupleStats {
  messagesSent: number;
  dates: number;
  insideJokes: number;
  dreamsAchieved: number;
  tulipsPlanted: number;
  compatibility: number;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'tasks' | 'dreams' | 'memories' | 'love' | 'streak' | 'special';
}

export interface Anniversary {
  date: Date;
  type: 'relationship' | 'engagement' | 'wedding' | 'custom';
  title: string;
}

// Tulip Types
export interface TulipGarden {
  totalTulips: number;
  tulipsByCategory: Record<string, number>;
  tulipsByMonth: Record<string, number>;
  gardenHealth: number;
}

export interface Tulip {
  id: string;
  color: string;
  category: string;
  linkedTo: {
    type: 'task' | 'dream' | 'memory';
    id: string;
    title: string;
  };
  plantedAt: Date;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}
