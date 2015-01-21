/**
 * Copyright 2014 Metso Automation Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/**
 NodeRed node with support for OPC UA items read,write & browse invocation based on node-opcua

 @author <a href="mailto:mika.karaila@metso.com">Mika Karaila</a> (Process Automation Systems, Metso)
**/

module.exports = function(RED) {
    //"use strict";
    var RED = require(process.env.NODE_RED_HOME+"/red/red");
    var settings = RED.settings;
    var soap     = require('soap');

    function SoapNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.host = n.host;
        this.port = n.port;
        var node = this;
        var url = n.host; // URL for wsdl
        
        node.on("input", function(msg) {
            soap.createClient(url, function(err, client) {
                // client.setSecurity(new WSSecurity('username', 'password'));
                if (client)
                {
                    console.log(client.describe());
                    client.SetNotificationData(msg.payload, function(err, result) {
                         console.log(result);
                        //node.send(result);
                    });
                }
                
            });
            //console.log("WSDL:");
            //console.log(client);
            //console.log("MSG: ");
            //console.log(msg);

        });
    }
    RED.nodes.registerType("SOAP",SoapNode);
}
