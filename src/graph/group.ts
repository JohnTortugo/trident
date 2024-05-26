import Graph from "./graph";
import assert from "assert";

export default class Group {
  private _name : string = "";
  private _public : boolean = false;
  private _static : boolean = false;
  private _compilationId : number = -1;
  private _graphs : Graph[] = [];
  private _method : string = "";

  constructor (properties: Array<[string, string]>, method : string) {
    this._method         = method;
    this._name           = this.getProperty("name", properties);
    this._public         = this.getProperty("public", properties);
    this._static         = this.getProperty("static", properties);
    this._compilationId  = this.getProperty("compilationId", properties);

    if (properties.length > 0) {
      console.log(properties);
      assert(false, "Unprocessed properties in node constructor.");
    }
  }

  public getName() : string {
    return this._name;
  }

  public setGraphs(graphs : Graph[]) : void {
    this._graphs = graphs;
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