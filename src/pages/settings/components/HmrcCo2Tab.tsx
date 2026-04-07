import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

interface TaxYearRow {
  id: number;
  date: string;
  lastEditedBy: string;
  taxYear: string;
}

const MOCK_ROWS: TaxYearRow[] = [];

export function HmrcCo2Tab() {
  const [rows] = useState<TaxYearRow[]>(MOCK_ROWS);

  const handleAddTaxYear = () => {
    // API-ready placeholder
    console.log('Add new tax year');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Intro + action row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className={cn(typography.body, 'text-slate-500 max-w-2xl')}>
            UK Tax rates applied to vehicles based on their carbon emissions are stored here.
            Select the relevant tax year below.
          </p>
          <p className={cn(typography.meta, 'text-slate-400')}>
            <span className="font-medium text-slate-500">Note:</span> previous tax years cannot be edited.
          </p>
        </div>
        <Button variant="outline" size="md" onClick={handleAddTaxYear} className="shrink-0">
          Add new tax year
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-[#d4e0ea] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#eef4f8] border-b border-[#d4e0ea]">
              <th className={cn(typography.tableHeader, 'px-4 py-3 text-[#3d6b8e] font-semibold')}>Date</th>
              <th className={cn(typography.tableHeader, 'px-4 py-3 text-[#3d6b8e] font-semibold')}>Last Edited By</th>
              <th className={cn(typography.tableHeader, 'px-4 py-3 text-[#3d6b8e] font-semibold')}>Tax Year</th>
              <th className={cn(typography.tableHeader, 'px-4 py-3 text-[#3d6b8e] font-semibold')}>Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className={cn(typography.body, 'px-4 py-8 text-center text-slate-400')}>
                  No tax years added yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-[#e8eef4] last:border-0 hover:bg-[#f4f8fb]">
                  <td className={cn(typography.tableCell, 'px-4 py-3')}>{row.date}</td>
                  <td className={cn(typography.tableCell, 'px-4 py-3')}>{row.lastEditedBy}</td>
                  <td className={cn(typography.tableCell, 'px-4 py-3')}>{row.taxYear}</td>
                  <td className={cn(typography.tableCell, 'px-4 py-3')}>
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
