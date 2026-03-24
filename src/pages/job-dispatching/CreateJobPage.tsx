import { PageSurface } from '@/components/layout';
import { PageFooter } from '@/components/shared/PageFooter';
import {
  ButtonPrimary,
  ButtonSecondary,
  CardFooterActions,
  EmptyState,
  FormInput,
  InputGroup,
  MapContainer,
  PageContentShell,
  PageContainer,
  SearchField,
  SectionCard,
  SectionHeader,
  SelectDropdown,
  StatField,
  ToggleSwitch,
  TripRemarkField,
} from '@/components/job-dispatching/create-job-components';

const COMMON_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export default function CreateJobPage() {
  return (
    <PageSurface padding="sm" fill sectionGap="sm" className="min-h-0 flex-1 bg-[#edf4fb]">
      <PageSurface.Body className="min-h-0 flex-1 overflow-hidden">
        <PageContainer>
          <PageContentShell>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 xl:grid-cols-[35%_40%_25%]">
              <SectionCard title="Job Details" className="min-h-0" contentClassName="flex min-h-0 flex-col gap-2.5 overflow-y-auto pr-1.5">
                <div className="space-y-2">
                  <SectionHeader title="Locations" />
                  <div className="grid grid-cols-1 gap-2">
                    <SearchField label="Pickup" placeholder="Search pickup location" />
                    <SearchField label="Dropoff" placeholder="Search dropoff location" />
                  </div>
                </div>

                <div className="h-px bg-[#dce7f5]" />

                <div className="space-y-2">
                  <SectionHeader title="Passenger Info" />
                  <div className="grid grid-cols-1 gap-2">
                    <FormInput label="Name" placeholder="Passenger name" />
                    <InputGroup label="Contact No" countryCode="+966" placeholder="5X XXX XXXX" />
                    <TripRemarkField />
                  </div>
                </div>

                <div className="h-px bg-[#dce7f5]" />

                <div className="space-y-2">
                  <SectionHeader title="Booking & Pricing" />
                  <div className="grid grid-cols-2 gap-2">
                    <SelectDropdown label="Booking Type" placeholder="Select type" options={COMMON_OPTIONS} />
                    <SelectDropdown label="Payment Method" placeholder="Select method" options={COMMON_OPTIONS} />
                    <ToggleSwitch label="Fare Type" />
                    <FormInput label="Booking Fee" placeholder="0.00" />
                  </div>
                </div>

                <div className="h-px bg-[#dce7f5]" />

                <div className="space-y-2">
                  <SectionHeader title="Vehicle Constraints" />
                  <div className="grid grid-cols-2 gap-2">
                    <SelectDropdown label="Company" placeholder="Select company" options={COMMON_OPTIONS} />
                    <SelectDropdown label="Vehicle Type" placeholder="Select type" options={COMMON_OPTIONS} />
                    <SelectDropdown label="Plate" placeholder="Select plate" options={COMMON_OPTIONS} />
                    <FormInput label="Min Radius (km)" placeholder="2" />
                    <FormInput label="Max Radius (km)" placeholder="8" />
                  </div>
                </div>

                <div className="h-px bg-[#dce7f5]" />

                <div className="space-y-2">
                  <SectionHeader title="Trip Summary" />
                  <div className="grid grid-cols-2 gap-2">
                    <StatField label="Distance" value="-- km" />
                    <StatField label="Duration" value="-- min" />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Route Map" className="min-h-0" contentClassName="h-full min-h-0 p-3">
                <MapContainer />
              </SectionCard>

              <SectionCard
                title="Available Taxis (0)"
                className="min-h-0"
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
          </PageContentShell>
        </PageContainer>
      </PageSurface.Body>
      <PageSurface.Footer className="pt-0">
        <PageFooter variant="subtle" />
      </PageSurface.Footer>
    </PageSurface>
  );
}
