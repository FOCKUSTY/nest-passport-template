import sequelize, { CreateOptions } from "sequelize";
import connection from "./connection";

class Table<
  M extends sequelize.Model,
  Attributes extends sequelize.ModelAttributes<M, sequelize.Attributes<M>> = sequelize.ModelAttributes<M, sequelize.Attributes<M>>,
> {
  private readonly _model: sequelize.ModelStatic<M>;
  
  private readonly _name: string;
  private readonly _attributes: Attributes;

  public constructor({
    name, attributes
  }: {
    name: string,
    attributes: Attributes
  }) {
    this._name = name;
    this._attributes = attributes;

    this._model = this.init();
  };

  public findAll(options?: sequelize.FindOptions<Attributes>) {
    return this._model.findAll<M>(options);
  }

  public findOne(options?: sequelize.FindOptions<sequelize.Attributes<M>>) {
    return this._model.findOne<M>(options)
  }

  public create<O extends CreateOptions<sequelize.Attributes<M>> = CreateOptions<sequelize.Attributes<M>>>(
    values?: sequelize.CreationAttributes<M>,
    options?: O
  ) {
    return this._model.create<M, O>(values, options);
  }

  public delete(options?: sequelize.DestroyOptions<sequelize.Attributes<M>>) {
    return this._model.destroy<M>(options);
  }

  public destroy(options?: sequelize.DropOptions) {
    return this._model.drop(options);
  }

  public get model() {
    return this._model;
  }

  private init() {
    class Model extends sequelize.Model<Attributes> {};
    
    return Model.init(this._attributes, {
      sequelize: connection,
      modelName: this._name
    }) as sequelize.ModelStatic<M>;
  }
};

export default Table;
