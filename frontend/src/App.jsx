import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Replace with your Cloudflare Worker URL after deployment
  const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://your-worker.workers.dev';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPG, PNG, or WebP.');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    setImage(file);
    setProcessedImage(null);
    setError(null);
  };

  const handleRemoveBackground = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to process image');
      }

      const blob = await response.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message || 'An error occurred while processing the image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `removed-background-${Date.now()}.png`;
    a.click();
  };

  const handleReset = () => {
    setImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎨 AI Background Remover</h1>
        <p>Remove background from any image in seconds using AI</p>
      </header>

      <main className="main">
        {!image ? (
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="upload-label">
              <div className="upload-icon">📁</div>
              <h3>Drop your image here</h3>
              <p>or click to browse</p>
              <span className="upload-hint">Supports JPG, PNG, WebP (Max 10MB)</span>
            </label>
          </div>
        ) : (
          <div className="processing-area">
            <div className="image-preview">
              <div className="image-card">
                <h3>Original</h3>
                <img src={URL.createObjectURL(image)} alt="Original" />
              </div>

              {processedImage && (
                <div className="image-card">
                  <h3>Result</h3>
                  <img src={processedImage} alt="Processed" />
                </div>
              )}
            </div>

            <div className="actions">
              {!processedImage ? (
                <>
                  <button
                    onClick={handleRemoveBackground}
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Processing...' : '✨ Remove Background'}
                  </button>
                  <button onClick={handleReset} className="btn btn-secondary">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleDownload} className="btn btn-primary">
                    ⬇️ Download PNG
                  </button>
                  <button onClick={handleReset} className="btn btn-secondary">
                    🔄 New Image
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Powered by remove.bg API • Built with Cloudflare Workers</p>
      </footer>
    </div>
  );
}

export default App;
