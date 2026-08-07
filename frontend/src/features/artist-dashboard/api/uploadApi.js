import axiosInstance from '@/lib/api/axios';

export const uploadApi = {
  uploadSong: async (formData) => {
    // Verified backend endpoint requires multipart/form-data
    const response = await axiosInstance.post('/api/v1/songs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};