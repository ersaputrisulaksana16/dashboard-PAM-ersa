import { TaskStatus } from '../types';

// D5: Fungsi generic sederhana untuk mencari item berdasarkan id
export function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find((item) => item.id === id);
}

// Fungsi generic untuk memfilter item berdasarkan status tugas
export function filterByStatus<T extends { status: TaskStatus }>(
  items: T[],
  status: TaskStatus | 'all'
): T[] {
  if (status === 'all') return items;
  return items.filter((item) => item.status === status);
}
