import { useState } from 'react';
import {
  Check,
  EllipsisVertical,
  Gem,
  Hexagon,
  Layers2,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Team {
  icon: React.ElementType;
  name: string;
  color: string;
  members: number;
  balance: number;
  change: number;
}

export function SidebarHeader() {
  const teams: Team[] = [
    {
      icon: Zap,
      name: 'Thunder AI',
      color: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
      members: 8,
      balance: 1245,
      change: 0.9,
    },
    {
      icon: Gem,
      name: 'Clarity AI',
      color: 'bg-fuchsia-600 text-white',
      members: 8,
      balance: 982,
      change: -1.2,
    },
    {
      icon: Hexagon,
      name: 'Lightning AI',
      color: 'bg-yellow-600 text-white',
      members: 8,
      balance: 1530,
      change: 2.5,
    },
    {
      icon: Layers2,
      name: 'Bold AI',
      color: 'bg-blue-600 text-white',
      members: 8,
      balance: 760,
      change: -0.4,
    },
  ];

  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);

  return (
    <div className="bg-gray-50 rounded-md p-4 shrink-0 flex items-center justify-between mx-2.5 mt-2.5 border border-gray-200">
      <Link to="/dashboard" className="flex items-center gap-1.5">
        <Button size="md" mode="icon" className={selectedTeam.color}>
          <selectedTeam.icon className="size-5" />
        </Button>
        <div className="flex flex-col">
          <span className="text-mono text-xs font-medium text-gray-900">
            {selectedTeam.name}
          </span>

          <span className="text-gray-500 font-inter text-xs font-normal leading-tight">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(selectedTeam.balance)}{' '}
            <Badge
              variant={selectedTeam.change >= 0 ? 'success' : 'danger'}
            >
              {selectedTeam.change > 0 ? '+' : ''}
              {selectedTeam.change}%
            </Badge>
          </span>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            mode="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <EllipsisVertical className="opacity-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          side="bottom"
          align="end"
          sideOffset={10}
          alignOffset={-10}
        >
          {teams.map((team) => (
            <DropdownMenuItem
              key={team.name}
              onClick={() => setSelectedTeam(team)}
              data-active={selectedTeam.name === team.name}
            >
              <div
                className={cn(
                  'size-6 rounded-md flex items-center justify-center',
                  team.color,
                )}
              >
                <team.icon className="size-4" />
              </div>
              <span className="text-mono text-xs font-medium">{team.name}</span>
              {selectedTeam.name === team.name && (
                <Check className="ms-auto size-4 text-green-600" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


