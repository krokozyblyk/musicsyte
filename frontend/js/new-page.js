// New Releases Page
let currentTab = 'tracks';

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    console.log('[NEW_PAGE] DOMContentLoaded - starting initialization');
    
    // Initialize auth
    if (typeof initializeAuth === 'function') {
        initializeAuth();
    }
    
    // Initialize modals
    if (typeof initializeModals === 'function') {
        initializeModals();
    }
    
    // Initialize theme
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }
    
    // Initialize search
    const searchInput = document.getElementById('searchInput');
    if (searchInput && typeof performSearch === 'function') {
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.onclick = performSearch;
        }
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Initialize tabs
    initializeTabs();
    
    // Load artists for display
    await loadArtists();
    
    // Load initial content
    await loadTabContent(currentTab);
});

// Initialize tabs
function initializeTabs() {
    document.querySelectorAll('.tab-btn-new').forEach(btn => {
        btn.addEventListener('click', async () => {
            const tab = btn.dataset.tab;
            
            // Update active state
            document.querySelectorAll('.tab-btn-new').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Load content
            currentTab = tab;
            await loadTabContent(tab);
        });
    });
}

// Load tab content
async function loadTabContent(tab) {
    const container = document.getElementById('contentContainer');
    
    if (!container) {
        console.error('[NEW_PAGE] Content container not found');
        return;
    }
    
    // Show loading
    container.innerHTML = '<div class="loading-spinner" style="grid-column: 1 / -1; text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin"></i></div>';
    
    try {
        if (tab === 'tracks') {
            await loadNewTracks();
        } else if (tab === 'albums') {
            await loadNewAlbums();
        } else if (tab === 'playlists') {
            await loadNewPlaylists();
        }
    } catch (error) {
        console.error('[NEW_PAGE] Error loading tab content:', error);
        container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Ошибка загрузки данных: ${error.message}</p>
        </div>`;
    }
}

// Load new tracks
async function loadNewTracks() {
    const container = document.getElementById('contentContainer');
    
    try {
        // Load new tracks using API method
        const newTracks = await window.api.getNewTracks(12);
        
        // Load user playlists for sidebar
        let playlists = [];
        try {
            if (window.api && window.api.isAuthenticated && window.api.isAuthenticated()) {
                const userId = window.api.getCurrentUser()?.id;
                if (userId) {
                    playlists = await window.api.getUserPlaylists(userId);
                }
            }
        } catch (error) {
            console.warn('[NEW_PAGE] Failed to load playlists:', error);
        }
        
        // Render
        renderTracksLayout(newTracks, playlists.slice(0, 5));
    } catch (error) {
        console.error('[NEW_PAGE] Error loading new tracks:', error);
        container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Ошибка загрузки треков: ${error.message}</p>
        </div>`;
    }
}

