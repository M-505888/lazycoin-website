
// LazyCoin Script

// Constants
const ASSET_ID = '6p5Ej1f3G8DT7bjL6iW2Uqnhh5pRfzgPof9iCkf6BAGS';
const BAGS_API_BASE = 'https://public-api-v2.bags.fm/api/v1/assets';
const API_KEY = 'YOUR_API_KEY_HERE'; // Do not commit this!

// State
let currentPrice = 0.0024; // Default fallback
let isWalletConnected = false;
let userSalary = 0;

// DOM Elements
const salaryInput = document.getElementById('salary-input');
const corporateTheftEl = document.getElementById('corporate-theft');
const lazyDividendsEl = document.getElementById('lazy-dividends');
const totalEfficiencyEl = document.getElementById('total-efficiency');
const walletStatusEl = document.getElementById('wallet-status');
const connectButton = document.getElementById('connect-wallet');
const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');

// Init
async function init() {
    await fetchTokenData();
    setupEventListeners();
    fetchLeaderboard();
}

async function fetchTokenData() {
    try {
        console.log("Fetching data with laziness...");
        const response = await fetch(`${BAGS_API_BASE}/${ASSET_ID}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const data = await response.json();
        console.log("Data acquired:", data);

        // Update price if available
        if (data.price) {
            currentPrice = data.price;
        }

        updateCalculator();

    } catch (error) {
        console.error('Too lazy to fetch data (or API error):', error);
    }
}

function setupEventListeners() {
    salaryInput.addEventListener('input', (e) => {
        userSalary = parseFloat(e.target.value) || 0;
        updateCalculator();
    });

    connectButton.addEventListener('click', async () => {
        // Check for Solana Wallet
        if (window.solana && window.solana.isPhantom) {
            try {
                const resp = await window.solana.connect();
                const publicKey = resp.publicKey.toString();

                // Update State
                isWalletConnected = true;
                walletStatusEl.innerText = `[ Wallet Connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)} ]`;
                connectButton.innerText = "Wallet Connected (Don't move)";
                connectButton.disabled = true;

                // Trigger Verification
                checkTop100(publicKey);

            } catch (err) {
                console.error("User verified they are too lazy to connect:", err);
            }
        } else {
            // Fallback for no wallet (Mock experience)
            alert("No Solana wallet found. Verification skipped due to extreme laziness.");
            isWalletConnected = true;
            walletStatusEl.innerText = "[ Connected: MockWallet ]";
            updateCalculator();
        }
    });
}

function checkTop100(publicKey) {
    // Simulated "Blockchain Verification" 
    const originalText = walletStatusEl.innerText;
    walletStatusEl.innerText = "[ Verifying Laziness on Blockchain... ]";

    setTimeout(() => {
        // Success State
        walletStatusEl.innerText = originalText;
        updateCalculator(); // Unlock dividends

        // Find correct container (handling potential DOM variations)
        const calcSection = document.querySelector('.section-calculator') || document.querySelector('section:nth-of-type(4) > div');

        if (calcSection) {
            const congratsMsg = document.createElement('div');
            congratsMsg.style.cssText = "margin-top: 10px; color: green; font-weight: bold; border: 1px dotted green; padding: 10px;";
            congratsMsg.innerHTML = `
                UNKNOWN IDLER DETECTED.<br>
                CONGRATS! You are effectively in the Top 100.<br>
                (Source: Trust me bro)
            `;
            calcSection.appendChild(congratsMsg);
        }

        alert("CONGRATS! You are doing nothing so well that you qualify as a Top 100 Idler.");
    }, 2000);
}

function updateCalculator() {
    // 1. Corporate Theft: Salary / 2080 work hours per year (approx)
    const workHoursPerYear = 2080;
    const hourlyTheft = userSalary / workHoursPerYear;

    // 2. Lazy Dividends
    let lazyHourly = 0;
    if (isWalletConnected) {
        // Use the real price to make it feel dynamic? 
        // Or keep the hardcoded $12.50 spec value? Spec said $12.50. 
        // Let's stick to spec but maybe use price if we wanted to be fancy.
        // For now, adhere to "Lazy Protocol" rules.
        lazyHourly = 12.50;
    }

    const total = hourlyTheft + lazyHourly;

    corporateTheftEl.textContent = `$${hourlyTheft.toFixed(2)}`;
    lazyDividendsEl.textContent = `$${lazyHourly.toFixed(2)}`;
    totalEfficiencyEl.textContent = `$${total.toFixed(2)}`;
}

async function fetchLeaderboard() {
    // Mock Data for Leaderboard as per spec
    // Real API implementation would need a specific holders endpoint if available
    const mockData = [
        { rank: '#1', wallet: 'H7x...92a', time: '12 Days, 4 Hours', payout: '4.2 SOL' },
        { rank: '#2', wallet: 'B2a...11z', time: '10 Days, 1 Hour', payout: '3.1 SOL' },
        { rank: '#3', wallet: '8sF...k2P', time: '9 Days, 20 Hours', payout: '2.8 SOL' },
        { rank: '#4', wallet: 'L4z...y9X', time: '8 Days, 0 Hours', payout: '1.5 SOL' },
        { rank: '#5', wallet: 'Zzz...111', time: '7 Days, 12 Hours', payout: '0.9 SOL' }
    ];

    if (leaderboardTableBody) {
        leaderboardTableBody.innerHTML = '';

        mockData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.rank}</td>
                <td><code>${row.wallet}</code></td>
                <td>${row.time}</td>
                <td>${row.payout}</td>
            `;
            leaderboardTableBody.appendChild(tr);
        });
    }
}

// Start
init();
