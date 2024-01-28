import { IForm, IFormResult } from "@/types";
import { Chain, CovalentClient, Pagination } from "@covalenthq/client-sdk";
import { Edge, Node, Position } from "reactflow";
import dagre from 'dagre';

export const client = new CovalentClient(
  process.env.NEXT_PUBLIC_COVALENT_KEY as string
);

export const trimWallet = (s: string) => {
  return s.slice(0, 6) + "..." + s.slice(-4);
};

export const searchData = async (
  data: IForm,
  page: number
): Promise<{ data: IFormResult[]; pagination: Pagination }> => {
  const response =
    await client.BalanceService.getErc20TransfersForWalletAddressByPage(
      data.chain_name as Chain,
      data.wallet_address,
      {
        contractAddress: data.token_address,
        pageNumber: page,
        pageSize: 10,
        startingBlock: data.start_block,
        endingBlock: data.end_block,
      }
    );
  return {
    pagination: response.data.pagination,
    data: response.data.items.map((item) => {
      return {
        date: item.transfers[0].block_signed_at,
        amount: item.transfers[0].delta_quote,
        from_address: item.transfers[0].from_address,
        from_label: item.transfers[0].from_address_label || "unknown",
        to_address: item.transfers[0].to_address,
        to_label: item.transfers[0].to_address_label || "unknown",
        token_address: item.transfers[0].contract_ticker_symbol,
      };
    }),
  };
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 100;

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'LR' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Left
    node.sourcePosition = Position.Right;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
