import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { PageShell } from '@/components/ui/page-shell';
import { PageSurface, PAGE_SURFACE_FOOTER_PADDING } from '@/components/layout';
import { PanelCard } from '@/components/shared/PanelCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ASSET_PROFILE_DETAIL_MOCK } from './mock-data';

/** Compact label+value row */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#eef4f8] px-3 py-1.5 last:border-b-0">
      <span className="w-[160px] shrink-0 text-xs text-slate-500">{label}</span>
      <span className="flex-1 text-xs font-medium text-slate-800">
        {value || <span className="text-slate-400">—</span>}
      </span>
    </div>
  );
}

/** Compact image slot */
function ImageSlot({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <div className="flex h-14 items-center justify-center rounded border border-dashed border-[#d4e0ea] bg-[#f8fafc] text-2xs text-slate-400">
        No image uploaded
      </div>
    </div>
  );
}

/** Compact defect item */
function DefectItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border border-[#3d6b8e] bg-[#eef4f8]">
        <svg className="h-2 w-2 text-[#3d6b8e]" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5.5L4 8L8.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-xs text-slate-700 leading-tight">{label}</span>
    </div>
  );
}

export default function AssetProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const profile = ASSET_PROFILE_DETAIL_MOCK;

  // Split defects into two balanced columns
  const half = Math.ceil(profile.takeOutReturnDefects.length / 2);
  const defectsCol1 = profile.takeOutReturnDefects.slice(0, half);
  const defectsCol2 = profile.takeOutReturnDefects.slice(half);

  return (
    <PageShell
      title="Asset Profile Details"
      hideHeader
      className="flex h-full min-h-0 flex-1 flex-col space-y-0"
      contentWrapperClassName="relative flex min-h-0 flex-1 flex-col"
    >
      <PageSurface
        padding={PAGE_SURFACE_FOOTER_PADDING}
        fill
        sectionGap="none"
        className="min-h-0 flex-1 bg-[#f0f4f8]"
      >
        <PageSurface.Body className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-col gap-2 pb-2">

            {/* Breadcrumb + Edit button */}
            <div className="flex items-center justify-between gap-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/dashboard/overview" className="text-2sm text-[#3d6b8e] hover:underline">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/asset-management/profiles" className="text-2sm text-[#3d6b8e] hover:underline">Asset Profiles</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-2sm text-slate-600">Details</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <button
                type="button"
                onClick={() => navigate(`/asset-management/profiles/${id ?? profile.id}/edit`)}
                className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-[#d4e0ea] bg-white px-3 text-xs font-medium text-[#3d6b8e] shadow-sm hover:bg-[#eef4f8]"
              >
                <Pencil className="h-3 w-3" />
                Edit Asset Profile
              </button>
            </div>

            {/* ── Row 1: Profile Details (2/3) + Images (1/3) ── */}
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_260px]">

              {/* Profile Details — 2-column info grid */}
              <PanelCard noPadding>
                {/* Card header with status badge inline */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-3 py-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#1e3448]">Asset Profile Details</h3>
                  <StatusBadge
                    label={profile.profileStatus}
                    variant={profile.profileStatus === 'Active' ? 'emerald' : 'slate'}
                    size="sm"
                    preserveCase
                  />
                </div>
                {/* 2-column grid of info rows */}
                <div className="grid grid-cols-2 divide-x divide-[#eef4f8]">
                  {/* Left column */}
                  <div>
                    <InfoRow label="Type" value={profile.type} />
                    <InfoRow label="Category" value={profile.category} />
                    <InfoRow label="Sub category" value={profile.subCategory} />
                    <InfoRow label="Odometer setting" value={profile.odometerSetting} />
                    <InfoRow label="Manufacturer" value={profile.manufacturer} />
                    <InfoRow label="Model" value={profile.model} />
                    <InfoRow label="Fuel type" value={profile.fuelType} />
                    <InfoRow label="Engine type" value={profile.engineType} />
                    <InfoRow label="CO2 (g/km)" value={profile.co2gkm} />
                  </div>
                  {/* Right column */}
                  <div>
                    <InfoRow label="ADR test interval" value={profile.adrTestInterval} />
                    <InfoRow label="Corrosion inspection" value={profile.corrosionInspectionInterval} />
                    <InfoRow label="Laden brake test" value={profile.ladenBrakeTestInterval} />
                    <InfoRow label="Major wheel service" value={profile.majorWheelServiceInterval} />
                    <InfoRow label="PMI interval" value={profile.pmiInterval} />
                    <InfoRow label="Rubber integrity test" value={profile.rubberIntegrityTestInterval} />
                    <InfoRow label="Service frequency" value={profile.serviceFrequency} />
                    <InfoRow label="Tank test interval" value={profile.tankTestInterval} />
                  </div>
                </div>
              </PanelCard>

              {/* Images — 2×2 grid */}
              <PanelCard title="Asset Profile Images">
                <div className="grid grid-cols-2 gap-2">
                  <ImageSlot label="Front view" />
                  <ImageSlot label="Back view" />
                  <ImageSlot label="Left view" />
                  <ImageSlot label="Right view" />
                </div>
              </PanelCard>
            </div>

            {/* ── Row 2: Defects (2/3) + Ad-hoc (1/3) ── */}
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_260px]">

              {/* Take Out / Return Defects — 2-column list with internal scroll */}
              <PanelCard title="Take Out / Return Defects" noPadding>
                <div className="max-h-[320px] overflow-y-auto px-3 py-2">
                  <div className="grid grid-cols-2 gap-x-4">
                    <div>{defectsCol1.map((d) => <DefectItem key={d} label={d} />)}</div>
                    <div>{defectsCol2.map((d) => <DefectItem key={d} label={d} />)}</div>
                  </div>
                </div>
              </PanelCard>

              {/* Ad-hoc Defects */}
              <PanelCard title="Ad-hoc Defects" noPadding>
                {profile.adHocDefects.length === 0 ? (
                  <div className="flex h-full min-h-[80px] items-center justify-center text-xs text-slate-400">
                    No ad-hoc defects defined.
                  </div>
                ) : (
                  <div className="max-h-[320px] overflow-y-auto px-3 py-2">
                    {profile.adHocDefects.map((d) => <DefectItem key={d} label={d} />)}
                  </div>
                )}
              </PanelCard>
            </div>

          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
