import { Injectable } from '@angular/core';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

import { appFirebase } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db = getFirestore(appFirebase);

  // ── Guardar solicitud (usuario externo) ────────────────────────────────────

  guardarSolicitud(data: {
    nombre: string;
    correo: string;
    idea: string;
    programadora: string;
    uid: string;
    emailUsuario: string;
    servicio?: string;
  }) {
    return addDoc(collection(this.db, 'solicitudes'), {
      ...data,
      estado: 'Pendiente',
      observacion: '',
      fecha: serverTimestamp()
    });
  }

  // ── Obtener TODAS las solicitudes (programadora - admin) ───────────────────

  async obtenerTodasLasSolicitudes(): Promise<any[]> {
    const snapshot = await getDocs(collection(this.db, 'solicitudes'));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // ── Obtener solicitudes recibidas por una programadora ─────────────────────

  async obtenerSolicitudesPorProgramadora(nombreProgramadora: string): Promise<any[]> {
    const q = query(
      collection(this.db, 'solicitudes'),
      where('programadora', '==', nombreProgramadora)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // ── Obtener solicitudes enviadas por un usuario (por uid) ─────────────────

  async obtenerSolicitudesPorUsuario(uid: string): Promise<any[]> {
    const q = query(
      collection(this.db, 'solicitudes'),
      where('uid', '==', uid)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // ── Actualizar estado y observación (programadora) ─────────────────────────

  actualizarSolicitud(id: string, estado: string, observacion: string) {
    const ref = doc(this.db, 'solicitudes', id);
    return updateDoc(ref, { estado, observacion });
  }

}
