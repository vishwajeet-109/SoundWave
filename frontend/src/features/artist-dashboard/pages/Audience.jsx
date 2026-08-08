import React, { useState } from 'react';
import { Users, Globe, MapPin, TrendingUp, Heart, UserCheck } from 'lucide-react';

const Audience = () => {
  const [timeframe, setTimeframe] = useState('30d');

  const topCountries = [
    { country: 'India', percentage: 48, listeners: '18.2K' },
    { country: 'United States', percentage: 22, listeners: '8.4K' },
    { country: 'United Kingdom', percentage: 12, listeners: '4.5K' },
    { country: 'Canada', percentage: 10, listeners: '3.8K' },
    { country: 'Germany', percentage: 8, listeners: '3.0K' },
  ];

  const topCities = [
    { city: 'Mumbai, IN', percentage: 32 },
    { city: 'Delhi, IN', percentage: 24 },
    { city: 'Bengaluru, IN', percentage: 18 },
    { city: 'London, UK', percentage: 14 },
    { city: 'New York, US', percentage: 12 },
  ];

  const ageDemographics = [
    { range: '18-24', percentage: 45 },
    { range: '25-34', percentage: 35 },
    { range: '35-44', percentage: 12 },
    { range: '45+', percentage: 8 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">Audience Insights</h1>
          <p className="text-zinc-400 text-sm">Understand where your listeners are located and who loves your music.</p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-fit">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeframe(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                timeframe === range
                  ? 'bg-zinc-800 text-green-500'
                  : 'text-zinc-400 hover:text-zinc-50'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Total Followers</span>
            <UserCheck className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-zinc-50 font-mono">12,480</h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +18.4% <TrendingUp className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Save Rate</span>
            <Heart className="w-4 h-4 text-pink-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-zinc-50 font-mono">24.6%</h2>
            <span className="text-xs font-medium text-green-500 flex items-center">
              +3.1% <TrendingUp className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Active Streamers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold text-zinc-50 font-mono">4,120</h2>
            <span className="text-xs font-medium text-zinc-500">Monthly</span>
          </div>
        </div>
      </div>

      {/* Geographic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-zinc-400" />
            <h3 className="text-lg font-bold text-zinc-50">Top Countries</h3>
          </div>

          <div className="space-y-4">
            {topCountries.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-200">{item.country}</span>
                  <span className="text-zinc-400 font-mono">{item.listeners} ({item.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-zinc-400" />
            <h3 className="text-lg font-bold text-zinc-50">Top Cities</h3>
          </div>

          <div className="space-y-4">
            {topCities.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-200">{item.city}</span>
                  <span className="text-zinc-400 font-mono">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Age Demographics */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5">
        <h3 className="text-lg font-bold text-zinc-50">Age Demographics</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ageDemographics.map((item, idx) => (
            <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-lg space-y-2 text-center">
              <span className="text-xs text-zinc-500 font-medium">Age {item.range}</span>
              <h4 className="text-2xl font-extrabold text-zinc-50 font-mono">{item.percentage}%</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audience;