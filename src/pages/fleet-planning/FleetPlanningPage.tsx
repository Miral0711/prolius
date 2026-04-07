import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { cn } from '@/lib/utils';
import { getCardsForDate } from './mock-data';
import { PlanningTabs, type PlanningTab } from './components/PlanningTabs';
import { PlanningCalendarToolbar } from './components/PlanningCalendarToolbar';
import { MonthlyPlannerCalendar } from './components/MonthlyPlannerCalendar';
import { PlanningFiltersBar } from './components/PlanningFiltersBar';
import { PlanningFilterChips } from './components/PlanningFilterChips';
import { PlanningEventList } from './components/PlanningEventList';
import { VehiclePlanningTab } from './components/VehiclePlanningTab';
import { AssetPlanningTab } from './components/AssetPlanningTab';

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function FleetPlanningPage() {
  const now = new Date();
  const [activeTab, setActiveTab] = useState<PlanningTab>('calendar');
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(
    toDateStr(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const [activeChip, setActiveChip] = useState<'all-contracts' | 'all-types' | 'all-events'>('all-contracts');

  const handlePrev = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  const handleToday = () => {
    const t = new Date();
    setCalYear(t.getFullYear());
    setCalMonth(t.getMonth());
    setSelectedDate(toDateStr(t.getFullYear(), t.getMonth(), t.getDate()));
  };

  const cards = getCardsForDate(selectedDate);

  return (
    <PageSurface padding={PAGE_SURFACE_FOOTER_PADDING} fill sectionGap="none" className="bg-[#EEF5FB]">
      <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col px-4 pt-3 gap-3">

          {/* Tabs + Export action */}
          <div className="shrink-0 flex items-center justify-between border-b border-slate-200">
            <PlanningTabs activeTab={activeTab} onChange={setActiveTab} />
            <Button variant="outline" size="md" className="mb-px">
              <Download className="size-4" />
              Export planner
            </Button>
          </div>

          {/* Main content */}
          {activeTab === 'calendar' ? (
            <div className="flex min-h-0 flex-1 gap-3 overflow-hidden pb-1">

              {/* LEFT: Calendar */}
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                <div className="shrink-0 border-b border-slate-200 px-4 py-3">
                  <PlanningCalendarToolbar
                    year={calYear}
                    month={calMonth}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onToday={handleToday}
                  />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <MonthlyPlannerCalendar
                    year={calYear}
                    month={calMonth}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                  />
                </div>
              </div>

              {/* RIGHT: Planning panel */}
              <div className="flex w-[340px] shrink-0 flex-col gap-2.5 overflow-hidden xl:w-[380px]">
                {/* Filters bar */}
                <div className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <PlanningFiltersBar selectedDate={selectedDate} />
                  <div className="mt-2">
                    <PlanningFilterChips active={activeChip} onChange={setActiveChip} />
                  </div>
                </div>

                {/* Event cards — scrollable */}
                <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
                  <PlanningEventList cards={cards} />
                </div>
              </div>

            </div>
          ) : activeTab === 'vehicle-planning' ? (
            <VehiclePlanningTab />
          ) : (
            <AssetPlanningTab />
          )}

        </div>
      </PageSurface.Body>
      <PageSurface.Footer />
    </PageSurface>
  );
}
