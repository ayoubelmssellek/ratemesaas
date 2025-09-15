import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockAPI } from '../API/mockData';

// Dashboard
export const useDashboardData = () => useQuery({
  queryKey: ['dashboardData'],
  queryFn: mockAPI.getDashboardData,
  refetchOnWindowFocus: false,
});

// Reviews
export const useReviews = (filters = {}) => useQuery({
  queryKey: ['reviews', filters],
  queryFn: () => mockAPI.getReviews(filters),
  refetchOnWindowFocus: false,
});

// Update profile
export const useUpdateBusinessProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mockAPI.updateBusinessProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey:['dashboardData'] }),
  });
};

// QR Codes
export const useQRCode = () => useQuery({ queryKey:['qrCodes'], queryFn:mockAPI.getQRCodes, refetchOnWindowFocus:false });
export const useGenerateQRCode = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn:mockAPI.generateQRCode, onSuccess:()=>qc.invalidateQueries(['qrCodes']) });
};
export const useDeleteQRCode = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn:mockAPI.deleteQRCode, onSuccess:()=>qc.invalidateQueries(['qrCodes']) });
};
export const useDownloadQRCode = () => useMutation({ mutationFn:mockAPI.downloadQRCode });
export const useResetQRCode = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn:mockAPI.useResetQRCode, onSuccess:()=>qc.invalidateQueries(['qrCodes']) });
};
