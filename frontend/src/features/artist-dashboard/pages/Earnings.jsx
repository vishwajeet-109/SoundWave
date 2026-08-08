import React, { useState } from 'react';
import { DollarSign, ArrowDownRight, CreditCard, History, CheckCircle2 } from 'lucide-react';
import { useArtistStats } from '../hooks/useArtistDashboard';

const Earnings = () => {
  const { data: stats } = useArtistStats();
  const [payoutRequested, setPayoutRequested] = useState(false);

  const currentBalance = stats?.revenue || 142.50;

  const payoutHistory = [
    { id: 'PO-9821', date: '2026-07-15', amount: 280.00, status: 'Completed', method: 'Bank Transfer' },
    { id: 'PO-8712', date: '2026-06-01', amount: 195.40, status: 'Completed', method: 'PayPal' },
    { id: 'PO-7621', date: '2026-04-18', amount: 310.20, status: 'Completed', method: 'Bank Transfer' },
  ];

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 4000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">Earnings & Royalties</h1>
        <p className="text-zinc-400 text-sm">Monitor your stream revenue and manage payout requests.</p>
      </div>

      {payoutRequested && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Payout request submitted! Processing takes 1-3 business days.</span>
        </div>
      )}

      {/* Balance Card & Payout Action */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Available Balance</span>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-zinc-50 tracking-tight font-mono">
              ${currentBalance.toFixed(2)}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Minimum payout threshold: $50.00</p>
          </div>

          <button
            onClick={handleRequestPayout}
            disabled={currentBalance < 50}
            className="w-fit bg-green-500 hover:bg-green-400 text-black px-6 py-2.5 rounded-full font-bold text-sm transition-colors disabled:opacity-50"
          >
            Request Payout
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium uppercase tracking-wider">Payout Method</span>
            <CreditCard className="w-5 h-5 text-zinc-400" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-50">Direct Bank Deposit</p>
            <p className="text-xs text-zinc-500">Account ending in **** 4092</p>
          </div>

          <button className="text-xs font-medium text-zinc-400 hover:text-zinc-50 underline w-fit">
            Update Payment Info
          </button>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-bold text-zinc-50">Payout History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950/60 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Payout ID</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {payoutHistory.map((po) => (
                <tr key={po.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-zinc-300">{po.id}</td>
                  <td className="py-3 px-4 text-zinc-400 text-xs">{po.date}</td>
                  <td className="py-3 px-4 text-zinc-300 text-xs">{po.method}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      {po.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-zinc-50 text-xs">
                    ${po.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;