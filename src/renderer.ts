import assert from "assert";
import net from "net";

var server = net.createServer(function(connection : any) {
  var content = "";

  connection.on('data', function(data : any) {
    // Does this last chunk contain the end of a document?  If so we are going
    // to parse the string that we received so far, up to </graphDocument>, and
    // restart the buffer startint at <graphDocument> again.
    var idx = data.toString().indexOf("</graphDocument>");

    // Did we find the end of the current document?
    if (idx > -1) {
      idx += "</graphDocument>".length;
      content += data.toString().substring(0, idx);

      // Parse the document XML and transform it into a graph
      parseGraphDocument(content);

      // Reset the buffer and start concatenating body of the next document
      content = data.toString().substring(idx);
    } else {
      // Not the end of the document, just append the data to the buffer
      content += data.toString();
    }
  });

  connection.write('y');
});

function parseGraphDocument(xml : string) : void {
  var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
  var groups = xmlDoc.getElementsByTagName("group");

  for (var i=0; i<groups.length; i++) {
    var properties = groups[i].getElementsByTagName("properties");
    var method = groups[i].getElementsByTagName("method");
    var graphs = groups[i].getElementsByTagName("graph");
    
    for (var j=0; j<graphs.length; j++) {
      var nodes = graphs[j].getElementsByTagName("nodes");
      var edges = graphs[j].getElementsByTagName("edges");
      var cfg = graphs[j].getElementsByTagName("controlFlow");

      for (var k=0; k<nodes.length; k++) {
      }

      for (var k=0; k<edges.length; k++) {
      }

      if (cfg != undefined && cfg.length > 0) {
        assert(cfg.length == 1, "There should be only one control flow graph per graph");
        var blocks = cfg[0].getElementsByTagName("block");

        for (var k=0; k<blocks.length; k++) {
          var successors = blocks[k].getElementsByTagName("successors");
          var nodes = blocks[k].getElementsByTagName("nodes");

          for (var l=0; l<successors.length; l++) {
            var successor = successors[l].getElementsByTagName("successor");
          }

          for (var l=0; l<nodes.length; l++) {
            var node = nodes[l].getElementsByTagName("node");
          }
        }
      }

      //console.log(graphs[j]);
    }
  }
}

server.listen(4444, function() { });