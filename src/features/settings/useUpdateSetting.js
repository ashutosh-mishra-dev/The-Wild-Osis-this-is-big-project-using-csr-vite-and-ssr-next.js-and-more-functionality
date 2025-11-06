import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("setting successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isUpdating };
}
