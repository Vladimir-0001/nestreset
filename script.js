let deviceDirectoryHandle;

function updateStatus(message) {
  document.getElementById('status').innerText = message;
}

document.getElementById('selectFolderBtn').addEventListener('click', async () => {
  if (!window.showDirectoryPicker) {
    updateStatus("File System Access API not supported in this browser.");
    return;
  }
  try {
    deviceDirectoryHandle = await window.showDirectoryPicker();
    updateStatus("Device folder selected.");
    document.getElementById('uploadBtn').disabled = false;
  } catch (error) {
    updateStatus("Error: " + error.message);
  }
});

document.getElementById('uploadBtn').addEventListener('click', async () => {
  if (!deviceDirectoryHandle) {
    updateStatus("No device folder selected.");
    return;
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" http://www.apple.com/DTDs/PropertyList-1.0.dtd>
<plist version="1.0">
<dict>
  <key>Configuration</key>
  <dict>
    <key>ResetToDefaults</key>
    <string></string>
  </dict>
</dict>
</plist>`;

  try {
    const fileHandle = await deviceDirectoryHandle.getFileHandle('.dropbox', { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(xmlContent);
    await writable.close();
    updateStatus("XML file (.dropbox) uploaded successfully.");
  } catch (error) {
    updateStatus("Error: " + error.message);
  }
});

// Generate a dynamic "working as of" timestamp
const statusEl = document.getElementById("working-status");

const now = new Date();
const adjusted = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
};

const formattedTime = adjusted.toLocaleString('en-US', options);
statusEl.textContent = `✅ Working as of ${formattedTime}`;
