// ===== DATA: CEE Primes (based on SAFIR/Rexel tables - BAR-TH-129 PAC Air/Air) =====
const CEE_DATA = {
    pac_air_air: {
        maison: {
            // SCOP >= 4.3
            H1: { classique: { '>130': 898, '110-130': 617, '90-110': 561, '70-90': 393, '60-70': 337, '35-60': 281 },
                   precaire: { '>130': 1219, '110-130': 838, '90-110': 762, '70-90': 533, '60-70': 457, '35-60': 381 } },
            H2: { classique: { '>130': 735, '110-130': 505, '90-110': 459, '70-90': 321, '60-70': 276, '35-60': 230 },
                   precaire: { '>130': 997, '110-130': 686, '90-110': 623, '70-90': 436, '60-70': 374, '35-60': 312 } },
            H3: { classique: { '>130': 489, '110-130': 336, '90-110': 306, '70-90': 214, '60-70': 184, '35-60': 153 },
                   precaire: { '>130': 664, '110-130': 457, '90-110': 415, '70-90': 291, '60-70': 249, '35-60': 208 } }
        },
        appartement: {
            H1: { classique: { '>130': 373, '110-130': 283 }, precaire: { '>130': 506, '110-130': 384 } },
            H2: { classique: { '>130': 305, '110-130': 231 }, precaire: { '>130': 413, '110-130': 314 } },
            H3: { classique: { '>130': 203, '110-130': 154 }, precaire: { '>130': 276, '110-130': 209 } }
        }
    },
    pac_air_eau: {
        maison: {
            H1: { classique: { '>130': 4200, '110-130': 3800, '90-110': 3400, '70-90': 2800, '60-70': 2400, '35-60': 1800 },
                   precaire: { '>130': 5400, '110-130': 4900, '90-110': 4400, '70-90': 3600, '60-70': 3100, '35-60': 2300 } },
            H2: { classique: { '>130': 3400, '110-130': 3100, '90-110': 2800, '70-90': 2300, '60-70': 1900, '35-60': 1500 },
                   precaire: { '>130': 4400, '110-130': 4000, '90-110': 3600, '70-90': 2900, '60-70': 2500, '35-60': 1900 } },
            H3: { classique: { '>130': 2300, '110-130': 2100, '90-110': 1900, '70-90': 1500, '60-70': 1300, '35-60': 1000 },
                   precaire: { '>130': 2900, '110-130': 2600, '90-110': 2400, '70-90': 2000, '60-70': 1700, '35-60': 1300 } }
        },
        appartement: {
            H1: { classique: { '>130': 2100, '110-130': 1900 }, precaire: { '>130': 2700, '110-130': 2400 } },
            H2: { classique: { '>130': 1700, '110-130': 1500 }, precaire: { '>130': 2200, '110-130': 2000 } },
            H3: { classique: { '>130': 1150, '110-130': 1050 }, precaire: { '>130': 1450, '110-130': 1300 } }
        }
    },
    chaudiere_biomasse: {
        maison: {
            H1: { classique: { '>130': 3500, '110-130': 3200, '90-110': 2900, '70-90': 2400, '60-70': 2000, '35-60': 1600 },
                   precaire: { '>130': 4500, '110-130': 4100, '90-110': 3700, '70-90': 3100, '60-70': 2600, '35-60': 2000 } },
            H2: { classique: { '>130': 2900, '110-130': 2600, '90-110': 2400, '70-90': 1900, '60-70': 1600, '35-60': 1300 },
                   precaire: { '>130': 3700, '110-130': 3400, '90-110': 3000, '70-90': 2500, '60-70': 2100, '35-60': 1700 } },
            H3: { classique: { '>130': 1900, '110-130': 1700, '90-110': 1600, '70-90': 1300, '60-70': 1100, '35-60': 850 },
                   precaire: { '>130': 2500, '110-130': 2200, '90-110': 2000, '70-90': 1650, '60-70': 1400, '35-60': 1100 } }
        },
        appartement: {
            H1: { classique: { '>130': 1750, '110-130': 1600 }, precaire: { '>130': 2250, '110-130': 2050 } },
            H2: { classique: { '>130': 1450, '110-130': 1300 }, precaire: { '>130': 1850, '110-130': 1700 } },
            H3: { classique: { '>130': 950, '110-130': 850 }, precaire: { '>130': 1250, '110-130': 1100 } }
        }
    },
    isolation_murs: {
        maison: {
            H1: { classique: { '>130': 2800, '110-130': 2500, '90-110': 2100, '70-90': 1700, '60-70': 1400, '35-60': 1000 },
                   precaire: { '>130': 3700, '110-130': 3300, '90-110': 2800, '70-90': 2200, '60-70': 1800, '35-60': 1300 } },
            H2: { classique: { '>130': 2300, '110-130': 2000, '90-110': 1700, '70-90': 1400, '60-70': 1100, '35-60': 800 },
                   precaire: { '>130': 3000, '110-130': 2700, '90-110': 2300, '70-90': 1800, '60-70': 1500, '35-60': 1050 } },
            H3: { classique: { '>130': 1500, '110-130': 1350, '90-110': 1150, '70-90': 900, '60-70': 750, '35-60': 550 },
                   precaire: { '>130': 2000, '110-130': 1800, '90-110': 1500, '70-90': 1200, '60-70': 1000, '35-60': 700 } }
        },
        appartement: {
            H1: { classique: { '>130': 1400, '110-130': 1250 }, precaire: { '>130': 1850, '110-130': 1650 } },
            H2: { classique: { '>130': 1150, '110-130': 1000 }, precaire: { '>130': 1500, '110-130': 1350 } },
            H3: { classique: { '>130': 750, '110-130': 675 }, precaire: { '>130': 1000, '110-130': 900 } }
        }
    },
    isolation_combles: {
        maison: {
            H1: { classique: { '>130': 1800, '110-130': 1600, '90-110': 1400, '70-90': 1100, '60-70': 900, '35-60': 650 },
                   precaire: { '>130': 2400, '110-130': 2100, '90-110': 1800, '70-90': 1400, '60-70': 1200, '35-60': 850 } },
            H2: { classique: { '>130': 1500, '110-130': 1300, '90-110': 1100, '70-90': 900, '60-70': 750, '35-60': 550 },
                   precaire: { '>130': 2000, '110-130': 1750, '90-110': 1500, '70-90': 1200, '60-70': 1000, '35-60': 700 } },
            H3: { classique: { '>130': 1000, '110-130': 900, '90-110': 750, '70-90': 600, '60-70': 500, '35-60': 350 },
                   precaire: { '>130': 1300, '110-130': 1150, '90-110': 1000, '70-90': 800, '60-70': 650, '35-60': 450 } }
        },
        appartement: {
            H1: { classique: { '>130': 900, '110-130': 800 }, precaire: { '>130': 1200, '110-130': 1050 } },
            H2: { classique: { '>130': 750, '110-130': 650 }, precaire: { '>130': 1000, '110-130': 875 } },
            H3: { classique: { '>130': 500, '110-130': 450 }, precaire: { '>130': 650, '110-130': 575 } }
        }
    },
    panneaux_solaires: {
        maison: {
            H1: { classique: { '>130': 800, '110-130': 700, '90-110': 600, '70-90': 500, '60-70': 400, '35-60': 300 },
                   precaire: { '>130': 1100, '110-130': 950, '90-110': 800, '70-90': 650, '60-70': 550, '35-60': 400 } },
            H2: { classique: { '>130': 650, '110-130': 575, '90-110': 500, '70-90': 400, '60-70': 325, '35-60': 250 },
                   precaire: { '>130': 900, '110-130': 775, '90-110': 650, '70-90': 530, '60-70': 450, '35-60': 325 } },
            H3: { classique: { '>130': 450, '110-130': 400, '90-110': 340, '70-90': 275, '60-70': 225, '35-60': 170 },
                   precaire: { '>130': 600, '110-130': 530, '90-110': 450, '70-90': 365, '60-70': 300, '35-60': 225 } }
        },
        appartement: {
            H1: { classique: { '>130': 400, '110-130': 350 }, precaire: { '>130': 550, '110-130': 475 } },
            H2: { classique: { '>130': 325, '110-130': 290 }, precaire: { '>130': 450, '110-130': 390 } },
            H3: { classique: { '>130': 225, '110-130': 200 }, precaire: { '>130': 300, '110-130': 265 } }
        }
    },
    chauffe_eau_solaire: {
        maison: {
            H1: { classique: { '>130': 1200, '110-130': 1050, '90-110': 900, '70-90': 750, '60-70': 600, '35-60': 450 },
                   precaire: { '>130': 1600, '110-130': 1400, '90-110': 1200, '70-90': 1000, '60-70': 800, '35-60': 600 } },
            H2: { classique: { '>130': 1000, '110-130': 875, '90-110': 750, '70-90': 625, '60-70': 500, '35-60': 375 },
                   precaire: { '>130': 1300, '110-130': 1150, '90-110': 1000, '70-90': 825, '60-70': 660, '35-60': 500 } },
            H3: { classique: { '>130': 650, '110-130': 575, '90-110': 500, '70-90': 400, '60-70': 325, '35-60': 250 },
                   precaire: { '>130': 875, '110-130': 775, '90-110': 665, '70-90': 540, '60-70': 440, '35-60': 330 } }
        },
        appartement: {
            H1: { classique: { '>130': 600, '110-130': 525 }, precaire: { '>130': 800, '110-130': 700 } },
            H2: { classique: { '>130': 500, '110-130': 440 }, precaire: { '>130': 650, '110-130': 575 } },
            H3: { classique: { '>130': 325, '110-130': 290 }, precaire: { '>130': 440, '110-130': 390 } }
        }
    },
    fenetre: {
        maison: {
            H1: { classique: { '>130': 600, '110-130': 520, '90-110': 450, '70-90': 370, '60-70': 300, '35-60': 220 },
                   precaire: { '>130': 800, '110-130': 700, '90-110': 600, '70-90': 490, '60-70': 400, '35-60': 290 } },
            H2: { classique: { '>130': 490, '110-130': 425, '90-110': 365, '70-90': 300, '60-70': 245, '35-60': 180 },
                   precaire: { '>130': 650, '110-130': 570, '90-110': 490, '70-90': 400, '60-70': 325, '35-60': 240 } },
            H3: { classique: { '>130': 330, '110-130': 290, '90-110': 245, '70-90': 200, '60-70': 165, '35-60': 120 },
                   precaire: { '>130': 440, '110-130': 385, '90-110': 330, '70-90': 270, '60-70': 220, '35-60': 160 } }
        },
        appartement: {
            H1: { classique: { '>130': 300, '110-130': 260 }, precaire: { '>130': 400, '110-130': 350 } },
            H2: { classique: { '>130': 245, '110-130': 215 }, precaire: { '>130': 325, '110-130': 285 } },
            H3: { classique: { '>130': 165, '110-130': 145 }, precaire: { '>130': 220, '110-130': 195 } }
        }
    }
};

