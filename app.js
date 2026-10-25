/**
 * Sahal Travel Agency Management System
 * Core Application Logic, Reactive State, LocalStorage, Financial Analytics & Ticket Generation
 */

// Initial Sample Data
const DEFAULT_DATA = {
  agencyInfo: {
    name: "Sahal Travel & Tourism Agency",
    tagline: "Adeeg Hufan, Safar Raaxo Leh & Qiimo Jaban",
    phone: "+252 61 5000000 / +252 63 4000000",
    email: "info@sahaltravel.so",
    address: "Km4, Maka Al-Mukarama Rd, Mogadishu, Somalia",
    currency: "$"
  },
  destinations: [
    {
      id: "dest-1",
      name: "Istanbul, Turkey",
      title: "Dalxiiska Taariikhiga ah ee Istanbul",
      price: 850,
      duration: "7 Maalmood / 6 Habeen",
      category: "Dalxiis",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80",
      description: "Booqo masaajidka Blue Mosque, Hagia Sophia, safar dooni Bosphorus ah, iyo dukaameysi suuqyada caanka ah ee Istanbul.",
      features: ["Tikidh Diyaaradeed", "Hoteel 4-Star", "Doonida Bosphorus", "Fiisaha Turkey"]
    },
    {
      id: "dest-2",
      name: "Makkah & Madinah, Saudi Arabia",
      title: "Xirmada Barakeysan ee Cumrada",
      price: 1450,
      duration: "15 Maalmood",
      category: "Cumro",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
      description: "Xirmo dhameystiran oo Cumro ah oo ay ku jiraan Hoteello u dhow Xaramka, gaadiid casri ah, iyo hagid sharci ah.",
      features: ["Fiisaha Cumrada", "Hoteel Xaramka ku dhow", "Gaadiid VIP ah", "Hage Luuqadda Soomaaliga"]
    },
    {
      id: "dest-3",
      name: "Dubai & Abu Dhabi, UAE",
      title: "Dalxiiska Casriga ah ee Dubai",
      price: 1100,
      duration: "6 Maalmood / 5 Habeen",
      category: "Dalxiis",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
      description: "Burj Khalifa, Desert Safari casho leh, booqashada Dubai Mall, iyo dalxiiska masaajidka Sheikh Zayed ee Abu Dhabi.",
      features: ["Tikidh FlyDubai", "Hoteel 5-Star", "Desert Safari VIP", "Fiisaha UAE"]
    },
    {
      id: "dest-4",
      name: "Zanzibar Island, Tanzania",
      title: "Nasiinada Xeebaha Zanzibar",
      price: 920,
      duration: "5 Maalmood / 4 Habeen",
      category: "Nasiino",
      image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&auto=format&fit=crop&q=80",
      description: "Xeebaha cadcad ee Nungwi, Stone Town taariikhiga ah, Prison Island daawashada diiq-diirka, iyo dalxiiska uunsiga.",
      features: ["Duulimaad Toos ah", "Resort ku yaal Xeebta", "Stone Town Tour", "Quraac & Casho"]
    },
    {
      id: "dest-5",
      name: "Cairo & Pyramids, Egypt",
      title: "Safarka Ahraamta & Webiga Niil",
      price: 780,
      duration: "6 Maalmood / 5 Habeen",
      category: "Dalxiis",
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&auto=format&fit=crop&q=80",
      description: "Daawashada Ahraamta Giza, Matxafka Masar, safar dooni fiidkii ee Webiga Niil oo casho iyo bandhig wata.",
      features: ["Tikidh EgyptAir", "Hoteel 4-Star", "Doonida Webiga Niil", "Booqashada Ahraamta"]
    },
    {
      id: "dest-6",
      name: "Nairobi & Masai Mara, Kenya",
      title: "Safarka Duur-joogta Kenya",
      price: 650,
      duration: "4 Maalmood / 3 Habeen",
      category: "Safari",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
      description: "Daawashada xayawaanka duur-joogta ah ee Masai Mara iyo Nairobi National Park oo leh gaari gaar ah.",
      features: ["Tikidh Duulimaad", "Safari Lodge", "Game Drive Gaari 4x4", "Cuntada oo dhan"]
    }
  ],
  bookings: [
    {
      id: "BK-1001",
      customerName: "Axmed Maxamed Cali",
      phone: "+252 61 5123456",
      email: "ahmed.ali@gmail.com",
      passport: "P089421",
      destination: "Istanbul, Turkey",
      type: "Dalxiis",
      travelDate: "2026-10-18",
      returnDate: "2026-10-25",
      passengers: 1,
      totalPrice: 850,
      paidAmount: 850,
      paymentMethod: "EVC Plus",
      status: "Bixiyay",
      dateCreated: "2026-10-01",
      notes: "Kuraasta daaqada jecel yahay, Turkish Airlines"
    },
    {
      id: "BK-1002",
      customerName: "Faadumo Jaamac Xasan",
      phone: "+252 63 4456789",
      email: "fadumo.j@outlook.com",
      passport: "P128741",
      destination: "Makkah & Madinah, Saudi Arabia",
      type: "Cumro",
      travelDate: "2026-10-22",
      returnDate: "2026-11-06",
      passengers: 2,
      totalPrice: 2900,
      paidAmount: 2000,
      paymentMethod: "ZAAD Service",
      status: "Qayb bixiyay",
      dateCreated: "2026-10-02",
      notes: "Hooyo iyo gabarteeda, qol laba sariirood ah"
    },
    {
      id: "BK-1003",
      customerName: "Cabdiraxmaan Cismaan Cilmi",
      phone: "+252 61 9988771",
      email: "abdirahman.osman@gmail.com",
      passport: "P381920",
      destination: "Dubai & Abu Dhabi, UAE",
      type: "Dalxiis",
      travelDate: "2026-11-02",
      returnDate: "2026-11-08",
      passengers: 1,
      totalPrice: 1100,
      paidAmount: 1100,
      paymentMethod: "Sahal",
      status: "Bixiyay",
      dateCreated: "2026-10-03",
      notes: "Booqasho ganacsi & dalxiis"
    },
    {
      id: "BK-1004",
      customerName: "Nimco Cabdi Shire",
      phone: "+252 61 7890123",
      email: "nimco.shire@gmail.com",
      passport: "P554432",
      destination: "Nairobi & Masai Mara, Kenya",
      type: "Safari",
      travelDate: "2026-10-15",
      returnDate: "2026-10-19",
      passengers: 1,
      totalPrice: 650,
      paidAmount: 300,
      paymentMethod: "EVC Plus",
      status: "Qayb bixiyay",
      dateCreated: "2026-10-04",
      notes: "Lacagta dhiman $350 safarka ka hor ayaa bixineysaa"
    },
    {
      id: "BK-1005",
      customerName: "Khaliif Xuseen Warsame",
      phone: "+252 61 8887766",
      email: "khalif.warsame@gmail.com",
      passport: "P667788",
      destination: "Zanzibar Island, Tanzania",
      type: "Nasiino",
      travelDate: "2026-11-12",
      returnDate: "2026-11-17",
      passengers: 2,
      totalPrice: 1840,
      paidAmount: 0,
      paymentMethod: "Kaash (Cash)",
      status: "Dhiman",
      dateCreated: "2026-10-05",
      notes: "Balanqaad inuu bixinayo berri"
    },
    {
      id: "BK-1006",
      customerName: "Hani Maxamuud Nuur",
      phone: "+252 63 7112233",
      email: "hani.nuur@gmail.com",
      passport: "P990011",
      destination: "Cairo & Pyramids, Egypt",
      type: "Dalxiis",
      travelDate: "2026-10-28",
      returnDate: "2026-11-04",
      passengers: 1,
      totalPrice: 780,
      paidAmount: 780,
      paymentMethod: "ZAAD Service",
      status: "Bixiyay",
      dateCreated: "2026-10-06",
      notes: "Qoysku waxay rabaan dooni caweys ah"
    }
  ],
  transactions: [
    {
      id: "TX-501",
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: "Bixinta tikidhkii Axmed Maxamed - Istanbul",
      bookingId: "BK-1001",
      amount: 850,
      method: "EVC Plus",
      date: "2026-10-01"
    },
    {
      id: "TX-502",
      type: "Kharash",
      category: "Tikidh Diyaaradeed",
      description: "Lacag-bixinta Turkish Airlines ee tikidhada bisha",
      bookingId: "",
      amount: 4500,
      method: "Bank Transfer",
      date: "2026-10-02"
    },
    {
      id: "TX-503",
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: "Qayb bixinta Xirmada Cumrada - Faadumo Jaamac",
      bookingId: "BK-1002",
      amount: 2000,
      method: "ZAAD Service",
      date: "2026-10-02"
    },
    {
      id: "TX-504",
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: "Bixinta xirmada Dubai - Cabdiraxmaan Cismaan",
      bookingId: "BK-1003",
      amount: 1100,
      method: "Sahal",
      date: "2026-10-03"
    },
    {
      id: "TX-505",
      type: "Kharash",
      category: "Kiro Xafiis",
      description: "Kirada Xafiiska Weyn ee Km4 - Bisha Oktoobar",
      bookingId: "",
      amount: 600,
      method: "EVC Plus",
      date: "2026-10-03"
    },
    {
      id: "TX-506",
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: "Qayb bixinta Safarka Kenya - Nimco Cabdi",
      bookingId: "BK-1004",
      amount: 300,
      method: "EVC Plus",
      date: "2026-10-04"
    },
    {
      id: "TX-507",
      type: "Kharash",
      category: "Mushaharka Shaqaalaha",
      description: "Mushaharka 3 shaqaale iyo maamulaha xafiiska",
      bookingId: "",
      amount: 1800,
      method: "Bank Transfer",
      date: "2026-10-05"
    },
    {
      id: "TX-508",
      type: "Dakhli",
      category: "Fiisooyin & Adeegyo",
      description: "Adeegga helitaanka Fiisaha Sacuudiga & UAE",
      bookingId: "",
      amount: 540,
      method: "Kaash (Cash)",
      date: "2026-10-05"
    },
    {
      id: "TX-509",
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: "Bixinta xirmada Qaahira - Hani Maxamuud Nuur",
      bookingId: "BK-1006",
      amount: 780,
      method: "ZAAD Service",
      date: "2026-10-06"
    },
    {
      id: "TX-510",
      type: "Kharash",
      category: "Suuq-geyn & Xayeysiis",
      description: "Xayeysiiska Facebook & TikTok ee xirmooyinka cusub",
      bookingId: "",
      amount: 250,
      method: "MasterCard / Visa",
      date: "2026-10-06"
    }
  ]
};

