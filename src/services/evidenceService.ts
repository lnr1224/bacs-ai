import fs from 'fs/promises';
import path from 'path';
import { Evidence } from '../models/evidence';
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = path.join(process.cwd(), 'data');
const EVIDENCE_FILE = path.join(DATA_DIR, 'evidence.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(EVIDENCE_FILE);
  } catch (err) {
    // create file
    await fs.writeFile(EVIDENCE_FILE, JSON.stringify([]));
  }
}

async function readAll(): Promise<Evidence[]> {
  await ensureDataFile();
  const raw = await fs.readFile(EVIDENCE_FILE, 'utf-8');
  try {
    return JSON.parse(raw) as Evidence[];
  } catch (e) {
    return [];
  }
}

async function writeAll(items: Evidence[]) {
  await ensureDataFile();
  await fs.writeFile(EVIDENCE_FILE, JSON.stringify(items, null, 2));
}

export async function createEvidence(payload: Partial<Evidence>): Promise<Evidence> {
  const items = await readAll();
  const now = new Date().toISOString();
  const ev: Evidence = {
    id: uuidv4(),
    businessId: payload.businessId || 'unknown',
    fieldKey: payload.fieldKey || 'unknown',
    value: payload.value ?? null,
    status: (payload.status as Evidence['status']) || 'Imported',
    source: payload.source,
    confidence: typeof payload.confidence === 'number' ? payload.confidence : 0,
    lastUpdated: now,
    requiredFor: payload.requiredFor || [],
    usedByBacs: payload.usedByBacs || false,
    notes: payload.notes,
    attachments: payload.attachments || [],
    computedFromEvidenceIds: payload.computedFromEvidenceIds || [],
    freshness: payload.freshness || 'Fresh',
    priority: payload.priority || 'Supporting'
  };
  items.push(ev);
  await writeAll(items);
  return ev;
}

export async function updateEvidence(id: string, patch: Partial<Evidence>): Promise<Evidence | null> {
  const items = await readAll();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  const updated: Evidence = {
    ...items[idx],
    ...patch,
    lastUpdated: new Date().toISOString()
  };
  items[idx] = updated;
  await writeAll(items);
  return updated;
}

export async function getEvidenceById(id: string): Promise<Evidence | null> {
  const items = await readAll();
  return items.find(i => i.id === id) || null;
}

export async function listEvidenceByBusiness(businessId: string): Promise<Evidence[]> {
  const items = await readAll();
  return items.filter(i => i.businessId === businessId);
}

export async function searchEvidence(filter: Partial<Evidence>): Promise<Evidence[]> {
  const items = await readAll();
  return items.filter(item => {
    for (const key of Object.keys(filter) as (keyof Evidence)[]) {
      // simple contains / equality checks
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
