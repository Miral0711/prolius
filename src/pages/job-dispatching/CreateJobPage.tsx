import {
  PAGE_SHELL_VIEWPORT_FILL_CLASSNAME,
  PAGE_SHELL_VIEWPORT_FILL_CONTENT_CLASSNAME,
  PageShell,
} from '@/components/ui/page-shell';
import {
  ButtonPrimary,
  ButtonSecondary,
  CardFooterActions,
  EmptyState,
  FormInput,
  InputGroup,
  MapContainer,
  SearchField,
  SectionCard,
  SectionHeader,
  SelectDropdown,
  StatField,
  ToggleSwitch,
  TripRemarkField,
} from '@/components/job-dispatching/create-job-components';
import { PageSurface } from '@/components/layout';

const COMMON_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export default function CreateJobPage() {
  return (
    <PageShell
      title="Create Job"
      hideHeader
      className={PAGE_SHELL_VIEWPORT_FILL_CLASSNAME}
      contentWrapperClassName={PAGE_SHELL_VIEWPORT_FILL_CONTENT_CLASSNAME}
    >
      <PageSurface
        padding="sm"
        sectionGap="sm"
        fill
        className="min-h-0 flex-1 bg-[#edf4fb]"
      >
        <PageSurface.Body className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto xl:overflow-hidden">
          <div className="grid min-h-0 min-w-0 w-full flex-1 grid-cols-1 content-start gap-3 xl:grid-cols-[31fr_44fr_25fr] xl:grid-rows-1 xl:items-stretch xl:min-h-0">
            <SectionCard
              title="Job Details"
              className="flex min-h-0 min-w-0 w-full overflow-hidden xl:min-h-0"
              headerClassName="min-h-0 px-2.5 py-1.5"
              contentClassName="flex min-h-0 flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto p-2"
            >
              <div className="space-y-1">
                <SectionHeader title="Locations" />
                <div className="grid grid-cols-1 gap-1">
                  <SearchField
                    label="Pickup"
                    placeholder="Search pickup location"
                  />
                  <SearchField
                    label="Dropoff"
                    placeholder="Search dropoff location"
                  />
                </div>
              </div>

              <div className="my-px h-px shrink-0 bg-[#dce7f5]" />

              <div className="space-y-1">
                <SectionHeader title="Passenger Info" />
                <div className="grid grid-cols-1 gap-1">
                  <FormInput label="Name" placeholder="Passenger name" />
                  <InputGroup
                    label="Contact No"
                    countryCode="+966"
                    placeholder="5X XXX XXXX"
                  />
                  <TripRemarkField />
                </div>
              </div>

              <div className="my-px h-px shrink-0 bg-[#dce7f5]" />

              <div className="space-y-1">
                <SectionHeader title="Booking & Pricing" />
                <div className="grid grid-cols-2 gap-1">
                  <SelectDropdown
                    label="Booking Type"
                    placeholder="Select type"
                    options={COMMON_OPTIONS}
                  />
                  <SelectDropdown
                    label="Payment Method"
                    placeholder="Select method"
                    options={COMMON_OPTIONS}
                  />
                  <ToggleSwitch label="Fare Type" />
                  <FormInput label="Booking Fee" placeholder="0.00" />
                </div>
              </div>

              <div className="my-px h-px shrink-0 bg-[#dce7f5]" />

              <div className="space-y-1">
                <SectionHeader title="Vehicle Constraints" />
                <div className="grid grid-cols-2 gap-1">
                  <SelectDropdown
                    label="Company"
                    placeholder="Select company"
                    options={COMMON_OPTIONS}
                  />
                  <SelectDropdown
                    label="Vehicle Type"
                    placeholder="Select type"
                    options={COMMON_OPTIONS}
                  />
                  <SelectDropdown
                    label="Plate"
                    placeholder="Select plate"
                    options={COMMON_OPTIONS}
                  />
                  <FormInput label="Min Radius (km)" placeholder="2" />
                  <FormInput label="Max Radius (km)" placeholder="8" />
                </div>
              </div>

              <div className="my-px h-px shrink-0 bg-[#dce7f5]" />

              <div className="space-y-1">
                <SectionHeader title="Trip Summary" />
                <div className="grid grid-cols-2 gap-1">
                  <StatField label="Distance" value="-- km" />
                  <StatField label="Duration" value="-- min" />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Route Map"
              className="flex h-full min-h-[14rem] w-full min-w-0 xl:min-h-0"
              contentClassName="h-full min-h-0 p-3"
            >
              <MapContainer />
            </SectionCard>

            <SectionCard
              title="Available Taxis (0)"
              className="flex h-full min-h-[14rem] w-full min-w-0 xl:min-h-0"
              contentClassName="flex h-full min-h-0 flex-col p-3"
            >
              <div className="min-h-0 flex-1">
                <EmptyState
                  icon="taxi"
                  title="No Taxis Available"
                  description="Select a pickup location to view available taxis in the area."
                />
              </div>
              <CardFooterActions>
                <ButtonSecondary>Cancel</ButtonSecondary>
                <ButtonPrimary>Create Job</ButtonPrimary>
              </CardFooterActions>
            </SectionCard>
          </div>
        </PageSurface.Body>
        <PageSurface.Footer />
      </PageSurface>
    </PageShell>
  );
}