// MaPrimeRenov' estimates
const MPR_DATA = {
    pac_air_eau: { precaire: 5000, classique: 3000 },
    chaudiere_biomasse: { precaire: 5500, classique: 3000 },
    isolation_murs: { precaire: 75, classique: 40 }, // per m2
    isolation_combles: { precaire: 25, classique: 15 }, // per m2
    chauffe_eau_solaire: { precaire: 4000, classique: 2000 },
    panneaux_solaires: { precaire: 2200, classique: 1100 },
    pac_air_air: { precaire: 0, classique: 0 }, // Not eligible
    fenetre: { precaire: 100, classique: 40 } // per window ~= per 2m2
};

// Estimated costs
const COST_ESTIMATES = {
    pac_air_air: 5000,
    pac_air_eau: 15000,
    chaudiere_biomasse: 18000,
    isolation_murs: 120, // per m2
    isolation_combles: 50, // per m2
    panneaux_solaires: 9000,
    chauffe_eau_solaire: 6000,
    fenetre: 80 // per m2
};

// Per-m2 types
const PER_M2_TYPES = ['isolation_murs', 'isolation_combles', 'fenetre'];

// ===== DOM =====
function getSurfaceBracket(surface, type) {
    if (type === 'appartement') {
        if (surface > 130) return '>130';
        return '110-130';
    }
    if (surface > 130) return '>130';
    if (surface > 110) return '110-130';
    if (surface > 90) return '90-110';
    if (surface > 70) return '70-90';
    if (surface > 60) return '60-70';
    return '35-60';
}

