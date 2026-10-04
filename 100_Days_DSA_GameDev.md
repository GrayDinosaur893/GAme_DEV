# 100 Days of Interview DSA x Game Dev 🎮💻

**Student:** GrayDinosaur893 (The Upcoming Game Dev & DSA Master)
**Teacher:** Antigravity AI (Tera personal mentor)
**Target:** 100 Sessions of mastering Interview-level DSA through Game Dev. 
*(RULE: Har session mein kam se kam ek Real 2D/3D Rendering (OpenGL/Raylib/SFML) aur UI Development ka topic zaroor hoga!)*

### 🗺️ Project Checkpoints (Milestones):
- **Session 10-20:** Build a **2D Paint App** 🎨 (Graphics rendering, UI Buttons, Mouse tracking).
- **Session 30-40:** Build an **Inventory & Crafting System UI** 🎒 (Linked Lists, Arrays, Drag-Drop).
- **Session 50-60:** Build a **2D Platformer Physics Engine** 🏃‍♂️ (Collision detection, Sliding Window).
- **Session 100:** A complete **Mini-RPG Game** ⚔️ combining all DSA concepts!
---

## Session 1: Array Fundamentals & Game Physics (Completed ✅)

### 🧠 Concepts Mastered Today:
1. **Nested Loops & History Tracking:** Sikha ki array mein `i` aur `j` pointers ko handle kaise karte hain, aur break conditions kab lagani chahiye.
2. **Variable Shadowing:** Sikha ki loop ke andar wapas `int` likhne se purana variable update nahi hota, naya ban jata hai (R_F wala bug fix!).
3. **Big-O Optimization (O(N^2) to O(N)):** "Buy & Sell Stock" ko 2-loop (brute-force) se hata kar 1-loop (optimal) mein convert kiya using `min_price_so_far`.
4. **Struct Arrays (Inventory Systems):** Linked List approach hata kar ek Card Deck (Array of Structs) banaya. Objects ki properties (`deck[i].damage`) access karna sikha.
5. **Real Game Simulation Mechanics:**
   - **Linear Falloff (AoE Splash Damage):** Distance aur radius ka use karke drop-off math sikha (`damage - (damage * (distance/radius))`). Polynomial logic ki galti ko correct kiya.
   - **Damage Over Time (DoT):** Multiplication vs Loop Tick simulation ka antar sikha, aur game engine logic banaya jo ticks ke hisaab se health minus karta hai.

### 📁 Files & Projects Created:
- `longest_substring.cpp` (Index tracking test)
- `buy_sell_stock.cpp` (Profit optimization)
- `two_sum.cpp` (Nested loop target matching)
- `game_dev_aoe.cpp` (Basic RPG AoE damage calculation)
- `advanced_spell_system.cpp` (Advanced Spell Cards, DoT, Splash Math)

### 🎯 Teacher's Note:
Bhai tera dimaag game logic mein bahut zabardast chalta hai. Math aur simulation ki understanding pehle din hi next level thi. Next session mein hum "Sliding Window" ya "Two Pointers" jaise tagde interview topics uthayenge aur unko game mechanics (jaise Hitbox ya Camera rendering) se jodenge! 

**Session 1 Status: Passed with Flying Colors!** 🔥
