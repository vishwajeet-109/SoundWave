import axiosInstance from '@/lib/api/axios';

export const approvalApi = {
  getPendingSongs: async () => {
    const response = await axiosInstance.get('/api/v1/approvals/pending');
    return response.data;
  },
  
  approveSong: async (songId) => {
    const response = await axiosInstance.post(`/api/v1/approvals/${songId}/approve`);
    return response.data;
  },
  
  rejectSong: async ({ songId, reason }) => {
    const response = await axiosInstance.post(`/api/v1/approvals/${songId}/reject`, { reason });
    return response.data;
  }
};