/*
=========================================================
  GAME DEV x DSA: Spell Cards System (Struct Arrays)
=========================================================
SCENARIO:
Tu ek card game bana raha hai. Ek 'Spell Card' ek aisi cheez (struct)
hai jisme 3 baatein likhi hain:
1. Name (string) - Spell ka naam (e.g. "Fireball")
2. Damage (int) - Base damage kitna dega
3. Type (string) - "Static" ya "Splash"

Tera player aise bohot saare cards apne haath mein (Array mein)
rakhta hai. 

RULE:
- Ek enemy tujhse kuch 'distance' ki doori par khada hai. (e.g., distance = 5)
- Agar card ka Type "Static" hai: Toh enemy ko pura base damage lagega (No change).
- Agar card ka Type "Splash" hai: Toh damage distance ke hisaab se kam ho jayega.
  (Rule: Effective Damage = Base Damage - distance). 
  (Note: Damage negative nahi ho sakta, agar minus me jaye toh usko 0 kar dena).

Tera Kaam:
Apne Cards ke Array ko (loop lagakar) traverse kar aur check kar ki
enemy ko har card (spell) se kitna 'Effective Damage' laga, aur print kar.
=========================================================
*/
#include <iostream>
#include <string>
using namespace std;

// Tera Card Structure
struct SpellCard {
    string name;
    float damage;
    int radius;
    int duration; // 🔴 Naya Feature: Kitne seconds tak damage dega?
};

int main() {
    int enemy_distance = 5;
    int num_cards = 3;
    
    // Array of Cards (Structures)
    SpellCard deck[3] = {
        {"Lightning", 50, 2, 1},  // Instant spell (1 sec)
        {"Fireball", 40, 10, 1},  // Instant spell (1 sec)
        {"Poison ", 3, 30, 5}     // DoT spell: 5 seconds tak lagega!
    };
    
    float pi=3.14;
    float enemy_health=100;
    cout<<"enemy health: "<<enemy_health<<endl;
    
    for(int i=0;i<num_cards;i++){
        float effective_damage = 0;
        
        // 1. Agar enemy blast radius ke bahar hai
        if(enemy_distance > deck[i].radius) {
            effective_damage = 0;
        } 
        else {
            // 2. Linear Falloff
            float drop_factor = (float)enemy_distance / deck[i].radius;
            effective_damage = deck[i].damage - (deck[i].damage * drop_factor);
        }
        
        if(effective_damage < 0) {
            effective_damage = 0;
        }
        
        cout << "\n>>> Casting " << deck[i].name << " (Duration: " << deck[i].duration << " sec) <<<" << endl;
        
        if (effective_damage > 0) {
            // 🔴 NAYA LOGIC: Damage Over Time (DoT) ka loop
            for(int t = 1; t <= deck[i].duration; t++) {
                enemy_health = enemy_health - effective_damage;
                cout << "Tick " << t << " \tdelivered ||\t" << effective_damage << " damage \tRemaining Health: " << enemy_health<<"||" << endl;
            }
        } else {
            cout << "Missed! Enemy out of range. \tRemaining Health: " << enemy_health << "||" << endl;
        }
     }

    
    // TODO: Yaha se apna logic likh!
    // Hint: Ek for-loop laga (i = 0 se num_cards tak).
    // Har baar deck[i].type check kar aur effective damage calculate kar.
    
    
    
    return 0;
}
