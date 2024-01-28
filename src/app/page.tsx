'use client'

import CustomNode from '@/components/CustomNode';
import CustomEdge from '@/components/CustomEdge';
import FormData from '@/components/FormData';
import { FormResult } from '@/components/FormResult';
import { YourFlow } from '@/components/YourFlow';
import { BeakerIcon, TableIcon, XIcon } from '@heroicons/react/solid';
import { Button } from '@tremor/react';
import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, Position, Edge, NodeTypes, EdgeTypes, MarkerType, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '@/utils/helper'

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [activePanels, setActivePanels] = useState(-1);

  const addFlow = (val: string, val_label: string, val2: string, val2_label: string, label: string) => {
    const index = nodes.findIndex((x) => x.id === val);
    if (index === -1) setNodes((prev) => [...prev, { id: val, type: 'custom', sourcePosition: Position.Right, targetPosition: Position.Left, data: { walletAddress: val, chainLogo: val_label, label: val_label }, position: { x: 0, y: 0 }, }])
    const index2 = nodes.findIndex((x) => x.id === val2);
    if (index2 === -1) setNodes((prev) => [...prev, { id: val2, type: 'custom', sourcePosition: Position.Right, targetPosition: Position.Left, data: { walletAddress: val2, chainLogo: val2_label, label: val2_label }, position: { x: 0, y: 0 } }])
    const edge: Edge = { id: `${val} - ${val2}`, type: 'custom', source: val, target: val2, animated: true, data: [`-> ${label}`], markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 } }
    const index3 = edges.findIndex((x) => x.id === `${val} - ${val2}` );
    if(index3 === -1) setEdges((prev) => [...prev, edge]);
    else {
      edges[index3].data.push(`-> ${label}`)
    }
  }

  const autoFlow = () => {
    const d = getLayoutedElements(nodes, edges);
    setNodes([...d.nodes])
    setEdges([...d.edges])
  }

  return (
    <div className='w-screen h-screen'>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView>
        <Background />
        <Panel position="top-left">
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex gap-4'>
              {
                activePanels === 0
                  ? <Button icon={XIcon} variant='secondary' className='w-fit' size='sm' onClick={() => setActivePanels(-1)}>
                    Close Form
                  </Button>
                  : <Button icon={BeakerIcon} variant='secondary' className='w-fit' size='sm' onClick={() => setActivePanels(0)}>
                    Open Form
                  </Button>
              }
              {
                activePanels === 1
                  ? <Button icon={XIcon} variant='secondary' className='w-fit' size='sm' onClick={() => setActivePanels(-1)}>
                    Close Flow
                  </Button>
                  : <Button icon={TableIcon} variant='secondary' className='w-fit' size='sm' onClick={() => setActivePanels(1)}>
                    Open Flow
                  </Button>
              }
              <Button icon={XIcon} variant='secondary' className='w-fit' size='sm' onClick={() => autoFlow()}>
                Auto Align Flow
              </Button>
            </div>
            {
              activePanels === 0 &&
              <div className='grid grid-cols-1 gap-4'>
                <FormData />
                <FormResult addFlows={(val: string, val_label: string, val2: string, val2_label: string, label: string) => addFlow(val, val_label, val2, val2_label, label)} />
              </div>
            }
            {
              activePanels === 1 &&
              <div className='grid grid-cols-1 gap-4'>
                <YourFlow />
              </div>
            }
          </div>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
}
