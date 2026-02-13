/* ================================================================
   COLLEGE ATTENDANCE SYSTEM — college_attendance.js
   Link in HTML as: <script src="college_attendance.js"></script>
   Place BEFORE closing </body> tag
   ================================================================ */

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS & LOOKUP DATA
// ═══════════════════════════════════════════════════════════════════

const SUBJECTS = [
  { id: 'DS',     name: 'Data Structures',        code: '21CS42',  color: '#1a3cff', bg: '#eef0ff', dept: 'CSE' },
  { id: 'DBMS',   name: 'Database Management',    code: '21CS43',  color: '#0a7c5c', bg: '#e8f7f2', dept: 'CSE' },
  { id: 'CN',     name: 'Computer Networks',      code: '21CS44',  color: '#b85e00', bg: '#fef4e8', dept: 'CSE' },
  { id: 'OS',     name: 'Operating Systems',      code: '21CS45',  color: '#6b3fa0', bg: '#f3eeff', dept: 'CSE' },
  { id: 'SE',     name: 'Software Engineering',   code: '21CS46',  color: '#c0392b', bg: '#fdf0ef', dept: 'CSE' },
  { id: 'MATH',   name: 'Engineering Maths',      code: '21MAT41', color: '#1a6e9e', bg: '#e8f3fb', dept: 'All' },
  { id: 'PHY',    name: 'Engineering Physics',    code: '21PHY11', color: '#4a7c00', bg: '#f0f9e4', dept: 'ECE' },
  { id: 'MBA-FM', name: 'Financial Management',   code: '21MBA31', color: '#8b4500', bg: '#fff2e5', dept: 'MBA' },
  { id: 'MCA-AI', name: 'Artificial Intelligence',code: '21MCA41', color: '#005b8e', bg: '#e5f3ff', dept: 'MCA' },
];

const DEPT_COLORS = {
  CSE: '#1a3cff',
  ECE: '#0a7c5c',
  ME:  '#b85e00',
  CE:  '#4a7c00',
  MBA: '#8b4500',
  MCA: '#005b8e',
};

const DEPT_BG = {
  CSE: '#eef0ff',
  ECE: '#e8f7f2',
  ME:  '#fef4e8',
  CE:  '#f0f9e4',
  MBA: '#fff2e5',
  MCA: '#e5f3ff',
};

const AV_COLORS = [
  '#1a3cff', '#0a7c5c', '#b85e00',
  '#6b3fa0', '#c0392b', '#1a6e9e', '#4a7c00',
];

// ═══════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════

let nextId = 21;

