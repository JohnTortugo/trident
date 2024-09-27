import net from "net";
import Parser from "./parser";
import Graph from "./graph/graph";
import Group from "./graph/group";
import * as d3 from 'd3-graphviz';
import Dotter from "./dotter";

let parser = new Parser();

const GRAPH_BEG_TAG = "<graph ";
const GRAPH_END_TAG = "</graph>";
const GROUP_BEG_TAG = "<group>";
const GROUP_END_TAG = "</group>";


let server = net.createServer(function(connection : any) {
  connection.write('y');

  let content : string = "";
  let graphs : Graph[] = [];
  let groups : Group[] = [];

  // This is executed for every chunk of data that we receive.
  connection.on('data', function(data : any) {
    // Always append the data that we just received.
    // We'll check later if we received a graph end or a document end.
    content += data.toString();

    // We shouldn't read graphs past the end of the current group,
    // otherwise we might end up reading the next group's graphs.
    let group_end_idx = content.indexOf(GROUP_END_TAG);
    let graph_end_idx = content.indexOf(GRAPH_END_TAG);

    // If we found a graph end tag before the end of the first (current) group then
    // we read it, parse it and it will later be assigned to the current group.
    while (graph_end_idx > -1 && (group_end_idx == -1 || graph_end_idx < group_end_idx)) {
      let beg_idx   = content.indexOf(GRAPH_BEG_TAG);
      let end_idx   = content.indexOf(GRAPH_END_TAG) + GRAPH_END_TAG.length;
      let graph_xml = content.substring(beg_idx, end_idx);

      // Parse the graph and add it to the list of graphs, later we'll
      // assign all of them to the current group.
      graphs.push(parser.parseGraph(graph_xml));

      // Reassign "content" but removing the text of the "graph".
      content = content.substring(0, beg_idx) + content.substring(end_idx);

      // Tries to find next graph end tag.
      graph_end_idx = content.indexOf(GRAPH_END_TAG);
    }

    // If we found a group end tag then we parse the group and assign the graphs
    // collected so far to it.
    if (group_end_idx > -1) {
      let beg_idx = content.indexOf(GROUP_BEG_TAG);
      let end_idx = content.indexOf(GROUP_END_TAG) + GROUP_END_TAG.length;

      // Parse the group.
      let group_xml = content.substring(beg_idx, end_idx);
      let group = parser.parseGroup(group_xml);
          group.set_graphs(graphs);

      console.log("Group: " + group.name());

      groups.push(group);

      // Reassign "content" but removing the text of the "group".
      content = content.substring(0, beg_idx) + content.substring(end_idx);
    }
  });

  // TODO: Process remaining content in "content"
  connection.on('close', function() {
    //console.log(`Connection closed ${content}`);
  });

  connection.on("error", function (error : any) {
    console.log(`Socket Error: ${error.message}`);
  });
});

server.listen(4444, function() { });

