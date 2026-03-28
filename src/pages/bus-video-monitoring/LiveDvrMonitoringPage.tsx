import { useMemo, useState } from 'react';
import { DUMMY_MAP_CENTER } from '@/data/bus-live-tracking-mock-data';
import { BusLiveMapCard } from '@/pages/bus-tracking/components/BusLiveMapCard';
import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Camera, Monitor, Video, WifiOff } from 'lucide-react';
import { StripKpiCard, type StripKpiTint } from '@/components/ui/strip-kpi-card';
import {
  CameraTile,
  DeviceListPanel,
  MonitoringToolbar,
  type DeviceCompany,
  type MonitoringTab,
} from './components';
import { DVRPageLayout } from './components/dvr/shared/DVRPageLayout';

const MONITORING_KPIS: {
  label: string;
  value: number;
  icon: LucideIcon;
  tint: StripKpiTint;
}[] = [
  { label: 'Live Cameras', value: 124, icon: Camera, tint: 'blue' },
  { label: 'Offline', value: 3, icon: WifiOff, tint: 'rose' },
  { label: 'Recording', value: 118, icon: Video, tint: 'emerald' },
  { label: 'Alerts', value: 5, icon: AlertTriangle, tint: 'amber' },
  { label: 'Devices', value: 427, icon: Monitor, tint: 'slate' },
];

const DEVICE_COMPANIES: DeviceCompany[] = [
  { name: 'AL WATANIAH GROUP', online: 4, offline: 2, totalVehicles: 8 },
  { name: 'AL MAJD BUS SERVICES', online: 4, offline: 3, totalVehicles: 7 },
  { name: 'ARQ AL HEJAZ EST', online: 3, offline: 3, totalVehicles: 6 },
  { name: 'SAHARA FLEET COMPANY', online: 3, offline: 6, totalVehicles: 9 },
  { name: 'AL FAYHA LOGISTICS', online: 2, offline: 3, totalVehicles: 5 },
  { name: 'DAR AL AMAN CO', online: 2, offline: 2, totalVehicles: 4 },
  { name: 'GULF LINE TRANSPORT', online: 2, offline: 4, totalVehicles: 6 },
  { name: 'ALBADR ELWADEH EST', online: 2, offline: 7, totalVehicles: 9 },
  { name: 'AL RAWDAH FLEET', online: 1, offline: 3, totalVehicles: 4 },
  { name: 'AL RAYYAN COMPANY', online: 1, offline: 2, totalVehicles: 3 },
  { name: 'ALNASEEM TRAVEL EST', online: 1, offline: 1, totalVehicles: 2 },
  { name: 'NOOR AL RIYADH EST', online: 1, offline: 4, totalVehicles: 5 },
  { name: 'ABDULLAH ALARIFI EST', online: 0, offline: 1, totalVehicles: 1 },
];

export default function LiveDvrMonitoringPage() {
  const [activeTab, setActiveTab] = useState<MonitoringTab>('video');
  const [search, setSearch] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(
    new Set(),
  );

  const filteredDevices = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return DEVICE_COMPANIES;
    return DEVICE_COMPANIES.filter((company) =>
      company.name.toLowerCase().includes(query),
    );
  }, [search]);

  const toggleDeviceSelection = (
    deviceName: string,
    checked: boolean | 'indeterminate',
  ) => {
    setSelectedDevices((prev) => {
      const next = new Set(prev);
      if (checked === true) {
        next.add(deviceName);
      } else {
        next.delete(deviceName);
      }
      return next;
    });
  };

  return (
    <DVRPageLayout
      title="Live DVR Monitoring"
      gridClassName="gap-2"
      leftColumnClassName="w-[260px]"
      leftPanel={
        <DeviceListPanel
          search={search}
          onSearchChange={setSearch}
          filteredDevices={filteredDevices}
          selectedDevices={selectedDevices}
          onToggleDevice={toggleDeviceSelection}
        />
      }
      centerPanel={
        <div className="flex min-h-0 flex-1 flex-col gap-2 min-w-0 overflow-hidden">
          {/* Surveillance KPI Strip — same tiles as Live Bus Tracking */}
          <div className="flex min-w-0 shrink-0 gap-2.5">
            {MONITORING_KPIS.map((k, i) => (
              <StripKpiCard
                key={i}
                label={k.label}
                value={k.value}
                icon={k.icon}
                tint={k.tint}
                className="min-w-0 flex-1"
              />
            ))}
          </div>

          {/* Main Console */}
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden rounded-md border border-white/30 bg-white/60 p-1.5 shadow-lg backdrop-blur-xl">
            <MonitoringToolbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="flex min-h-0 flex-1 flex-col">
              {activeTab === 'video' ? (
                <div className="grid h-full min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: 'CAM 1',
                      plate: 'KSA-1029',
                      driver: 'Ahmed Ali',
                      location: 'Front',
                    },
                    {
                      id: 'CAM 2',
                      plate: 'KSA-2041',
                      driver: 'Sami Khan',
                      location: 'Rear',
                    },
                    {
                      id: 'CAM 1',
                      plate: 'KSA-8832',
                      driver: 'Omar Said',
                      location: 'Front',
                    },
                    {
                      id: 'CAM 4',
                      plate: 'KSA-1029',
                      driver: 'Ahmed Ali',
                      location: 'Cabin',
                    },
                    {
                      id: 'CAM 1',
                      plate: 'KSA-5561',
                      driver: 'John Doe',
                      location: 'Main',
                    },
                    {
                      id: 'CAM 2',
                      plate: 'KSA-9122',
                      driver: 'Ali Baba',
                      location: 'Exit',
                    },
                  ].map((cam, i) => (
                    <CameraTile
                      key={i}
                      id={cam.id}
                      plate={cam.plate}
                      driver={cam.driver}
                      location={cam.location}
                      isLive={i !== 2}
                      hasAlert={i === 1}
                      alertType={i === 1 ? 'Recording Error' : undefined}
                      className="h-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full rounded-xl overflow-hidden border border-slate-200">
                  <BusLiveMapCard
                    center={DUMMY_MAP_CENTER}
                    marker={null}
                    height="100%"
                    className="border-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}


