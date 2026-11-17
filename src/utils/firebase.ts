import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {
  CubeFaceItem,
  HeroMediaState,
  PortfolioItem,
  PortfolioMedia,
} from '../types/portfolio';
import { detectMediaKind } from './mediaStorage';

// Pega aquí tus credenciales de la Consola de Firebase
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: 'TU_ID',
  appId: 'TU_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

export interface CloudPortfolioState {
  heroMedia: HeroMediaState;
  cubeFaces: CubeFaceItem[];
  items: PortfolioItem[];
}

const PORTFOLIO_DOC_REF = doc(db, 'portafolio', 'estado_principal');

// 1. Sube una imagen, video o PDF a Firebase Storage
export async function uploadMediaToFirebase(file: File): Promise<PortfolioMedia> {
  const kind = detectMediaKind(file);
  if (!kind) {
    throw new Error('Formato no permitido. Usa PNG, JPG, MP4 o PDF.');
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `portafolio/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);

  return {
    kind,
    url: downloadUrl,
    fileName: file.name,
    fileSize: file.size,
    storedId: storagePath,
  };
}

// 2. Elimina un archivo anterior de Firebase Storage
export async function deleteMediaFromFirebase(storedId?: string): Promise<void> {
  if (!storedId || !storedId.startsWith('portafolio/')) return;
  try {
    await deleteObject(ref(storage, storedId));
  } catch {
    // Si el archivo ya no existía en Storage, continúa sin bloquear
  }
}

// 3. Carga el estado del portafolio desde Cloud Firestore
export async function loadPortfolioFromFirebase(): Promise<CloudPortfolioState | null> {
  const snap = await getDoc(PORTFOLIO_DOC_REF);
  if (!snap.exists()) return null;
  return snap.data() as CloudPortfolioState;
}

// 4. Guarda el estado del portafolio en Cloud Firestore
export async function savePortfolioToFirebase(state: CloudPortfolioState): Promise<void> {
  const sanitized = JSON.parse(JSON.stringify(state)) as CloudPortfolioState;
  await setDoc(PORTFOLIO_DOC_REF, sanitized);
}