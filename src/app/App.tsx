import { useMemo, useState } from 'react';
import './app.css';

type Subject = { name: string; code: string; icon: string; color: string; lessons: number; progress: number };
const subjects: Subject[] = [
  { name: 'Toán học', code: 'MATH', icon: '∑', color: 'violet', lessons: 42, progress: 68 },
  { name: 'Vật lý', code: 'PHYS', icon: '⚡', color: 'blue', lessons: 36, progress: 42 },
  { name: 'Hóa học', code: 'CHEM', icon: '⚗', color: 'orange', lessons: 31, progress: 24 },
  { name: 'Ngữ văn', code: 'LIT', icon: '✎', color: 'pink', lessons: 28, progress: 81 },
  { name: 'Tiếng Anh', code: 'EN', icon: 'A文', color: 'green', lessons: 34, progress: 55 },
  { name: 'Sinh học', code: 'BIO', icon: '❋', color: 'mint', lessons: 29, progress: 17 },
];
const nav = [{ label: 'Tổng quan', icon: '⌂' }, { label: 'Môn học', icon: '▦' }, { label: 'Thư viện', icon: '▤' }, { label: 'Luyện tập', icon: '✳' }, { label: 'Thành tích', icon: '♜' }];
const questions = [
  { q: 'Đạo hàm của hàm số f(x) = x² là gì?', options: ['x', '2x', 'x²', '2'], answer: 1, note: 'Áp dụng quy tắc đạo hàm lũy thừa: (xⁿ)′ = nxⁿ⁻¹.' },
  { q: 'Đơn vị SI của lực là gì?', options: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'], answer: 2, note: 'Lực được đo bằng Newton (N), đặt theo tên nhà vật lý Isaac Newton.' },
  { q: 'Tác giả của Truyện Kiều là ai?', options: ['Nguyễn Trãi', 'Nguyễn Du', 'Hồ Xuân Hương', 'Nam Cao'], answer: 1, note: 'Truyện Kiều là kiệt tác truyện thơ Nôm của đại thi hào Nguyễn Du.' },
];
export function App() {
  const [active, setActive] = useState('Tổng quan');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = questions[questionIndex];
  const greeting = useMemo(() => new Date().getHours() < 12 ? 'Chào buổi sáng' : new Date().getHours() < 18 ? 'Chào buổi chiều' : 'Chào buổi tối', []);
  const openQuiz = () => { setQuizOpen(true); setQuestionIndex(0); setChosen(null); setScore(0); setFinished(false); };
  const answerQuestion = () => {
    if (chosen === null) return;
    const nextScore = score + (chosen === current.answer ? 1 : 0);
    setScore(nextScore);
    if (questionIndex === questions.length - 1) setFinished(true);
    else { setQuestionIndex(questionIndex + 1); setChosen(null); }
  };
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" onClick={() => { setActive('Tổng quan'); setSelectedSubject(null); }}><span className="brand-symbol"><span /><span /><span /><span /></span><span className="brand-copy">PIXEL<span>EDU</span><small>HỌC THEO CÁCH CỦA BẠN</small></span></a>
      <div className="sidebar-label">KHÔNG GIAN HỌC TẬP</div>
      <nav className="main-nav">{nav.map(item => <button key={item.label} className={active === item.label ? 'nav-item active' : 'nav-item'} onClick={() => { setActive(item.label); setSelectedSubject(null); }}><span className="nav-icon">{item.icon}</span>{item.label}{item.label === 'Luyện tập' && <span className="nav-dot" />}</button>)}</nav>
      <div className="sidebar-promo"><div className="promo-star">✳</div><strong>Mỗi ngày một chút,<br />tiến bộ thật nhiều.</strong><p>Học đều đặn để chạm đến mục tiêu của bạn.</p><div className="promo-progress"><span /></div><small>4/7 ngày trong tuần</small></div>
      <div className="sidebar-bottom"><div className="avatar">L</div><div className="profile-name"><strong>Học sinh PIXEL</strong><small>Lớp 12 · Thành viên</small></div><button className="more-button" aria-label="Tùy chọn">···</button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumb"><span>Không gian học tập</span><b>/</b><strong>{selectedSubject?.name || active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Thông báo">♧<i /></button><div className="streak"><span>♨</span><strong>7</strong><small>ngày</small></div><div className="top-avatar">L</div></div></header>
      <div className="page-content">
        {selectedSubject ? <section className="subject-detail"><button className="back-link" onClick={() => setSelectedSubject(null)}>← Quay lại môn học</button><div className="subject-hero"><div className={'subject-icon large '+selectedSubject.color}>{selectedSubject.icon}</div><div><div className="eyebrow">{selectedSubject.code} · LỚP 10–12</div><h1>{selectedSubject.name}</h1><p>Học theo lộ trình, nắm chắc kiến thức và tự tin bứt phá.</p></div></div><div className="section-title"><div><h2>Lộ trình của bạn</h2><p>{selectedSubject.lessons} bài học được thiết kế theo chương trình phổ thông</p></div><span className="soft-pill">{selectedSubject.progress}% hoàn thành</span></div>{['Nền tảng kiến thức', 'Chuyên đề trọng tâm', 'Vận dụng & nâng cao'].map((unit, i) => <article className="lesson-row" key={unit}><span className="lesson-number">0{i+1}</span><div className="lesson-info"><strong>{unit}</strong><p>{i === 0 ? 'Ôn tập khái niệm cốt lõi và ví dụ mẫu' : i === 1 ? 'Hệ thống hóa kiến thức theo từng chuyên đề' : 'Bài tập vận dụng và câu hỏi thử thách'}</p></div><span className="lesson-duration">{18+i*7} phút</span><button className="small-primary" onClick={openQuiz}>Bắt đầu →</button></article>)}</section> : <>
          <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-dot" /> THỨ HAI, NGÀY MỚI NHIỀU NĂNG LƯỢNG</div><h1>{greeting}, Linh <span className="wave">✦</span></h1><p>Sẵn sàng học thêm điều mới hôm nay chưa?</p></div><button className="primary-button" onClick={openQuiz}><span>✳</span> Bắt đầu luyện tập <b>↗</b></button></section>
          <section className="stats-grid">
            <article className="stat-card"><div className="stat-top"><span>Thời gian học</span><span className="stat-icon lavender">◷</span></div><div className="stat-value">12.5 <small>giờ</small></div><div className="stat-foot"><span className="trend">↗ 18%</span><span>so với tuần trước</span></div><div className="mini-bars">{[35,55,44,72,48,88,62].map((h,i)=><span key={i} style={{height:h+'%'}} className={i===5?'bar-hot':''}/>)}</div></article>
            <article className="stat-card"><div className="stat-top"><span>Điểm tích lũy</span><span className="stat-icon yellow">✦</span></div><div className="stat-value">2,480 <small>XP</small></div><div className="stat-foot"><span className="trend">+320 XP</span><span>trong tuần này</span></div><div className="xp-track"><span /></div><div className="xp-caption"><span>Cấp 8 · Người khám phá</span><b>72%</b></div></article>
            <article className="stat-card"><div className="stat-top"><span>Bài học hoàn thành</span><span className="stat-icon mint">✓</span></div><div className="stat-value">24 <small>/ 40</small></div><div className="stat-foot"><span className="trend">60%</span><span>mục tiêu tháng</span></div><div className="completion-track"><span /></div><div className="xp-caption"><span>16 bài học còn lại</span><b>↗</b></div></article>
          </section>
          <section className="continue-card"><div className="continue-art"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="formula">f(x)<span> = </span>∑<sub>n=1</sub><sup>∞</sup></div><div className="art-chip">CHUYÊN ĐỀ 04</div></div><div className="continue-copy"><div className="eyebrow">TIẾP TỤC HỌC · TOÁN HỌC</div><h2>Hàm số &amp; ứng dụng đạo hàm</h2><p>Tiếp tục từ bài 3: Các quy tắc tính đạo hàm. Bạn đang tiến bộ rất tốt!</p><div className="continue-meta"><span>◷ 18 phút</span><span>▤ 4/6 bài học</span><span className="difficulty">Trung bình</span></div><div className="continue-bottom"><div className="progress-line"><span /></div><b>68%</b><button onClick={() => { setSelectedSubject(subjects[0]); setActive('Môn học'); }}>Học tiếp <span>→</span></button></div></div></section>
          <section className="subjects-section"><div className="section-title"><div><h2>Khám phá môn học</h2><p>Kiến thức phổ thông, được chia nhỏ để dễ tiếp thu.</p></div><button className="text-button" onClick={() => setActive('Môn học')}>Tất cả môn học <span>→</span></button></div><div className="subjects-grid">{subjects.map(subject => <button className="subject-card" key={subject.code} onClick={() => { setSelectedSubject(subject); setActive('Môn học'); }}><div className="subject-card-top"><span className={'subject-icon '+subject.color}>{subject.icon}</span><span className="card-arrow">↗</span></div><strong>{subject.name}</strong><small>{subject.lessons} bài học · Lớp 10–12</small><div className="subject-progress-label"><span>Tiến độ</span><b>{subject.progress}%</b></div><div className="subject-progress"><span style={{width:subject.progress+'%'}} /></div></button>)}</div></section>
          <section className="bottom-grid"><article className="weekly-card"><div className="section-title"><div><h2>Nhịp học tuần này</h2><p>Bền bỉ mỗi ngày sẽ tạo nên khác biệt.</p></div><span className="soft-pill">7 ngày</span></div><div className="week-chart">{[{d:'T2',v:62},{d:'T3',v:84},{d:'T4',v:45},{d:'T5',v:72},{d:'T6',v:55},{d:'T7',v:93},{d:'CN',v:28}].map((x,i)=><div className="week-day" key={x.d}><div className="week-bar-wrap"><span style={{height:x.v+'%'}} className={i===5?'today':''}/></div><small>{x.d}</small></div>)}</div></article><article className="achievement-card"><div className="achievement-medal">✦</div><div className="eyebrow">HUY HIỆU SẮP ĐẠT</div><h3>Chiến binh bền bỉ</h3><p>Học đủ 7 ngày liên tiếp để mở khóa huy hiệu mới.</p><div className="achievement-progress"><span /></div><div className="achievement-footer"><span>5/7 ngày</span><b>2 ngày nữa!</b></div></article></section>
        </>}
        <footer className="footer"><span>© 2026 PIXEL EDU</span><span>Học tập mở · Tiến bộ mỗi ngày <span className="footer-heart">✦</span></span><a href="mailto:hello@pixeledu.vn">Góp ý</a></footer>
      </div>
    </main>
    {quizOpen && <div className="modal-backdrop" role="presentation"><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Đóng">×</button>{finished ? <><div className="quiz-success">✦</div><div className="eyebrow">HOÀN THÀNH BÀI LUYỆN TẬP</div><h2 id="quiz-title">Bạn làm rất tốt!</h2><p className="quiz-explainer">Bạn trả lời đúng {score}/{questions.length} câu. Mỗi lần luyện tập là một bước tiến mới.</p><div className="result-score">{Math.round(score/questions.length*100)}<small>/100 điểm</small></div><button className="primary-button full" onClick={() => setQuizOpen(false)}>Quay lại học tập →</button></> : <><div className="eyebrow">LUYỆN TẬP NHANH · CÂU {questionIndex+1}/{questions.length}</div><div className="quiz-progress"><span style={{width:((questionIndex+1)/questions.length*100)+'%'}} /></div><h2 id="quiz-title">{current.q}</h2><div className="quiz-options">{current.options.map((option,i)=><button key={option} className={'quiz-option '+(chosen===i?'chosen':'')} onClick={() => setChosen(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{chosen!==null && <div className="quiz-note"><strong>{chosen===current.answer?'Chính xác!':'Cùng xem lại nhé.'}</strong> {current.note}</div>}<button className="primary-button full" disabled={chosen===null} onClick={answerQuestion}>{questionIndex===questions.length-1?'Xem kết quả':'Câu tiếp theo'} <b>→</b></button></>}</section></div>}
  </div>;
}
