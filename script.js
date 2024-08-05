const calendar = document.getElementById('calendar');
const iller = document.getElementById('iller');
const days = document.getElementById('days');
const evvel = document.getElementById('prev');
const sonra = document.getElementById('next');
const aylar = document.getElementById('aylarbtn');

let currentDate = new Date();
const aylarinAdi = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

function goster() {
    const year = currentDate.getFullYear();
    const month = neticeniGoster();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    iller.innerHTML = `${aylarinAdi[month]} ${year}`;

    const gunlerinAdi = ['B.e', 'Ç.a', 'Ç', 'Ca', 'Cüm', 'Şə', 'Baz'];
    let gunler = '';
    for (const name of gunlerinAdi) {
        gunler += `<div>${name}</div>`;
    }

    let bosluq1 = '';
    for (let i = 0; i < firstDay.getDay(); i++) {
        bosluq1 += '<div></div>';
    }

    let bosluq2 = '';
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const bugun = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        bosluq2 += `<div class="day${bugun ? ' today' : ''}">${i}</div>`;
    }

    days.innerHTML = gunler + bosluq1 + bosluq2;
}

function aylarigoster() {
    let aylarBtn = '';
    for (let index = 0; index < aylarinAdi.length; index++) {
        const name = aylarinAdi[index];
        aylarBtn += `<button class="aylarbtn${index === neticeniGoster() ? ' selected' : ''}" data-index="${index}">
            ${name.substring(0, 3)}
        </button>`;
    }

    aylar.innerHTML = aylarBtn;

    aylar.querySelectorAll('.aylarbtn').forEach(button => {
        button.onclick = (month) => {
            const index = +month.target.dataset.index; 
            currentDate.setMonth(index);
            goster();
            duymeliay(index);
        };
    });
}

function duymeliay(secilen) {
    const buttons = document.querySelectorAll('.aylarbtn');
    buttons.forEach((button, index) => {
        button.classList.toggle('selected', index === secilen);
    });
}

evvel.onclick = () => {
    currentDate.setMonth(neticeniGoster() - 1);
    goster();
};

sonra.onclick = () => {
    currentDate.setMonth(neticeniGoster() + 1);
    goster();
};

function neticeniGoster() {
    return currentDate.getMonth();
}

goster();
aylarigoster();
