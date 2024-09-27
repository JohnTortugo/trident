import Graph from "./graph";
import assert from "assert";

export default class Group {
  private _name : string = "";
  private _public : boolean = false;
  private _static : boolean = false;
  private _compilation_id : number = -1;
  private _osr : string = "";

  private _graphs : Graph[] = [];
  private _method : string = "";

  constructor (properties: Array<[string, string]>, method : string) {
    this._method         = method;
    this._name           = this.getProperty("name", properties);
    this._public         = this.getProperty("public", properties);
    this._static         = this.getProperty("static", properties);
    this._compilation_id = this.getProperty("compilationId", properties);
    this._osr            = this.getProperty("osr", properties);

    assert(properties.length == 0, "Unprocessed properties in group constructor.");
  }

  public name() : string {
    return this._name;
  }

  public is_public() : boolean {
    return this._public;
  }

  public is_static() : boolean {
    return this._static;
  }

  public compilationId() : number {
    return this._compilation_id;
  }

  public is_osr() : string {
    return this._osr;
  }

  public set_graphs(graphs : Graph[]) : void {
    this._graphs = graphs;
  }

  public graphs() : Graph[] {
    return this._graphs;
  }

  // This method is only used in the constructor to set the properties of the
  // node. It removes the property from the list of properties so that after
  // initializing all fields of the node we can assert that there are no more
  // properties left.
  private getProperty<Type>(name: string, properties: Array<[string, string]>): Type {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i][0] == name) {
        let value = (properties[i][1] as unknown) as Type;
        properties.splice(i, 1);
        return value;
      }
    }
    return undefined;
  }
}