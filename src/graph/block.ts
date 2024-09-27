import Node from "./node";

// A basic block in the CFG
export default class Block {
  private _id: number = -1;
  private _nodes: Node[] = [];
  private _out: Block[] = [];
  private _in: Block[] = [];

  constructor(id: number) {
    this._id = id;
  }

  public id(): number { 
    return this._id; 
  }

  public nodes(): Node[] {
    return this._nodes;
  }

  public outs(): Block[] {
    return this._out;
  }

  public ins(): Block[] {
    return this._in;
  }

  public add_out(out: Block) : void {
    this._out.push(out);
  }

  public add_in(input: Block) : void {
    this._in.push(input);
  }

  public add_node(new_node: Node) : void {
    this._nodes.push(new_node);
  }
}