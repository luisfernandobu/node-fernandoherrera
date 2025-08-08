const lblTicketsPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noTicketsAlert = document.querySelector('.alert');
const lblCurrentTicket = document.querySelector('small')

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');


const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('escritorio es requerido');
}

const deskName = searchParams.get('escritorio');
let workingTicket = null;
deskHeader.textContent = deskName;

function displayPendingTickets(pendingTickets = 0) {
    (pendingTickets === 0) 
    ? noTicketsAlert.classList.remove('d-none') 
    : noTicketsAlert.classList.add('d-none');
    
    lblTicketsPending.textContent = pendingTickets;
}

async function loadInitialCount() {
    const pendingTickets = await fetch('/api/ticket/pending').then(resp => resp.json());
    displayPendingTickets(pendingTickets.length || 0);
}

async function getTicket() {
    await finishTicket();

    const { status, ticket, message } = await fetch(`/api/ticket/draw/${deskName}`)
    .then(resp => resp.json());
    
    if (status === 'error') {
        lblCurrentTicket.textContent = message;
        return;
    }
    
    workingTicket = ticket;
    lblCurrentTicket.innerText = ticket.number;
}

async function finishTicket() {
    if (!workingTicket) return;

    const { status } = await fetch(`/api/ticket/done/${workingTicket.id}`, {
        method: 'PUT'
    }).then(resp => resp.json());

    if (status === 'ok') {
        workingTicket = null;
        lblCurrentTicket.innerText = 'Nadie';
    }
}

function connectToWebSockets() {
    const socket = new WebSocket( 'ws://localhost:3000/ws' );
    
    socket.onmessage = ( event ) => {
        const data = JSON.parse(event.data);
        
        if (data.type !== 'on-ticket-count-change') return;
        
        displayPendingTickets(data.payload);
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

// Listeners
btnDraw.addEventListener('click', getTicket);
btnDone.addEventListener('click', finishTicket);

// Init
loadInitialCount();
connectToWebSockets();