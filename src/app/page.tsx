'use client'

import CustomNode from '@/components/CustomNode';
import CustomEdge from '@/components/CustomEdge';
import FormData from '@/components/FormData';
import { FormResult } from '@/components/FormResult';
import { YourFlow } from '@/components/YourFlow';
import { SearchIcon } from '@heroicons/react/solid';
import { Button } from '@tremor/react';
import React, { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, Node, NodeChange, Panel, applyNodeChanges, Position, Edge, NodeTypes, EdgeTypes, MarkerType } from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', type: 'custom', sourcePosition: 'right' as Position, targetPosition: 'left' as Position, position: { x: 0, y: 0 }, data: { walletAddress: '1', chainLogo: '2', label: '3' } },
  { id: '2', type: 'custom', targetPosition: 'left' as Position, position: { x: 0, y: 100 }, data: { walletAddress: '1', chainLogo: '2', label: '3' } },
];
const initialEdges: Edge[] = [{
  id: 'e1-2', source: '1', target: '2', type: 'bezier', data: { label: 'ini disini' }, markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20
  },
  label: 'Transfer 20K USDC',
  animated: true
}];

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

export default function Home() {
  const [nodes, setNodes] = useState(initialNodes);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <div className='h-screen w-screen'>
      <ReactFlow nodes={nodes} edges={initialEdges} onNodesChange={onNodesChange} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView>
        <Background />
        <Panel position="top-left">
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex gap-4'>
              <Button icon={SearchIcon} variant='secondary' className='w-fit' size='sm'>
                Open Form
              </Button>
              <Button icon={SearchIcon} variant='secondary' className='w-fit' size='sm'>
                Open Data
              </Button>
            </div>
            <div className='flex gap-4'>
              {/* <FormData /> */}
              {/* <FormResult /> */}
              {/* <YourFlow /> */}
            </div>
          </div>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}
