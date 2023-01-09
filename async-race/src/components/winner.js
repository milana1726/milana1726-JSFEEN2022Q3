import { appendCarSvg } from './images';

export default class Winner {
    constructor(winner) {
        this.winner = winner;
        this.tableBody = document.querySelector('.table_body');
    }

    createWinner() {
        const row = document.createElement('tr');
        row.className = 'table_row';
        row.innerHTML = `
            <td class="column_number">${this.winner.number}</td>
            <td >${appendCarSvg(this.winner.id, this.winner.color)}</td>
            <td class="column_name">${this.winner.name}</td>
            <td class="column_wins">${this.winner.wins}</td>
            <td class="column_time">${this.winner.time}</td>
        `;
        this.tableBody.appendChild(row);
    }
}
