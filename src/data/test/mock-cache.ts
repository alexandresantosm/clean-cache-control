import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";

const maxAgeInDays = 3;

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(maxCacheAge.getDate() - maxAgeInDays);
  return maxCacheAge;
};

export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpy.Action> = [];
  fetchKey: string;
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];
  fetchResult: any;

  fetch(key: string): any {
    this.actions = [...this.actions, CacheStoreSpy.Action.fetch];
    this.fetchKey = key;
    return this.fetchResult;
  }

  delete(key: string): void {
    this.actions = [...this.actions, CacheStoreSpy.Action.delete];
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.actions = [...this.actions, CacheStoreSpy.Action.insert];
    this.insertKey = key;
    this.insertValues = value;
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions = [...this.actions, CacheStoreSpy.Action.delete];
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions = [...this.actions, CacheStoreSpy.Action.insert];
      throw new Error();
    });
  }

  simulateFetchError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "fetch").mockImplementationOnce(() => {
      this.actions = [...this.actions, CacheStoreSpy.Action.fetch];
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}
