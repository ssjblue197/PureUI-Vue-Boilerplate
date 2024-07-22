import type { STATUS } from '@/types/task';
import IconPending from '@/assets/icons/pending.svg';
import IconInProgress from '@/assets/icons/in_progress.svg';
import IconInReview from '@/assets/icons/in_review.svg';
import IconRejected from '@/assets/icons/rejected.svg';
import IconCancelled from '@/assets/icons/cancelled.svg';
import IconCompleted from '@/assets/icons/completed.svg';

export const StatusClasses: Record<STATUS, string> = {
  pending:
    'bg-sunset-1 text-sunset-6 border-sunset-3 px-2 py-[1px] text-sm leading-[157%] rounded border',
  in_progress:
    'bg-primary-1 text-primary-6 border-primary-3 px-2 py-[1px] text-sm leading-[157%] rounded border',
  in_review:
    'bg-purple-1 text-purple-6 border-purple-3 px-2 py-[1px] text-sm leading-[157%] rounded border',
  rejected:
    'bg-red-1 text-red-6 border-red-3 px-2 py-[1px] text-sm leading-[157%] rounded border',
  completed:
    'bg-green-1 text-green-6 border-green-3 px-2 py-[1px] text-sm leading-[157%] rounded border',
  cancelled:
    'bg-neutral-2 text-neutral- border-neutral-5 px-2 py-[1px] text-sm leading-[157%] rounded border',
};

export const StatusIcons: Record<STATUS, any> = {
  pending: IconPending,
  in_progress: IconInProgress,
  in_review: IconInReview,
  rejected: IconRejected,
  completed: IconCompleted,
  cancelled: IconCancelled,
};

export const statusList: {
  text: string;
  value: STATUS;
}[] = [
  {
    text: 'Pending',
    value: 'pending',
  },
  {
    text: 'In progress',
    value: 'in_progress',
  },
  {
    text: 'In review',
    value: 'in_review',
  },
  {
    text: 'Rejected',
    value: 'rejected',
  },
  {
    text: 'Completed',
    value: 'completed',
  },
  {
    text: 'Cancelled',
    value: 'cancelled',
  },
];
