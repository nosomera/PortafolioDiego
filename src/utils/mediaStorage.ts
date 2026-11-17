import { MediaKind, PortfolioMedia } from '../types/portfolio';

const DB_NAME = 'DiegoPachecoPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'mediaFiles';

export const ACCEPTED_EXTENSIONS = '.png,.jpg,.jpeg,.mp4,.pdf';

export function detectMediaKind(file: File): MediaKind | null {
  const mime = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (mime === 'image/png' || name.endsWith('.png')) return 'png';
  if (mime === 'image/jpeg' || mime === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return 'jpg';
  }
  if (mime === 'video/mp4' || name.endsWith('.mp4')) return 'mp4';
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';

  return null;
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveMediaFile(file: File): Promise<PortfolioMedia> {
  const kind = detectMediaKind(file);
  if (!kind) {
    throw new Error('Formato no compatible. Usa únicamente archivos PNG, JPG, MP4 o PDF.');
  }

  const storedId = `media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, storedId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // If IndexedDB fails (e.g. private mode quota), fallback to memory object URL
  }

  const url = URL.createObjectURL(file);
  return {
    kind,
    url,
    fileName: file.name,
    fileSize: file.size,
    storedId,
  };
}

export async function loadMediaUrlFromStorage(storedId: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    const file = await new Promise<Blob | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(storedId);
      req.onsuccess = () => resolve(req.result as Blob | undefined);
      req.onerror = () => reject(req.error);
    });

    if (!file) return null;
    return URL.createObjectURL(file);
  } catch {
    return null;
  }
}

export async function deleteMediaFromStorage(storedId?: string): Promise<void> {
  if (!storedId) return;
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(storedId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore storage cleanup errors
  }
}
