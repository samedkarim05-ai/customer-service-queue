const STORAGE_KEY = "customer-service-queue-v1";

let customers = [];
let servedCount = 0;

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (saved && Array.isArray(saved.customers)) {
    customers = saved.customers;
    servedCount = Number(saved.servedCount) || 0;
  }
} catch (error) {
  console.warn("Saved queue could not be loaded.", error);
}

const form = document.getElementById("customerForm");
const nameInput = document.getElementById("customerName");
const queueList = document.getElementById("queueList");
const waitingCount = document.getElementById("waitingCount");
const nextCustomer = document.getElementById("nextCustomer");
const servedCountElement = document.getElementById("servedCount");
const queueBadge = document.getElementById("queueBadge");
const notice = document.getElementById("notice");
const serveButton = document.getElementById("serveButton");
const clearButton = document.getElementById("clearButton");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ customers, servedCount }));
}

function showNotice(message, type = "") {
  notice.textContent = message;
  notice.className = "notice" + (type ? ` ${type}` : "");
}

function renderQueue() {
  queueList.innerHTML = "";

  customers.forEach((customer, index) => {
    const item = document.createElement("li");
    item.className = "queue-item";

    const position = document.createElement("span");
    position.className = "queue-position";
    position.textContent = String(index + 1).padStart(2, "0");

    const info = document.createElement("div");
    info.className = "customer-info";

    const name = document.createElement("div");
    name.className = "customer-name";
    name.textContent = customer.name;

    const meta = document.createElement("div");
    meta.className = "customer-meta";
    meta.textContent = index === 0 ? "First in line" : `Position ${index + 1}`;

    info.append(name, meta);
    item.append(position, info);

    if (index === 0) {
      const badge = document.createElement("span");
      badge.className = "next-label";
      badge.textContent = "NEXT";
      item.append(badge);
    }
    queueList.append(item);
  });

  waitingCount.textContent = customers.length;
  queueBadge.textContent = customers.length;
  nextCustomer.textContent = customers.length ? customers[0].name : "—";
  servedCountElement.textContent = servedCount;
  serveButton.disabled = customers.length === 0;
  serveButton.style.opacity = customers.length === 0 ? "0.55" : "1";

  if (customers.length === 0 && !notice.textContent.includes("served")) {
    showNotice("No customers are waiting. Add a customer to begin.");
  }
  saveState();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();

  if (!name) {
    showNotice("Please enter a customer's name.", "warning");
    nameInput.focus();
    return;
  }

  customers.push({ name, id: `${Date.now()}-${Math.random()}` }); // Enqueue: add to the rear
  nameInput.value = "";
  showNotice(`${name} has been added to the back of the queue.`, "success");
  renderQueue();
  nameInput.focus();
});

serveButton.addEventListener("click", () => {
  if (customers.length === 0) {
    showNotice("There are no customers to serve.", "warning");
    return;
  }

  const served = customers.shift(); // Dequeue: remove from the front
  servedCount += 1;
  showNotice(`Now serving ${served.name}.`, "success");
  renderQueue();
});

clearButton.addEventListener("click", () => {
  if (customers.length === 0) {
    showNotice("The queue is already empty.");
    return;
  }

  const confirmed = window.confirm("Clear all customers who are currently waiting?");
  if (!confirmed) return;

  customers = [];
  showNotice("The waiting queue has been cleared.", "warning");
  renderQueue();
});

renderQueue();
