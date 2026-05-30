import { IAccess } from '@src/models/auth'
import { create } from 'zustand'


// ---------------- Store ----------------
interface UserAccessState {
    userAccess: IAccess[] | null
    setUserAccess: (access: IAccess[]) => void
    clearUserAccess: () => void
    updateAccessData: (data: IAccess[]) => void
}

// ✅ NAMED EXPORT
export const useUserAccessStore = create<UserAccessState>((set) => ({
    userAccess: null,

    setUserAccess: (access) => set({ userAccess: access }),

    clearUserAccess: () => set({ userAccess: null }),

    updateAccessData: (data) =>
        set((state) =>
            state.userAccess
                ? { userAccess: { ...state.userAccess, data } }
                : state
        ),
}))