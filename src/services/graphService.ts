import fs from 'fs/promises';
import path from 'path';
import { GraphNode } from '../models/graph';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const GRAPH_FILE = path.join(DATA_DIR, 'graph.json');

async function ensureGraphFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(GRAPH_FILE);
  } catch (err) {
    await fs.writeFile(GRAPH_FILE, JSON.stringify([]));
  }
}

async function readAll(): Promise<GraphNode[]> {
  await ensureGraphFile();
  const raw = await fs.readFile(GRAPH_FILE, 'utf-8');
  try {
    return JSON.parse(raw) as GraphNode[];
  } catch (e) {
    return [];
  }
}

async function writeAll(items: GraphNode[]) {
  await ensureGraphFile();
  await fs.writeFile(GRAPH_FILE, JSON.stringify(items, null, 2));
}

export async function createNode(payload: Partial<GraphNode>): Promise<GraphNode> {
  const items = await readAll();
  const now = new Date().toISOString();
  const node: GraphNode = {
    id: uuidv4(),
    businessId: payload.businessId || 'unknown',
    type: (payload.type as any) || 'BusinessProfile',
    canonical: payload.canonical || {},
    evidenceIds: payload.evidenceIds || [],
    createdAt: now,
    lastUpdated: now,
    status: payload.status || 'Active'
  };
  items.push(node);
  await writeAll(items);
  return node;
}

export async function updateNode(id: string, patch: Partial<GraphNode>): Promise<GraphNode | null> {
  const items = await readAll();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  const updated: GraphNode = {
    ...items[idx],
    ...patch,
    lastUpdated: new Date().toISOString()
  };
  items[idx] = updated;
  await writeAll(items);
  return updated;
}

export async function getNodeById(id: string): Promise<GraphNode | null> {
  const items = await readAll();
  return items.find(i => i.id === id) || null;
}

export async function listNodesByBusiness(businessId: string): Promise<GraphNode[]> {
  const items = await readAll();
  return items.filter(i => i.businessId === businessId);
}

export async function searchNodes(filter: Partial<GraphNode>): Promise<GraphNode[]> {
  const items = await readAll();
  return items.filter(item => {
    for (const key of Object.keys(filter) as (keyof GraphNode)[]) {
      // simplistic matching
      // @ts-ignore
      if (filter[key] == null) continue;
      // @ts-ignore
      const val = item[key];
      // @ts-ignore
      if (typeof filter[key] === 'string') {
        // @ts-ignore
        if (!String(val).includes(String(filter[key]))) return false;
      } else if (Array.isArray(filter[key])) {
        // @ts-ignore
        const arr = filter[key] as any[];
        if (!arr.every(a => (item[key] as any[] || []).includes(a))) return false;
      } else {
        // @ts-ignore
        if (val !== filter[key]) return false;
      }
    }
    return true;
  });
}

export async function collectionSummary(businessId: string): Promise<any> {
  const nodes = await listNodesByBusiness(businessId);
  const byType = nodes.reduce((acc: Record<string, any>, n) => {
    acc[n.type] = acc[n.type] || { total: 0 };
    acc[n.type].total += 1;
    return acc;
  }, {});
  return { totalNodes: nodes.length, byType };
}
