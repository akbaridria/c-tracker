'use client';

import { Handle, Position, type NodeProps } from 'reactflow';
import { NodeData } from '@/types';
import { trimWallet } from '@/utils/helper';
import datas from '@/data.json';

const CustomNode = ({ data } : NodeProps<NodeData>) => {
  return (
    <div className='flex flex-col gap-1 p-3 w-[150px] justify-center items-center rounded-lg border-[1px] border-tremor-brand text-sm bg-transparent hover:bg-tremor-brand-faint transition-all'>
      <div className={`bg-[black] rounded-full w-4 h-4`}>
        <img src={data.chainLogo} alt="" className='w-4 h-4' />
      </div>
      <div>{data.label}</div>
      <div>{trimWallet(data.walletAddress)}</div>
      <Handle position={Position.Right} type='source' />
      <Handle position={Position.Left} type='target' />
    </div>
  )
}

export default CustomNode;