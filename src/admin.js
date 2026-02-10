import "./style.css";
import "@strudel/repl";

const app = document.querySelector("#app");
let currentPath = '';
document.body.classList.add('admin-page');

// State
const state = {
  samples: {},
  directoryStructure: [],
  scanStatus: null,
  selectedFiles: new Set(),
  selectedCategory: "",
  libraryFilter: "all",
  libraryQuery: "",
  uploadQueue: [],
  recentUploads: [],
  isUploading: false,
  uploadError: "",
  tracks: [],
  selectedTrackId: "",
  patches: ""
};

const TRACK_STORAGE_KEY = "warpsong_data_v2";
let trackEditorRepl = null;

function loadTrackState() {
  const stored = localStorage.getItem(TRACK_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        tracks: Array.isArray(parsed.tracks) ? parsed.tracks : [],
        patches: parsed.patches || ""
      };
    } catch (e) {
      console.error("Failed to parse track storage:", e);
    }
  }
  return { tracks: [], patches: "" };
}

function saveTrackState() {
  localStorage.setItem(TRACK_STORAGE_KEY, JSON.stringify({
    tracks: state.tracks,
    patches: state.patches
  }));
}

function getSelectedTrack() {
  return state.tracks.find(t => t.id === state.selectedTrackId);
}

function createEmptyTrack() {
  const id = `t_${Date.now()}`;
  return {
    id,
    title: "New Track",
    subtitle: "",
    code: `// Write Strudel code here\nsetCps(120/60/4)\n`,
    samples: []
  };
}

function createReplWithCode(code) {
  const repl = document.createElement("strudel-editor");
  repl.setAttribute("code", code);
  return repl;
}

function getCategoriesFromDirectory() {
  return (state.directoryStructure || [])
    .filter(item => item.isDirectory)
    .map(item => item.name);
}

function getCategories() {
  const fromDir = getCategoriesFromDirectory();
  if (fromDir.length) return fromDir;
  return Object.keys(state.samples || {}).filter(Boolean);
}

// API helper
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
}

// Load initial data
async function loadData() {
  try {
    const [samples, directory, status] = await Promise.all([
      apiCall('/samples'),
      apiCall('/samples/directory'),
      apiCall('/samples/status')
    ]);
    
    state.samples = samples;
    state.directoryStructure = directory;
    state.scanStatus = status;
    const trackState = loadTrackState();
    state.tracks = trackState.tracks;
    state.patches = trackState.patches;
    if (!state.selectedTrackId && state.tracks.length) {
      state.selectedTrackId = state.tracks[0].id;
    }
    const categories = getCategories();
    if (!state.selectedCategory || !categories.includes(state.selectedCategory)) {
      state.selectedCategory = categories[0] || "";
    }
    
    renderAdmin();
  } catch (error) {
    showError('Failed to load data: ' + error.message);
  }
}

