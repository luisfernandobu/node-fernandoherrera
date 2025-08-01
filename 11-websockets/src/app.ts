import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Client connected!');
    
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);

        const payload = JSON.stringify({
            type: 'custom-message',
            payload: data.toString()
        });

        // ws.send(JSON.stringify(payload));

        // Broadcast including itself
        /* 
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload, { binary: false });
            }
        });
        */
        
        // Broadcast excluding itself
        wss.clients.forEach((client) => {
            if (ws !== client && client.readyState === WebSocket.OPEN) {
                client.send(payload, { binary: false });
            }
        });
    });

    // ws.send('Hello from Websocket server!');

    ws.on('close', () => {
        console.log('Client disconnected!');
    });
});

console.log('WebSocket Server listening on ws://localhost:3000');
