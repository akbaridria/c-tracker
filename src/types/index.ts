export type NodeData = {
  walletAddress: string,
  chainLogo: string,
  label: string,
  background: string
}

export interface IFormResult {
  date: Date,
  from_address: string,
  from_label: string,
  to_address: string,
  to_label: string,
  token_address: string,
  amount: number,
  chain_name: string
}

export interface IPagination {
  page: number,
  hasMore: boolean
}

export interface IForm {
  wallet_address: string,
  token_address: string,
  start_block: number,
  end_block: number,
  chain_name: string
}