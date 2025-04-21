import {
	createSelectorHook,
	createDispatchHook,
	createStoreHook
} from "react-redux"

import type { AppDispatch, AppStore } from "./store"

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> =
// 	useSelector.withTypes<RootState>()

// export const useAppStore = useStore.withTypes<AppStore>()

export const useAppDispatch = createDispatchHook<AppDispatch>()
export const useAppSelector = createSelectorHook()
export const useAppStore = createStoreHook<AppStore>()
