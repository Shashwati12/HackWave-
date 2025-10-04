'use client';

import {
  Users,
  Calendar,
  BarChart3,
  PieChart,
  ShoppingBag,
  Megaphone,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Background } from '../components/ShootingStar';

interface DashboardProps {
  role: 'host' | 'vendor' | 'sponsor';
}

const roleConfigs = {
  host: {
    icon: Users,
    title: 'Event Host Dashboard',
    color: '#6366F1',
    stats: [
      { label: 'Total Events', value: '24', change: '+12%', icon: Calendar },
      { label: 'Total Participants', value: '1.2K', change: '+18%', icon: Users },
      { label: 'Avg. Rating', value: '4.8', change: '+0.2', icon: Sparkles },
    ],
    chartData: {
      participation: [
        { month: 'Jan', value: 120 },
        { month: 'Feb', value: 190 },
        { month: 'Mar', value: 250 },
        { month: 'Apr', value: 320 },
        { month: 'May', value: 280 },
      ],
      eventTypes: [
        { name: 'Workshops', value: 35, color: '#6366F1' },
        { name: 'Meetups', value: 25, color: '#EC4899' },
        { name: 'Webinars', value: 20, color: '#10B981' },
        { name: 'Conferences', value: 20, color: '#F59E0B' },
      ],
    },
  },
  vendor: {
    icon: ShoppingBag,
    title: 'Vendor Dashboard',
    color: '#10B981',
    stats: [
      { label: 'Total Sales', value: '$12.4K', change: '+24%', icon: ShoppingBag },
      { label: 'Active Listings', value: '48', change: '+5%', icon: Calendar },
      { label: 'Avg. Order Value', value: '$258', change: '+8%', icon: BarChart3 },
    ],
    chartData: {
      participation: [
        { month: 'Jan', value: 8000 },
        { month: 'Feb', value: 12000 },
        { month: 'Mar', value: 15000 },
        { month: 'Apr', value: 20000 },
        { month: 'May', value: 18000 },
      ],
      eventTypes: [
        { name: 'Merchandise', value: 40, color: '#10B981' },
        { name: 'Food & Drinks', value: 30, color: '#6366F1' },
        { name: 'Services', value: 30, color: '#F59E0B' },
      ],
    },
  },
  sponsor: {
    icon: Megaphone,
    title: 'Sponsor Dashboard',
    color: '#EC4899',
    stats: [
      { label: 'Total Reach', value: '85.2K', change: '+34%', icon: Megaphone },
      { label: 'Active Campaigns', value: '12', change: '+3', icon: Calendar },
      { label: 'Engagement Rate', value: '4.2%', change: '+0.8%', icon: BarChart3 },
    ],
    chartData: {
      participation: [
        { month: 'Jan', value: 15000 },
        { month: 'Feb', value: 22000 },
        { month: 'Mar', value: 28000 },
        { month: 'Apr', value: 35000 },
        { month: 'May', value: 42000 },
      ],
      eventTypes: [
        { name: 'Social Media', value: 45, color: '#EC4899' },
        { name: 'Email', value: 25, color: '#6366F1' },
        { name: 'Influencers', value: 20, color: '#10B981' },
        { name: 'Ads', value: 10, color: '#F59E0B' },
      ],
    },
  },
};

export default function AnalyticsDashboard({ role }: DashboardProps) {
  const config = roleConfigs[role];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-black p-8">
      <Background />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
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
          <h1 className="text-3xl font-bold text-white">{config.title}</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <StatIcon className="w-6 h-6" style={{ color: config.color }} />
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      stat.change.startsWith('+')
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#B0B3C0]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${config.color}20` }}
                >
                  <BarChart3 className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {role === 'host'
                    ? 'Participant Growth'
                    : role === 'vendor'
                    ? 'Sales Trend'
                    : 'Reach Analytics'}
                </h2>
              </div>
              <Sparkles className="w-6 h-6 text-[#B0B3C0]" />
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={config.chartData.participation}>
                  <XAxis dataKey="month" stroke="#B0B3C0" />
                  <YAxis stroke="#B0B3C0" />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a2e',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" fill={config.color} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Pie Chart */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <PieChart className="w-5 h-5" style={{ color: config.color }} />
              </div>
              <h2 className="text-2xl font-bold text-white">Distribution</h2>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer>
                <RePieChart>
                  <Pie
                    data={config.chartData.eventTypes}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {config.chartData.eventTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