// Render functions
function renderAdmin() {
  const categories = getCategories();
  const selectedCategory = state.selectedCategory;
  const hasCategory = Boolean(selectedCategory);
  const filterMode = state.libraryFilter;
  const query = state.libraryQuery.trim().toLowerCase();
  const filteredTree = filterLibraryTree(state.directoryStructure, {
    selectedCategory,
    filterMode,
    query
  });

  const track = getSelectedTrack();

  app.innerHTML = `
    <div class="admin-layout">
      <header class="admin-header">
        <div class="header-content">
          <div class="header-title">
            <div class="eyebrow">WarpSong Studio</div>
            <h1>Admin & Track Editor</h1>
            <p class="header-subtitle">Manage samples, edit tracks, and publish updates in one place.</p>
          </div>
          <div class="header-actions">
            <button id="refreshBtn" class="btn btn-secondary">Refresh</button>
            <button id="scanBtn" class="btn btn-primary">Update samples.json</button>
            <a href="/" class="btn btn-outline">Back to Player</a>
          </div>
        </div>
      </header>

      <main class="admin-main unified-admin">
        <section class="library-panel">
          <div class="card">
            <div class="card-header">
              <h2>Library</h2>
              <div class="file-actions">
                <span class="selected-count">${state.selectedFiles.size > 0 ? 
                  `${state.selectedFiles.size} selected` : 
                  'No files selected'
                }</span>
                ${state.selectedFiles.size > 0 ? 
                  `<button id="deleteSelectedBtn" class="btn btn-danger">Delete Selected</button>` : 
                  ''
                }
              </div>
            </div>

            <div class="inline-forms">
              <form id="categoryForm" class="category-form">
                <input type="text" id="categoryName" placeholder="New category name (e.g. vocals, drums)" required>
                <button type="submit" class="btn btn-secondary">Create Category</button>
              </form>

              <form id="uploadForm" enctype="multipart/form-data" class="upload-form">
                <input type="hidden" id="categoryHidden" name="category" value="${hasCategory ? selectedCategory : ''}">
                <div class="upload-drop ${hasCategory ? '' : 'disabled'}" id="uploadDrop">
                  <input type="file" id="fileInput" name="files" multiple accept="audio/*,image/*" class="file-input" ${hasCategory ? '' : 'disabled'}>
                  <div class="drop-help">
                    <div class="drop-title">Choose or drop files</div>
                    <div class="drop-subtitle">${hasCategory ? `Uploading to "${selectedCategory}"` : 'Select a category to enable uploads'}</div>
                  </div>
                </div>
                <div class="upload-queue">
                  ${state.uploadQueue.length ? `
                    <div class="queue-header">
                      <strong>${state.uploadQueue.length} file${state.uploadQueue.length > 1 ? 's' : ''} ready</strong>
                      <button type="button" id="clearQueueBtn" class="btn btn-outline">Clear</button>
                    </div>
                    <ul class="queue-list">
                      ${state.uploadQueue.map((file, idx) => `
                        <li>
                          <span>${file.name}</span>
                          <span>${formatFileSize(file.size)}</span>
                          <button type="button" class="btn btn-small btn-remove-queue" data-idx="${idx}">Remove</button>
                        </li>
                      `).join("")}
                    </ul>
                  ` : '<div class="queue-empty">No files selected yet.</div>'}
                </div>
                ${state.uploadError ? `<div class="form-error">${state.uploadError}</div>` : ''}
                <button type="submit" class="btn btn-primary upload-btn" ${hasCategory ? '' : 'disabled'}>
                  ${state.isUploading ? 'Uploading…' : `Upload ${state.uploadQueue.length ? `${state.uploadQueue.length} file${state.uploadQueue.length > 1 ? 's' : ''}` : ''} to ${hasCategory ? selectedCategory : 'Category'}`}
                </button>
              </form>
            </div>

            <div class="library-controls">
              <div class="library-category">
                <label for="categorySelect">Category</label>
                <select id="categorySelect" class="category-select">
                  ${categories.length ? categories.map(cat => 
                    `<option value="${cat}" ${cat === selectedCategory ? 'selected' : ''}>${cat}</option>`
                  ).join('') : '<option value="">No categories yet</option>'}
                </select>
              </div>
              <div class="library-search">
                <input id="librarySearch" type="search" placeholder="Search files..." value="${state.libraryQuery}">
              </div>
              <div class="library-filter">
                <label for="libraryFilter">View</label>
                <select id="libraryFilter">
                  <option value="selected" ${filterMode === "selected" ? "selected" : ""}>Selected category</option>
                  <option value="all" ${filterMode === "all" ? "selected" : ""}>All categories</option>
                </select>
              </div>
            </div>
            <div class="file-tree-container">
              ${renderFileTree(filteredTree)}
            </div>
            <div class="status-row">
              ${state.scanStatus ? `
                <div class="status-pill">Banks: ${state.scanStatus.sampleCount}</div>
                <div class="status-pill">Files: ${state.scanStatus.totalFiles}</div>
                <div class="status-pill">Last scan: ${new Date(state.scanStatus.lastScanned).toLocaleString()}</div>
              ` : '<div class="status-pill warn">No scan data yet</div>'}
              <button id="forceScanBtn" class="btn btn-secondary">Scan Now</button>
            </div>
            ${state.recentUploads.length ? `
              <div class="recent-uploads">
                <div class="recent-header">Uploaded this session</div>
                <ul>
                  ${state.recentUploads.slice(0, 6).map(item => `<li>${item}</li>`).join("")}
                </ul>
              </div>
            ` : ''}
          </div>
        </section>

        <section class="track-panel">
          <div class="card">
            <div class="card-header">
              <h2>Tracks</h2>
              <button id="addTrackBtn" class="btn btn-primary">Add Track</button>
            </div>
            <div class="track-list">
              ${state.tracks.length ? state.tracks.map(t => `
                <button class="track-pill ${t.id === state.selectedTrackId ? 'active' : ''}" data-track="${t.id}">
                  <div class="track-pill-title">${t.title}</div>
                  <div class="track-pill-sub">${t.subtitle || 'No description'}</div>
                </button>
              `).join("") : '<div class="empty-state">No tracks yet. Add one.</div>'}
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h2>Track Details</h2>
              <div class="file-actions">
                <button id="saveTrackBtn" class="btn btn-secondary">Save Track</button>
              </div>
            </div>

            ${track ? `
              <div class="track-form">
                <div class="input-group">
                  <label>Title</label>
                  <input id="editTitle" type="text" value="${track.title}">
                </div>
                <div class="input-group">
                  <label>Description</label>
                  <textarea id="editSubtitle" rows="2">${track.subtitle || ""}</textarea>
                </div>
              </div>

              <div class="editor-shell">
                <div id="editorMount" class="editor-code"></div>
              </div>

              <div class="sample-edit-section">
                <div class="section-title">Track Samples</div>
                <div class="section-actions">
                  <button id="addSampleBtn" class="btn btn-secondary">Add Sample Reference</button>
                  <button id="addSelectedSamplesBtn" class="btn btn-outline">Add Selected Files</button>
                </div>
                <div class="sample-edit-list" id="sampleList">
                  ${(track.samples || []).map((s, idx) => `
                    <div class="sample-edit-item">
                      <div class="sample-edit-header">
                        <span class="sample-number">Sample #${idx + 1}</span>
                        <button class="btn-small btn-remove-sample" data-idx="${idx}" title="Remove">✕</button>
                      </div>
                      <div class="sample-edit-grid">
                        <div class="input-group">
                          <input type="text" class="sample-name-input" data-idx="${idx}" placeholder="Sample name" value="${s.name}">
                        </div>
                        <div class="input-group">
                          <input type="text" class="sample-desc-input" data-idx="${idx}" placeholder="Description" value="${s.description}">
                        </div>
                        <div class="input-group">
                          <input type="text" class="sample-sig-input" data-idx="${idx}" placeholder="Significance" value="${s.significance}">
                        </div>
                      </div>
                      <details class="sample-image-details">
                        <summary>Image</summary>
                        <div class="input-group" style="margin-top:8px;">
                          <input type="text" class="sample-image-url-input" data-idx="${idx}" placeholder="/samples/images/example.jpg" value="${s.imageUrl || ""}">
                        </div>
                        <div class="input-group">
                          <input type="file" class="sample-image-file-input" data-idx="${idx}" accept="image/*">
                        </div>
                        <div class="sample-image-preview">
                          ${s.imageUrl || s.imageData ? `<img src="${s.imageUrl || s.imageData}" alt="Sample image">` : `<div class="no-image">No image</div>`}
                        </div>
                      </details>
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : '<div class="empty-state">Select a track to edit.</div>'}
          </div>
        </section>
      </main>
    </div>

    <div id="notification" class="notification" style="display: none;"></div>
  `;

  // Attach event listeners
  attachEventListeners();

  const track = getSelectedTrack();
  if (track) {
    const editorMount = document.querySelector("#editorMount");
    if (editorMount) {
      if (trackEditorRepl) trackEditorRepl.remove();
      trackEditorRepl = createReplWithCode(track.code || "");
      editorMount.appendChild(trackEditorRepl);
    }
  }
}

function renderFileTree(items, level = 0) {
  if (!items || items.length === 0) {
    return '<div class="empty-state">📁 No files found</div>';
  }
  
  return items.map(item => {
    const isSelected = state.selectedFiles.has(item.path);
    const isAudio = item.mimeType && item.mimeType.startsWith('audio/');
    const isImage = item.mimeType && item.mimeType.startsWith('image/');
    const icon = item.isDirectory ? '📁' : (isAudio ? '🎵' : (isImage ? '🖼️' : '📄'));
    
    return `
      <div class="file-item" data-level="${level}">
        <div class="file-row ${isSelected ? 'selected' : ''}" data-is-dir="${item.isDirectory}" data-name="${item.name}">
          <input type="checkbox" class="file-checkbox" 
                 data-path="${item.path}" 
                 ${isSelected ? 'checked' : ''}
                 ${item.isDirectory ? 'disabled' : ''}>
          <span class="file-icon">${icon}</span>
          <span class="file-name ${item.isDirectory ? 'directory' : 'file'}">${item.name}</span>
          ${!item.isDirectory ? `
            <div class="file-meta">
              <span class="file-size">${formatFileSize(item.size)}</span>
              <span class="file-type">${item.mimeType || 'unknown'}</span>
            </div>
          ` : ''}
        </div>
        ${item.children ? `
          <div class="file-children">
            ${renderFileTree(item.children, level + 1)}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function filterLibraryTree(items, { selectedCategory, filterMode, query }) {
  if (!items || items.length === 0) return [];

  let filtered = items;
  if (filterMode === "selected" && selectedCategory) {
    filtered = items.filter(item => item.name === selectedCategory);
  } else if (filterMode === "selected" && !selectedCategory) {
    filtered = items;
  }

  if (!query) return filtered;

  function matchItem(item) {
    return item.name.toLowerCase().includes(query);
  }

  function filterNode(node) {
    if (!node.isDirectory) {
      return matchItem(node) ? node : null;
    }
    const children = (node.children || []).map(filterNode).filter(Boolean);
    if (children.length > 0 || matchItem(node)) {
      return { ...node, children };
    }
    return null;
  }

  return filtered.map(filterNode).filter(Boolean);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

function showError(message) {
  showNotification(message, 'error');
}

// Event listeners
function attachEventListeners() {
  // Navigation buttons
  document.getElementById('refreshBtn').addEventListener('click', loadData);
  document.getElementById('scanBtn').addEventListener('click', scanSamples);
  const forceScanBtn = document.getElementById('forceScanBtn');
  if (forceScanBtn) {
    forceScanBtn.addEventListener('click', scanSamples);
  }

  // File upload
  document.getElementById('uploadForm').addEventListener('submit', handleUpload);

  // Category creation
  document.getElementById('categoryForm').addEventListener('submit', handleCategoryCreate);
  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      state.selectedCategory = e.target.value;
      const hidden = document.getElementById('categoryHidden');
      if (hidden) hidden.value = state.selectedCategory;
      renderAdmin();
    });
  }
  const librarySearch = document.getElementById('librarySearch');
  if (librarySearch) {
    librarySearch.addEventListener('input', (e) => {
      state.libraryQuery = e.target.value;
      renderAdmin();
    });
  }
  const libraryFilter = document.getElementById('libraryFilter');
  if (libraryFilter) {
    libraryFilter.addEventListener('change', (e) => {
      state.libraryFilter = e.target.value;
      renderAdmin();
    });
  }

  // File selection
  document.querySelectorAll('.file-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', handleFileSelection);
  });

  document.querySelectorAll('.file-row').forEach(row => {
    row.addEventListener('click', (e) => {
      const isDir = row.dataset.isDir === 'true';
      if (!isDir) return;
      if (e.target && e.target.classList.contains('file-checkbox')) return;
      const name = row.dataset.name;
      if (name) {
        state.selectedCategory = name;
        const hidden = document.getElementById('categoryHidden');
        if (hidden) hidden.value = state.selectedCategory;
        renderAdmin();
      }
    });
  });

  document.querySelectorAll('.track-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedTrackId = btn.dataset.track;
      renderAdmin();
    });
  });
  const addTrackBtn = document.getElementById('addTrackBtn');
  if (addTrackBtn) {
    addTrackBtn.addEventListener('click', () => {
      const newTrack = createEmptyTrack();
      state.tracks.unshift(newTrack);
      state.selectedTrackId = newTrack.id;
      saveTrackState();
      renderAdmin();
    });
  }
  const saveTrackBtn = document.getElementById('saveTrackBtn');
  if (saveTrackBtn) {
    saveTrackBtn.addEventListener('click', () => {
      const track = getSelectedTrack();
      if (!track) return;
      track.title = document.getElementById('editTitle')?.value || track.title;
      track.subtitle = document.getElementById('editSubtitle')?.value || track.subtitle;
      if (trackEditorRepl && trackEditorRepl.editor) {
        track.code = trackEditorRepl.editor.code;
      }
      const names = document.querySelectorAll(".sample-name-input");
      const descs = document.querySelectorAll(".sample-desc-input");
      const sigs = document.querySelectorAll(".sample-sig-input");
      const imageUrls = document.querySelectorAll(".sample-image-url-input");
      const newSamples = [];
      names.forEach((el, i) => {
        newSamples.push({
          name: el.value,
          description: descs[i]?.value || "",
          significance: sigs[i]?.value || "",
          imageUrl: imageUrls[i]?.value || "",
          imageData: (track.samples && track.samples[i] && track.samples[i].imageData) || ""
        });
      });
      track.samples = newSamples;
      saveTrackState();
      showNotification('Track saved');
    });
  }
  const addSampleBtn = document.getElementById('addSampleBtn');
  if (addSampleBtn) {
    addSampleBtn.addEventListener('click', () => {
      const track = getSelectedTrack();
      if (!track) return;
      track.samples = track.samples || [];
      track.samples.push({ name: "New sample", description: "", significance: "", imageUrl: "", imageData: "" });
      saveTrackState();
      renderAdmin();
    });
  }
  const addSelectedSamplesBtn = document.getElementById('addSelectedSamplesBtn');
  if (addSelectedSamplesBtn) {
    addSelectedSamplesBtn.addEventListener('click', () => {
      const track = getSelectedTrack();
      if (!track) return;
      const selected = Array.from(state.selectedFiles);
      if (!selected.length) return;
      track.samples = track.samples || [];
      selected.forEach(path => {
        const name = path.split('/').pop().replace(/\.[^/.]+$/, '');
        track.samples.push({
          name,
          description: `From ${path}`,
          significance: "",
          imageUrl: "",
          imageData: ""
        });
      });
      saveTrackState();
      renderAdmin();
    });
  }
  document.querySelectorAll(".btn-remove-sample").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const track = getSelectedTrack();
      if (!track) return;
      const idx = parseInt(e.target.dataset.idx, 10);
      if (Number.isNaN(idx)) return;
      track.samples.splice(idx, 1);
      saveTrackState();
      renderAdmin();
    });
  });
  document.querySelectorAll(".sample-image-file-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const track = getSelectedTrack();
      if (!track) return;
      const idx = parseInt(e.target.getAttribute("data-idx"), 10);
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (!track.samples) track.samples = [];
        if (!track.samples[idx]) track.samples[idx] = { name: "", description: "", significance: "" };
        track.samples[idx].imageData = ev.target.result;
        saveTrackState();
        renderAdmin();
      };
      reader.readAsDataURL(file);
    });
  });

  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []);
      state.uploadQueue = files.map(file => ({ name: file.name, size: file.size }));
      state.uploadError = "";
      renderAdmin();
    });
  }

  const clearQueueBtn = document.getElementById('clearQueueBtn');
  if (clearQueueBtn) {
    clearQueueBtn.addEventListener('click', () => {
      state.uploadQueue = [];
      const fileInputEl = document.getElementById('fileInput');
      if (fileInputEl) fileInputEl.value = '';
      renderAdmin();
    });
  }

  document.querySelectorAll('.btn-remove-queue').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.idx, 10);
      state.uploadQueue.splice(idx, 1);
      const fileInputEl = document.getElementById('fileInput');
      if (fileInputEl && fileInputEl.files) {
        const dt = new DataTransfer();
        Array.from(fileInputEl.files).forEach((file, i) => {
          if (i !== idx) dt.items.add(file);
        });
        fileInputEl.files = dt.files;
      }
      renderAdmin();
    });
  });

  const uploadDrop = document.getElementById('uploadDrop');
  if (uploadDrop) {
    ['dragenter', 'dragover'].forEach(evt => {
      uploadDrop.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!state.selectedCategory) return;
        uploadDrop.classList.add('dragging');
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      uploadDrop.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadDrop.classList.remove('dragging');
      });
    });
    uploadDrop.addEventListener('drop', (e) => {
      if (!state.selectedCategory) return;
      const files = e.dataTransfer.files;
      const fileInputEl = document.getElementById('fileInput');
      if (fileInputEl && files && files.length) {
        fileInputEl.files = files;
        state.uploadQueue = Array.from(files).map(file => ({ name: file.name, size: file.size }));
        renderAdmin();
      }
    });
  }

  // Delete selected
  const deleteBtn = document.getElementById('deleteSelectedBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', handleDeleteSelected);
  }
}

