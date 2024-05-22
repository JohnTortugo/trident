import net from "net";
import Parser from "./parser";
import Graph from "./graph/graph";

let server = net.createServer(function(connection : any) {
  let content = "";
  let parser = new Parser();
  let graphs : Graph[] = [];

  const GRAPH_BEG_TAG = "<graph ";
  const GRAPH_END_TAG = "</graph>";
  const GROUP_BEG_TAG = "<group>";
  const GROUP_END_TAG = "</group>";

  connection.on('data', function(data : any) {
    // Always append the data that we just received.
    // We'll check later if we received a graph end or a document end.
    content += data.toString();

    if (data.toString().indexOf(GRAPH_END_TAG) > -1) {
      do {
        let graph_beg_idx = content.indexOf(GRAPH_BEG_TAG);
        let graph_end_idx = content.indexOf(GRAPH_END_TAG) + GRAPH_END_TAG.length;

        let graph_xml = content.substring(graph_beg_idx, graph_end_idx);
        graphs.push(parser.parseGraph(graph_xml));

        content = content.substring(0, graph_beg_idx) + content.substring(graph_end_idx);
      } while (content.indexOf(GRAPH_END_TAG) > -1);
    } 
    else if (data.toString().indexOf(GROUP_END_TAG) > -1) {
      let group_beg_idx = content.indexOf(GROUP_BEG_TAG);
      let group_end_idx = content.indexOf(GROUP_END_TAG) + GROUP_END_TAG.length;

      let group_xml = content.substring(group_beg_idx, group_end_idx);

      content = content.substring(0, group_beg_idx) + content.substring(group_end_idx);
    }
  });

  connection.write('y');
});

server.listen(4444, function() { });