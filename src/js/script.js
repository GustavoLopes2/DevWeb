document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.sidebar .close-btn');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
    });

    closeBtn.addEventListener('click', function () {
        sidebar.classList.remove('open');
    });
});

function switchTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);

    const themeSwitchIcon = document.querySelector('.theme-switch i');
    if (newTheme === 'dark') {
        themeSwitchIcon.classList.remove('fa-moon');
        themeSwitchIcon.classList.add('fa-sun');
    } else {
        themeSwitchIcon.classList.remove('fa-sun');
        themeSwitchIcon.classList.add('fa-moon');
    }

    localStorage.setItem('theme', newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
});

function applyStoredTheme() {
    const body = document.body;
    const themeSwitchIcon = document.querySelector('.theme-switch i');
    const storedTheme = localStorage.getItem('theme') || 'light';

    body.setAttribute('data-theme', storedTheme);

    if (themeSwitchIcon) {
        if (storedTheme === 'dark') {
            themeSwitchIcon.classList.remove('fa-moon');
            themeSwitchIcon.classList.add('fa-sun');
        } else {
            themeSwitchIcon.classList.remove('fa-sun');
            themeSwitchIcon.classList.add('fa-moon');
        }
    }
}

document.addEventListener('DOMContentLoaded', applyStoredTheme);
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Link copiado: " + text);
}

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_market_cap=true&include_24hr_high=true&include_24hr_low=true';

async function fetchCryptoPrices() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const cryptoList = document.getElementById('crypto-list');

    if (cryptoList) {
        cryptoList.innerHTML = '';
        for (const [id, info] of Object.entries(data)) {
            cryptoList.innerHTML += `
                    <li>
                        <h2>${id.charAt(0).toUpperCase() + id.slice(1)}</h2>
                        <p><strong>Preço Atual:</strong> $${info.usd}</p>
                        <p><strong>Capitalização de Mercado:</strong> $${info.usd_market_cap || 'N/A'}</p>
                        <p><strong>Alta em 24h:</strong> $${info.usd_24h_high || 'N/A'}</p>
                        <p><strong>Baixa em 24h:</strong> $${info.usd_24h_low || 'N/A'}</p>
                        <p><a href="https://www.coingecko.com/en/coins/${id}" target="_blank">Mais detalhes</a></p>
                    </li>
                `;
        }
    }
}

fetchCryptoPrices();

async function fetchArtistInfo() {
    const artistName = document.getElementById('artistName').value.trim();

    const apiUrl = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.artists && data.artists.length > 0) {
        const artist = data.artists[0];
        const artistInfo = document.getElementById('artistInfo');

        const tags = artist.tags.map(tag => tag.name).join(', ') || 'No tags available';

        artistInfo.innerHTML = `
                <h2>${artist.name}</h2>
                <p><strong>País:</strong> ${artist.country || 'Desconhecido'}</p>
                <p><strong>Área de Início:</strong> ${artist['begin-area'] ? artist['begin-area'].name : 'Desconhecido'}</p>
                <p><strong>Período de Vida:</strong> ${artist['life-span'].begin || 'Desconhecido'}</p>
                <p><strong>Tags:</strong> ${tags}</p>
                <p><a href="https://musicbrainz.org/artist/${artist.id}" target="_blank">Mais detalhes</a></p>
            `;
    }
}