// Render tracks layout
function renderTracksLayout(tracks, playlists) {
    const container = document.getElementById('contentContainer');
    
    const tracksHtml = tracks.map(track => {
        const artwork = track.artworkPath || 'logo.jpg';
        const artistName = getArtistName(track.artistId) || 'Неизвестный исполнитель';
        
        return `
            <div class="new-track-card" onclick="playTrack(${track.id})">
                <img src="${artwork}" alt="${track.title}" class="track-card-artwork" onerror="this.src='logo.jpg'">
                <div class="track-card-title">${escapeHtml(track.title)}</div>
                <div class="track-card-artist">${escapeHtml(artistName)}</div>
            </div>
        `;
    }).join('');
    
    const playlistsHtml = playlists.map(playlist => {
        return `
            <div class="playlist-item" onclick="window.location.href='playlist.html?id=${playlist.id}'">
                <img src="logo.jpg" alt="${playlist.name}" class="playlist-artwork" onerror="this.src='logo.jpg'">
                <div class="playlist-info">
                    <div class="playlist-name">${escapeHtml(playlist.name)}</div>
                    <div class="playlist-count">${playlist.trackCount || 0} треков</div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="new-tracks-section">
            <div class="section-header">
                <h3>Новые треки</h3>
                <a href="index.html" class="view-all-link">Все треки →</a>
            </div>
            <div class="new-tracks-grid">
                ${tracksHtml}
            </div>
        </div>
        <div class="new-sidebar">
            ${playlists.length > 0 ? `
                <div class="new-playlists-section">
                    <div class="section-header">
                        <h3>Плейлисты</h3>
                        <a href="playlist.html" class="view-all-link">Все →</a>
                    </div>
                    <div class="playlists-list">
                        ${playlistsHtml}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Load new albums
async function loadNewAlbums() {
    const container = document.getElementById('contentContainer');
    
    try {
        // Load new albums using API method
        const newAlbums = await window.api.getNewAlbums(12);
        
        // Render
        renderAlbumsLayout(newAlbums);
    } catch (error) {
        console.error('[NEW_PAGE] Error loading new albums:', error);
        container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Ошибка загрузки альбомов: ${error.message}</p>
        </div>`;
    }
}

// Render albums layout
function renderAlbumsLayout(albums) {
    const container = document.getElementById('contentContainer');
    
    const albumsHtml = albums.map(album => {
        const artwork = album.artworkPath || 'logo.jpg';
        const artistName = getArtistName(album.artistId) || 'Неизвестный исполнитель';
        
        return `
            <div class="new-track-card" onclick="window.location.href='album.html?id=${album.id}'">
                <img src="${artwork}" alt="${album.title}" class="track-card-artwork" onerror="this.src='logo.jpg'">
                <div class="track-card-title">${escapeHtml(album.title)}</div>
                <div class="track-card-artist">${escapeHtml(artistName)}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="new-tracks-section" style="grid-column: 1 / -1;">
            <div class="section-header">
                <h3>Новые альбомы</h3>
                <a href="album.html" class="view-all-link">Все альбомы →</a>
            </div>
            <div class="new-tracks-grid">
                ${albumsHtml}
            </div>
        </div>
    `;
}

// Load new playlists
async function loadNewPlaylists() {
    const container = document.getElementById('contentContainer');
    
    try {
        // Load user playlists
        let playlists = [];
        if (window.api && window.api.isAuthenticated && window.api.isAuthenticated()) {
            const user = window.api.getCurrentUser();
            if (user && user.id) {
                playlists = await window.api.getUserPlaylists(user.id);
            }
        }
        
        // Sort by date (newest first)
        const sortedPlaylists = [...playlists].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        
        // Render
        renderPlaylistsLayout(sortedPlaylists.slice(0, 12));
    } catch (error) {
        console.error('[NEW_PAGE] Error loading new playlists:', error);
        container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Ошибка загрузки плейлистов: ${error.message}</p>
        </div>`;
    }
}

// Render playlists layout
function renderPlaylistsLayout(playlists) {
    const container = document.getElementById('contentContainer');
    
    if (playlists.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-list"></i>
                <p>У вас пока нет плейлистов</p>
                <p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">Войдите в систему, чтобы создать плейлисты</p>
            </div>
        `;
        return;
    }
    
    const playlistsHtml = playlists.map(playlist => {
        return `
            <div class="playlist-item" onclick="window.location.href='playlist.html?id=${playlist.id}'">
                <img src="logo.jpg" alt="${playlist.name}" class="playlist-artwork" onerror="this.src='logo.jpg'">
                <div class="playlist-info">
                    <div class="playlist-name">${escapeHtml(playlist.name)}</div>
                    <div class="playlist-count">${playlist.trackCount || 0} треков</div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="new-tracks-section" style="grid-column: 1 / -1;">
            <div class="section-header">
                <h3>Мои плейлисты</h3>
            </div>
            <div class="playlists-list">
                ${playlistsHtml}
            </div>
        </div>
    `;
}

// Helper functions
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getArtistName(artistId) {
    if (!artistId) return null;
    
    // Try to load artists if not loaded
    if (!window.artists || window.artists.length === 0) {
        // Load artists if available
        if (window.api && window.api.getArtists) {
            window.api.getArtists().then(artists => {
                window.artists = artists;
            }).catch(() => {});
        }
        return null;
    }
    
    const artist = window.artists.find(a => a.id === artistId);
    return artist ? artist.name : null;
}

// Load artists on page load
async function loadArtists() {
    try {
        if (window.api && window.api.getArtists) {
            window.artists = await window.api.getArtists();
        }
    } catch (error) {
        console.warn('[NEW_PAGE] Failed to load artists:', error);
    }
}

// Make functions available globally
window.playTrack = window.playTrack || function(trackId) {
    if (typeof playTrack === 'function') {
        playTrack(trackId);
    }
};
