
async function getLastWorkingOnTickets() {
    const lastWorkingTickets = await fetch('/api/ticket/working-on')
        .then(resp => resp.json());

    displayTickets(lastWorkingTickets);
}
    
function displayTickets(tickets = []) {
    tickets.forEach((ticket, index) => {
        document.querySelector(`#lbl-ticket-0${index + 1}`).textContent = ticket.number;
        document.querySelector(`#lbl-desk-0${index + 1}`).textContent = ticket.handleAtDesk;
    });
}

function connectToWebSockets() {
    const socket = new WebSocket( 'ws://localhost:3000/ws' );
    
    socket.onmessage = ( event ) => {
        const { type, payload } = JSON.parse(event.data);
        
        if (type !== 'on-working-change') return;
        
        displayTickets(payload);
    };
    
    socket.onclose = ( event ) => {
        console.log( 'Connection closed' );
        setTimeout( () => {
            console.log( 'retrying to connect' );
            connectToWebSockets();
        }, 1500 );
        
    };
    
    socket.onopen = ( event ) => {
        console.log( 'Connected' );
    };
    
}

// init
getLastWorkingOnTickets();
connectToWebSockets();
