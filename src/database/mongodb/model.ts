import { Model } from "mongoose";

import {
  CreateData,
  Filter,
  FindOptions,
  UpdateOptions,
  PickTypeInObject,
} from "./mongodb.types";

import * as Helpers from "./helpers";

class Database<T extends { id: string }, K = Partial<T>> {
  private readonly _model: Model<T>;
  private readonly _id: string;

  public constructor(model: Model<T>) {
    this._model = model;
    this._id = Database.generateId();
  }

  public get name() {
    return this._model.modelName;
  }

  public get model() {
    return this._model;
  }

  public findLast = async (): Promise<Readonly<T>> => {
    return (await this._model.findOne({}, {}, { sort: { "created_at": -1 }, new: true }))!;
  };

  public static generateId = (): string => {
    return new Date().getTime().toString();
  };

  public create = async (doc: CreateData<T> & K) => {
    return await this._model.create({
      ...doc,
      id: this.id
    });
  };

  public update = async (options: UpdateOptions<T>) => {
    return await this._model.updateOne(options.filter, options.update || {});
  };

  public push = async (options: {
    filter: Filter<T>;
    update: Partial<PickTypeInObject<T, any[]>>;
  }) => {
    const data = await this._model.updateOne(options.filter, {
      $push: {
        ...(options.update as any)
      }
    });

    return data;
  };

  public delete = async (filter: Filter<T>) => {
    this._model.deleteOne({ ...filter });
  };

  public getData = async (options: FindOptions<T>) => {
    return await Helpers.getData<T>(this._model, options);
  };

  public deleteModel = async () => {
    return await Helpers.deleteModel(this._model.name);
  };

  public static getAllModels = async () => {
    return await Helpers.getAllModels();
  };

  public static deleteModel = async (name: string) => {
    return await Helpers.deleteModel(name);
  };

  get id(): string {
    return this._id;
  }
}

export { Database }

export default Database;
