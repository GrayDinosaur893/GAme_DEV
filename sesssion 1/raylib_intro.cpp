/*
=========================================================
  GAME DEV x DSA: Intro to Raylib (Bouncing Ball Collision)
=========================================================
SCENARIO:
Kyunki Raylib tere liye naya hai, main tujhe pehle basic functions bata du:
- InitWindow(width, height, title) : Ye game ki asli window kholta hai.
- WindowShouldClose() : Jab tak tu 'X' ya ESC na dabaye, ye false rehta hai. Isse hamara main "Game Loop" chalta hai (jaise har game me hota hai).
- BeginDrawing() aur EndDrawing() : Graphics draw karne ka saara code IN dono functions ke beech hi likha jata hai!
- ClearBackground(color) : Har frame pe purani screen mitane ke liye.
- DrawCircle(x, y, radius, color) : Ek gol ball draw karta hai.

Tera Kaam:
Window 800x450 size ki hai.
Ball har frame (1/60th of a second) me 'speedX' aur 'speedY' se aage badh rahi hai.
Tujhe 'If' conditions lagakar ek logic likhna hai ki jab bhi ball DEEWAR (Wall) se takraye, toh wo BAHAAR na jaye, balki wapas (BOUNCE) aa jaye!

Hint (1D Boundary Collision): 
- Agar `ballX` screen ke right edge (800) ko cross kare, YA left edge (0) ke piche jaye, toh `speedX` ko reverse kar de (yani `speedX = speedX * -1`).
- Same yahi cheez `ballY` ke sath kar (height 450 hai).
=========================================================
*/
#include "raylib.h"

int main(void)
{
    // Screen setup
    const int screenWidth = 800;
    const int screenHeight = 450;
    InitWindow(screenWidth, screenHeight, "Mera Pehla Raylib Game");
    SetTargetFPS(60); // Game 60 frames per second pe chalegi!

    // Ball ke variables (State tracking)
    int ballX = screenWidth / 2; // Screen ke center me
    int ballY = screenHeight / 2;
    int speedX = 5;
    int speedY = 5;

    // Main Game Loop (Har frame me ek baar chalta hai)
    while (!WindowShouldClose())
    {
        // 1. UPDATE LOGIC (Physics)
        ballX = ballX + speedX;
        ballY = ballY + speedY;

        // TODO: Yaha par apni "Collision Detection" (Deewar se takraav) ka logic likh!
        if(ballX<=0 || ballX>=screenWidth)
        {
         speedX=-1*speedX;
        }
        if(ballY<=0 || ballY>=screenHeight)
        {
         speedY=-1*speedY;
        }
        // Agar boundary cross ho toh speedX aur speedY ko reverse kar dena.
        
        
        
        // 2. RENDERING LOGIC (Draw karna)
        BeginDrawing();
            ClearBackground(RAYWHITE); // Pehle screen saaf kar do
            
            // Phir Ball draw karo (X, Y, Radius, Color)
            DrawCircle(ballX, ballY, 20, MAROON); 
            
        EndDrawing();
    }

    // Game band hone pe window close kar do
    CloseWindow();
    return 0;
}
