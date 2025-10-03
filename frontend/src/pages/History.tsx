'use client';

import {
  Users,
  ShoppingBag,
  Megaphone,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

// ---------- Types ----------
type Role = 'user' | 'host' | 'vendor' | 'sponser' | 'admin';

interface BaseHistoryItem {
  id: number;
  title: string;
  date: string;
  time: string;
  status: keyof typeof statusConfig;
}

interface HostHistoryItem extends BaseHistoryItem {
  participants: number;
  rating: number;
  revenue: string;
  location: string;
}

interface VendorHistoryItem extends BaseHistoryItem {
  quantity: number;
  revenue: string;
  customer: string;
  category: string;
}

interface SponserHistoryItem extends BaseHistoryItem {
  reach: string;
  engagement: string;
  investment: string;
  platform: string;
}

interface AdminHistoryItem extends BaseHistoryItem {
  type: string;
  affected: string;
  action: string;
}

interface RoleConfig<T> {
  icon: React.ElementType;
  title: string;
  color: string;
  historyItems: T[];
}

interface HistoryPageProps {
  role: Role;
}

// ---------- Configs ----------
const statusConfig = {
  completed: { icon: CheckCircle, bg: 'bg-green-500/20', text: 'text-green-400' },
  cancelled: { icon: XCircle, bg: 'bg-red-500/20', text: 'text-red-400' },
  pending: { icon: AlertCircle, bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  active: { icon: TrendingUp, bg: 'bg-blue-500/20', text: 'text-blue-400' },
  resolved: { icon: CheckCircle, bg: 'bg-green-500/20', text: 'text-green-400' },
};

const roleConfigs: Record<Role, RoleConfig<any>> = {
  host: {
    icon: Users,
    title: 'Event History',
    color: '#6366F1',
    historyItems: [
      {
        id: 1,
        title: 'Tech Innovation Summit 2024',
        date: '2024-09-15',
        time: '10:00 AM',
        status: 'completed',
        participants: 324,
        rating: 4.8,
        revenue: '$12,400',
        location: 'Convention Center, NYC',
      },
      {
        id: 4,
        title: 'Startup Pitch Competition',
        date: '2024-07-28',
        time: '11:00 AM',
        status: 'cancelled',
        participants: 0,
        rating: 0,
        revenue: '$0',
        location: 'Business Center, Austin',
      },
    ] as HostHistoryItem[],
  },
  vendor: {
    icon: ShoppingBag,
    title: 'Sales History',
    color: '#10B981',
    historyItems: [
      {
        id: 1,
        title: 'Premium Event Merchandise Package',
        date: '2024-09-20',
        time: '3:45 PM',
        status: 'completed',
        quantity: 250,
        revenue: '$6,250',
        customer: 'Tech Summit Org',
        category: 'Merchandise',
      },
    ] as VendorHistoryItem[],
  },
  sponser: {
    icon: Megaphone,
    title: 'Campaign History',
    color: '#EC4899',
    historyItems: [
      {
        id: 1,
        title: 'Summer Tech Conference Sponsorship',
        date: '2024-09-01',
        time: '9:00 AM',
        status: 'completed',
        reach: '45.2K',
        engagement: '4.8%',
        investment: '$15,000',
        platform: 'Multi-channel',
      },
    ] as SponserHistoryItem[],
  },
  admin: {
    icon: Shield,
    title: 'System Activity Log',
    color: '#F59E0B',
    historyItems: [
      {
        id: 1,
        title: 'User Account Security Update',
        date: '2024-10-01',
        time: '11:23 AM',
        status: 'completed',
        type: 'Security',
        affected: '1,245 users',
        action: 'Password Policy Enhanced',
      },
    ] as AdminHistoryItem[],
  },
  user: {
    icon: Users,
    title: 'User Activity',
    color: '#3B82F6',
    historyItems: [] as BaseHistoryItem[],
  },
};

// ---------- Component ----------
export default function HistoryPage({ role }: HistoryPageProps) {
  const config = roleConfigs[role];
  const Icon = config.icon;
  const [selectedFilter, setSelectedFilter] = useState<'all' | keyof typeof statusConfig>('all');

  const filters: (keyof typeof statusConfig | 'all')[] = [
    'all',
    'completed',
    'active',
    'pending',
    'cancelled',
  ];

  const filteredItems =
    selectedFilter === 'all'
      ? config.historyItems
      : config.historyItems.filter((item) => item.status === selectedFilter);

  return (
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${config.color}, ${config.color}dd)`,
                boxShadow: `0 10px 40px ${config.color}30`,
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{config.title}</h1>
              <p className="text-[#B0B3C0] text-sm mt-1">
                View and manage your activity history
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedFilter === filter
                  ? 'text-white shadow-lg'
                  : 'bg-white/5 text-[#B0B3C0] hover:bg-white/10'
              }`}
              style={
                selectedFilter === filter
                  ? {
                      background: `linear-gradient(135deg, ${config.color}, ${config.color}dd)`,
                      boxShadow: `0 10px 30px ${config.color}30`,
                    }
                  : {}
              }
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredItems.map((item: any, index: number) => {
            const StatusIcon = statusConfig[item.status].icon;
            return (
              <div
                key={item.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                      statusConfig[item.status].bg
                    } ${statusConfig[item.status].text}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm capitalize">{item.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <AlertCircle className="w-10 h-10 text-[#B0B3C0] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No History Found</h3>
            <p className="text-[#B0B3C0]">No items match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
