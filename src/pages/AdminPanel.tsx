import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Plus, Trash2, Edit, Download, Film, Tv, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import {
  getAllContent,
  getContentById,
  addContent,
  updateContent,
  deleteContent,
  addEpisode,
  deleteEpisode,
  exportDatabase,
  ContentItem,
  Episode
} from '@/lib/database';
import { Helmet } from 'react-helmet-async';

const AdminPanel = () => {
  const { isAdmin, logout } = useAuth();
  const { refreshContent } = useDatabase();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: '',
    poster_url: '',
    banner_url: '',
    type: 'movie' as 'movie' | 'series',
    duration: '',
    overview: '',
    streaming_url: ''
  });

  const [episodeForm, setEpisodeForm] = useState({
    episode_number: 1,
    title: '',
    url: ''
  });

  const [bulkEpisodeUrls, setBulkEpisodeUrls] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
      return;
    }
    loadContent();
  }, [isAdmin, router]);

  const loadContent = () => {
    setContent(getAllContent());
  };

  const handleAddContent = () => {
    if (!formData.title.trim()) return;

    addContent(formData);
    loadContent();
    refreshContent();
    setIsAddingContent(false);
    resetForm();
  };

  const handleUpdateContent = () => {
    if (!editingContent) return;

    updateContent(editingContent.id, formData);
    loadContent();
    refreshContent();
    setEditingContent(null);
    resetForm();
  };

  const handleDeleteContent = (id: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      deleteContent(id);
      loadContent();
      refreshContent();
      if (selectedContent?.id === id) {
        setSelectedContent(null);
      }
    }
  };

  const handleAddEpisode = () => {
    if (!selectedContent || !episodeForm.url.trim()) return;

    addEpisode(
      selectedContent.id,
      episodeForm.episode_number,
      episodeForm.title || `Episode ${episodeForm.episode_number}`,
      episodeForm.url
    );
    
    setSelectedContent(getContentById(selectedContent.id));
    loadContent();
    refreshContent();
    setIsAddingEpisode(false);
    setEpisodeForm({ episode_number: (selectedContent.episodes?.length || 0) + 2, title: '', url: '' });
  };

  const handleBulkAddEpisodes = () => {
    if (!selectedContent || !bulkEpisodeUrls.trim()) return;

    const urls = bulkEpisodeUrls.split('\n').filter(url => url.trim());
    const startNumber = (selectedContent.episodes?.length || 0) + 1;

    urls.forEach((url, index) => {
      addEpisode(
        selectedContent.id,
        startNumber + index,
        `Episode ${startNumber + index}`,
        url.trim()
      );
    });

    setSelectedContent(getContentById(selectedContent.id));
    loadContent();
    refreshContent();
    setBulkEpisodeUrls('');
  };

  const handleDeleteEpisode = (episodeId: number) => {
    if (!selectedContent) return;
    
    deleteEpisode(episodeId);
    setSelectedContent(getContentById(selectedContent.id));
    loadContent();
    refreshContent();
  };

  const handleExportDb = () => {
    const data = exportDatabase();
    if (!data) return;

    const blob = new Blob([new Uint8Array(data)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movies.db';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      rating: '',
      poster_url: '',
      banner_url: '',
      type: 'movie',
      duration: '',
      overview: '',
      streaming_url: ''
    });
  };

  const startEditContent = (item: ContentItem) => {
    setFormData({
      title: item.title,
      year: item.year,
      genre: item.genre,
      rating: item.rating,
      poster_url: item.poster_url,
      banner_url: item.banner_url,
      type: item.type,
      duration: item.duration,
      overview: item.overview,
      streaming_url: item.streaming_url
    });
    setEditingContent(item);
  };

  const handleViewContent = (id: number) => {
    const fullContent = getContentById(id);
    setSelectedContent(fullContent);
    setEpisodeForm({ 
      episode_number: (fullContent?.episodes?.length || 0) + 1, 
      title: '', 
      url: '' 
    });
  };

  if (!isAdmin) return null;

  return (
    <>
      <Helmet>
        <title>Admin Panel - Pavi</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportDb}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export DB
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/80 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content List */}
            <div className="lg:col-span-1 bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Content Library</h2>
                <button
                  onClick={() => {
                    resetForm();
                    setIsAddingContent(true);
                    setEditingContent(null);
                  }}
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {content.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContent?.id === item.id ? 'bg-primary/20' : 'hover:bg-muted'
                    }`}
                    onClick={() => handleViewContent(item.id)}
                  >
                    {item.type === 'movie' ? (
                      <Film className="w-5 h-5 text-primary" />
                    ) : (
                      <Tv className="w-5 h-5 text-accent" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.year} • {item.type}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditContent(item);
                        }}
                        className="p-1 hover:bg-background rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteContent(item.id);
                        }}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Form or Details */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
              {(isAddingContent || editingContent) ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                      {editingContent ? 'Edit Content' : 'Add New Content'}
                    </h2>
                    <button
                      onClick={() => {
                        setIsAddingContent(false);
                        setEditingContent(null);
                        resetForm();
                      }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Movie/Series title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'movie' | 'series' })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Year</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Genre</label>
                      <input
                        type="text"
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Action/Adventure"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Rating</label>
                      <input
                        type="text"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="8.5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="2h 30m"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Poster URL</label>
                      <input
                        type="text"
                        value={formData.poster_url}
                        onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="/src/assets/poster.jpg"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Banner URL</label>
                      <input
                        type="text"
                        value={formData.banner_url}
                        onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="/src/assets/banner.jpg"
                      />
                    </div>

                    {formData.type === 'movie' && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Streaming URL</label>
                        <input
                          type="text"
                          value={formData.streaming_url}
                          onChange={(e) => setFormData({ ...formData, streaming_url: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="https://drive.google.com/file/d/.../preview"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Overview</label>
                      <textarea
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Movie/Series description..."
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={editingContent ? handleUpdateContent : handleAddContent}
                      className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      {editingContent ? 'Update' : 'Save'}
                    </button>
                  </div>
                </>
              ) : selectedContent ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedContent.title}</h2>
                      <p className="text-muted-foreground">{selectedContent.year} • {selectedContent.genre}</p>
                    </div>
                    <button
                      onClick={() => startEditContent(selectedContent)}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>

                  {selectedContent.type === 'series' && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Episodes ({selectedContent.episodes?.length || 0})
                        </h3>
                        <button
                          onClick={() => setIsAddingEpisode(!isAddingEpisode)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Episode
                        </button>
                      </div>

                      {isAddingEpisode && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Episode #</label>
                              <input
                                type="number"
                                value={episodeForm.episode_number}
                                onChange={(e) => setEpisodeForm({ ...episodeForm, episode_number: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Title</label>
                              <input
                                type="text"
                                value={episodeForm.title}
                                onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Episode title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">URL</label>
                              <input
                                type="text"
                                value={episodeForm.url}
                                onChange={(e) => setEpisodeForm({ ...episodeForm, url: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                          <button
                            onClick={handleAddEpisode}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                          >
                            Add Episode
                          </button>

                          <div className="border-t border-border pt-4">
                            <label className="block text-sm font-medium mb-2">Bulk Add Episodes (one URL per line)</label>
                            <textarea
                              value={bulkEpisodeUrls}
                              onChange={(e) => setBulkEpisodeUrls(e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                              placeholder="https://drive.google.com/file/d/.../preview&#10;https://drive.google.com/file/d/.../preview"
                            />
                            <button
                              onClick={handleBulkAddEpisodes}
                              className="mt-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm"
                            >
                              Bulk Add Episodes
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="max-h-[40vh] overflow-y-auto space-y-2">
                        {selectedContent.episodes?.map((episode) => (
                          <div
                            key={episode.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">Episode {episode.episode_number}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-md">
                                {episode.title}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteEpisode(episode.id)}
                              className="p-2 hover:bg-destructive/20 rounded transition-colors text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedContent.type === 'movie' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Streaming URL</h3>
                        <p className="text-sm font-mono bg-muted/30 p-2 rounded break-all">
                          {selectedContent.streaming_url || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Overview</h3>
                        <p className="text-sm">{selectedContent.overview}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Film className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select content to view details or click + to add new</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
