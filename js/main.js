async function loadLinks() {
  try {
    const response = await fetch('data/links.json');
    if (!response.ok) {
      throw new Error('Failed to load links');
    }
    const data = await response.json();
    renderProfile(data.profile);
    renderLinks(data.links);
  } catch (error) {
    console.error('Error loading links:', error);
    document.getElementById('links').innerHTML =
      '<p style="text-align: center; color: #999;">Unable to load links</p>';
  }
}

function renderProfile(profile) {
  document.getElementById('avatar').src = profile.avatar;
  document.getElementById('avatar').alt = profile.name;
  document.getElementById('name').textContent = profile.name;
  document.getElementById('bio').textContent = profile.bio;
  document.title = `${profile.name} - Links`;
}

function renderLinks(links) {
  const container = document.getElementById('links');
  container.innerHTML = links.map(link => `
    <a href="${escapeHtml(link.url)}" class="link-item" target="_blank" rel="noopener noreferrer">
      <span class="link-icon">${link.icon || '🔗'}</span>
      <span>${escapeHtml(link.title)}</span>
    </a>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadLinks);
