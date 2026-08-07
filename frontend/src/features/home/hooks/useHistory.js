import { useQuery } from "@tanstack/react-query";
import historyService from "@/services/historyService";

function useHistory(options = {}) {
  return useQuery({
    queryKey: ["history"],

    queryFn: async () => {
      const { data } = await historyService.getHistory();

      console.log("History API Response:", data);

      return data.data;
    },

    enabled: options.enabled ?? true,

    staleTime: 1000 * 60 * 5,
  });
}

export { useHistory };
export default useHistory;