async function scanSamples() {
  try {
    showNotification('Scanning samples...');
    const result = await apiCall('/samples/scan', { method: 'POST' });
    state.scanStatus = result;
    await loadData(); // Reload all data
    showNotification(`Scan complete: ${result.sampleCount} banks found`);
  } catch (error) {
    showError('Scan failed: ' + error.message);
  }
}

async function handleUpload(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const fileInput = document.getElementById('fileInput');
  const category = state.selectedCategory;
  
  if (fileInput.files.length === 0) {
    state.uploadError = 'Select at least one file to upload.';
    renderAdmin();
    return;
  }
  if (!category) {
    state.uploadError = 'Select a category in the Library Browser first.';
    renderAdmin();
    return;
  }
  state.uploadError = "";
  formData.set('category', category);

  try {
    state.isUploading = true;
    renderAdmin();
    showNotification('Uploading files...');
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed');
    }
    
    showNotification(result.message);
    state.uploadError = "";
    state.recentUploads = [
      ...result.files.map(file => `${file.originalName} → ${file.category}`),
      ...state.recentUploads
    ];
    e.target.reset();
    state.uploadQueue = [];
    state.isUploading = false;
    
    // Ensure samples.json is refreshed after upload
    await scanSamples();
  } catch (error) {
    state.isUploading = false;
    state.uploadError = error.message || 'Upload failed.';
    showError('Upload failed: ' + error.message);
  }
}