function formatMoney(amount) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}

function calculateCEE(travaux, logement, zone, surface, revenus) {
    const data = CEE_DATA[travaux];
    if (!data) return 0;
    const typeData = data[logement];
    if (!typeData) return 0;
    const zoneData = typeData[zone];
    if (!zoneData) return 0;
    const revData = zoneData[revenus];
    if (!revData) return 0;
    const bracket = getSurfaceBracket(surface, logement);
    return revData[bracket] || 0;
}

function calculateMPR(travaux, surface, revenus) {
    const data = MPR_DATA[travaux];
    if (!data) return 0;
    const amount = data[revenus] || 0;
    if (PER_M2_TYPES.includes(travaux)) {
        return amount * surface;
    }
    return amount;
}

function calculateCost(travaux, surface) {
    const base = COST_ESTIMATES[travaux] || 10000;
    if (PER_M2_TYPES.includes(travaux)) {
        return base * surface;
    }
    return base;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Radio cards
    document.querySelectorAll('.radio-group').forEach(group => {
        const cards = group.querySelectorAll('.radio-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                card.querySelector('input').checked = true;
            });
        });
    });

    // Surface slider
    const surface = document.getElementById('surface');
    const surfaceValue = document.getElementById('surfaceValue');
    surface.addEventListener('input', () => {
        surfaceValue.textContent = surface.value + ' m\u00B2';
    });

    // Simulate button
    document.getElementById('btnSimuler').addEventListener('click', simulate);

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = 'Demande envoyee !';
        btn.style.background = '#10B981';
        setTimeout(() => {
            btn.textContent = 'Envoyer ma demande \u2192';
            btn.style.background = '';
        }, 3000);
    });
});