let students = [
  { id:  1, name: 'Arjun Kumar Reddy',    usn: '1BM21CS001',  dept: 'CSE', sem: 5, subject: 'DS',     total: 60, attended: 54, status: 'P' },
  { id:  2, name: 'Sneha Iyer',           usn: '1BM21CS002',  dept: 'CSE', sem: 5, subject: 'DS',     total: 60, attended: 40, status: 'A' },
  { id:  3, name: 'Vikram Nair',          usn: '1BM21CS003',  dept: 'CSE', sem: 5, subject: 'DBMS',   total: 55, attended: 52, status: 'P' },
  { id:  4, name: 'Priya Venkatesh',      usn: '1BM21CS004',  dept: 'CSE', sem: 5, subject: 'DBMS',   total: 55, attended: 38, status: 'L' },
  { id:  5, name: 'Rohit Sharma',         usn: '1BM21CS005',  dept: 'CSE', sem: 5, subject: 'CN',     total: 58, attended: 50, status: 'P' },
  { id:  6, name: 'Ananya Das',           usn: '1BM21CS006',  dept: 'CSE', sem: 5, subject: 'CN',     total: 58, attended: 42, status: 'P' },
  { id:  7, name: 'Karan Mehta',          usn: '1BM21CS007',  dept: 'CSE', sem: 5, subject: 'OS',     total: 60, attended: 44, status: 'M' },
  { id:  8, name: 'Divya Krishnamurthy',  usn: '1BM21CS008',  dept: 'CSE', sem: 5, subject: 'OS',     total: 60, attended: 57, status: 'P' },
  { id:  9, name: 'Aditya Bose',          usn: '1BM21ECE001', dept: 'ECE', sem: 5, subject: 'PHY',    total: 50, attended: 35, status: 'A' },
  { id: 10, name: 'Pooja Pillai',         usn: '1BM21ECE002', dept: 'ECE', sem: 5, subject: 'PHY',    total: 50, attended: 48, status: 'P' },
  { id: 11, name: 'Suresh Babu',          usn: '1BM21ME001',  dept: 'ME',  sem: 3, subject: 'MATH',   total: 45, attended: 32, status: 'A' },
  { id: 12, name: 'Deepika Rao',          usn: '1BM21ME002',  dept: 'ME',  sem: 3, subject: 'MATH',   total: 45, attended: 40, status: 'P' },
  { id: 13, name: 'Mohammed Imran',       usn: '1BM21MBA001', dept: 'MBA', sem: 1, subject: 'MBA-FM', total: 40, attended: 38, status: 'P' },
  { id: 14, name: 'Lakshmi Priya',        usn: '1BM21MBA002', dept: 'MBA', sem: 1, subject: 'MBA-FM', total: 40, attended: 28, status: 'L' },
  { id: 15, name: 'Rahul Gupta',          usn: '1BM21MCA001', dept: 'MCA', sem: 5, subject: 'MCA-AI', total: 52, attended: 46, status: 'P' },
  { id: 16, name: 'Swati Joshi',          usn: '1BM21MCA002', dept: 'MCA', sem: 5, subject: 'MCA-AI', total: 52, attended: 39, status: 'P' },
  { id: 17, name: 'Naveen Kumar',         usn: '1BM21CS009',  dept: 'CSE', sem: 5, subject: 'SE',     total: 56, attended: 41, status: 'A' },
  { id: 18, name: 'Kavitha Subramanian',  usn: '1BM21CS010',  dept: 'CSE', sem: 5, subject: 'SE',     total: 56, attended: 53, status: 'P' },
  { id: 19, name: 'Harish Patil',         usn: '1BM21CE001',  dept: 'CE',  sem: 5, subject: 'MATH',   total: 45, attended: 30, status: 'A' },
  { id: 20, name: 'Ritu Agarwal',         usn: '1BM21CE002',  dept: 'CE',  sem: 5, subject: 'MATH',   total: 45, attended: 44, status: 'P' },
];

// ═══════════════════════════════════════════════════════════════════
// PURE UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Returns attendance percentage (0–100) for a student object.
 * @param {Object} s - student object with .attended and .total
 * @returns {number}
 */
function pct(s) {
  return s.total ? Math.round(s.attended / s.total * 100) : 0;
}

/**
 * Returns a colour from the AV_COLORS palette based on student id.
 * @param {number} id
 * @returns {string} hex colour
 */
function avColor(id) {
  return AV_COLORS[id % AV_COLORS.length];
}

/**
 * Returns two-letter initials from a full name.
 * @param {string} n - full name
 * @returns {string}
 */
