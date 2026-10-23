import { useEffect, useState, type FormEvent } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import './app.css';
type Page='home'|'login'|'signup'|'dashboard'|'library'|'practice';
const subjects=[['Toán học','∑','violet','Hàm số, đạo hàm và tư duy logic'],['Vật lý','ϟ','blue','Khám phá những quy luật tự nhiên'],['Hóa học','⚗','pink','Phản ứng, nguyên tố và ứng dụng'],['Ngữ văn','✎','orange','Đọc sâu, viết hay, nghĩ khác biệt'],['Tiếng Anh','Aa','green','Từ vựng và kỹ năng thực tế'],['Sinh học','❋','cyan','Sự sống từ tế bào đến hệ sinh thái']];
const lessons=[['Vật lý','Định luật bảo toàn năng lượng','Lớp 10 · 12 phút','blue','ϟ'],['Toán học','Khám phá đạo hàm','Lớp 12 · 18 phút','violet','∑'],['Hóa học','Liên kết hóa học','Lớp 10 · 15 phút','pink','⚗']];
function Brand({onClick,light=false}:{onClick:()=>void;light?:boolean}){return <button className={'brand-lockup '+(light?'brand-light':'')} onClick={onClick}><span className="pixel-mark"><i/><i/><i/><i/></span><span>PIXEL <b>EDU</b><small>HỌC THEO CÁCH CỦA BẠN</small></span></button>}
function HeroArt(){return <div className="hero-art" aria-label="Minh họa học sinh khám phá tri thức"><div className="art-sun"/><div className="art-cloud cloud-one"/><div className="art-cloud cloud-two"/><div className="floating-note note-one"><span>✦</span><b>+120 XP</b><small>Tiến bộ mỗi ngày</small></div><div className="floating-note note-two"><span>✓</span><b>Hoàn thành!</b><small>Bài học hôm nay</small></div><div className="student"><div className="student-hair"/><div className="student-face"><i/><i/><b/></div><div className="student-neck"/><div className="student-body"><span className="hood-line"/><div className="student-book">π<br/><small>∑ x²</small></div></div><div className="student-arm"/></div><div className="art-orbit orbit-one">∑</div><div className="art-orbit orbit-two">✧</div><div className="art-orbit orbit-three">A</div><div className="art-ground"/></div>}
function Landing({go}:{go:(p:Page)=>void}){return <div className="landing"><header className="site-header"><Brand onClick={()=>go('home')}/><nav className="site-nav"><a href="#kham-pha">Khám phá</a><a href="#mon-hoc">Môn học</a><a href="#cach-hoc">Cách học</a><a href="#bai-hoc">Bài học thử</a></nav><div className="header-actions"><button className="login-link" onClick={()=>go('login')}>Đăng nhập</button><button className="button button-small button-primary" onClick={()=>go('signup')}>Bắt đầu miễn phí ↗</button><button className="mobile-menu" onClick={()=>go('library')}>☰</button></div></header><main><section className="hero-section"><div className="hero-copy"><div className="eyebrow-pill"><span/> NỀN TẢNG HỌC TẬP THẾ HỆ MỚI</div><h1>Học hôm nay.<br/><span>Mở lối ngày mai.</span></h1><p className="hero-description">Kiến thức không cần khô khan. Học theo cách của bạn với bài giảng dễ hiểu, luyện tập thông minh và những tiến bộ nhìn thấy được.</p><div className="hero-actions"><button className="button button-primary button-large" onClick={()=>go('signup')}>Bắt đầu học miễn phí <span>↗</span></button><button className="button button-ghost button-large" onClick={()=>go('library')}><span className="play-icon">▶</span> Khám phá thư viện</button></div><div className="social-proof"><div className="avatar-stack"><i>M</i><i>H</i><i>A</i><i>+</i></div><div><b>Học theo nhịp của riêng bạn</b><small>Miễn phí · Lớp 10, 11 và 12</small></div><div className="proof-stars">★★★★★<small>Học tập vui hơn mỗi ngày</small></div></div></div><HeroArt/><div className="hero-caption"><span>✦</span> Mỗi ngày tiến bộ một chút</div></section><section className="trust-strip"><div><b>10–12</b><span>Dành cho học sinh THPT</span></div><i/><div><b>6+</b><span>Môn học trọng tâm</span></div><i/><div><b>100%</b><span>Miễn phí để bắt đầu</span></div><i/><div><b>∞</b><span>Học theo tốc độ của bạn</span></div></section><section className="section" id="kham-pha"><div className="section-heading"><div><span className="section-kicker">BẠN MUỐN KHÁM PHÁ GÌ?</span><h2>Kiến thức lớn,<br/><em>khởi đầu từ điều nhỏ.</em></h2></div><p>Chọn một môn học, bắt đầu từ một câu hỏi. Phần còn lại, PIXEL EDU cùng bạn khám phá.</p></div><div className="subject-grid" id="mon-hoc">{subjects.map((s,i)=><button className="landing-subject" key={s[0]} onClick={()=>go('library')}><div className={'subject-symbol '+s[2]}>{s[1]}</div><span className="subject-index">0{i+1}</span><h3>{s[0]}</h3><p>{s[3]}</p><div className="subject-bottom"><small>{[124,98,86,76,112,73][i]} bài học</small><span>↗</span></div></button>)}</div><div className="center-action"><button className="button button-outline" onClick={()=>go('library')}>Khám phá tất cả môn học →</button></div></section><section className="feature-section" id="cach-hoc"><div className="feature-visual"><div className="feature-window"><div className="window-top"><span/><span/><span/><small>HÀNH TRÌNH HỌC TẬP</small></div><div className="feature-greeting">Bạn đang làm rất tốt! <span>✦</span></div><div className="feature-stat"><div className="ring"><b>68%</b></div><div><b>Tiến bộ của bạn</b><small>Đều đặn hơn mỗi ngày</small><div className="fake-progress"><i/></div></div></div><div className="feature-task"><span className="task-check">✓</span><div><b>Hoàn thành bài học</b><small>Định luật bảo toàn năng lượng</small></div><strong>+40 XP</strong></div><div className="feature-task"><span className="task-check task-purple">✦</span><div><b>Chuỗi ngày học</b><small>Tiếp tục giữ nhịp nhé!</small></div><strong>🔥 7 ngày</strong></div></div><div className="feature-sticker">Học đều<br/>mỗi ngày <span>↗</span></div></div><div className="feature-copy"><span className="section-kicker">KHÔNG CHỈ LÀ HỌC THUỘC</span><h2>Biến việc học thành<br/><em>một hành trình đáng vui.</em></h2><p>PIXEL EDU chia kiến thức thành những bước nhỏ, giúp bạn hiểu bản chất, luyện tập đúng lúc và nhận ra mình đang tiến bộ.</p><div className="feature-list"><div><span className="feature-list-icon">✦</span><p><b>Học dễ hiểu</b><small>Bài học cô đọng, ví dụ gần gũi và giải thích rõ ràng.</small></p></div><div><span className="feature-list-icon mint">✓</span><p><b>Luyện tập có phản hồi</b><small>Biết vì sao đúng, hiểu chỗ sai và thử lại tự tin hơn.</small></p></div><div><span className="feature-list-icon peach">↗</span><p><b>Nhìn thấy tiến bộ</b><small>XP, chuỗi ngày học và mục tiêu giúp bạn giữ động lực.</small></p></div></div><button className="button button-primary" onClick={()=>go('signup')}>Bắt đầu hành trình →</button></div></section><section className="lesson-section" id="bai-hoc"><div className="section-heading lesson-heading"><div><span className="section-kicker">THỬ HỌC MỘT CHÚT</span><h2>Một bài nhỏ.<br/><em>Một bước tiến mới.</em></h2></div><button className="text-action" onClick={()=>go('library')}>Xem thư viện ↗</button></div><div className="lesson-grid">{lessons.map((l,i)=><article className="lesson-card" key={l[1]}><div className={'lesson-cover '+l[3]}><span className="cover-index">BÀI HỌC 0{i+1}</span><div>{l[4]}</div><span className="cover-doodle">{['F = ma','f′(x)','H₂O'][i]}</span></div><div className="lesson-card-copy"><div className="lesson-meta">{l[0]} · {l[2]}</div><h3>{l[1]}</h3><p>Bài học ngắn gọn kèm câu hỏi kiểm tra kiến thức.</p><button onClick={()=>go('practice')}>Học thử bài này <span>→</span></button></div></article>)}</div></section><section className="cta-section"><div className="cta-spark">✦</div><div><span className="section-kicker">BƯỚC ĐẦU KHÔNG CẦN HOÀN HẢO</span><h2>Sẵn sàng khám phá<br/>phiên bản tốt hơn của bạn?</h2><p>Bắt đầu miễn phí. Học theo cách của bạn. Tiến bộ theo nhịp riêng.</p></div><button className="button button-light" onClick={()=>go('signup')}>Bắt đầu học miễn phí ↗</button><div className="cta-orbit">✧</div></section></main><footer className="site-footer"><Brand onClick={()=>go('home')}/><p>Học tập mở. Tiến bộ mỗi ngày.</p><div><button onClick={()=>go('library')}>Thư viện</button><button onClick={()=>go('login')}>Đăng nhập</button><span>© 2026 PIXEL EDU</span></div></footer></div>}
function Auth({mode,go}:{mode:'login'|'signup';go:(p:Page)=>void}) {
  const [show,setShow] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [grade,setGrade] = useState('12');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!isSupabaseConfigured) {
      setError('PIXEL EDU chưa được cấu hình Supabase. Hãy kiểm tra VITE_SUPABASE_URL và VITE_SUPABASE_PUBLISHABLE_KEY.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { display_name: name.trim(), grade_level: grade } }
        });
        if (authError) throw authError;
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from('edu_profiles').upsert({
            user_id: data.user.id,
            display_name: name.trim() || email.trim().split('@')[0],
            grade: Number(grade)
          }, { onConflict: 'user_id' });
          if (profileError) setNotice('Tài khoản đã được tạo, nhưng chưa lưu được hồ sơ học tập: ' + profileError.message);
          go('dashboard');
        } else {
          setNotice('Tài khoản đã được gửi đăng ký. Nếu dự án yêu cầu xác nhận email, hãy mở email để xác nhận trước khi đăng nhập.');
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        go('dashboard');
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Không thể hoàn tất thao tác xác thực. Vui lòng thử lại.');
    } finally {
      setBusy(false);
    }
  }

  return <div className="auth-page"><div className="auth-art"><Brand light onClick={()=>go('home')}/><div className="auth-art-copy"><span className="section-kicker">MỘT KHỞI ĐẦU MỚI</span><h1>Kiến thức mở ra<br/>những chân trời.</h1><p>Đi từng bước nhỏ. Khám phá điều mới. Tạo nên hành trình của riêng bạn.</p><div className="auth-orbit">✦</div></div><div className="auth-art-foot">PIXEL EDU · HỌC THEO CÁCH CỦA BẠN</div></div><div className="auth-form-side"><button className="auth-back" onClick={()=>go('home')}>← Về trang chủ</button><form className="auth-card" onSubmit={submit}><div className="auth-mini-logo"><span className="pixel-mark"><i/><i/><i/><i/></span></div><span className="section-kicker">{mode==='login'?'CHÀO MỪNG BẠN TRỞ LẠI':'BẮT ĐẦU HÀNH TRÌNH'}</span><h2>{mode==='login'?'Đăng nhập nhé!':'Tạo tài khoản miễn phí'}</h2><p>{mode==='login'?'Tiếp tục hành trình học tập của bạn.':'Một tài khoản nhỏ, thật nhiều điều để khám phá.'}</p>{mode==='signup'&&<label>Họ và tên<input value={name} onChange={e=>setName(e.target.value)} required autoComplete="name" placeholder="Tên bạn muốn mọi người gọi"/></label>}<label>Email học tập<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" placeholder="ban@example.com"/></label><label>Mật khẩu<div className="password-wrap"><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} autoComplete={mode==='login'?'current-password':'new-password'} placeholder="Ít nhất 6 ký tự"/><button type="button" onClick={()=>setShow(!show)}>{show?'Ẩn':'Hiện'}</button></div></label>{mode==='signup'&&<label>Khối lớp<select value={grade} onChange={e=>setGrade(e.target.value)}><option value="10">Lớp 10</option><option value="11">Lớp 11</option><option value="12">Lớp 12</option></select></label>}{error&&<div className="auth-message auth-error" role="alert">{error}</div>}{notice&&<div className="auth-message auth-notice" role="status">{notice}</div>}<button className="button button-primary auth-submit" type="submit" disabled={busy}>{busy?'Đang xử lý…':mode==='login'?'Đăng nhập':'Tạo tài khoản'} →</button><div className="auth-switch">{mode==='login'?'Chưa có tài khoản?':'Đã có tài khoản?'} <button type="button" onClick={()=>go(mode==='login'?'signup':'login')}>{mode==='login'?'Đăng ký miễn phí':'Đăng nhập'}</button></div><small className="auth-demo-note">Đăng nhập và đăng ký dùng Supabase của PIXEL EDU. Nếu chưa cấu hình môi trường, xác thực sẽ báo lỗi thay vì giả lập thành công.</small></form></div></div>
}
type SubjectRecord = { id:string; slug:string; name:string; description:string; icon:string; accent:string; grade_min:number; grade_max:number; sort_order:number };
type LessonRecord = { id:string; subject_id:string; slug:string; title:string; summary:string; grade:number; chapter:string; duration_minutes:number; lesson_order:number };

