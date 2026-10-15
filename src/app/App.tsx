import { useEffect, useMemo, useState } from 'react';
import { PluginRegistry } from '../core/plugins/PluginRegistry';
import type { PixelPlugin } from '../core/plugins/types';
import { scoreCompletion } from '../features/scoring/scoreCompletion';
import { applyTheme, type ThemeName } from '../themes/theme';
import { ModuleCard } from '../components/ModuleCard';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const starterPlugins: PixelPlugin[] = [
  { id: 'coloring', name: 'Coloring Studio', version: '0.1.0', description: 'Canvas, palette and fill tools — migration in progress.' },
  { id: 'multiplayer', name: 'Multiplayer Rooms', version: '0.1.0', description: 'Room lifecycle and networking adapter — planned.' },
  { id: 'scoring', name: 'Scoring Rules', version: '0.1.0', description: 'Framework-independent score calculation is available.' },
];

export function App() {
  const [themeName, setThemeName] = useState<ThemeName>('midnight');
  const [completed, setCompleted] = useState(7);
  const [cloudStatus, setCloudStatus] = useState<'loading' | 'saved' | 'saving' | 'offline' | 'error'>('loading');
  const total = 12;
  const plugins = useMemo(() => {
    const registry = new PluginRegistry();
    starterPlugins.forEach((plugin) => registry.register(plugin));
    return registry.list();
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      if (!isSupabaseConfigured) {
        setCloudStatus('offline');
        return;
      }
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        let user = sessionData.session?.user;
        if (!user) {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          user = data.user ?? undefined;
        }
        if (!user) throw new Error('Không tạo được phiên người chơi.');

        const { data, error } = await supabase
          .from('player_progress')
          .select('completed, total')
          .eq('user_id', user.id)
          .maybeSingle();
        if (error) throw error;
        if (!active) return;
        if (data) setCompleted(Math.min(data.total, Math.max(0, data.completed)));
        setCloudStatus('saved');
      } catch (error) {
        console.error('Không thể tải tiến độ từ Supabase:', error);
        if (active) setCloudStatus('error');
      }
    }

    void loadProgress();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || cloudStatus === 'loading' || cloudStatus === 'offline' || cloudStatus === 'error') return;
    let cancelled = false;
    setCloudStatus('saving');
    const timer = setTimeout(async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        const userId = sessionData.session?.user.id;
        if (!userId) throw new Error('Phiên người chơi chưa sẵn sàng.');
        const { error } = await supabase.from('player_progress').upsert({
          user_id: userId,
          completed,
          total,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });
        if (error) throw error;
        if (!cancelled) setCloudStatus('saved');
      } catch (error) {
        console.error('Không thể lưu tiến độ lên Supabase:', error);
        if (!cancelled) setCloudStatus('error');
      }
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [completed, total, cloudStatus]);

  function changeTheme(next: ThemeName) { setThemeName(next); applyTheme(next); }
  const cloudLabel = cloudStatus === 'loading' ? 'Connecting to cloud…'
    : cloudStatus === 'saving' ? 'Saving progress…'
    : cloudStatus === 'saved' ? 'Cloud save active'
    : cloudStatus === 'offline' ? 'Supabase not configured'
    : 'Cloud save error';

  return <main className="platform-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">P</span><span>PIXEL <small>PLATFORM</small></span></a><div className="topbar-actions"><label className="theme-picker"><span>Theme</span><select value={themeName} onChange={(event) => changeTheme(event.target.value as ThemeName)}><option value="midnight">Midnight</option><option value="paper">Paper</option><option value="aurora">Aurora</option></select></label><span className="status-pill"><i /> Modular preview</span></div></header>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">A NEW FOUNDATION FOR CREATIVITY</p><h1>Make room for<br/><span>more PIXEL.</span></h1><p className="hero-description">Một nền tảng mới, nơi game engine, giao diện, theme và tính năng có thể phát triển độc lập.</p><div className="hero-actions"><a className="button button-primary" href="#modules">Khám phá module <span>↘</span></a><a className="button button-quiet" href="https://github.com/nklinhcgblink-sudo/PIXEL" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
    <div className="hero-art" aria-label="Abstract pixel artwork"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="pixel-grid" aria-hidden="true">{Array.from({length:49},(_,i)=><span key={i} className={i%7===0||i%11===0||[16,17,23,24,30,31].includes(i)?'pixel lit':'pixel'}/>)}</div><span className="art-label art-label-top">CREATIVE ENGINE / 001</span><span className="art-label art-label-bottom">BUILD · PLAY · EXTEND</span></div></section>
    <section className="section-heading" id="modules"><div><p className="eyebrow">THE BUILDING BLOCKS</p><h2>Every part has room to grow.</h2></div><span className="section-count">0{plugins.length} MODULES</span></section>
    <section className="module-grid" aria-label="Platform modules">{plugins.map((plugin,index)=><ModuleCard key={plugin.id} plugin={plugin} index={index}/>)}</section>
    <section className="workspace"><div className="workspace-copy"><p className="eyebrow">DOMAIN LOGIC · CLOUD-SYNCED DEMO</p><h2>Small modules.<br/>Clear rules.</h2><p>Tiến độ của phiên chơi được tải và lưu trên Supabase, không phụ thuộc vào localStorage. Khi mở lại bằng cùng phiên trình duyệt, PIXEL sẽ khôi phục dữ liệu đã lưu.</p></div><div className="score-panel"><div className="score-panel-header"><span>COLORING SESSION</span><span className="live-dot">● {cloudStatus === 'error' ? 'ERROR' : cloudStatus === 'saved' ? 'CLOUD' : 'SYNC'}</span></div><div className="score-number">{scoreCompletion(completed,total)}<span> / 100</span></div><p className="score-caption">Completion score</p><div className="progress-track"><div style={{width:`${completed/total*100}%`}}/></div><label className="range-label" htmlFor="completed"><span>Vùng đã tô</span><strong>{completed} / {total}</strong></label><input id="completed" type="range" min="0" max={total} value={completed} onChange={(event)=>setCompleted(Number(event.target.value))}/><p className="demo-note">{cloudLabel}. {cloudStatus === 'error' ? 'Kiểm tra biến môi trường và quyền RLS của Supabase.' : 'Tiến độ được lưu theo phiên người chơi ẩn danh.'}</p></div></section>
    <footer className="footer"><span>PIXEL PLATFORM <span className="footer-muted">· FOUNDATION 0.2.0</span></span><span>Built to be extended ✳</span></footer>
  </main>;
}
