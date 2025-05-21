const backendURL = "http://localhost:5000";

function addTab() {
  const container = document.getElementById("tabsContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Title" class="tabTitle" />
    <input type="text" placeholder="URL" class="tabURL" />
    <button onclick="this.parentNode.remove()">❌</button>
  `;
  container.appendChild(div);
}

async function saveSession() {
  const name = document.getElementById("sessionName").value || "Untitled";
  const tabs = [...document.querySelectorAll("#tabsContainer div")].map(
    (div) => {
      return {
        title: div.querySelector(".tabTitle").value,
        url: div.querySelector(".tabURL").value,
      };
    }
  );

  const res = await fetch(`${backendURL}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, tabs }),
  });
  const data = await res.json();
  alert("Session Saved ✅");
  loadSessions();
}

async function loadSessions() {
  const res = await fetch(`${backendURL}/api/sessions`);
  const sessions = await res.json();
  const list = document.getElementById("sessionList");
  list.innerHTML = "";

  sessions.forEach((session) => {
    const li = document.createElement("li");
    li.className = "session-item";
    li.innerHTML = `
      <input type="text" value="${session.name}" onchange="renameSession('${session._id}', this.value)" />
      <button onclick="restoreSession('${session._id}')">🔄</button>
      <button onclick="deleteSession('${session._id}')">🗑️</button>
    `;
    list.appendChild(li);
  });
}

async function restoreSession(id) {
  const res = await fetch(`${backendURL}/api/sessions/${id}`);
  const session = await res.json();

  document.getElementById("sessionName").value = session.name;
  const container = document.getElementById("tabsContainer");
  container.innerHTML = "";

  session.tabs.forEach((tab) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <input type="text" value="${tab.title}" class="tabTitle" />
      <input type="text" value="${tab.url}" class="tabURL" />
      <button onclick="this.parentNode.remove()">❌</button>
    `;
    container.appendChild(div);
  });
}

async function deleteSession(id) {
  await fetch(`${backendURL}/api/sessions/${id}`, { method: "DELETE" });
  loadSessions();
}

async function renameSession(id, newName) {
  await fetch(`${backendURL}/api/sessions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });
}

loadSessions();
