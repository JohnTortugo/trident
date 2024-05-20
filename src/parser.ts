const { XMLParser } = require("fast-xml-parser");
import assert from "assert";
import Node from "./graph/node";

export default class Parser {
  constructor(xmlString: string) {
    this.parseGraphDocument(xmlString);
  }

  // this method parses the XML document and creates the graph
  private parseGraphDocument(xmlString: string): void {
    const options = {
      ignoreAttributes : false,
      attributeNamePrefix: 'attr__', // prefix of attributes' names
      textNodeName : "attr__text",
    };
    const parser = new XMLParser(options);
    let xmlObj = parser.parse(xmlString);
    //var groups = this.parseGroups(Array.isArray(xmlObj.graphDocument.group) ? xmlObj.graphDocument.group : [xmlObj.graphDocument.group]);
  }

  private parseGroups(groups: any): void {
    for (var i = 0; i < groups.length; i++) {
      var group_method = this.parseMethod(groups[i].method);
      var group_properties = this.parseProperties(groups[i].properties);
      //var group_graphs = this.parseGraphs(groups[i].graph);
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
    var properties = Array<[string, string]>();

    for (var i = 0; i < input_props.length; i++) {
      properties.push([input_props[i].attr__name, input_props[i].attr__text]);
    }

    return properties;
  }

  private parseGraphs(graphs: any): void {
    for (var j = 0; j < graphs.length; j++) {
      var nodes = graphs[j].getElementsByTagName("nodes");
      var edges = graphs[j].getElementsByTagName("edges");
      var cfg = graphs[j].getElementsByTagName("controlFlow");

      this.parseNodes(nodes);
      this.parseEdges(edges);
      this.parseCFG(cfg);

      //console.log(graphs[j]);
    }
  }

  private parseMethod(method: any): void {
    console.log(method.attr__name);
    console.log(method.attr__shortName);
    console.log(method.attr__bci);
    console.log(method);
  }



  private parseNodes(nodes: any): void {
    for (var k = 0; k < nodes.length; k++) {
    }
  }

  private parseEdges(edges: any): void {
    for (var k = 0; k < edges.length; k++) {
    }
  }

  private parseCFG(cfg: any): void {
    if (cfg == undefined || cfg.length < 1) { return ; }
    assert(cfg.length == 1, "There should be only one control flow graph per graph");

    var blocks = this.parseCFGBlocks(cfg[0].getElementsByTagName("block"));
  }

  private parseCFGBlocks(blocks: any): void {
    for (var k = 0; k < blocks.length; k++) {
      var successors = this.parseCFGSuccessors(blocks[k].getElementsByTagName("successors"));
      var nodes = this.parseNodes(blocks[k].getElementsByTagName("nodes"));
    }
  }

  private parseCFGSuccessors(successors: any): void {
    for (var l = 0; l < successors.length; l++) {
      var successor = successors[l].getElementsByTagName("successor");
    }
  }
}