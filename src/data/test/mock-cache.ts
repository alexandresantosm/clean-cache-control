import { CacheStore } from "../protocols/cache";
import { SavePurchases } from "@/domain/usecases";

export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpy.Action> = [];
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.actions = [...this.actions, CacheStoreSpy.Action.delete];
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.actions = [...this.actions, CacheStoreSpy.Action.insert];
    this.insertKey = key;
    this.insertValues = value;
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
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
  }
}
