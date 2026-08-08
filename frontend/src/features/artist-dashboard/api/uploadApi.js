import axiosInstance from '@/lib/api/axios';

export const uploadApi = {
  uploadSong: async (formData) => {
    const response = await axiosInstance.post('/songs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};