async function handleCategoryCreate(e) {
  e.preventDefault();
  
  const name = document.getElementById('categoryName').value.trim();
  if (!name) return;

  await createCategory(name);
  e.target.reset();
}

async function createCategory(name) {
  try {
    const result = await apiCall('/categories', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    
    showNotification(result.message);
    state.selectedCategory = name;
    state.samples[name] = state.samples[name] || [];
    state.directoryStructure = [
      ...(state.directoryStructure || []),
      {
        name,
        path: name,
        isDirectory: true,
        children: []
      }
    ];
    
    // Update category select dropdown immediately
    updateCategorySelect();
    
    // Reload data to refresh everything
    setTimeout(loadData, 500);
  } catch (error) {
    showError('Failed to create category: ' + error.message);
  }
}

function updateCategorySelect() {
  const categorySelect = document.getElementById('categorySelect');
  if (!categorySelect) return;

  // Get current value
  const currentValue = state.selectedCategory || categorySelect.value;
  
  // Rebuild options
  const options = getCategories().map(cat => `<option value="${cat}">${cat}</option>`);
  
  categorySelect.innerHTML = options.join('');
  
  // Restore selection if it still exists
  if (Object.keys(state.samples).includes(currentValue) || currentValue === 'uploads') {
    categorySelect.value = currentValue;
  }

  const hidden = document.getElementById('categoryHidden');
  if (hidden) hidden.value = categorySelect.value;
}

function handleFileSelection(e) {
  const path = e.target.dataset.path;
  if (e.target.checked) {
    state.selectedFiles.add(path);
  } else {
    state.selectedFiles.delete(path);
  }
  
  updateSelectionUI();
}

function updateSelectionUI() {
  // Update selected count
  const selectedCount = document.querySelector('.selected-count');
  if (selectedCount) {
    selectedCount.textContent = state.selectedFiles.size > 0 ? 
      `${state.selectedFiles.size} selected` : 
      'No files selected';
  }
      
  // Show/hide delete button
  const deleteBtn = document.getElementById('deleteSelectedBtn');
  if (deleteBtn) {
    deleteBtn.style.display = state.selectedFiles.size > 0 ? 'inline-block' : 'none';
  }
}

async function handleDeleteSelected() {
  if (state.selectedFiles.size === 0) return;

  if (!confirm(`Delete ${state.selectedFiles.size} selected file(s)? This cannot be undone.`)) {
    return;
  }

  try {
    showNotification('Deleting files...');
    
    // Delete files one by one
    const deletePromises = Array.from(state.selectedFiles).map(path =>
      apiCall('/samples', {
        method: 'DELETE',
        body: JSON.stringify({ path })
      })
    );
    
    await Promise.all(deletePromises);
    
    showNotification('Files deleted successfully');
    state.selectedFiles.clear();
    
    await scanSamples();
  } catch (error) {
    showError('Delete failed: ' + error.message);
  }
}

// Initialize
loadData();
