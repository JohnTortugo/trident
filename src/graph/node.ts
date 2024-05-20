export default class Node {
  private idx: number;
  private name: string;
  private type: string;
  private bottom_type: string;
  private phase_type: string;
  private category: string;
  private dump_spec: string;
  private is_block_proj: boolean;
  private is_block_start: boolean;
  private cfg_block_idx: number;
  private idom: number;
  private dom_depth: number;
  private is_con: boolean;
  private is_shared: boolean;
  private is_dontcare: boolean;
  private is_dead_loop_safe: boolean;
  private needs_anti_dependence_check: boolean;
  private old_node_idx: number;
  private ideal_opcode: string;
  private jvms: string;
  private bci: string;
  private line: string;
  private reg: string;
  private con: string;
  private short_name: string;
  private lrg: number;
  private in: Node[];
  private out: Node[];

  constructor (properties: string[]) {

  }
}