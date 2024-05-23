import Block from "./block";
import Node from "./node";

import { assert } from "console";

// The graph, in CFG and SEA format
export default class Graph {
  private _nodes: Node[] = [];
  private _blocks: Block[] = [];

  public nodes(): Node[] {
    return this._nodes;
  }

  public blocks(): Block[] {
    return this._blocks;
  }

  public add_sea_edge(from_id: number, to_id: number, index: number) : void {
    let from = this.findNodeByIdOrFail(from_id);
    let to = this.findNodeByIdOrFail(to_id);

    to.set_req(index, from);
    from.add_out(to);
  }

  public existingBlockOrNewOne(id: number): Block {
    for (let i = 0; i < this._blocks.length; i++) {
      if (this._blocks[i].id() == id) {
        return this._blocks[i];
      }
    }
    let new_block = new Block(id);
    this._blocks.push(new_block);
    return new_block;
  }

  public findNodeByIdOrFail(id: number): Node {
    for (let i = 0; i < this._nodes.length; i++) {
      if (this._nodes[i].id() == id) {
        return this._nodes[i];
      }
    }
    assert(false, "Should not reach here.");
    return undefined;
  }

  public dump_cfg() {
    for (var i = 0; i < this._blocks.length; i++) {
      console.log("Block " + this._blocks[i].id());

      for (var j = 0; j < this._blocks[i].nodes().length; j++) {
        console.log("  " + this._blocks[i].nodes()[j].id() + " " + this._blocks[i].nodes()[j].name());
      }
    }
  }
}