import Group from "./graph/group";
import Graph from "./graph/graph";
import Block from "./graph/block";
import Node from "./graph/node";
import { XMLParser } from "fast-xml-parser";

export default class Parser {
  private _xmlParser : XMLParser = undefined;

  constructor() {
    this._xmlParser = new XMLParser({
      ignoreAttributes : false,
      attributeNamePrefix: 'attr__', // prefix of attributes' names
      textNodeName : "attr__text",
    });
  }

  public parseGroup(groupXmlString: string): Group {
    let groupXmlObj = this._xmlParser.parse(groupXmlString);
    let group_props = this.parseProperties(groupXmlObj.group.properties);
    let group_method = undefined; // TODO: parse "Method": groupXmlObj.group.method;
    return new Group(group_props, group_method);
  }

  // Given a collection of properties represented in the XML object, this method
  // will parse them and return an array of tuples, where the first element is
  // the property name and the second is the value.
  private parseProperties(input_props: any): Array<[string, string]> {
    // The parsing library adds the properties under a "p" field.
    if (input_props == undefined || input_props.p  == undefined) { return []; }
    let props_to_parse = input_props.p;

    // The result is an array of tuples, where the first element is the property
    // name and the second is the value.
    let properties = Array<[string, string]>();

    for (let i = 0; i < props_to_parse.length; i++) {
      let name = props_to_parse[i].attr__name;
      let value = props_to_parse[i].attr__text;

      console.assert(name != undefined, "Property name is undefined.");
      properties.push([name, value != undefined ? value : ""]);
    }

    return properties;
  }

  public parseGraph(graphXmlString: string): Graph {
    let graphXmlObj = this._xmlParser.parse(graphXmlString);
    let graph = new Graph();

    this.parseNodes(graphXmlObj.graph.nodes, graph);
    this.parseEdges(graphXmlObj.graph.edges, graph);
    this.parseCFG(graphXmlObj.graph.controlFlow, graph);

    return graph;
  }

  private parseMethod(method: any): void {
    console.log(method.attr__name);
    console.log(method.attr__shortName);
    console.log(method.attr__bci);
    console.log(method);
  }

  private parseNodes(xml_nodes: any, graph : Graph) : void {
    if (xml_nodes == undefined || xml_nodes.node == undefined) { return undefined; }

    xml_nodes = xml_nodes.node;
    for (let i = 0; i < xml_nodes.length; i++) {
      let node_props = this.parseProperties(xml_nodes[i].properties);
          node_props.push(["id", xml_nodes[i].attr__id]);

      graph.nodes().push(new Node(node_props));
    }
  }

  private parseEdges(xml_edges: any, graph : Graph) : void {
    if (xml_edges == undefined || xml_edges.edge == undefined) { return undefined; }

    xml_edges = xml_edges.edge;
    for (let i = 0; i < xml_edges.length; i++) {
      graph.add_sea_edge(xml_edges[i].attr__from as number, 
                         xml_edges[i].attr__to as number, 
                         xml_edges[i].attr__index as number);
    }
  }

  private parseCFG(xml_cfg: any, graph : Graph) : void {
    if (xml_cfg == undefined || xml_cfg.block == undefined) { return undefined; }

    xml_cfg = xml_cfg.block;
    for (let i = 0; i < xml_cfg.length; i++) {
      let bb_id : number = xml_cfg[i].attr__name;
      let block : Block = graph.existingBlockOrNewOne(bb_id);

      // When there is no node in the BB, the 'nodes' field is present as an empty string.
      if (xml_cfg[i].nodes != "") {
        let xmlNodes = Array.isArray(xml_cfg[i].nodes.node) ? xml_cfg[i].nodes.node : [xml_cfg[i].nodes.node];
        for (let j = 0; j < xmlNodes.length; j++) {
          let node_id : number = xmlNodes[j].attr__id;
          block.add_node(graph.findNodeByIdOrFail(node_id));
        }
      }

      // When there is no successor to the BB, the 'successors' field is present as an empty string.
      if (xml_cfg[i].successors != "") {
        let xmlSuccessors = Array.isArray(xml_cfg[i].successors.successor) ? xml_cfg[i].successors.successor : [xml_cfg[i].successors.successor];
        for (let j = 0; j < xmlSuccessors.length; j++) {
          let succ_id : number = xmlSuccessors[j].attr__name;
          let successor = graph.existingBlockOrNewOne(succ_id);
          block.add_out(successor);
          successor.add_in(block);
        }
      }
    }
  }

}