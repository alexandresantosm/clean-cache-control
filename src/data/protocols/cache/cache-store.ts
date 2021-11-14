import { SavePurchases } from "@/domain/usecases";

export interface CacheStore {
  fecth: (key: string) => void;
  delete: (key: string) => void;
  insert: (key: string, value: any) => void;
  replace: (key: string, value: any) => void;
}
