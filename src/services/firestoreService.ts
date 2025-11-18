/**
 * Firestore Service
 * Database operations for Gayu & B
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Task,
  Dream,
  WatchItem,
  Memory,
  LoveNote,
  CalendarEvent,
  Couple,
} from '../types';

export class FirestoreService {
  /**
   * COUPLE OPERATIONS
   */
  static async createCouple(couple: Couple): Promise<void> {
    await setDoc(doc(db, 'couples', couple.id), couple);
  }

  static async getCouple(coupleId: string): Promise<Couple | null> {
    const coupleDoc = await getDoc(doc(db, 'couples', coupleId));
    return coupleDoc.exists() ? (coupleDoc.data() as Couple) : null;
  }

  static async updateCouple(coupleId: string, updates: Partial<Couple>): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId), updates);
  }

  /**
   * TASK OPERATIONS
   */
  static async createTask(coupleId: string, task: Task): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'tasks', task.id), task);
  }

  static async getTasks(coupleId: string): Promise<Task[]> {
    const tasksSnapshot = await getDocs(collection(db, 'couples', coupleId, 'tasks'));
    return tasksSnapshot.docs.map((doc) => doc.data() as Task);
  }

  static async updateTask(coupleId: string, taskId: string, updates: Partial<Task>): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'tasks', taskId), updates);
  }

  static async deleteTask(coupleId: string, taskId: string): Promise<void> {
    await deleteDoc(doc(db, 'couples', coupleId, 'tasks', taskId));
  }

  static onTasksSnapshot(coupleId: string, callback: (tasks: Task[]) => void) {
    return onSnapshot(collection(db, 'couples', coupleId, 'tasks'), (snapshot) => {
      const tasks = snapshot.docs.map((doc) => doc.data() as Task);
      callback(tasks);
    });
  }

  /**
   * DREAM OPERATIONS
   */
  static async createDream(coupleId: string, dream: Dream): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'dreams', dream.id), dream);
  }

  static async getDreams(coupleId: string): Promise<Dream[]> {
    const dreamsSnapshot = await getDocs(collection(db, 'couples', coupleId, 'dreams'));
    return dreamsSnapshot.docs.map((doc) => doc.data() as Dream);
  }

  static async updateDream(coupleId: string, dreamId: string, updates: Partial<Dream>): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'dreams', dreamId), updates);
  }

  static async deleteDream(coupleId: string, dreamId: string): Promise<void> {
    await deleteDoc(doc(db, 'couples', coupleId, 'dreams', dreamId));
  }

  static onDreamsSnapshot(coupleId: string, callback: (dreams: Dream[]) => void) {
    return onSnapshot(collection(db, 'couples', coupleId, 'dreams'), (snapshot) => {
      const dreams = snapshot.docs.map((doc) => doc.data() as Dream);
      callback(dreams);
    });
  }

  /**
   * WATCH LIST OPERATIONS
   */
  static async createWatchItem(coupleId: string, item: WatchItem): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'watchList', item.id), item);
  }

  static async getWatchList(coupleId: string): Promise<WatchItem[]> {
    const watchListSnapshot = await getDocs(collection(db, 'couples', coupleId, 'watchList'));
    return watchListSnapshot.docs.map((doc) => doc.data() as WatchItem);
  }

  static async updateWatchItem(
    coupleId: string,
    itemId: string,
    updates: Partial<WatchItem>
  ): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'watchList', itemId), updates);
  }

  static async deleteWatchItem(coupleId: string, itemId: string): Promise<void> {
    await deleteDoc(doc(db, 'couples', coupleId, 'watchList', itemId));
  }

  static onWatchListSnapshot(coupleId: string, callback: (items: WatchItem[]) => void) {
    return onSnapshot(collection(db, 'couples', coupleId, 'watchList'), (snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data() as WatchItem);
      callback(items);
    });
  }

  /**
   * MEMORY OPERATIONS
   */
  static async createMemory(coupleId: string, memory: Memory): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'memories', memory.id), memory);
  }

  static async getMemories(coupleId: string): Promise<Memory[]> {
    const memoriesSnapshot = await getDocs(
      query(collection(db, 'couples', coupleId, 'memories'), orderBy('date', 'desc'))
    );
    return memoriesSnapshot.docs.map((doc) => doc.data() as Memory);
  }

  static async updateMemory(
    coupleId: string,
    memoryId: string,
    updates: Partial<Memory>
  ): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'memories', memoryId), updates);
  }

  static async deleteMemory(coupleId: string, memoryId: string): Promise<void> {
    await deleteDoc(doc(db, 'couples', coupleId, 'memories', memoryId));
  }

  static onMemoriesSnapshot(coupleId: string, callback: (memories: Memory[]) => void) {
    return onSnapshot(
      query(collection(db, 'couples', coupleId, 'memories'), orderBy('date', 'desc')),
      (snapshot) => {
        const memories = snapshot.docs.map((doc) => doc.data() as Memory);
        callback(memories);
      }
    );
  }

  /**
   * LOVE NOTE OPERATIONS
   */
  static async createLoveNote(coupleId: string, note: LoveNote): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'loveNotes', note.id), note);
  }

  static async getLoveNotes(coupleId: string): Promise<LoveNote[]> {
    const notesSnapshot = await getDocs(
      query(collection(db, 'couples', coupleId, 'loveNotes'), orderBy('sentAt', 'desc'))
    );
    return notesSnapshot.docs.map((doc) => doc.data() as LoveNote);
  }

  static async updateLoveNote(
    coupleId: string,
    noteId: string,
    updates: Partial<LoveNote>
  ): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'loveNotes', noteId), updates);
  }

  static onLoveNotesSnapshot(coupleId: string, callback: (notes: LoveNote[]) => void) {
    return onSnapshot(
      query(collection(db, 'couples', coupleId, 'loveNotes'), orderBy('sentAt', 'desc')),
      (snapshot) => {
        const notes = snapshot.docs.map((doc) => doc.data() as LoveNote);
        callback(notes);
      }
    );
  }

  /**
   * CALENDAR OPERATIONS
   */
  static async createEvent(coupleId: string, event: CalendarEvent): Promise<void> {
    await setDoc(doc(db, 'couples', coupleId, 'events', event.id), event);
  }

  static async getEvents(coupleId: string): Promise<CalendarEvent[]> {
    const eventsSnapshot = await getDocs(
      query(collection(db, 'couples', coupleId, 'events'), orderBy('startTime', 'asc'))
    );
    return eventsSnapshot.docs.map((doc) => doc.data() as CalendarEvent);
  }

  static async updateEvent(
    coupleId: string,
    eventId: string,
    updates: Partial<CalendarEvent>
  ): Promise<void> {
    await updateDoc(doc(db, 'couples', coupleId, 'events', eventId), updates);
  }

  static async deleteEvent(coupleId: string, eventId: string): Promise<void> {
    await deleteDoc(doc(db, 'couples', coupleId, 'events', eventId));
  }

  static onEventsSnapshot(coupleId: string, callback: (events: CalendarEvent[]) => void) {
    return onSnapshot(
      query(collection(db, 'couples', coupleId, 'events'), orderBy('startTime', 'asc')),
      (snapshot) => {
        const events = snapshot.docs.map((doc) => doc.data() as CalendarEvent);
        callback(events);
      }
    );
  }
}
