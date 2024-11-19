// Inisialisasi Peta
const map = L.map('map-container').setView([-2.5489, 118.0149], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Data Kekeringan Berdasarkan Tahun dengan URL
const droughtData = {
    "2023": [
        { name: "Aceh", coords: [4.6951, 96.7494], url: "https://bpba.acehprov.go.id/berita/kategori/pemerintahan/distanbun-aceh-sebut-1716-hektar-lahan-sawah-kekeringan" },
        { name: "Jawa Barat", coords: [-6.8896, 107.6186], url: "https://bpbd.jabarprov.go.id/artikel/bnpb/600-warga-kabupaten-bandung-alami-krisis-air-bersih" },
        { name: "Jawa Timur", coords: [-7.2504, 112.7688], url: "https://data.bnpb.go.id/pages/kekeringan-pulau-jawa" },
        { name: "Bali", coords: [-8.3405, 115.0920], url: "https://bpbd.baliprov.go.id/article/3085/peringatan-dini-iklim-ekstrem-potensi-kekeringan-di-provinsi-bali-update-tanggal-31-oktober-2023" },
        { name: "Sulawesi Tengah", coords: [-0.8998, 119.8707], url: "https://pusatkrisis.kemkes.go.id/Kekeringan-di-BANGGAI-KEPULAUAN-SULAWESI-TENGAH-04-11-2023-18" }
    ],
    "2024": [
        { name: "Sumatra Selatan", coords: [-3.3194, 104.9147], url: "detail/sumsel2024.html" },
        { name: "Jawa Tengah", coords: [-7.1500, 110.1400], url: "https://bpbd.jatengprov.go.id/main/tag/kekeringan/" },
        { name: "Nusa Tenggara Timur", coords: [-10.1772, 123.6070], url: "https://www.kompas.id/baca/nusantara/2024/03/26/ntt-masuki-musim-kemarau-pada-april-waspadai-dampak-kekeringan-ekstrem" },
        { name: "Kalimantan Selatan", coords: [-3.0926, 115.2838], url: "https://banjarmasin.tribunnews.com/2024/09/25/kekeringan-landa-sejumlah-daerah-warga-bincau-banjar-kalsel-perdalam-sumur" },
        { name: "Papua", coords: [-4.2699, 138.0804], url: "https://jubi.id/tanah-papua/2024/bmkg-provinsi-papua-selatan-berpotensi-alami-kekeringan-pada-musim-kemarau/" }
    ]
};

// Fungsi untuk Memperbarui Peta
let markers = [];
function updateMap(year) {
    // Menghapus marker yang ada
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Menambahkan marker baru berdasarkan data tahun
    droughtData[year].forEach(location => {
        const marker = L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<b>${location.name}</b> - Kekeringan ${year}<br><a href="${location.url}" target="_blank">Baca Selengkapnya</a>`);
        markers.push(marker);
    });
}

// Listener Dropdown Tahun
const yearSelect = document.getElementById('year-select');
yearSelect.addEventListener('change', (e) => {
    updateMap(e.target.value);
});

// Inisialisasi Peta dengan Data Tahun 2023
updateMap("2023");

// Grafik Data Kekeringan Menggunakan Chart.js
const ctx = document.getElementById('droughtChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Aceh', 'Sumatra Barat', 'Lampung', 'Jawa Barat', 'Jawa Timur', 'Bali', 'Kalimantan Timur', 'Sulawesi Tengah', 'Maluku'],
        datasets: [
            {
                label: 'Jumlah Kasus Kekeringan 2023',
                data: [15, 12, 10, 8, 20, 5, 7, 11, 9],
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            },
            {
                label: 'Jumlah Kasus Kekeringan 2024',
                data: [18, 14, 8, 10, 22, 6, 9, 13, 11],
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