// State Manager
class TravelAgencyApp {
  constructor() {
    this.storageKey = "sahal_travel_agency_data_v1";
    this.currentView = "dashboard";
    this.financeChart = null;
    this.categoryChart = null;
    this.paymentMethodChart = null;
    this.bookingSearchQuery = "";
    this.bookingStatusFilter = "all";
    this.financeTypeFilter = "all";
    this.financeSearchQuery = "";

    this.initData();
    this.bindEvents();
    this.render();
  }

  initData() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.saveData();
    } else {
      try {
        this.data = JSON.parse(raw);
      } catch (e) {
        console.error("Data parse error, restoring default data", e);
        this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
        this.saveData();
      }
    }
  }

  saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  resetData() {
    if (confirm("Ma hubtaa inaad dib ugu celiso xogtii asalka ahayd ee tusaalaha ahayd?")) {
      this.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.saveData();
      this.showToast("Xogtii hore dib ayaa loo soo celiyay!", "success");
      this.render();
    }
  }

  showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    const bgClass = type === "success" ? "bg-emerald-600" : type === "error" ? "bg-rose-600" : "bg-sky-600";
    toast.className = `flex items-center gap-3 text-white px-5 py-3 rounded-xl shadow-xl transform transition-all duration-300 translate-y-2 opacity-0 text-sm font-medium ${bgClass}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'} text-lg"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    });

    setTimeout(() => {
      toast.classList.add("opacity-0", "-translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Navigation switch
  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.dataset.view === viewName) {
        item.classList.add("bg-sky-50", "text-sky-600", "font-semibold");
        item.classList.remove("text-slate-600", "hover:bg-slate-100");
      } else {
        item.classList.remove("bg-sky-50", "text-sky-600", "font-semibold");
        item.classList.add("text-slate-600", "hover:bg-slate-100");
      }
    });

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.remove("hidden");
      activeSec.classList.add("animate-fade-in");
    }

    // Close mobile sidebar if open
    const sidebar = document.getElementById("mobileSidebar");
    if (sidebar && !sidebar.classList.contains("-translate-x-full")) {
      sidebar.classList.add("-translate-x-full");
    }

    if (viewName === "dashboard") {
      this.renderCharts();
    }
  }

  // Metrics Calculations
  getCalculatedMetrics() {
    const totalIncome = this.data.transactions
      .filter(t => t.type === "Dakhli")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpense = this.data.transactions
      .filter(t => t.type === "Kharash")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const netProfit = totalIncome - totalExpense;

    const totalBookings = this.data.bookings.length;

    const pendingBalance = this.data.bookings.reduce((sum, b) => {
      const balance = Math.max(0, Number(b.totalPrice || 0) - Number(b.paidAmount || 0));
      return sum + balance;
    }, 0);

    // Unique customers by passport or phone
    const customersMap = new Map();
    this.data.bookings.forEach(b => {
      const key = b.passport || b.phone || b.customerName;
      if (!customersMap.has(key)) {
        customersMap.set(key, {
          name: b.customerName,
          phone: b.phone,
          email: b.email,
          passport: b.passport,
          totalSpent: 0,
          pendingDue: 0,
          tripsCount: 0
        });
      }
      const cust = customersMap.get(key);
      cust.tripsCount += 1;
      cust.totalSpent += Number(b.paidAmount || 0);
      cust.pendingDue += Math.max(0, Number(b.totalPrice || 0) - Number(b.paidAmount || 0));
    });

    return {
      totalIncome,
      totalExpense,
      netProfit,
      pendingBalance,
      totalBookings,
      totalCustomers: customersMap.size,
      customersList: Array.from(customersMap.values())
    };
  }

  // Format currency
  formatMoney(num) {
    const currency = this.data.agencyInfo.currency || "$";
    return `${currency}${Number(num || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }

  // Main Render
  render() {
    this.renderAgencyInfo();
    this.renderDashboardStats();
    this.renderRecentBookings();
    this.renderDestinations();
    this.renderBookingsTable();
    this.renderFinanceTable();
    this.renderCustomersTable();
    this.renderDestinationOptions();
    if (this.currentView === "dashboard") {
      this.renderCharts();
    }
  }

  renderAgencyInfo() {
    const nameEl = document.querySelectorAll(".agency-name-text");
    nameEl.forEach(el => el.textContent = this.data.agencyInfo.name);
  }

  renderDashboardStats() {
    const metrics = this.getCalculatedMetrics();

    document.getElementById("statTotalIncome").textContent = this.formatMoney(metrics.totalIncome);
    document.getElementById("statTotalExpense").textContent = this.formatMoney(metrics.totalExpense);
    
    const profitEl = document.getElementById("statNetProfit");
    profitEl.textContent = this.formatMoney(metrics.netProfit);
    if (metrics.netProfit < 0) {
      profitEl.classList.remove("text-emerald-600");
      profitEl.classList.add("text-rose-600");
    } else {
      profitEl.classList.remove("text-rose-600");
      profitEl.classList.add("text-emerald-600");
    }

    document.getElementById("statPendingBalance").textContent = this.formatMoney(metrics.pendingBalance);
    document.getElementById("statTotalBookings").textContent = metrics.totalBookings.toLocaleString();
    document.getElementById("statTotalCustomers").textContent = metrics.totalCustomers.toLocaleString();
  }

  renderCharts() {
    // 1. Finance Overview Bar/Line Chart
    const ctxFinance = document.getElementById("chartFinanceOverview");
    if (ctxFinance) {
      if (this.financeChart) this.financeChart.destroy();

      // Aggregate transactions by date or month
      const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
      const incomeData = [4200, 5600, 7100, 8900, this.getCalculatedMetrics().totalIncome, 0];
      const expenseData = [2100, 2900, 3400, 4100, this.getCalculatedMetrics().totalExpense, 0];

      this.financeChart = new Chart(ctxFinance, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Dakhliga (Income)',
              data: incomeData,
              backgroundColor: 'rgba(2, 132, 199, 0.85)',
              borderRadius: 6,
            },
            {
              label: 'Kharashka (Expenses)',
              data: expenseData,
              backgroundColor: 'rgba(244, 63, 94, 0.75)',
              borderRadius: 6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans', size: 12 } } },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.dataset.label}: $${context.raw.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (val) => `$${val.toLocaleString()}`,
                font: { family: 'Plus Jakarta Sans', size: 11 }
              },
              grid: { color: 'rgba(226, 232, 240, 0.6)' }
            },
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } }
            }
          }
        }
      });
    }

    // 2. Service Category Doughnut Chart
    const ctxCat = document.getElementById("chartCategories");
    if (ctxCat) {
      if (this.categoryChart) this.categoryChart.destroy();

      const counts = { 'Dalxiis': 0, 'Cumro': 0, 'Nasiino': 0, 'Safari': 0, 'Duulimaad': 0 };
      this.data.bookings.forEach(b => {
        counts[b.type] = (counts[b.type] || 0) + 1;
      });

      this.categoryChart = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: Object.keys(counts),
          datasets: [{
            data: Object.values(counts),
            backgroundColor: [
              '#0284c7', // Sky
              '#10b981', // Emerald
              '#f59e0b', // Amber
              '#8b5cf6', // Violet
              '#06b6d4'  // Cyan
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } }
          },
          cutout: '70%'
        }
      });
    }

    // 3. Payment Methods Breakdown
    const ctxPay = document.getElementById("chartPaymentMethods");
    if (ctxPay) {
      if (this.paymentMethodChart) this.paymentMethodChart.destroy();

      const payCounts = {};
      this.data.transactions
        .filter(t => t.type === "Dakhli")
        .forEach(t => {
          payCounts[t.method] = (payCounts[t.method] || 0) + Number(t.amount || 0);
        });

      this.paymentMethodChart = new Chart(ctxPay, {
        type: 'polarArea',
        data: {
          labels: Object.keys(payCounts),
          datasets: [{
            data: Object.values(payCounts),
            backgroundColor: [
              'rgba(16, 185, 129, 0.75)', // EVC
              'rgba(14, 165, 233, 0.75)', // Zaad
              'rgba(245, 158, 11, 0.75)',  // Sahal
              'rgba(139, 92, 246, 0.75)',  // Cash
              'rgba(236, 72, 153, 0.75)'   // Card
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.label}: $${context.raw.toLocaleString()}`
              }
            }
          }
        }
      });
    }
  }

  renderRecentBookings() {
    const tbody = document.getElementById("recentBookingsTableBody");
    if (!tbody) return;

    const recents = [...this.data.bookings].reverse().slice(0, 5);
    tbody.innerHTML = recents.map(b => {
      const balance = Math.max(0, b.totalPrice - b.paidAmount);
      const statusBadge = this.getStatusBadge(b.status);
      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
          <td class="py-3 px-4 text-xs font-semibold text-sky-700">${b.id}</td>
          <td class="py-3 px-4">
            <div class="font-medium text-slate-800 text-sm">${b.customerName}</div>
            <div class="text-xs text-slate-400">${b.phone}</div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-600 font-medium">${b.destination}</td>
          <td class="py-3 px-4 text-xs text-slate-600">${b.travelDate}</td>
          <td class="py-3 px-4 font-semibold text-slate-800 text-sm">${this.formatMoney(b.totalPrice)}</td>
          <td class="py-3 px-4 font-semibold ${balance > 0 ? 'text-amber-600' : 'text-emerald-600'} text-xs">
            ${balance > 0 ? this.formatMoney(balance) : 'Dhameystiran'}
          </td>
          <td class="py-3 px-4">${statusBadge}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="app.openTicketModal('${b.id}')" class="px-2.5 py-1 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors inline-flex items-center gap-1.5" title="Daabac Tikidh">
              <i class="fa-solid fa-ticket"></i> Tikidh
            </button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Destinations & Packages Grid
  renderDestinations() {
    const grid = document.getElementById("destinationsGrid");
    if (!grid) return;

    grid.innerHTML = this.data.destinations.map(d => {
      const featurePills = (d.features || []).map(f => 
        `<span class="inline-block bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md"><i class="fa-solid fa-check text-emerald-500 mr-1 text-[10px]"></i>${f}</span>`
      ).join(" ");

      return `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div class="relative h-52 overflow-hidden bg-slate-100">
            <img src="${d.image}" alt="${d.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80'">
            <div class="absolute inset-0 card-image-gradient pointer-events-none"></div>
            
            <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-rose-500"></i> ${d.name}
            </div>

            <div class="absolute top-3 right-3 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              ${d.category || 'Dalxiis'}
            </div>

            <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
              <div>
                <span class="text-xs text-slate-200 block">Qiimaha Qofkiiba</span>
                <span class="text-2xl font-black tracking-tight text-white">${this.formatMoney(d.price)}</span>
              </div>
              <span class="text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md text-slate-100 border border-white/20">
                <i class="fa-regular fa-clock mr-1"></i>${d.duration}
              </span>
            </div>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1.5">
                ${d.title}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                ${d.description}
              </p>

              <div class="flex flex-wrap gap-1.5 mb-5">
                ${featurePills}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button onclick="app.quickBookPackage('${d.id}')" class="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm shadow-sky-600/30 transition-all">
                <i class="fa-solid fa-calendar-plus"></i> Boos u Qabso
              </button>
              <button onclick="app.deleteDestination('${d.id}')" class="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Tir Xirmada">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Bookings Table
  renderBookingsTable() {
    const tbody = document.getElementById("allBookingsTableBody");
    if (!tbody) return;

    let filtered = [...this.data.bookings];

    if (this.bookingStatusFilter !== "all") {
      filtered = filtered.filter(b => b.status === this.bookingStatusFilter);
    }

    if (this.bookingSearchQuery.trim()) {
      const q = this.bookingSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(b => 
        b.customerName.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.passport && b.passport.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="py-12 text-center text-slate-400">
            <i class="fa-solid fa-folder-open text-4xl mb-3 block text-slate-300"></i>
            Wax boos ah lagama helin shuruudahan.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.reverse().map(b => {
      const balance = Math.max(0, b.totalPrice - b.paidAmount);
      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
          <td class="py-3 px-4 font-mono text-xs font-semibold text-sky-700">${b.id}</td>
          <td class="py-3 px-4">
            <div class="font-semibold text-slate-800 text-sm">${b.customerName}</div>
            <div class="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span><i class="fa-solid fa-phone text-[10px] text-slate-400"></i> ${b.phone}</span>
              ${b.passport ? `<span class="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px] font-mono">${b.passport}</span>` : ''}
            </div>
          </td>
          <td class="py-3 px-4">
            <div class="font-medium text-slate-700 text-xs">${b.destination}</div>
            <span class="inline-block bg-sky-50 text-sky-700 text-[10px] px-2 py-0.5 rounded font-medium mt-0.5">${b.type}</span>
          </td>
          <td class="py-3 px-4 text-xs text-slate-600">
            <div><i class="fa-regular fa-calendar-check text-sky-500 mr-1"></i>${b.travelDate}</div>
            ${b.returnDate ? `<div class="text-slate-400 text-[11px]"><i class="fa-regular fa-calendar-xmark text-slate-400 mr-1"></i>${b.returnDate}</div>` : ''}
          </td>
          <td class="py-3 px-4 font-bold text-slate-800 text-sm">${this.formatMoney(b.totalPrice)}</td>
          <td class="py-3 px-4 font-medium text-emerald-600 text-sm">${this.formatMoney(b.paidAmount)}</td>
          <td class="py-3 px-4 font-bold ${balance > 0 ? 'text-amber-600' : 'text-slate-400'} text-xs">
            ${balance > 0 ? this.formatMoney(balance) : '0 (La Bixiyay)'}
          </td>
          <td class="py-3 px-4">${this.getStatusBadge(b.status)}</td>
          <td class="py-3 px-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="app.openTicketModal('${b.id}')" class="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors" title="Tikidh & Rasiid">
                <i class="fa-solid fa-ticket"></i>
              </button>
              <button onclick="app.openPaymentModal('${b.id}')" class="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors" title="Lacag ku kordhi">
                <i class="fa-solid fa-money-bill-wave"></i>
              </button>
              <button onclick="app.deleteBooking('${b.id}')" class="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors" title="Tir">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Financial Hub Table & Summary
  renderFinanceTable() {
    const tbody = document.getElementById("financeTableBody");
    if (!tbody) return;

    let filtered = [...this.data.transactions];

    if (this.financeTypeFilter !== "all") {
      filtered = filtered.filter(t => t.type === this.financeTypeFilter);
    }

    if (this.financeSearchQuery.trim()) {
      const q = this.financeSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.method.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
      );
    }

    // Update Finance Tab Head KPI numbers
    const metrics = this.getCalculatedMetrics();
    const incomeCard = document.getElementById("finHeadIncome");
    const expenseCard = document.getElementById("finHeadExpense");
    const netCard = document.getElementById("finHeadNet");

    if (incomeCard) incomeCard.textContent = this.formatMoney(metrics.totalIncome);
    if (expenseCard) expenseCard.textContent = this.formatMoney(metrics.totalExpense);
    if (netCard) netCard.textContent = this.formatMoney(metrics.netProfit);

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-12 text-center text-slate-400">
            <i class="fa-solid fa-receipt text-4xl mb-3 block text-slate-300"></i>
            Wax xisaab ah oo la xiriirta lagama helin.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.reverse().map(t => {
      const isIncome = t.type === "Dakhli";
      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
          <td class="py-3 px-4 font-mono text-xs text-slate-500 font-semibold">${t.id}</td>
          <td class="py-3 px-4 text-xs text-slate-600">${t.date}</td>
          <td class="py-3 px-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              <i class="fa-solid ${isIncome ? 'fa-arrow-down-long text-emerald-600' : 'fa-arrow-up-long text-rose-600'} text-[11px]"></i>
              ${t.type}
            </span>
          </td>
          <td class="py-3 px-4 text-xs font-medium text-slate-700">${t.category}</td>
          <td class="py-3 px-4 text-xs text-slate-600">${t.description}</td>
          <td class="py-3 px-4">
            <span class="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded font-medium">
              <i class="fa-solid fa-wallet text-sky-600 mr-1 text-[11px]"></i>${t.method}
            </span>
          </td>
          <td class="py-3 px-4 font-bold text-sm text-right ${isIncome ? 'text-emerald-600' : 'text-rose-600'}">
            ${isIncome ? '+' : '-'}${this.formatMoney(t.amount)}
          </td>
        </tr>
      `;
    }).join("");
  }

  // Customers Table
  renderCustomersTable() {
    const tbody = document.getElementById("customersTableBody");
    if (!tbody) return;

    const metrics = this.getCalculatedMetrics();
    const list = metrics.customersList;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-12 text-center text-slate-400">
            Wax macaamiil ah lama diiwaangelin wali.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map((c, idx) => {
      // Clean phone for whatsapp
      const cleanPhone = c.phone.replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${cleanPhone}?text=Asalaamu%20Calaykum%20${encodeURIComponent(c.name)},%20Mahadsanid%20la%20shaqeyntaada%20${encodeURIComponent(this.data.agencyInfo.name)}`;

      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition-colors">
          <td class="py-3 px-4 text-xs text-slate-400 font-semibold">#${idx + 1}</td>
          <td class="py-3 px-4">
            <div class="font-bold text-slate-800 text-sm flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ${c.name.charAt(0).toUpperCase()}
              </div>
              <span>${c.name}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-600 font-medium">
            <div>${c.phone}</div>
            ${c.email ? `<div class="text-[11px] text-slate-400">${c.email}</div>` : ''}
          </td>
          <td class="py-3 px-4 font-mono text-xs text-slate-700">
            <span class="bg-slate-100 px-2 py-0.5 rounded">${c.passport || 'Lama hayo'}</span>
          </td>
          <td class="py-3 px-4 text-center">
            <span class="bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full text-xs">${c.tripsCount} Safar</span>
          </td>
          <td class="py-3 px-4 font-bold text-emerald-600 text-sm">${this.formatMoney(c.totalSpent)}</td>
          <td class="py-3 px-4 font-bold ${c.pendingDue > 0 ? 'text-amber-600' : 'text-slate-400'} text-xs">
            ${c.pendingDue > 0 ? this.formatMoney(c.pendingDue) : 'Dhameystiran'}
          </td>
          <td class="py-3 px-4 text-right">
            <a href="${waLink}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors shadow-sm">
              <i class="fa-brands fa-whatsapp text-sm text-emerald-600"></i> WhatsApp
            </a>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Populate Destination Select Dropdown
  renderDestinationOptions() {
    const sel = document.getElementById("bookingDestinationSelect");
    if (!sel) return;

    sel.innerHTML = '<option value="">-- Dooro Goobta / Xirmada --</option>' + 
      this.data.destinations.map(d => `
        <option value="${d.name}" data-price="${d.price}" data-category="${d.category}">
          ${d.name} (${this.formatMoney(d.price)}) - ${d.category}
        </option>
      `).join("");
  }

  // Helper Badge
  getStatusBadge(status) {
    if (status === "Bixiyay" || status === "Paid") {
      return `<span class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full text-xs"><i class="fa-solid fa-circle-check text-[10px]"></i> Bixiyay</span>`;
    }
    if (status === "Qayb bixiyay" || status === "Partial") {
      return `<span class="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-full text-xs"><i class="fa-solid fa-clock-rotate-left text-[10px]"></i> Qayb Bixiyay</span>`;
    }
    return `<span class="inline-flex items-center gap-1 bg-rose-100 text-rose-800 font-semibold px-2.5 py-1 rounded-full text-xs"><i class="fa-solid fa-triangle-exclamation text-[10px]"></i> Dhiman</span>`;
  }

  // Quick Book Package from Destinations Tab
  quickBookPackage(destId) {
    const dest = this.data.destinations.find(d => d.id === destId);
    if (!dest) return;

    this.openModal("modalNewBooking");
    const sel = document.getElementById("bookingDestinationSelect");
    if (sel) {
      sel.value = dest.name;
    }
    const priceInput = document.getElementById("bookingPriceInput");
    if (priceInput) {
      priceInput.value = dest.price;
    }
    const typeInput = document.getElementById("bookingTypeInput");
    if (typeInput) {
      typeInput.value = dest.category;
    }
    this.updateBookingBalance();
  }

  // Modal open/close
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Ticket Preview & Print Modal
  openTicketModal(bookingId) {
    const b = this.data.bookings.find(x => x.id === bookingId);
    if (!b) return;

    const balance = Math.max(0, b.totalPrice - b.paidAmount);
    const container = document.getElementById("ticketModalContent");
    if (!container) return;

    container.innerHTML = `
      <div id="printableTicket" class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl max-w-2xl mx-auto">
        <!-- Top Boarding Header -->
        <div class="bg-gradient-to-r from-sky-800 via-sky-700 to-indigo-900 text-white p-6 relative">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-plane-departure text-amber-400 text-2xl"></i>
                <h2 class="text-xl font-black tracking-wide uppercase">${this.data.agencyInfo.name}</h2>
              </div>
              <p class="text-xs text-sky-200 mt-1">${this.data.agencyInfo.tagline}</p>
            </div>
            <div class="text-right">
              <span class="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
                E-TICKET / BOARDING PASS
              </span>
              <div class="text-xs text-sky-100 font-mono mt-1 font-bold">${b.id}</div>
            </div>
          </div>
        </div>

        <!-- Ticket Body -->
        <div class="p-6 bg-slate-50 border-b border-dashed border-slate-300">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Magaca Rakaabka</span>
              <span class="font-bold text-slate-800 text-base block mt-0.5">${b.customerName}</span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Baasaboorka / ID</span>
              <span class="font-mono font-bold text-slate-800 text-base block mt-0.5">${b.passport || 'N/A'}</span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Telefoonka</span>
              <span class="font-medium text-slate-700 text-sm block mt-0.5">${b.phone}</span>
            </div>
            <div class="col-span-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Magaalada & Goobta Safarka</span>
              <span class="font-black text-sky-700 text-lg block mt-0.5">
                <i class="fa-solid fa-location-dot text-rose-500 mr-1.5"></i> ${b.destination}
              </span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nooca Adeegga</span>
              <span class="font-semibold text-slate-800 text-sm block mt-0.5">${b.type}</span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Taariikhda Bixitaanka</span>
              <span class="font-bold text-slate-800 text-sm block mt-0.5 text-emerald-700">
                <i class="fa-regular fa-calendar-check mr-1"></i> ${b.travelDate}
              </span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Taariikhda Soo Laabashada</span>
              <span class="font-medium text-slate-700 text-sm block mt-0.5">
                ${b.returnDate || 'Safar Hal Dhinac ah'}
              </span>
            </div>
            <div>
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tirada Dadka</span>
              <span class="font-bold text-slate-800 text-sm block mt-0.5">${b.passengers || 1} Qof</span>
            </div>
          </div>
        </div>

        <!-- Financial Section of Ticket -->
        <div class="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-4 text-xs">
              <span class="text-slate-500">Qiimaha Guud:</span>
              <span class="font-bold text-slate-800 text-sm">${this.formatMoney(b.totalPrice)}</span>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <span class="text-slate-500">Lacagta La Bixiyay:</span>
              <span class="font-bold text-emerald-600 text-sm">${this.formatMoney(b.paidAmount)} (${b.paymentMethod})</span>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <span class="text-slate-500">Lacagta Dhiman:</span>
              <span class="font-bold ${balance > 0 ? 'text-amber-600' : 'text-slate-400'} text-sm">${this.formatMoney(balance)}</span>
            </div>
          </div>

          <!-- Barcode simulation -->
          <div class="text-center sm:text-right">
            <div class="inline-block bg-slate-900 text-white font-mono text-center tracking-widest px-4 py-2 rounded text-xs">
              ||||| | |||| ||| |||||| | |||||
            </div>
            <div class="text-[10px] text-slate-400 font-mono mt-1">ISSUED: ${b.dateCreated}</div>
            <div class="mt-2">${this.getStatusBadge(b.status)}</div>
          </div>
        </div>

        <!-- Footer terms -->
        <div class="bg-slate-100 p-4 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200">
          <span><i class="fa-solid fa-headset mr-1"></i> ${this.data.agencyInfo.phone}</span>
          <span><i class="fa-solid fa-envelope mr-1"></i> ${this.data.agencyInfo.email}</span>
          <span><i class="fa-solid fa-map-pin mr-1"></i> ${this.data.agencyInfo.address}</span>
        </div>
      </div>
    `;

    this.openModal("modalTicketView");
  }

  // Payment Recording Modal for an existing booking
  openPaymentModal(bookingId) {
    const b = this.data.bookings.find(x => x.id === bookingId);
    if (!b) return;

    const balance = Math.max(0, b.totalPrice - b.paidAmount);
    if (balance <= 0) {
      this.showToast("Booskan lacagtiisu horey ayaa loo dhameystiray!", "info");
      return;
    }

    document.getElementById("paymentBookingId").value = b.id;
    document.getElementById("paymentCustomerName").textContent = b.customerName;
    document.getElementById("paymentDueAmount").textContent = this.formatMoney(balance);
    document.getElementById("paymentAmountInput").value = balance;
    document.getElementById("paymentAmountInput").max = balance;

    this.openModal("modalAddPayment");
  }

  // Action: Record Additional Payment on Booking
  submitAdditionalPayment() {
    const bookingId = document.getElementById("paymentBookingId").value;
    const amount = Number(document.getElementById("paymentAmountInput").value);
    const method = document.getElementById("paymentMethodSelect").value;
    const notes = document.getElementById("paymentNotesInput").value;

    const b = this.data.bookings.find(x => x.id === bookingId);
    if (!b) return;

    if (amount <= 0) {
      alert("Fadlan geli lacag sax ah!");
      return;
    }

    b.paidAmount += amount;
    if (b.paidAmount >= b.totalPrice) {
      b.status = "Bixiyay";
    } else {
      b.status = "Qayb bixiyay";
    }

    // Add financial transaction
    const newTx = {
      id: "TX-" + (this.data.transactions.length + 501),
      type: "Dakhli",
      category: "Boos Qabasho (Booking)",
      description: `Bixinta dhimanka ${b.customerName} - ${b.destination} ${notes ? '(' + notes + ')' : ''}`,
      bookingId: b.id,
      amount: amount,
      method: method,
      date: new Date().toISOString().split('T')[0]
    };
    this.data.transactions.push(newTx);

    this.saveData();
    this.closeModal("modalAddPayment");
    this.render();
    this.showToast(`Lacag dhan ${this.formatMoney(amount)} ayaa lagu daray booska ${b.id}!`);
  }

  // Action: Add New Booking
  submitNewBooking(e) {
    e.preventDefault();
    const customerName = document.getElementById("bookingCustomerName").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const passport = document.getElementById("bookingPassport").value.trim();
    const destination = document.getElementById("bookingDestinationSelect").value;
    const type = document.getElementById("bookingTypeInput").value;
    const travelDate = document.getElementById("bookingTravelDate").value;
    const returnDate = document.getElementById("bookingReturnDate").value;
    const passengers = Number(document.getElementById("bookingPassengers").value || 1);
    const totalPrice = Number(document.getElementById("bookingPriceInput").value);
    const paidAmount = Number(document.getElementById("bookingPaidInput").value || 0);
    const paymentMethod = document.getElementById("bookingMethodSelect").value;
    const notes = document.getElementById("bookingNotes").value.trim();

    if (!customerName || !phone || !destination || !travelDate || totalPrice <= 0) {
      alert("Fadlan buuxi meelaha muhiimka ah!");
      return;
    }

    let status = "Dhiman";
    if (paidAmount >= totalPrice) {
      status = "Bixiyay";
    } else if (paidAmount > 0) {
      status = "Qayb bixiyay";
    }

    const newBookingId = "BK-" + (this.data.bookings.length + 1001);

    const newBooking = {
      id: newBookingId,
      customerName,
      phone,
      passport,
      destination,
      type,
      travelDate,
      returnDate,
      passengers,
      totalPrice,
      paidAmount,
      paymentMethod,
      status,
      dateCreated: new Date().toISOString().split('T')[0],
      notes
    };

    this.data.bookings.push(newBooking);

    // If money was paid, record Income transaction
    if (paidAmount > 0) {
      this.data.transactions.push({
        id: "TX-" + (this.data.transactions.length + 501),
        type: "Dakhli",
        category: "Boos Qabasho (Booking)",
        description: `Bixinta bilowga ${customerName} - ${destination}`,
        bookingId: newBookingId,
        amount: paidAmount,
        method: paymentMethod,
        date: new Date().toISOString().split('T')[0]
      });
    }

    this.saveData();
    this.closeModal("modalNewBooking");
    document.getElementById("formNewBooking").reset();
    this.render();
    this.showToast(`Booska ${newBookingId} si guul leh ayaa loo diiwaangeliyay!`);
  }

  // Action: Add New Destination / Package
  submitNewDestination(e) {
    e.preventDefault();
    const name = document.getElementById("destNameInput").value.trim();
    const title = document.getElementById("destTitleInput").value.trim();
    const price = Number(document.getElementById("destPriceInput").value);
    const duration = document.getElementById("destDurationInput").value.trim();
    const category = document.getElementById("destCategoryInput").value;
    const description = document.getElementById("destDescInput").value.trim();
    const featuresRaw = document.getElementById("destFeaturesInput").value.trim();
    const imageUrl = document.getElementById("destImageInput").value.trim();
    const imageUploadFile = document.getElementById("destImageFile").files[0];

    if (!name || !title || price <= 0) {
      alert("Fadlan buuxi magaca iyo qiimaha xirmada!");
      return;
    }

    const features = featuresRaw ? featuresRaw.split(',').map(s => s.trim()) : ["Tikidh", "Hoteel"];

    const createPkg = (finalImageUrl) => {
      const newDest = {
        id: "dest-" + Date.now(),
        name,
        title,
        price,
        duration: duration || "5 Maalmood",
        category: category || "Dalxiis",
        image: finalImageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80",
        description: description || "Xirmo dalxiis oo heer sare ah oo ay ku jiraan dhammaan adeegyada.",
        features
      };

      this.data.destinations.unshift(newDest);
      this.saveData();
      this.closeModal("modalNewDestination");
      document.getElementById("formNewDestination").reset();
      document.getElementById("destImagePreview").classList.add("hidden");
      this.render();
      this.showToast(`Xirmada cusub ee "${name}" waa la keydiyay!`);
    };

    if (imageUploadFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        createPkg(event.target.result);
      };
      reader.readAsDataURL(imageUploadFile);
    } else {
      createPkg(imageUrl);
    }
  }

  // Action: Add Manual Financial Transaction
  submitNewTransaction(e) {
    e.preventDefault();
    const type = document.getElementById("txTypeInput").value;
    const category = document.getElementById("txCategoryInput").value.trim();
    const amount = Number(document.getElementById("txAmountInput").value);
    const method = document.getElementById("txMethodInput").value;
    const description = document.getElementById("txDescriptionInput").value.trim();
    const date = document.getElementById("txDateInput").value;

    if (!category || amount <= 0 || !description) {
      alert("Fadlan buuxi nooca, qiimaha iyo sharaxaadda!");
      return;
    }

    const newTx = {
      id: "TX-" + (this.data.transactions.length + 501),
      type,
      category,
      description,
      bookingId: "",
      amount,
      method,
      date: date || new Date().toISOString().split('T')[0]
    };

    this.data.transactions.push(newTx);
    this.saveData();
    this.closeModal("modalNewTransaction");
    document.getElementById("formNewTransaction").reset();
    this.render();
    this.showToast(`Xisaab cusub oo dhan ${this.formatMoney(amount)} ayaa la diiwaangeliyay!`);
  }

  // Delete Handlers
  deleteBooking(id) {
    if (confirm(`Ma hubtaa inaad tirtirto booskan #${id}?`)) {
      this.data.bookings = this.data.bookings.filter(b => b.id !== id);
      this.saveData();
      this.render();
      this.showToast(`Booskii #${id} waa la tirtiray!`, "error");
    }
  }

  deleteDestination(id) {
    if (confirm("Ma hubtaa inaad tirtirto xirmadan dalxiiska?")) {
      this.data.destinations = this.data.destinations.filter(d => d.id !== id);
      this.saveData();
      this.render();
      this.showToast("Xirmada dalxiiska waa la tirtiray!", "error");
    }
  }

  updateBookingBalance() {
    const total = Number(document.getElementById("bookingPriceInput").value || 0);
    const paid = Number(document.getElementById("bookingPaidInput").value || 0);
    const balance = Math.max(0, total - paid);
    const balanceEl = document.getElementById("bookingBalanceDisplay");
    if (balanceEl) {
      balanceEl.textContent = this.formatMoney(balance);
    }
  }

  // Export Financial CSV
  exportFinanceCSV() {
    const headers = ["ID", "Taariikh", "Nooca", "Qeybta", "Sharaxaadda", "Habka Bixinta", "Lacagta ($)"];
    const rows = this.data.transactions.map(t => [
      t.id,
      t.date,
      t.type,
      `"${t.category}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      t.method,
      t.type === "Dakhli" ? t.amount : -t.amount
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sahal_Travel_Xisaabaadka_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Warbixinta xisaabta CSV ayaa loo soo dejiyay!", "success");
  }

  // Event Bindings
  bindEvents() {
    // Nav view switches
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) this.switchView(view);
      });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const mobileClose = document.getElementById("mobileClose");

    if (mobileToggle && mobileSidebar) {
      mobileToggle.addEventListener("click", () => {
        mobileSidebar.classList.remove("-translate-x-full");
      });
    }
    if (mobileClose && mobileSidebar) {
      mobileClose.addEventListener("click", () => {
        mobileSidebar.classList.add("-translate-x-full");
      });
    }

    // Modal forms
    const formNewBooking = document.getElementById("formNewBooking");
    if (formNewBooking) {
      formNewBooking.addEventListener("submit", (e) => this.submitNewBooking(e));
    }

    const formNewDest = document.getElementById("formNewDestination");
    if (formNewDest) {
      formNewDest.addEventListener("submit", (e) => this.submitNewDestination(e));
    }

    const formNewTx = document.getElementById("formNewTransaction");
    if (formNewTx) {
      formNewTx.addEventListener("submit", (e) => this.submitNewTransaction(e));
    }

    // Booking select price change
    const bookingDestSelect = document.getElementById("bookingDestinationSelect");
    if (bookingDestSelect) {
      bookingDestSelect.addEventListener("change", (e) => {
        const opt = e.target.selectedOptions[0];
        if (opt && opt.dataset.price) {
          document.getElementById("bookingPriceInput").value = opt.dataset.price;
          if (opt.dataset.category) {
            document.getElementById("bookingTypeInput").value = opt.dataset.category;
          }
          this.updateBookingBalance();
        }
      });
    }

    // Dynamic balance calculate
    const priceInput = document.getElementById("bookingPriceInput");
    const paidInput = document.getElementById("bookingPaidInput");
    if (priceInput) priceInput.addEventListener("input", () => this.updateBookingBalance());
    if (paidInput) paidInput.addEventListener("input", () => this.updateBookingBalance());

    // Filter and search bookings
    const searchBookings = document.getElementById("searchBookings");
    if (searchBookings) {
      searchBookings.addEventListener("input", (e) => {
        this.bookingSearchQuery = e.target.value;
        this.renderBookingsTable();
      });
    }

    const filterStatus = document.getElementById("filterBookingStatus");
    if (filterStatus) {
      filterStatus.addEventListener("change", (e) => {
        this.bookingStatusFilter = e.target.value;
        this.renderBookingsTable();
      });
    }

    // Filter and search finance
    const searchFinance = document.getElementById("searchFinance");
    if (searchFinance) {
      searchFinance.addEventListener("input", (e) => {
        this.financeSearchQuery = e.target.value;
        this.renderFinanceTable();
      });
    }

    const filterFinanceType = document.getElementById("filterFinanceType");
    if (filterFinanceType) {
      filterFinanceType.addEventListener("change", (e) => {
        this.financeTypeFilter = e.target.value;
        this.renderFinanceTable();
      });
    }

    // Image file upload preview
    const destImageFile = document.getElementById("destImageFile");
    const destImagePreview = document.getElementById("destImagePreview");
    if (destImageFile && destImagePreview) {
      destImageFile.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            destImagePreview.src = ev.target.result;
            destImagePreview.classList.remove("hidden");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Print ticket
    const printTicketBtn = document.getElementById("btnPrintTicket");
    if (printTicketBtn) {
      printTicketBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Export CSV
    const exportCsvBtn = document.getElementById("btnExportFinanceCSV");
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", () => this.exportFinanceCSV());
    }

    // Reset data
    const btnResetData = document.getElementById("btnResetData");
    if (btnResetData) {
      btnResetData.addEventListener("click", () => this.resetData());
    }
  }
}

// Global instance
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new TravelAgencyApp();
});
