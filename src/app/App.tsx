import './app.css';

export function App() {
  return (
    <main className="game-shell" aria-label="PIXEL Coloring Game">
      <iframe
        className="game-frame"
        title="PIXEL — Tô màu online"
        src={`/to-mau-online-standalone.html${window.location.search}${window.location.hash}`}
        allow="clipboard-read; clipboard-write"
      />
    </main>
  );
}