function initials(n) {
  return n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

/**
 * Finds a subject by its id string; falls back to the first subject.
 * @param {string} id
 * @returns {Object}
 */
function subjectById(id) {
  return SUBJECTS.find(s => s.id === id) || SUBJECTS[0];
}

/**
 * Calculates how many more classes a student can miss
 * while still maintaining ≥ 75% attendance.
 * Formula: floor( (attended − 0.75 × total) / 0.75 )
 * @param {Object} s - student object
 * @returns {number} 0 if already below threshold
 */
function bunkable(s) {
  const val = Math.floor((s.attended - 0.75 * s.total) / 0.75);
  return Math.max(val, 0);
}

// ═══════════════════════════════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Bootstraps the page: sets today's date, populates the subject
 * filter dropdown, builds the sidebar, and triggers the first render.
 */
function init() {
  const d = new Date();

  // Set date picker to today
  document.getElementById('dateInput').value = d.toISOString().split('T')[0];

  // Sidebar footer date label
  document.getElementById('todayLabel').textContent =
    d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Populate subject filter <select>
  const sf = document.getElementById('subjectFilter');
  SUBJECTS.forEach(s => {
    const o = document.createElement('option');
    o.value = s.id;
    o.textContent = s.name;
    sf.appendChild(o);
  });

  buildSidebar();
  render();
}

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════

/**
 * Builds the subject list in the sidebar.
 * Adds an "All Subjects" entry plus one button per subject.
 */
function buildSidebar() {
  const list = document.getElementById('subjectList');
  list.innerHTML = '';

  // "All Subjects" button
  const btn0 = document.createElement('button');
  btn0.className = 'subject-item active';
  btn0.dataset.sub = '';
  btn0.innerHTML = `
    <div class="sub-dot" style="background:#888"></div>
    <span class="sub-name">All Subjects</span>`;
  btn0.onclick = () => {
    document.getElementById('subjectFilter').value = '';
    filterBySubject();
    updateActiveSub('');
  };
  list.appendChild(btn0);

  // One button per subject
  SUBJECTS.forEach(s => {
    const b = document.createElement('button');
    b.className = 'subject-item';
    b.dataset.sub = s.id;
    b.innerHTML = `
      <div class="sub-dot" style="background:${s.color}"></div>
      <span class="sub-name">${s.name}</span>
      <span class="sub-code">${s.code}</span>`;
    b.onclick = () => {
      document.getElementById('subjectFilter').value = s.id;
      filterBySubject();
      updateActiveSub(s.id);
    };
    list.appendChild(b);
  });
}

/**
 * Marks the sidebar subject item that matches `id` as active.
 * @param {string} id - subject id, or '' for "All"
 */
function updateActiveSub(id) {
  document.querySelectorAll('.subject-item').forEach(b => {
    b.classList.toggle('active', b.dataset.sub === id);
  });
}

/**
 * Called when the subject <select> changes.
 * Syncs the sidebar highlight and re-renders the table.
 */
function filterBySubject() {
  const v = document.getElementById('subjectFilter').value;
  updateActiveSub(v);
  render();
}

// ═══════════════════════════════════════════════════════════════════
// RENDER — MAIN TABLE
// ═══════════════════════════════════════════════════════════════════

/**
 * Reads all filter inputs, filters the student array, and
 * rebuilds the table, stats, analytics, and subtitles.
 */
function render() {
  const q    = document.getElementById('searchInput').value.toLowerCase();
  const dept = document.getElementById('deptFilter').value;
  const sub  = document.getElementById('subjectFilter').value;

  const filtered = students.filter(s =>
    (!q    || s.name.toLowerCase().includes(q) || s.usn.toLowerCase().includes(q)) &&
    (!dept || s.dept === dept) &&
    (!sub  || s.subject === sub)
  );

  const tbody = document.getElementById('tableBody');

  if (!filtered.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8">
          <div style="text-align:center;padding:48px;color:var(--muted)">No students found</div>
        </td>
      </tr>`;
  } else {
    tbody.innerHTML = filtered.map((s, i) => {
      const p       = pct(s);
      const pc      = p >= 80 ? 'hi' : p >= 75 ? 'md' : 'lo';
      const subject = subjectById(s.subject);
      const bk      = bunkable(s);
      const lowFlag = p < 75;

      return `
        <tr>
          <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted)">
            ${String(i + 1).padStart(2, '0')}
          </td>

          <td>
            <div class="stu-cell">
              <div class="stu-av" style="background:${avColor(s.id)}18;color:${avColor(s.id)}">
                ${initials(s.name)}
              </div>
              <div>
                <div class="stu-name">${s.name}</div>
                <div class="stu-id">${s.usn}</div>
              </div>
            </div>
          </td>

          <td>
            <div class="dept-pill"
              style="color:${DEPT_COLORS[s.dept] || '#333'};
                     background:${DEPT_BG[s.dept] || '#eee'};
                     border-color:${DEPT_COLORS[s.dept] || '#ccc'}40">
              ${s.dept} · Sem ${s.sem}
            </div>
          </td>

          <td>
            <span style="font-size:12px;font-weight:600;
                         color:${subject.color};background:${subject.bg};
                         padding:4px 9px;border-radius:6px;">
              ${subject.name}
            </span>
          </td>

          <td>
            <div class="att-bar-wrap">
              <div class="att-track">
                <div class="att-fill ${pc}" style="width:${p}%"></div>
              </div>
              <span class="att-pct">${p}%</span>
              ${lowFlag ? `<span class="att-warn">LOW</span>` : ''}
            </div>
            <div style="font-size:10px;color:var(--muted);margin-top:3px;font-family:'JetBrains Mono',monospace">
              ${s.attended}/${s.total} classes
            </div>
          </td>

          <td>
            <div class="${bk > 0 ? 'shortfall ok' : 'shortfall'}">
              ${bk > 0 ? `Can skip ${bk} more` : 'Cannot bunk!'}
            </div>
          </td>

          <td>
            <div class="status-grp">
              <button class="st-btn ${s.status === 'P' ? 'sp' : ''}" onclick="setStatus(${s.id}, 'P')">P</button>
              <button class="st-btn ${s.status === 'A' ? 'sa' : ''}" onclick="setStatus(${s.id}, 'A')">A</button>
              <button class="st-btn ${s.status === 'L' ? 'sl' : ''}" onclick="setStatus(${s.id}, 'L')">OD</button>
              <button class="st-btn ${s.status === 'M' ? 'sm' : ''}" onclick="setStatus(${s.id}, 'M')">Med</button>
            </div>
          </td>

          <td>
            <button class="icon-btn" onclick="removeStudent(${s.id})" title="Remove">✕</button>
          </td>
        </tr>`;
    }).join('');
  }

  updateStats();
  updateAnalytics();
  updateSubtitles(filtered.length);
}

// ═══════════════════════════════════════════════════════════════════
// RENDER — STATS CARDS
// ═══════════════════════════════════════════════════════════════════

/**
 * Recalculates and updates all five stat cards and
 * the sidebar badge counts.
 */
function updateStats() {
  const total   = students.length;
  const present = students.filter(s => s.status === 'P').length;
  const absent  = students.filter(s => s.status === 'A').length;
  const late    = students.filter(s => s.status === 'L').length;
  const med     = students.filter(s => s.status === 'M').length;
  const risk    = students.filter(s => pct(s) < 75).length;

  // Helper: percentage string or '–' when denominator is 0
  const f = (n, d) => d ? Math.round(n / d * 100) + '%' : '–';

  document.getElementById('stTotal').textContent       = total;
  document.getElementById('stPresent').textContent     = present;
  document.getElementById('stAbsent').textContent      = absent;
  document.getElementById('stLate').textContent        = late;
  document.getElementById('stMed').textContent         = med;

  document.getElementById('stPresentPct').textContent  = f(present, total);
  document.getElementById('stAbsentPct').textContent   = f(absent,  total);
  document.getElementById('stLatePct').textContent     = f(late,    total);
  document.getElementById('stMedPct').textContent      = f(med,     total);

  // Sidebar badges
  document.getElementById('nb-total').textContent      = total;
  document.getElementById('nb-risk').textContent       = risk;
}

// ═══════════════════════════════════════════════════════════════════
// RENDER — ANALYTICS PANELS
// ═══════════════════════════════════════════════════════════════════

/**
 * Rebuilds:
 *  1. Subject-wise average attendance bars
 *  2. Students-at-risk list (< 75%)
 */
function updateAnalytics() {

  // ── Subject-wise panel ──────────────────────────────────────
  const sa = document.getElementById('subjectAnalytics');
  sa.innerHTML = SUBJECTS.map(sub => {
    const group = students.filter(s => s.subject === sub.id);
    if (!group.length) return '';

    const avgPct = Math.round(group.reduce((a, s) => a + pct(s), 0) / group.length);
    const fillColors = {
      hi: 'var(--present)',
      md: 'var(--late)',
      lo: 'var(--absent)',
    };
    const pc = avgPct >= 80 ? 'hi' : avgPct >= 75 ? 'md' : 'lo';

    return `
      <div class="s-row">
        <div class="s-dot" style="background:${sub.color}"></div>
        <div class="s-info">
          <div class="s-name">${sub.name}</div>
          <div class="s-meta">${group.length} student${group.length !== 1 ? 's' : ''} · ${sub.code}</div>
        </div>
        <div class="s-bar-wrap">
          <div class="s-track">
            <div class="s-fill" style="width:${avgPct}%;background:${fillColors[pc]}"></div>
          </div>
        </div>
        <div class="s-pct">${avgPct}%</div>
      </div>`;
  }).join('');

  // ── At-risk panel ────────────────────────────────────────────
  const rl = document.getElementById('riskList');
  const atRisk = students
    .filter(s => pct(s) < 75)
    .sort((a, b) => pct(a) - pct(b));

  if (!atRisk.length) {
    rl.innerHTML = `
      <div style="text-align:center;padding:24px;color:var(--present);font-weight:600;font-size:13px">
        🎉 All students above 75%
      </div>`;
  } else {
    rl.innerHTML = atRisk.slice(0, 8).map(s => {
      const p       = pct(s);
      const subject = subjectById(s.subject);
      const cls     = p < 65 ? 'danger' : 'warn';

      return `
        <div class="r-row">
          <div>
            <div class="r-name">${s.name}</div>
            <div class="r-sub">${s.usn} · ${subject.name}</div>
          </div>
          <span class="r-badge ${cls}">${p}%</span>
        </div>`;
    }).join('');
  }
}

// ═══════════════════════════════════════════════════════════════════
// RENDER — SUBTITLES
// ═══════════════════════════════════════════════════════════════════

/**
 * Updates the page subtitle and table subtitle with the selected
 * date and the count of currently visible students.
 * @param {number} count
 */
function updateSubtitles(count) {
  const d   = new Date(document.getElementById('dateInput').value);
  const fmt = d.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  document.getElementById('pageSubtitle').textContent =
    `${fmt} · ${count} student${count !== 1 ? 's' : ''} shown`;

  document.getElementById('tableTitle').textContent =
    'Student Register';

  document.getElementById('tableSubtitle').textContent =
    `${count} records · Click P / A / OD / Med to mark attendance`;
}

// ═══════════════════════════════════════════════════════════════════
// ACTIONS — ATTENDANCE STATUS
// ═══════════════════════════════════════════════════════════════════

/**
 * Sets the today-status for a single student, re-renders, and
 * shows a toast notification.
 * @param {number} id     - student id
 * @param {string} status - 'P' | 'A' | 'L' | 'M'
 */
function setStatus(id, status) {
  students = students.map(s => s.id === id ? { ...s, status } : s);
  render();

  const labels = {
    P: 'Present ✅',
    A: 'Absent ❌',
    L: 'On Duty / Late ⏰',
    M: 'Medical Leave 🏥',
  };
  toast(labels[status] || status, 'ok');
}

/**
 * Marks all currently visible students (respecting active filters)
 * with the given status.
 * @param {string} status - 'P' | 'A'
 */
function markAll(status) {
  const sub  = document.getElementById('subjectFilter').value;
  const dept = document.getElementById('deptFilter').value;

  students = students.map(s => {
    const matchesSub  = !sub  || s.subject === sub;
    const matchesDept = !dept || s.dept    === dept;
    return (matchesSub && matchesDept) ? { ...s, status } : s;
  });

  render();
  toast(
    `All visible students marked ${status === 'P' ? 'Present' : 'Absent'}`,
    status === 'P' ? 'ok' : ''
  );
}

/**
 * Removes a student from the array by id, re-renders, and toasts.
 * @param {number} id
 */
function removeStudent(id) {
  students = students.filter(s => s.id !== id);
  render();
  toast('Student removed', '');
}

// ═══════════════════════════════════════════════════════════════════
// ACTIONS — ADD STUDENT MODAL
// ═══════════════════════════════════════════════════════════════════

/** Opens the Add Student modal. */
function openModal() {
  document.getElementById('overlay').classList.add('open');
}

/** Closes the Add Student modal. */
function closeModal() {
  document.getElementById('overlay').classList.remove('open');
}

/**
 * Reads the modal form, validates input, pushes a new student
 * to the array, and re-renders.
 */
function addStudent() {
  const name     = document.getElementById('mName').value.trim();
  const usn      = document.getElementById('mUSN').value.trim();
  const dept     = document.getElementById('mDept').value;
  const sem      = document.getElementById('mSem').value;
  const sub      = document.getElementById('mSubject').value;
  const total    = parseInt(document.getElementById('mTotal').value)    || 40;
  const attended = parseInt(document.getElementById('mAttended').value) || 0;

  // Validation
  if (!name || !usn) {
    toast('Please fill name and USN', 'err');
    return;
  }
  if (students.find(s => s.usn === usn)) {
    toast('USN already exists!', 'err');
    return;
  }
  if (attended > total) {
    toast('Attended cannot exceed total classes', 'err');
    return;
  }

  students.push({
    id: nextId++,
    name,
    usn,
    dept,
    sem: parseInt(sem),
    subject: sub,
    total,
    attended,
    status: 'P',
  });

  // Clear name & USN fields for next use
  ['mName', 'mUSN'].forEach(id => document.getElementById(id).value = '');

  closeModal();
  render();
  toast(`${name} added successfully ✅`, 'ok');
}

// ═══════════════════════════════════════════════════════════════════
// ACTIONS — CSV EXPORT
// ═══════════════════════════════════════════════════════════════════

/**
 * Serialises the full student array to CSV and triggers a download
 * of "college_attendance.csv".
 */
function exportCSV() {
  const header = 'USN,Name,Department,Semester,Subject,Total Classes,Attended,Attendance %,Today Status';

  const rows = students.map(s => {
    const statusLabel = s.status === 'P' ? 'Present'
                      : s.status === 'A' ? 'Absent'
                      : s.status === 'L' ? 'On Duty'
                      : 'Medical';

    return `${s.usn},"${s.name}",${s.dept},${s.sem},`
      + `${subjectById(s.subject).name},${s.total},${s.attended},${pct(s)}%,${statusLabel}`;
  });

  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  Object.assign(document.createElement('a'), {
    href: url,
    download: 'college_attendance.csv',
  }).click();
  URL.revokeObjectURL(url);

  toast('CSV exported ↓', 'info');
}

// ═══════════════════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════════════

/**
 * Displays a temporary toast notification.
 * @param {string} msg  - message text
 * @param {string} type - CSS modifier: 'ok' | 'err' | 'info' | ''
 */
function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent  = msg;
  el.className    = `toast ${type} show`;
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2800);
}

// ═══════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════

// Search box
document.getElementById('searchInput')
  .addEventListener('input', render);

// Department filter
document.getElementById('deptFilter')
  .addEventListener('change', render);

// Subject filter (also triggered by sidebar clicks via filterBySubject)
document.getElementById('subjectFilter')
  .addEventListener('change', render);

// Date picker
document.getElementById('dateInput')
  .addEventListener('change', render);

// Close modal on backdrop click
document.getElementById('overlay')
  .addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ═══════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════
init();