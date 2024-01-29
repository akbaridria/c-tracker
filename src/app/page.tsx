'use client'

import CustomNode from '@/components/CustomNode';
import CustomEdge from '@/components/CustomEdge';
import FormData from '@/components/FormData';
import { FormResult } from '@/components/FormResult';
import { YourFlow } from '@/components/YourFlow';
import { BeakerIcon, TableIcon, XIcon, ShareIcon, BookmarkAltIcon } from '@heroicons/react/solid';
import { Button } from '@tremor/react';
import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Panel, Position, Edge, NodeTypes, EdgeTypes, MarkerType, useNodesState, useEdgesState, getRectOfNodes, getTransformForBounds } from 'reactflow';
import 'reactflow/dist/style.css';
import { getLayoutedElements } from '@/utils/helper'
import { toPng } from 'html-to-image';
import Notes from '@/components/Notes';
import datas from '@/data.json';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge
};

const imageWidth = 1024;
const imageHeight = 768;

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [activePanels, setActivePanels] = useState(-1);

  const addFlow = (val: string, val_label: string, val2: string, val2_label: string, label: string, chain_name: string) => {
    const dataChain = datas.chains.filter((item) => item.chain_name === chain_name)[0]
    const index = nodes.findIndex((x) => x.id === val);
    if (index === -1) setNodes((prev) => [...prev, { id: val + '-' + chain_name, type: 'custom', sourcePosition: Position.Right, targetPosition: Position.Left, data: { walletAddress: val, chainLogo: dataChain.logo.url, label: val_label, background: dataChain.logo.background }, position: { x: 0, y: 0 }, }])
    const index2 = nodes.findIndex((x) => x.id === val2);
    if (index2 === -1) setNodes((prev) => [...prev, { id: val2 + '-' + chain_name, type: 'custom', sourcePosition: Position.Right, targetPosition: Position.Left, data: { walletAddress: val2, chainLogo: dataChain.logo.url, label: val2_label, background: dataChain.logo.background }, position: { x: 0, y: 0 } }])
    const edge: Edge = { id: `${val + '-' + chain_name} | ${val2 + '-' + chain_name}`, type: 'custom', source: val + '-' + chain_name, target: val2 + '-' + chain_name, animated: true, data: [`-> ${label}`], markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 } }
    const index3 = edges.findIndex((x) => x.id === `${val} - ${val2}`);
    if (index3 === -1) setEdges((prev) => [...prev, edge]);
    else {
      edges[index3].data.push(`-> ${label}`)
    }
  }

  const autoFlow = () => {
    const d = getLayoutedElements(nodes, edges);
    setNodes([...d.nodes])
    setEdges([...d.edges])
  }

  const deleteFlow = (id: string) => {
    const copyArray = [...edges];
    const index = copyArray.findIndex((x) => x.id === id);
    copyArray.splice(index, 1);
    setEdges(copyArray);
  }

  const saveToImage = () => {
    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
      backgroundColor: 'white',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
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
                <Button icon={ShareIcon} variant='secondary' className='w-fit' size='sm' onClick={() => autoFlow()}>
                  Auto Align Flow
                </Button>
                <Button icon={BookmarkAltIcon} variant='secondary' className='w-fit' size='sm' onClick={() => saveToImage()}>
                  Export To Image
                </Button>
                <Notes />
              </div>
              {
                activePanels === 0 &&
                <div className='grid grid-cols-1 gap-4'>
                  <FormData />
                  <FormResult addFlows={(val: string, val_label: string, val2: string, val2_label: string, label: string, chain_name: string) => addFlow(val, val_label, val2, val2_label, label, chain_name)} />
                </div>
              }
              {
                activePanels === 1 &&
                <div className='grid grid-cols-1 gap-4'>
                  <YourFlow flows={edges} deleteFlow={deleteFlow} />
                </div>
              }
            </div>
          </Panel>
          <Controls />
        </ReactFlow>
    </div>
  );
}
