/*
=========================================================
  GAME DEV x DSA: Console 2D Rendering Engine (Session 1 Finale)
=========================================================
SCENARIO:
Asli 2D games (jaise Mario ya Pokemon) mein graphics screen par 
Pixels ki ek Grid (2D Matrix) mein draw hote hain.
Console mein hum characters se apni game screen draw (render) karte hain!

Tera paas ek 5x5 ka 2D Array/Grid (Screen) hai. 
Tujhe screen par ek Player 'P' aur ek Enemy 'E' render karna hai.

Coordinates (Zero-indexed, yani 0 se 4 tak):
Player = Row 2, Col 2 (Screen ke theek beech mein)
Enemy = Row 4, Col 4 (Screen ke ekdum kone mein)
Baaki poori zameen = '.' (Khaali tile)

Tera Kaam:
1. Ek Nested Loop bana (i = rows ke liye, j = columns ke liye).
2. Agar current (i, j) Player ka coordinate hai, toh 'P ' print kar.
3. Agar current (i, j) Enemy ka coordinate hai, toh 'E ' print kar.
4. Warna (else) khaali zameen '. ' print kar.
5. Har row (andar wala loop) khatam hone ke baad ek line break (endl) dena zaroori hai!
=========================================================
*/
#include <iostream>
using namespace std;

int main() {
    int n = 5;
    
    int player_row = 2, player_col = 2;
    int enemy_row = 4, enemy_col = 4;
    
    // TODO: Nested loops lagakar Screen Render kar!
    for(int i=0;i<n;i++)
    {
      for(int j=0;j<n;j++)
      {
        if(player_row==i && player_col==j)
        {
          cout<<"P ";
        }
        else if(enemy_row==i && enemy_col==j)
        {
          cout<<"E ";
        }
        else
        {
          cout<<". ";
        }
      }
      cout<<endl;
    }
    
    
    return 0;
}
