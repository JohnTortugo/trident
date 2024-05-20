import net from "net";
import Parser from "./parser";
import { group } from "console";

var server = net.createServer(function(connection : any) {
  var content = "";

  connection.on('data', function(data : any) {
    // Always append the data that we just received.
    // We'll check later if we received a graph end or a document end.
    content += data.toString();

    if (data.toString().indexOf("</graph>") > -1) {
      do {
        var graph_beg_idx = content.indexOf("<graph ");
        var graph_end_idx = content.indexOf("</graph>") + "</graph>".length;

        var graph_xml = content.substring(graph_beg_idx, graph_end_idx);

        content = content.substring(0, graph_beg_idx) + content.substring(graph_end_idx);
      } while (content.indexOf("</graph>") > -1);
    } else if (data.toString().indexOf("</group>") > -1) {
      var group_beg_idx = content.indexOf("<group>");
      var group_end_idx = content.indexOf("</group>") + "</group>".length;

      var group_xml = content.substring(group_beg_idx, group_end_idx);

      content = content.substring(0, group_beg_idx) + content.substring(group_end_idx);
    }
  });

  connection.write('y');
});



server.listen(4444, function() { });