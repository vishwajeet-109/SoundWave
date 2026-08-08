import axiosInstance from '@/lib/api/axios';

export const approvalApi = {
  getPendingSongs: async () => {
    const response = await axiosInstance.get('approvals/pending');
    return response.data;
  },
  
  approveSong: async (songId) => {
    const response = await axiosInstance.patch(`/admin/songs/${songId}/approve`);
    return response.data;
  },
  
  rejectSong: async ({ songId, reason }) => {
    const response = await axiosInstance.patch(`/admin/songs/${songId}/reject`, { reason });
    return response.data;
  }
};