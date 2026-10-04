/*
=========================================================
  PROBLEM: Maximum Profit (Buy and Sell Stock)
=========================================================
Maan le tu ek trader hai. Tere paas jo array hai 'prices',
wo agle 6 din tak ek stock (share) ka price bata raha hai:
prices = {7, 1, 5, 3, 6, 4}
- Day 0: ₹7
- Day 1: ₹1
- Day 2: ₹5
- Day 3: ₹3
- Day 4: ₹6
- Day 5: ₹4

TERA TARGET:
Tujhe life mein sirf ek baar kharidna hai aur ek baar bechna hai
taaki Profit sabse zyada ho.
(Profit = Bechne ka Price - Kharidne ka Price)

RULE (Time Travel nahi kar sakta):
Jis din kharida (i), tu sirf uske aage aane wale din (j > i) 
par hi bech sakta hai.

EXAMPLE SE SAMAJH:
Agar Day 1 (₹1) ko kharida, toh uske aage check kar:
- Day 2 ko becha (₹5) -> Profit = 4
- Day 3 ko becha (₹3) -> Profit = 2
- Day 4 ko becha (₹6) -> Profit = 5 (Max Profit!)
- Day 5 ko becha (₹4) -> Profit = 3

Agar prices lagaatar gir rahi hain (jaise 7, 6, 4, 3, 1) toh 
profit nahi banega, isliye return 0 karna hai.

TERA LOGIC KAISE CHALEGA:
1. Outer loop (i) ek number ko pakdega (Buy price).
2. Inner loop (j = i+1) uske aage ke saare numbers ko check karega (Sell price).
3. Profit nikal (prices[j] - prices[i]).
4. Agar ye profit purane max_profit se bada hai, toh update kar de.
=========================================================
*/

#include <iostream>
using namespace std;

int main() {
    int prices[6] = {7, 1, 5, 3, 6, 4};
    int n = 6;
    
    // ==========================================
    // OPTIMIZED APPROACH (O(N) - Sirf 1 Loop)
    // ==========================================
    
    // Hum pehle din ke price ko sabse sasta maan lete hain.
    int min_price = prices[0]; 
    int max_profit = 0;
    
    for(int i = 0; i < n; i++) {
        
        // Agar aaj ki price pichli sabse sasti price se bhi sasti hai,
        // toh hum naya 'min_price' set kar lenge.
        if (prices[i] < min_price) {
            min_price = prices[i];
        } 
        // Warna, agar aaj ki price minus sabse sasta price > pichla max_profit hai,
        // toh max_profit update kar do.
        else {
            int current_profit = prices[i] - min_price;
            if (current_profit > max_profit) {
                max_profit = current_profit;
            }
        }
    }

    cout << "Maximum Profit: " << max_profit << endl;
    return 0;
}

/*
============================================================
  OPTIMIZATION FLOWCHART (How the Single Loop works)
============================================================
Concept: 
Bhai, tujhe do loop (O(N^2)) ki zaroorat nahi hai. 
Jab tu array mein aage badhta hai, toh tujhe sirf DO baatein yaad rakhni hain:
1. Piche ab tak sabse sasta stock kab mila tha? (min_price)
2. Agar main aaj bechu (aaj ka price - min_price), toh kya profit pichle wale profit se bada hai? (max_profit)

Example: {7, 1, 5, 3, 6, 4}

[START]
min_price = 7
max_profit = 0

Day 0 (price 7):
- Kya 7 < 7? No.
- Profit = 7 - 7 = 0. max_profit = 0.

Day 1 (price 1):
- Kya 1 < 7? YES!
- Naya min_price = 1 ban gaya! (Ab aage calculation hamesha 1 se hogi)

Day 2 (price 5):
- Kya 5 < 1? No.
- Profit = 5 - 1 = 4. 
- 4 > 0, isliye max_profit = 4 ho gaya.

Day 3 (price 3):
- Kya 3 < 1? No.
- Profit = 3 - 1 = 2.
- 2 > 4 nahi hai. max_profit = 4 hi rahega.

Day 4 (price 6):
- Kya 6 < 1? No.
- Profit = 6 - 1 = 5.
- 5 > 4, isliye max_profit = 5 ho gaya. (Sabse bada profit!)

Day 5 (price 4):
- Kya 4 < 1? No.
- Profit = 4 - 1 = 3.
- 3 > 5 nahi hai. max_profit 5 hi rahega.

[END LOOP]
Result: Maximum Profit = 5

Fayda kya hua?
Pehle tu 6x6 = 36 baar loop chala raha tha.
Ab tune sirf 6 baar mein answer nikal liya! Bade data me iska bahut fark padta hai.
============================================================
*/