const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const datesContainer = document.getElementById("dates");
const themeToggle = document.getElementById("themeToggle");
const eventList = document.getElementById("eventList");

let events = {}; // Format: { '2024-06-13': ['Doctor Appointment'] }

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Populate dropdowns
months.forEach((month, index) => {
  const option = new Option(month, index);
  monthSelect.add(option);
});

const currentYear = new Date().getFullYear();
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
  yearSelect.add(new Option(i, i));
}

monthSelect.value = new Date().getMonth();
yearSelect.value = new Date().getFullYear();

function generateCalendar() {
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  datesContainer.innerHTML = "";

  // Blank spaces
  for (let i = 0; i < firstDay; i++) {
    datesContainer.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement("div");
    dateCell.textContent = day;
    const dateKey = `${year}-${month + 1}-${day}`;
    if (events[dateKey]) {
      dateCell.style.backgroundColor = "#fbbc04"; // highlight
    }
    dateCell.addEventListener("click", () => {
      const eventText = prompt(`Add event for ${dateKey}:`);
      if (eventText) {
        if (!events[dateKey]) events[dateKey] = [];
        events[dateKey].push(eventText);
        renderEvents();
        generateCalendar(); // Refresh highlights
      }
    });
    datesContainer.appendChild(dateCell);
  }
}

function renderEvents() {
  eventList.innerHTML = "";
  Object.keys(events).forEach(date => {
    events[date].forEach((event, idx) => {
      const li = document.createElement("li");
      li.textContent = `${date}: ${event}`;
      eventList.appendChild(li);
    });
  });
}

// Dark mode toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

generateCalendar();
renderEvents();
