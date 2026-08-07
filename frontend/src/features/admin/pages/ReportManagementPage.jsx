import React, { useEffect, useState } from "react";
import adminService from "@/services/adminService";

export default function ReportManagementPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await adminService.getReports();
        setReports(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <div className="text-white p-6">Loading reports...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Content & Song Reports</h2>
      
      {reports.length === 0 ? (
        <p className="text-gray-400">No active reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex justify-between items-center">
              <div>
                <p className="font-semibold text-red-400">Reason: {report.reason || report.message}</p>
                <p className="text-sm text-gray-300 mt-1">Target Song/Artist ID: {report.targetId || report.song}</p>
                <p className="text-xs text-gray-500 mt-1">Reported by: {report.user?.name || "Anonymous"}</p>
              </div>
              <span className="px-3 py-1 bg-amber-600/30 border border-amber-500 text-amber-300 text-xs rounded">
                {report.status || "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}