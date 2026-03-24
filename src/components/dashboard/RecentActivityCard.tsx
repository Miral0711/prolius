import { CheckCircle, MapPin, Truck } from 'lucide-react';
import { DashboardCard } from './DashboardCard';

const MOCK_ACTIVITIES = [
  {
    driver: 'Ahmed M.',
    action: 'Completed trip from Riyadh to Jeddah',
    time: '15 min ago',
    icon: CheckCircle,
  },
  {
    driver: 'Sarah L.',
    action: 'Started trip to Dammam',
    time: '32 min ago',
    icon: MapPin,
  },
  {
    driver: 'Omar K.',
    action: 'Vehicle TR-8412 arrived at depot',
    time: '1 hr ago',
    icon: Truck,
  },
  {
    driver: 'Fatima A.',
    action: 'Completed maintenance check',
    time: '2 hr ago',
    icon: CheckCircle,
  },
];

export function RecentActivityCard() {
  return (
    <DashboardCard>
      <h3 className="mb-1 text-xs font-medium text-slate-800">
        Recent Activity
      </h3>
      <div className="space-y-1">
        {MOCK_ACTIVITIES.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div key={i} className="flex items-start gap-1.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-slate-600">
                <Icon className="h-3 w-3" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-800">
                  <span className="font-medium">{activity.driver}</span>
                  {' — '}
                  {activity.action}
                </p>
                <p className="text-[11px] text-slate-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
