'use client';

import { Handle, Position, type NodeProps } from 'reactflow';
import { NodeData } from '@/types';


const CustomNode = ({ data } : NodeProps<NodeData>) => {
  return (
    <div className='flex flex-col gap-1 p-3 justify-center items-center rounded-lg border-[1px] border-tremor-brand text-md bg-transparent hover:bg-tremor-brand-faint transition-all'>
      <div className='bg-[#5E798A] rounded-full w-4 h-4'>
        <img src="https://www.datocms-assets.com/86369/1669653891-eth.svg" alt="" className='w-4 h-4' />
      </div>
      <div>unknown</div>
      <div>0x64626225</div>
      <Handle position={Position.Right} type='source' />
      <Handle position={Position.Left} type='target' />
    </div>
  )
}

export default CustomNode;