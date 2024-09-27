import Graph from "./graph/graph";
import Block from "./graph/block";
import Node from "./graph/node";

export default class Dotter {
  public cfgNodeToDot(block : Block) : string {
    var content = "";

    block.nodes().forEach((node : Node) => {
      var parameters = "";

      for (var i=0; i<node.req().length; i++) {
        var input = node.in(i);
        if (input == undefined) {
          parameters += "i" + i + ",";
        }
        else {
          parameters += "i" + input.id() + ",";
        }
      }

      // Remove last "," and add the parentheses
      if (parameters.length > 0) {
        parameters = parameters.substring(0, parameters.length-1);
        parameters = "&#40;" + parameters + "&#41;";
      }

      content += "<tr><td align=\"left\">i" + node.id() + " = " + node.name() + parameters + "</td></tr>";
    });

    return content;
  }


  public CFGGraphToDot(graph : Graph) : string {
    var dotText = "digraph {\n";

    // global definitions
    dotText += "\t node [margin=0 shape=record style=filled fillcolor=white];\n";

    graph.blocks().forEach((block: Block) => {
      dotText += "\t" + block.id() + " [label=<<table border=\"0\" cellborder=\"0\" cellspacing=\"2\" cellpadding=\"1\" bgcolor=\"white\">";
      dotText += "<tr><td bgcolor=\"black\" align=\"center\"><font color=\"white\">BB" + block.id() + "</font></td></tr>";
      dotText += this.cfgNodeToDot(block);
      dotText += "</table>>]\n";
    });

    graph.blocks().forEach((block : Block) => {
      block.outs().forEach((succ : Block) => {
        dotText += block.id() + " -> " + succ.id() + "\n";
      });
    });

    dotText += "}";

    return dotText;
  }
}