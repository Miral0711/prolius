import { SearchPanel, SearchBar } from '@/components/shared';

interface VehicleProfilesSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function VehicleProfilesSearchBar({
  value,
  onChange,
  onSearch,
  onClear,
}: VehicleProfilesSearchBarProps) {
  return (
    <SearchPanel>
      <SearchBar
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onClear={onClear}
        placeholder="Search by vehicle profile type, manufacturer, model..."
      />
    </SearchPanel>
  );
}