function Learning({page,go}:{page:'library'|'practice';go:(p:Page)=>void}) {
  const [filter,setFilter]=useState('Tất cả');
  const [answer,setAnswer]=useState<number|null>(null);
  const [checked,setChecked]=useState(false);
  const [subjectsData,setSubjectsData]=useState<SubjectRecord[]>([]);
  const [lessonsData,setLessonsData]=useState<LessonRecord[]>([]);
  const [loading,setLoading]=useState(false);
  const [dataError,setDataError]=useState('');

  useEffect(()=>{
    if(page!=='library') return;
    let active=true;
    setLoading(true);
    setDataError('');
    Promise.all([
      supabase.from('edu_subjects').select('id,slug,name,description,icon,accent,grade_min,grade_max,sort_order').eq('published',true).order('sort_order'),
      supabase.from('edu_lessons').select('id,subject_id,slug,title,summary,grade,chapter,duration_minutes,lesson_order').eq('published',true).order('lesson_order')
    ]).then(([subjectsResult,lessonsResult])=>{
      if(!active) return;
      if(subjectsResult.error || lessonsResult.error) {
        setDataError('Chưa tải được thư viện từ Supabase. Hãy kiểm tra quyền đọc dữ liệu đã xuất bản (RLS) và kết nối môi trường.');
        return;
      }
      setSubjectsData((subjectsResult.data||[]) as SubjectRecord[]);
      setLessonsData((lessonsResult.data||[]) as LessonRecord[]);
    }).catch(()=>{
      if(active) setDataError('Kết nối thư viện gặp lỗi. Vui lòng thử tải lại trang.');
    }).finally(()=>{if(active)setLoading(false);});
    return ()=>{active=false;};
  },[page]);

  const visibleLessons=lessonsData.filter(lesson=>filter==='Tất cả'||String(lesson.grade)===filter.replace('Lớp ',''));
  const subjectById=new Map(subjectsData.map(subject=>[subject.id,subject]));
  const accentClass=(accent:string)=>['violet','blue','pink','orange','green','cyan'].includes(accent)?accent:'violet';

  return <div className="learning-page"><header className="site-header"><Brand onClick={()=>go('home')}/><nav className="site-nav"><button onClick={()=>go('home')}>Trang chủ</button><button onClick={()=>go('library')}>Thư viện</button><button onClick={()=>go('practice')}>Luyện tập</button></nav><div className="header-actions"><button className="login-link" onClick={()=>go('login')}>Đăng nhập</button><button className="button button-primary button-small" onClick={()=>go('signup')}>Học miễn phí ↗</button></div></header><main className="learning-content"><button className="back-home" onClick={()=>go('home')}>← Trang chủ</button>{page==='library'?<><span className="section-kicker">THƯ VIỆN PIXEL EDU</span><h1>Chọn điều bạn muốn<br/><em>hiểu sâu hơn hôm nay.</em></h1><p className="learning-intro">Nội dung lấy từ danh mục bài học đã xuất bản trên PIXEL EDU.</p><div className="filter-row">{['Tất cả','Lớp 10','Lớp 11','Lớp 12'].map(x=><button key={x} className={filter===x?'filter-active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div>{dataError&&<div className="data-message" role="alert">{dataError}</div>}{loading?<div className="data-message">Đang tải môn học và bài học…</div>:<><div className="subject-chip-row">{subjectsData.map(subject=><span className={'subject-chip '+accentClass(subject.accent)} key={subject.id}>{subject.icon} {subject.name}</span>)}</div><div className="library-grid">{visibleLessons.map(lesson=>{const subject=subjectById.get(lesson.subject_id);return <article className="library-card" key={lesson.id}><div className={'library-art '+accentClass(subject?.accent||'violet')}><span>{subject?.icon||'✦'}</span><small>LỚP {lesson.grade}</small></div><div className="library-card-body"><span className="section-kicker">{subject?.name||'MÔN HỌC'}</span><h3>{lesson.title}</h3><p>{lesson.summary||lesson.chapter||'Bài học theo chương trình THPT.'}</p><div className="lesson-db-meta">{lesson.duration_minutes} phút{lesson.chapter?' · '+lesson.chapter:''}</div><button onClick={()=>go('practice')}>Mở bài học →</button></div></article>})}</div>{!visibleLessons.length&&<div className="data-message">Chưa có bài học đã xuất bản cho bộ lọc này.</div>}</>}</>:<div className="practice-layout"><div className="practice-main"><span className="section-kicker">LUYỆN TẬP PIXEL EDU</span><h1>Thử sức với một câu hỏi nhé.</h1><p>Đây hiện là câu hỏi minh họa giao diện. Dữ liệu câu hỏi có trong Supabase nhưng chưa được mở trực tiếp cho client vì bảng đáp án cần cơ chế chấm điểm không tiết lộ đáp án đúng.</p><div className="practice-card"><div className="practice-top"><span>CÂU HỎI MINH HỌA</span><span>TOÁN HỌC</span></div><h2>Đạo hàm của hàm số f(x) = x² là gì?</h2>{['x','2x','x²','2'].map((v,i)=><button key={v} className={'answer-option '+(answer===i?'answer-selected ':'')+(checked&&i===1?'answer-correct':'')} onClick={()=>{setAnswer(i);setChecked(false)}}><span>{String.fromCharCode(65+i)}</span>{v}{checked&&i===1&&<b>✓</b>}</button>)}{checked&&<div className={'answer-feedback '+(answer===1?'good':'')}><b>{answer===1?'Đáp án minh họa chính xác':'Đáp án minh họa chưa đúng'}</b><p>Quy tắc đạo hàm lũy thừa: (xⁿ)′ = nxⁿ⁻¹. Với n = 2, kết quả là 2x. Phần này chưa ghi kết quả vào hồ sơ học tập.</p></div>}<button className="button button-primary answer-submit" disabled={answer===null} onClick={()=>setChecked(true)}>Kiểm tra câu minh họa →</button></div></div><aside className="practice-aside"><div className="practice-aside-icon">✦</div><h3>Đang hoàn thiện chấm điểm an toàn</h3><p>PIXEL EDU sẽ chỉ ghi nhận điểm và tiến độ sau khi API chấm bài được bảo vệ, không gửi đáp án đúng xuống trình duyệt trước khi nộp.</p><button className="text-action" onClick={()=>go('library')}>Quay lại thư viện →</button></aside></div>}</main></div>
}
function Dashboard({go}:{go:(p:Page)=>void}) {
  const [active,setActive]=useState('Tổng quan');
  const [profile,setProfile]=useState<{display_name:string;grade:number|null;xp:number;streak_days:number}|null>(null);
  const [completedCount,setCompletedCount]=useState(0);
  const [totalLessons,setTotalLessons]=useState(0);
  const [dashboardError,setDashboardError]=useState('');
  const [busy,setBusy]=useState(true);
  const [signingOut,setSigningOut]=useState(false);

  useEffect(()=>{
    let activeRequest=true;
    async function loadDashboard(){
      setBusy(true);
      setDashboardError('');
      const {data:userData,error:userError}=await supabase.auth.getUser();
      if(userError||!userData.user){
        if(activeRequest){setDashboardError('Không xác định được phiên đăng nhập. Vui lòng đăng nhập lại.');setBusy(false);}
        return;
      }
      const userId=userData.user.id;
      const [profileResult,progressResult,lessonsResult]=await Promise.all([
        supabase.from('edu_profiles').select('display_name,grade,xp,streak_days').eq('user_id',userId).maybeSingle(),
        supabase.from('edu_learning_progress').select('lesson_id,status').eq('user_id',userId),
        supabase.from('edu_lessons').select('id',{count:'exact',head:true}).eq('published',true)
      ]);
      if(!activeRequest)return;
      if(profileResult.error||progressResult.error||lessonsResult.error){
        setDashboardError('Một phần dữ liệu chưa tải được. Hãy kiểm tra quyền truy cập RLS trong Supabase.');
      } else {
        let profileData = profileResult.data;
        if (!profileData) {
          const metadata = userData.user.user_metadata || {};
          const {data:createdProfile,error:profileCreateError}=await supabase.from('edu_profiles').upsert({
            user_id:userId,
            display_name:String(metadata.display_name||metadata.name||userData.user.email?.split('@')[0]||'Học sinh PIXEL'),
            grade:Number(metadata.grade_level)||null
          },{onConflict:'user_id'}).select('display_name,grade,xp,streak_days').maybeSingle();
          if(!profileCreateError) profileData=createdProfile;
          else setDashboardError('Chưa tạo được hồ sơ học tập: '+profileCreateError.message);
        }
        setProfile(profileData as {display_name:string;grade:number|null;xp:number;streak_days:number}|null);
        setCompletedCount((progressResult.data||[]).filter(row=>row.status==='completed').length);
        setTotalLessons(lessonsResult.count||0);
      }
      setBusy(false);
    }
    void loadDashboard();
    return ()=>{activeRequest=false;};
  },[]);

  async function logout(){
    setSigningOut(true);
    const {error}=await supabase.auth.signOut();
    setSigningOut(false);
    if(error){setDashboardError('Không thể đăng xuất: '+error.message);return;}
    go('home');
  }

  const displayName=profile?.display_name||'nhà khám phá';
  const xp=profile?.xp||0;
  const streak=profile?.streak_days||0;
  const completion=totalLessons?Math.min(100,Math.round(completedCount/totalLessons*100)):0;

  return <div className="dashboard-page"><aside className="sidebar"><Brand onClick={()=>go('home')}/><div className="sidebar-label">KHÔNG GIAN HỌC TẬP</div>{[['⌂','Tổng quan'],['▦','Môn học'],['▤','Thư viện'],['✳','Luyện tập'],['♜','Thành tích']].map(([icon,label])=><button key={label} className={'nav-item '+(active===label?'active':'')} onClick={()=>{setActive(label);if(label==='Thư viện'||label==='Môn học')go('library');if(label==='Luyện tập')go('practice')}}><span>{icon}</span>{label}</button>)}<div className="sidebar-promo"><b>Mỗi ngày một chút,<br/>tiến bộ thật nhiều.</b><p>Học đều đặn để chạm đến mục tiêu của bạn.</p></div><button className="nav-item" onClick={()=>go('home')}>↩ Về trang chủ</button><button className="nav-item" onClick={()=>void logout()} disabled={signingOut}>{signingOut?'Đang đăng xuất…':'⇥ Đăng xuất'}</button></aside><main className="dashboard-main"><header className="dashboard-top"><div><span className="section-kicker">KHÔNG GIAN CỦA BẠN</span><h1>Chào {displayName}! ✦</h1><p>{profile?.grade ? 'Học sinh lớp ' + profile.grade + ' · ' : ''}Dữ liệu hiển thị lấy từ tài khoản PIXEL EDU của bạn.</p></div><button className="button button-primary" onClick={()=>go('practice')}>Bắt đầu luyện tập ↗</button></header>{dashboardError&&<div className="data-message" role="alert">{dashboardError}</div>}{busy&&<div className="data-message">Đang tải hồ sơ và tiến độ học tập…</div>}<div className="dashboard-stats"><article><span>✦</span><small>Tổng XP</small><b>{xp.toLocaleString('vi-VN')} <em>XP</em></b><p>{profile?'Theo hồ sơ của bạn':'Hồ sơ chưa được tạo'}</p></article><article><span>🔥</span><small>Chuỗi ngày học</small><b>{streak} ngày</b><p>Được lấy từ hồ sơ đã lưu</p></article><article><span>✓</span><small>Bài học hoàn thành</small><b>{completedCount} <em>/ {totalLessons}</em></b><div className="fake-progress"><i style={{width:completion+'%'}}/></div><p>{completion}% bài học đã hoàn thành</p></article></div><div className="dashboard-section-title"><div><span className="section-kicker">BẮT ĐẦU TỪ ĐÂU?</span><h2>Tiếp tục khám phá</h2></div><button className="text-action" onClick={()=>go('library')}>Mở thư viện →</button></div><div className="dashboard-lessons"><article><div className="subject-symbol violet">∑</div><div><small>Thư viện học tập</small><h3>Chọn bài học đã xuất bản</h3><p>Mở thư viện để xem nội dung đang có trên hệ thống.</p></div><button className="button button-outline" onClick={()=>go('library')}>Mở thư viện →</button></article><article><div className="subject-symbol blue">✓</div><div><small>Luyện tập</small><h3>Ôn lại kiến thức</h3><p>Phần chấm điểm và lưu kết quả đang được hoàn thiện.</p></div><button className="button button-outline" onClick={()=>go('practice')}>Luyện tập →</button></article></div><div className="dashboard-bottom"><div><span className="section-kicker">HÀNH TRÌNH HỌC TẬP</span><h2>Tiến bộ dựa trên dữ liệu thật.</h2><p>XP, chuỗi ngày và bài học hoàn thành sẽ cập nhật khi các thao tác học được lưu thành công.</p><button className="button button-primary" onClick={()=>go('library')}>Khám phá thư viện ↗</button></div><div className="dashboard-streak"><span>✦</span><b>{completion}%</b><small>hoàn thành bài học</small><div>{completedCount} / {totalLessons}</div></div></div><button className="dashboard-home-link" onClick={()=>go('home')}>← Quay về trang giới thiệu PIXEL EDU</button></main></div>
}

function readRoute(): Page {
  const route = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ['home','login','signup','dashboard','library','practice'].includes(route) ? route as Page : 'home';
}

export function App() {
  const [page,setPage] = useState<Page>(() => readRoute());
  const [authReady,setAuthReady] = useState(false);
  const [signedIn,setSignedIn] = useState(false);
  const go = (next:Page) => {
    const nextHash = next === 'home' ? '' : '#/' + next;
    window.history.pushState(null, '', window.location.pathname + window.location.search + nextHash);
    setPage(next);
    window.scrollTo({top:0,behavior:'smooth'});
  };

  useEffect(() => {
    const syncRoute = () => setPage(readRoute());
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!isSupabaseConfigured) {
      setAuthReady(true);
      return;
    }
    supabase.auth.getSession().then(({data}) => {
      if (!mounted) return;
      setSignedIn(Boolean(data.session));
      setAuthReady(true);
    }).catch(() => { if (mounted) setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event,session) => {
      setSignedIn(Boolean(session));
      setAuthReady(true);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!authReady || page !== 'dashboard' || signedIn) return;
    let mounted = true;
    supabase.auth.getSession().then(({data}) => {
      if (!mounted) return;
      if (data.session) {
        setSignedIn(true);
        return;
      }
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#/login');
      setPage('login');
    }).catch(() => {
      if (!mounted) return;
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#/login');
      setPage('login');
    });
    return () => { mounted = false; };
  }, [authReady,page,signedIn]);

  if (page==='login'||page==='signup') return <Auth mode={page} go={go}/>;
  if (page==='library'||page==='practice') return <Learning page={page} go={go}/>;
  if (page==='dashboard') {
    if (!authReady) return <div className="auth-loading">Đang kiểm tra phiên đăng nhập…</div>;
    if (!signedIn) return <Auth mode="login" go={go}/>;
    return <Dashboard go={go}/>;
  }
  return <Landing go={go}/>;
}
