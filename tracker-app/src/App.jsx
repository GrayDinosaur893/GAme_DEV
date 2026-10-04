import { useState, useEffect } from 'react'
import './App.css'
import EditorialHero from './EditorialHero'
import FrostOverlay from './FrostOverlay'
import GlassPressOverlay from './GlassPressOverlay'

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [glassOn, setGlassOn]     = useState(true);
  const [glassOpacity, setGlassOpacity] = useState(1);

  const [waterFaded, setWaterFaded] = useState(false);

  // Auto-fadeout: 10s after entering app, fade out the water drops
  useEffect(() => {
    if (showIntro) return; // Don't start timer during intro
    const fadeStart = setTimeout(() => {
      setWaterFaded(true); // Tell FrostOverlay to stop drawing drops
    }, 10000); 
    return () => clearTimeout(fadeStart);
  }, [showIntro]);

  const [adviceList, setAdviceList] = useState(() => {
    const saved = localStorage.getItem('ai-advice');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendance-streak');
    return saved ? JSON.parse(saved) : { streak: 0, lastDate: null };
  });

  // AI TEACHER UPDATES THIS VARIABLE AT THE END OF EVERY SESSION!
  const unlockedDay = 2;

  const [newAdvice, setNewAdvice] = useState('');
  
  const masterPrompt = `You are my personal DSA and Game Development Teacher. We are continuing our ongoing "100 Days of DSA x Game Dev" challenge. Do NOT start fresh. Check which day we are on, resume the story seamlessly, and continue our progress!

Follow these strict rules for our interaction:
1. Role & Tone: Speak in Hinglish. Use informal words ("bhai", "mast").
2. Teaching Methodology: ALWAYS wrap the DSA concept in a Game Development scenario.
3. Mandatory Rendering & UI Rule: Every single session MUST include at least one problem related to REAL 2D/3D Rendering (OpenGL, Raylib, SFML) and UI Development.
4. Feedback & Optimization Workflow: Congratulate me -> Optimize code -> Include Optimization Flowchart in comments.
5. Continuous Visible Growth: Introduce a new exciting mechanic or upgrade every session.
6. Syntax & Function Support: ALWAYS provide the necessary function names and boilerplates.
7. Session Summary: At the end of every session, provide a "Session Summary" block.
8. Workspace Organization (Crucial): Always create a new folder for the current session (e.g., "Session_02/") and put all new C++ files in it. Keep the root clean!
9. Level Unlocking (Crucial): The user CANNOT unlock levels manually. At the end of a successful session, you (the AI) MUST edit App.jsx to increment the "unlockedDay" variable to unlock the next level!
10. Storytelling Mode (Crucial): ALWAYS teach and frame problems in an immersive, RPG-style storytelling format. Treat the user as a hero on a quest, and the code as their spells/weapons. Build exactly one project per session based on the 100_Days_Quest_Log.md!
11. Save State (Crucial): Always read AI_Save_State.md at the start of a session to load context. At the end of every session, update it with what was accomplished and outline tomorrow's quest!`;

  useEffect(() => {
    localStorage.setItem('ai-advice', JSON.stringify(adviceList));
  }, [adviceList]);

  useEffect(() => {
    localStorage.setItem('attendance-streak', JSON.stringify(attendance));
  }, [attendance]);

  const markAttendance = () => {
    const today = new Date().toLocaleDateString();
    if (attendance.lastDate !== today) {
      setAttendance({
        streak: attendance.streak + 1,
        lastDate: today
      });
      alert('Attendance Marked for Today! 🔥 Keep the streak going!');
    } else {
      alert('You have already marked attendance for today!');
    }
  };

  const addAdvice = () => {
    if (newAdvice.trim()) {
      setAdviceList([{ id: Date.now(), text: newAdvice, date: new Date().toLocaleDateString() }, ...adviceList]);
      setNewAdvice('');
    }
  };

  // Generate 100 days
  const daysArray = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <>
      {/* 🎨 EDITORIAL HERO with Glass Fog + Rain */}
      {showIntro && <EditorialHero onEnter={() => setShowIntro(false)} />}

      {/* ❄️ RAIN ON GLASS OVERLAY — Water fades out after 10s, but blur remains */}
      {!showIntro && <FrostOverlay waterFaded={waterFaded} />}


      <div style={{ position: 'relative', zIndex: 100, maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 className="header-title">
        👾 DSA x Game Dev Hub 👾
      </h1>
      
      <div className="grid">
        {/* Left Column: Master Prompt & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="game-card">
            <h2 style={{ marginTop: 0 }}>📜 System Prompt</h2>
            <p>
              Equip this prompt before starting a new session!
            </p>
            <textarea 
              readOnly 
              value={masterPrompt} 
              style={{ height: '220px', resize: 'none' }}
            />
            <button className="btn-blue" onClick={() => navigator.clipboard.writeText(masterPrompt)}>
              🎮 COPY TO CLIPBOARD
            </button>
          </div>

          <div className="game-card">
            <h2 style={{ marginTop: 0 }}>🏆 Player Stats</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span className="badge" style={{ marginRight: '10px' }}>Level {unlockedDay}</span>
                <strong>Current Session:</strong> Day {unlockedDay}
              </div>
              <div>
                <span className="badge" style={{ marginRight: '10px' }}>Boss</span>
                <strong>Target:</strong> Day 100
              </div>
              <div>
                <span className="badge" style={{ marginRight: '10px' }}>Loot</span>
                <strong>Insights Saved:</strong> {adviceList.length}
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>🔥 Streak: {attendance.streak} Days</h3>
                <button className="btn-blue" onClick={markAttendance} style={{ width: '100%', fontSize: '0.9rem' }}>
                  📅 MARK ATTENDANCE
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Journal / Advice Tracker */}
        <div className="game-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginTop: 0 }}>🧠 Knowledge Inventory</h2>
          <p>
            Store your new tricks, tips, and AI advice here! (Saves locally)
          </p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
            <input 
              type="text" 
              placeholder="E.g., Raylib ClearBackground() is used to wipe frames..." 
              value={newAdvice}
              onChange={(e) => setNewAdvice(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAdvice()}
              style={{ marginBottom: 0 }}
            />
            <button className="btn-green" onClick={addAdvice}>➕ ADD</button>
          </div>

          <div style={{ marginTop: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {adviceList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', border: '2px dashed #2c2417', borderRadius: '8px' }}>
                <h3>Inventory Empty!</h3>
                <p>Loot some knowledge and add it here.</p>
              </div>
            ) : (
              adviceList.map((item) => (
                <div key={item.id} style={{ border: '2px solid #2c2417', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    📅 {item.date}
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{item.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Full Width: Projects You Made (Games Vault) */}
      <div className="game-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>🕹️ The Games Vault (Projects Made)</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Browsers cannot directly launch C++ .exe files for security reasons. Copy the launch command and paste it in your terminal!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ border: '2px solid #2c2417', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🔴 Raylib Bouncing Ball</h3>
            <span className="badge" style={{ marginBottom: '15px' }}>Day 1</span>
            <p style={{ fontSize: '0.9rem' }}>A 2D Physics ball bouncing off boundaries.</p>
            
            <button className="btn-blue" style={{ width: '100%', marginTop: '10px' }} onClick={async () => {
              try {
                const res = await fetch('http://localhost:3001/run-game?path=sesssion 1/raylib_intro.exe');
                const data = await res.json();
                if(!data.success) alert('Failed to launch: ' + data.error);
              } catch (e) {
                alert('Backend Launcher is not running! Make sure you started the app with "npm run dev".');
              }
            }}>
              🎮 LAUNCH GAME
            </button>
          </div>
        </div>
      </div>

      {/* Full Width: Aspirational Potential */}
      <div className="game-card" style={{ marginTop: '2rem', borderStyle: 'dashed' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>🔮 Future Potential (Upcoming Quests)</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          This is what you will be able to build very soon. Keep the streak alive!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ border: '2px dashed #2c2417', borderRadius: '8px', padding: '1.5rem', opacity: '0.6' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🐍 Snake Game 🔒</h3>
            <span className="badge" style={{ marginBottom: '15px' }}>Unlocks Day 6</span>
            <p style={{ fontSize: '0.9rem' }}>Mastering Queues, Deques, and Array Lookups.</p>
          </div>

          <div style={{ border: '2px dashed #2c2417', borderRadius: '8px', padding: '1.5rem', opacity: '0.6' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🐦 Flappy Bird 🔒</h3>
            <span className="badge" style={{ marginBottom: '15px' }}>Unlocks Day 9</span>
            <p style={{ fontSize: '0.9rem' }}>Mastering Velocity, Gravity, and Sliding Windows.</p>
          </div>

          <div style={{ border: '2px dashed #2c2417', borderRadius: '8px', padding: '1.5rem', opacity: '0.6' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🏰 Dungeon Crawler 🔒</h3>
            <span className="badge" style={{ marginBottom: '15px' }}>Unlocks Day 25</span>
            <p style={{ fontSize: '0.9rem' }}>Mastering BSP Trees, Graphs, and Pathfinding A*.</p>
          </div>

        </div>
      </div>

      {/* Full Width: 100 Days Grid */}
      <div className="game-card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginTop: 0, textAlign: 'center' }}>🗺️ The 100-Day Level Map</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Click on the currently active level to clear it and unlock the next!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
          {daysArray.map(day => {
            let status = 'locked';
            if (day < unlockedDay) status = 'completed';
            if (day === unlockedDay) status = 'active';

            let bgColor = '#cbd5e1'; // locked
            let textColor = '#64748b';
            let icon = '🔒';
            let cursor = 'not-allowed';

            if (status === 'completed') {
              bgColor = '#22c55e';
              textColor = '#fff';
              icon = '✅';
              cursor = 'default';
            } else if (status === 'active') {
              bgColor = '#fcd34d';
              textColor = '#92400e';
              icon = '🎮';
              cursor = 'pointer';
            }

            return (
              <div 
                key={day} 
                style={{
                  background: bgColor,
                  color: textColor,
                  border: '3px solid #0f172a',
                  borderRadius: '8px',
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: status === 'active' ? '0px 0px 15px rgba(252, 211, 77, 0.8)' : '3px 3px 0px #0f172a',
                  transform: status === 'active' ? 'scale(1.05)' : 'none',
                  cursor: cursor,
                  transition: 'all 0.2s',
                  userSelect: 'none'
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{icon}</div>
                Day {day}
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
