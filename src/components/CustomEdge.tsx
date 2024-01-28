'use client'

import React, { FC } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

const CustomEdge: FC<EdgeProps<string[]>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            padding: 10,
            borderRadius: 5,
          }}
          className="nodrag nopan text-[8px] bg-blue-500 text-white"
        >
          {
            data?.map((item) => {
              return (
                <div key={item}>{item}</div>
              )
            })
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
