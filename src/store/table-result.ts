import { hookstate, useHookstate } from "@hookstate/core";
import { IForm, IFormResult, IPagination } from '@/types'


const initialState = hookstate<IFormResult[]>([]);
const initialPagination = hookstate<IPagination>({
  page: 0,
  hasMore: false
})
const initialForm = hookstate<IForm>({
  wallet_address: '',
  token_address: '',
  start_block: 0,
  end_block: 0,
  chain_name: 'eth-mainnet'
})
const initialLoading = hookstate(false);

export const useFormLoading = () => {
  const state = useHookstate(initialLoading)

  return {
    setLoading: (l : boolean) => state.set(l),
    getLoading: () => state.get()
  }
}

export const useFormData = () => {
  const state = useHookstate(initialForm)
  return {
    getFormData: () => state,
    setFormData: (data: IForm) => state.set(data)
  }
}

export const useTableResult = () => {
  const state = useHookstate(initialState);
  return {
    getTableResult: () => state,
    setTableResult: (data: IFormResult[]) => state.set(data)
  }
}

export const usePagination = () => {
  const state = useHookstate(initialPagination)

  return {
    getPagination: () => state,
    setPage: (page: number) => state.page.set(page),
    setMore: (more: boolean) => state.hasMore.set(more)
  }
}