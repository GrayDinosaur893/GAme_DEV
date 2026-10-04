/*
=========================================================
  GAME DEV x DSA: Area of Effect (AoE) Spell Damage
=========================================================
Scenario:
Tu ek RPG game (jaise Skyrim ya Witcher) bana raha hai. Ek kamre mein 
5 enemies hain, aur unki Health (HP) ek array mein di gayi hai.
Tera Player ke paas ek AoE (Area of Effect) aag ka spell hai jo poore 
kamre mein sab enemies ko ek saath damage deta hai. 
Player ye spell alag-alag damage power ke saath 3 baar cast karta hai.

Tujhe calculate karna hai ki saare spells lagne ke baad 
kamre mein total kitne enemies ZINDA (Alive) bache hain!

Example:
enemy_hp = {50, 100, 30, 20, 80}
spell_damages = {20, 40, 10}

Hint (Nested Loops):
1. Pehla (Outer) loop: 'spell_damages' array par chalega. (Har round ek spell fire hoga).
2. Dusra (Inner) loop: 'enemy_hp' par chalega, aur har enemy ki health se wo spell ka damage minus karega.
3. Game Logic Rule: Agar kisi enemy ki health 0 ya usse kam ho gayi hai (wo mar chuka hai), toh health ko minus mein mat chhodna, usko exactly 0 set kar dena taaki baad me calculation easy ho.
4. Dono loops ke baad: Ek naya loop laga aur check kar kitne enemies ki health > 0 hai. Wo tera answer hoga!
=========================================================
*/
#include <iostream>
using namespace std;

int main() {
    int enemy_hp[5] = {50, 100, 30, 20, 80};
    int num_enemies = 5;
    
    int spell_damages[3] = {20, 40, 10};
    int num_spells = 3;
    
    // TODO: Apna Game Logic yaha likh (Enemies ko damage de!)
    for(int i=0;i<num_spells;i++)
    {
        int damage_by_fireball=spell_damages[i];
        for(int j=0;j<num_enemies;j++)
        {
            enemy_hp[j]=enemy_hp[j]-damage_by_fireball;
        }
    }
    int alive_enemies=0;
    for(int i=0;i<num_enemies;i++)
    {
        if(enemy_hp[i]>0)
        {
            alive_enemies++;
        }
    }
    cout<<"Alive enemies:"<<alive_enemies<<endl;
    
    
    // Output me print karna kitne enemies Zinda hain aur unki remaining health kya hai.
    
    return 0;
}
