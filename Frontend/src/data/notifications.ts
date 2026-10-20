import type { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'note-1',
    title: 'Consultation accepted',
    message: 'Kavya Iyer (Demo) accepted your video consultation request.',
    createdAt: '2026-09-19T09:00:00.000Z',
    read: false,
  },
  {
    id: 'note-2',
    title: 'Document processing',
    message: 'settlement-letter-demo.docx is still processing (mock status).',
    createdAt: '2026-09-02T10:00:00.000Z',
    read: true,
  },
  {
    id: 'note-3',
    title: 'Reminder',
    message: 'Upcoming demo consultation on 28 Sep at 11:00.',
    createdAt: '2026-09-22T08:00:00.000Z',
    read: false,
  },
];
