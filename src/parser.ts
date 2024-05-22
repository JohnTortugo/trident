import Node from "./graph/node";
import Graph from "./graph/graph";
import { XMLParser } from "fast-xml-parser";

export default class Parser {
  private parser : XMLParser = undefined;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes : false,
      attributeNamePrefix: 'attr__', // prefix of attributes' names
      textNodeName : "attr__text",
    });
  }

  private parseGroups(groups: any): void {
    for (let i = 0; i < groups.length; i++) {
      let group_method = this.parseMethod(groups[i].method);
      let group_properties = this.parseProperties(groups[i].properties);
      //let group_graphs = this.parseGraphs(groups[i].graph);
    }
  }

  // Given a collection of properties represented in the XML object, this method
  // will parse them and return an array of tuples, where the first element is
  // the property name and the second is the value.
  private parseProperties(input_props: any): Array<[string, string]> {
    // The parsing library adds the properties under a "p" field.
    if (input_props == undefined || input_props.p  == undefined) { return []; }
    input_props = input_props.p;

    // The result is an array of tuples, where the first element is the property
    // name and the second is the value.
    let properties = Array<[string, string]>();

    for (let i = 0; i < input_props.length; i++) {
      properties.push([input_props[i].attr__name, input_props[i].attr__text]);
    }

    return properties;
  }

  public parseGraph(graphXmlString: string): Graph {
    let graphXmlObj = this.parser.parse(graphXmlString);

    //let nodes = this.parseNodes(graphXmlObj.graph.nodes);
    //let edges = this.parseEdges(graphXmlObj.graph.edges);
    let cfg = this.parseCFG(graphXmlObj.graph.controlFlow);

    return null;
  }

  private parseMethod(method: any): void {
    console.log(method.attr__name);
    console.log(method.attr__shortName);
    console.log(method.attr__bci);
    console.log(method);
  }

  private parseNodes(xml_nodes: any): Array<Node> {
    if (xml_nodes == undefined || xml_nodes.node == undefined) { return undefined; }

    let nodes = Array<Node>();

    xml_nodes = xml_nodes.node;
    for (let i = 0; i < xml_nodes.length; i++) {
      let node_props = this.parseProperties(xml_nodes[i].properties);
          node_props.push(["id", xml_nodes[i].attr__id]);

      nodes.push(new Node(node_props));
    }

    return nodes;
  }

  private parseEdges(xml_edges: any): Array<[number, number, number]>{
    if (xml_edges == undefined || xml_edges.edge == undefined) { return undefined; }

    // The result is an array of triplets, where the first and second elements
    // are the 'from' and 'to' properties of the edge. The last element of a
    // triplet is the index of the edge in the destination node inputs.
    let edges = Array<[number, number, number]>();

    xml_edges = xml_edges.edge;
    for (let i = 0; i < xml_edges.length; i++) {
      edges.push([xml_edges[i].attr__from as number, 
                    xml_edges[i].attr__to as number, 
                    xml_edges[i].attr__index as number]);
    }

    return edges;
  }

  private parseCFG(xml_cfg: any): void {
    if (xml_cfg == undefined || xml_cfg.block == undefined) { return undefined; }

    xml_cfg = xml_cfg.block;
    for (let i = 0; i < xml_cfg.length; i++) {
      let bb_id : number = xml_cfg[i].attr__name;
      let bb_nodes : Array<number> = [];
      let bb_successors : Array<number> = [];

      // When there is no node in the BB, the 'nodes' field is present as an empty string.
      if (xml_cfg[i].nodes != "") {
        let xmlNodes = Array.isArray(xml_cfg[i].nodes.node) ? xml_cfg[i].nodes.node : [xml_cfg[i].nodes.node];
        for (let j = 0; j < xmlNodes.length; j++) {
          bb_nodes.push(xmlNodes[j].attr__id);
        }
      }

      // When there is no successor to the BB, the 'successors' field is present as an empty string.
      if (xml_cfg[i].successors != "") {
        let xmlSuccessors = Array.isArray(xml_cfg[i].successors.successor) ? xml_cfg[i].successors.successor : [xml_cfg[i].successors.successor];
        for (let j = 0; j < xmlSuccessors.length; j++) {
          bb_successors.push(xmlSuccessors[j].attr__name);
        }
      }
    }
  }
}