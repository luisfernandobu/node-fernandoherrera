const lblNewTicket = document.querySelector('#lbl-new-ticket');
const btnNewTicket = document.querySelector('button');

(async () => {
    await main();
})();

btnNewTicket.addEventListener('click', createTicket);

function displayTicketNumber(ticketId) {
    lblNewTicket.textContent = ticketId;
}

async function getLastTicket() {
    return await fetch('api/ticket/last').then(resp => resp.json());
}

async function createTicket() {
    const newTicket = await fetch('/api/ticket', {
        method: 'POST'
    }).then(resp => resp.json());

    displayTicketNumber(newTicket.number);
}

async function main() {
    const lastTicket = await getLastTicket();
    displayTicketNumber(lastTicket);
}
