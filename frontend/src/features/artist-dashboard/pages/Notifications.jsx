import React, { useState } from 'react';
import { Bell, CheckCircle2, DollarSign, Music, Clock, Trash2, Filter, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      type: 'release',
      title: 'Track Approved & Live',
      message: 'Your new single "Midnight Dreams" has passed verification and is now live.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'milestone',
      title: '10,000 Streams Reached!',
      message: 'Congratulations! "Midnight Dreams" passed 10K total plays across all feeds.',
      time: '1 day ago',
      read: false,
    },
    {
      id: 3,
      type: 'royalty',
      title: 'Monthly Earnings Updated',
      message: 'Your estimated royalty calculation for last month is now available in Earnings.',
      time: '3 days ago',
      read: true,
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Updated Successfully',
      message: 'Your artist avatar and social media links were updated.',
      time: '5 days ago',
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const filteredNotifications = notificationList.filter((item) => {
    if (filter === 'unread') return !item.read;
    if (filter === 'release') return item.type === 'release';
    if (filter === 'royalty') return item.type === 'royalty';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'release':
        return <Music className="w-4 h-4 text-purple-400" />;
      case 'royalty':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'milestone':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">Notifications</h1>
          <p className="text-zinc-400 text-sm">Stay updated with your latest track activities and platform alerts.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            Mark all read
          </button>
          <span className="text-zinc-700">|</span>
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
        <Filter className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" />
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'release', label: 'Releases' },
          { key: 'royalty', label: 'Earnings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              filter === tab.key
                ? 'bg-zinc-800 text-zinc-50 border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-zinc-900 border border-zinc-800 rounded-xl">
            <Bell className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 text-sm">No notifications found.</p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-colors flex items-start gap-4 ${
                item.read
                  ? 'bg-zinc-900/60 border-zinc-800/80'
                  : 'bg-zinc-900 border-zinc-700/80'
              }`}
            >
              <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex-shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-zinc-50 truncate">{item.title}</h4>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3" /> {item.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.message}</p>
              </div>

              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;