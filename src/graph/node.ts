import assert from "assert";

// A node in the SEA graph
export default class Node {
  private _id: number;
  private _idx: number;
  private _name: string;
  private _type: string;
  private _bottom_type: string;
  private _phase_type: string;
  private _category: string;
  private _dump_spec: string;
  private _is_block_proj: boolean;
  private _is_block_start: boolean;
  private _idom: number;
  private _dom_depth: number;
  private _is_con: boolean;
  private _is_shared: boolean;
  private _is_dontcare: boolean;
  private _is_dead_loop_safe: boolean;
  private _needs_anti_dependence_check: boolean;
  private _old_node_idx: number;
  private _ideal_opcode: string;
  private _jvms: string;
  private _bci: string;
  private _line: string;
  private _reg: string;
  private _con: string;
  private _short_name: string;
  private _lrg: number;
  private _rematerialize: boolean;
  private _has_swapped_edges: boolean;
  private _may_be_short_branch: boolean;
  private _is_cisc_alternate: boolean;
  private _is_copy: boolean;
  private _debug_orig: string;
  private _is_macro: boolean;
  private _source: string;
  private _destination: string;
  private _frequency: number;
  private _block: number;

  private _in: Node[];
  private _out: Node[];

  constructor (properties: Array<[string, string]>) {
    this._id                          = this.getProperty("id", properties);
    this._idx                         = this.getProperty("idx", properties);
    this._name                        = this.getProperty("name", properties);
    this._type                        = this.getProperty("type", properties);
    this._bottom_type                 = this.getProperty("bottom_type", properties);
    this._phase_type                  = this.getProperty("phase_type", properties);
    this._category                    = this.getProperty("category", properties);
    this._dump_spec                   = this.getProperty("dump_spec", properties);
    this._is_block_proj               = this.getProperty("is_block_proj", properties);
    this._is_block_start              = this.getProperty("is_block_start", properties);
    this._idom                        = this.getProperty("idom", properties);
    this._dom_depth                   = this.getProperty("dom_depth", properties);
    this._is_con                      = this.getProperty("is_con", properties);
    this._is_shared                   = this.getProperty("is_shared", properties);
    this._is_dontcare                 = this.getProperty("is_dontcare", properties);
    this._is_dead_loop_safe           = this.getProperty("is_dead_loop_safe", properties);
    this._needs_anti_dependence_check = this.getProperty("needs_anti_dependence_check", properties);
    this._old_node_idx                = this.getProperty("old_node_idx", properties);
    this._ideal_opcode                = this.getProperty("idealOpcode", properties);
    this._jvms                        = this.getProperty("jvms", properties);
    this._bci                         = this.getProperty("bci", properties);
    this._line                        = this.getProperty("line", properties);
    this._reg                         = this.getProperty("reg", properties);
    this._con                         = this.getProperty("con", properties);
    this._short_name                  = this.getProperty("short_name", properties);
    this._lrg                         = this.getProperty("lrg", properties);
    this._rematerialize               = this.getProperty("rematerialize", properties);
    this._has_swapped_edges           = this.getProperty("has_swapped_edges", properties);
    this._may_be_short_branch         = this.getProperty("may_be_short_branch", properties);
    this._is_cisc_alternate           = this.getProperty("is_cisc_alternate", properties);
    this._is_copy                     = this.getProperty("is_copy", properties);
    this._debug_orig                  = this.getProperty("debug_orig", properties);
    this._is_macro                    = this.getProperty("is_macro", properties);
    this._source                      = this.getProperty("source", properties);
    this._destination                 = this.getProperty("destination", properties);
    this._frequency                   = this.getProperty("frequency", properties);
    this._block                       = this.getProperty("block", properties);
    this._in                          = [];
    this._out                         = [];

    assert(properties.length == 0, "Unprocessed properties in node constructor.");
  }

  public id(): number {
    return this._id;
  }

  public name() : string {
    return this._name;
  }

  public req() : Node[] {
    return this._in;
  }

  public ins() : Node[] {
    return this._in;
  }

  public in(index : number) : Node {
    return this._in[index];
  }

  public add_out(out: Node) : void {
    this._out.push(out);
  }

  public add_in(input: Node) : void {
    this._in.push(input);
  }

  public set_req(idx : number, input: Node) : void {
    this._in[idx] = input;
  }

  public outs() : Node[] {
    return this._out;
  }

  public out(index : number) : Node {
    return this._out[index];
  }

  public idx() : number {
    return this._idx;
  }

  public type() : string {
    return this._type;
  }

  public bottom_type() : string {
    return this._bottom_type;
  }

  public phase_type() : string {
    return this._phase_type;
  }

  public category() : string {
    return this._category;
  }

  public dump_spec() : string {
    return this._dump_spec;
  }

  public is_block_proj() : boolean {
    return this._is_block_proj;
  }

  public is_block_start() : boolean {
    return this._is_block_start;
  }

  public idom() : number {
    return this._idom;
  }

  public dom_depth() : number {
    return this._dom_depth;
  }

  public is_con() : boolean {
    return this._is_con;
  }

  public is_shared() : boolean {
    return this._is_shared;
  }

  public is_dontcare() : boolean {
    return this._is_dontcare;
  }

  public is_dead_loop_safe() : boolean {
    return this._is_dead_loop_safe;
  }

  public needs_anti_dependence_check() : boolean {
    return this._needs_anti_dependence_check;
  }

  public old_node_idx() : number {
    return this._old_node_idx;
  }

  public ideal_opcode() : string {
    return this._ideal_opcode;
  }

  public jvms() : string {
    return this._jvms;
  }

  public bci() : string {
    return this._bci;
  }

  public line() : string {
    return this._line;
  }

  public reg() : string {
    return this._reg;
  }

  public con() : string {
    return this._con;
  }

  public short_name() : string {
    return this._short_name;
  }

  public lrg() : number {
    return this._lrg;
  }

  public rematerialize() : boolean {
    return this._rematerialize;
  }

  public has_swapped_edges() : boolean {
    return this._has_swapped_edges;
  }

  public may_be_short_branch() : boolean {
    return this._may_be_short_branch;
  }

  public is_cisc_alternate() : boolean {
    return this._is_cisc_alternate;
  }

  public is_copy() : boolean {
    return this._is_copy;
  }

  public debug_orig() : string {
    return this._debug_orig;
  }

  public is_macro() : boolean {
    return this._is_macro;
  }

  public source() : string {
    return this._source;
  }

  public destination() : string {
    return this._destination;
  }

  public frequency() : number {
    return this._frequency;
  }

  public block() : number {
    return this._block;
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