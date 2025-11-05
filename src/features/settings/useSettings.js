import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isPending,
    error,
    data: setting,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, error, setting };
}
