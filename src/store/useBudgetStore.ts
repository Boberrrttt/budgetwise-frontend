import { create } from "zustand";

interface BudgetState {
  groupName: string | null;
  groupId: number | null;
  plan: PlanTypes | null;
  setGroup: (name: string, id: number) => void;
  setBudgetPlan: (plan: PlanTypes) => void;
  resetGroup: () => void;
  resetBudgetPlan: () => void;
}
interface PlanTypes {
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
}

const useBudgetStore = create<BudgetState>((set) => ({
  groupName: null,
  groupId: null,
  plan: null,
  setGroup: (name, id) => set({ groupName: name, groupId: id}),
  setBudgetPlan: (plan) => set({ plan: plan}),
  resetGroup: () => set({ groupName: null, groupId: null}),
  resetBudgetPlan: () => set({plan: null})
}));

export default useBudgetStore;
