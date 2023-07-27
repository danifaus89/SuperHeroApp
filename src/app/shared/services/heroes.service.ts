import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {


  constructor(private http: HttpClient, private fs: Firestore) {}

  getHeroes(): Observable<HeroeModel[]> {
    const heroRef = collection(this.fs, 'heroes');
    return collectionData(heroRef, { idField: 'id' }) as Observable<
      HeroeModel[]
    >;
  }
  getHero(id: string) {
    const heroRef = doc(this.fs, 'heroes', id);
    return getDoc(heroRef);
  }
  insertHeroe(heroe: HeroeModel) {
    const heroRef = collection(this.fs, 'heroes');
    return addDoc(heroRef, heroe);
  }
  deleteHeroe(id: string) {
    const heroeRef = doc(this.fs, `heroes/${id}`);
    return deleteDoc(heroeRef);
  }
  updateHeroe(id: string, heroe: HeroeModel) {
    const heroRef = doc(this.fs, 'heroes', id);
    return updateDoc(heroRef, { ...heroe });
  }
  async searchHeroes(value: string) {
    const db = getFirestore();
    const colRef = collection(db, "heroes");
    const docsSnap = await getDocs(colRef);
    let  heroes: any[] = []



  }

}
