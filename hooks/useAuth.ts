import { useBoundStore } from "@/lib/useBondStore";

export default function useAuth() {
  const authToken = useBoundStore(state => state.token);
  return !!authToken;
}