function simulate() {
    const logement = document.querySelector('input[name="type_logement"]:checked').value;
    const surface = parseInt(document.getElementById('surface').value);
    const zone = document.querySelector('input[name="zone"]:checked').value;
    const travaux = document.getElementById('typeTravaux').value;
    const revenus = document.querySelector('input[name="revenus"]:checked').value;

    const cee = calculateCEE(travaux, logement, zone, surface, revenus);
    const mpr = calculateMPR(travaux, surface, revenus);
    const total = cee + mpr;
    const cost = calculateCost(travaux, surface);
    const reste = Math.max(0, cost - total);

    // Show results
    document.getElementById('resultsPlaceholder').classList.add('hidden');
    const content = document.getElementById('resultsContent');
    content.classList.remove('hidden');
    content.classList.remove('show');
    // Trigger reflow for animation
    void content.offsetWidth;
    content.classList.add('show');

    document.getElementById('resultCEE').textContent = formatMoney(cee);
    document.getElementById('resultMPR').textContent = mpr > 0 ? formatMoney(mpr) : 'Non eligible';
    document.getElementById('resultTotal').textContent = formatMoney(total);
    document.getElementById('resultCout').textContent = formatMoney(cost);
    document.getElementById('resultReste').textContent = formatMoney(reste);
}
