let entries = JSON.parse(localStorage.getItem("travelEntries")) || [];

document.getElementById("addEntryBtn").onclick = () => {
  document.getElementById("entryModal").style.display = "block";
};

document.querySelector(".close").onclick = () => {
  document.getElementById("entryModal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("entryModal")) {
    document.getElementById("entryModal").style.display = "none";
  }
};

function addEntry() {
  const title = document.getElementById("title").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();
  const photoInput = document.getElementById("photo");
  const date = new Date().toLocaleString();

  if (!title || !location || !description) {
    alert("Please fill all fields!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const newEntry = {
      id: Date.now(),
      title,
      location,
      description,
      photo: e.target.result,
      date,
    };

    entries.push(newEntry);
    saveEntries();
    renderEntries();
    updateLocationSortOptions();
    closeModal();
  };

  if (photoInput.files[0]) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    reader.onload({ target: { result: "" } }); // no photo case
  }
}

function saveEntries() {
  localStorage.setItem("travelEntries", JSON.stringify(entries));
}

function renderEntries(filtered = entries) {
  const container = document.getElementById("journalContainer");
  container.innerHTML = "";

  filtered.forEach((entry) => {
    const entryHTML = document.createElement("div");
    entryHTML.classList.add("entry");
    entryHTML.innerHTML = `
      <h3>${entry.title}</h3>
      <small>${entry.location}</small>
      <time>${entry.date}</time>
      <p>${entry.description}</p>
      ${entry.photo ? `<img src="${entry.photo}" alt="Photo" />` : ""}
      <button class="delete-btn" onclick="deleteEntry(${entry.id})">🗑 Delete</button>
    `;
    container.appendChild(entryHTML);
  });
}

function deleteEntry(id) {
  if (confirm("Are you sure you want to delete this entry?")) {
    entries = entries.filter((entry) => entry.id !== id);
    saveEntries();
    renderEntries();
    updateLocationSortOptions();
  }
}

function updateLocationSortOptions() {
  const select = document.getElementById("sortLocation");
  const locations = [...new Set(entries.map((e) => e.location))].sort();
  select.innerHTML = `<option value="default">-- Select --</option>`;
  locations.forEach((loc) => {
    select.innerHTML += `<option value="${loc}">${loc}</option>`;
  });
}

document.getElementById("sortLocation").addEventListener("change", function () {
  const selected = this.value;
  if (selected === "default") {
    renderEntries();
  } else {
    const filtered = entries.filter((entry) => entry.location === selected);
    renderEntries(filtered);
  }
});

function closeModal() {
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
  document.getElementById("photo").value = "";
  document.getElementById("entryModal").style.display = "none";
}

// Initial load
renderEntries();
updateLocationSortOptions();

