/*
Problem: Longest Substring Without Repeating Characters

Problem Statement:
You are given a string `s`. Your task is to find the length of the longest contiguous substring that contains no repeating characters.

Constraints:
- The length of the string, `n`, is known.
- 0 <= n <= 50,000
- `s` consists of standard printable ASCII characters.
- Characters are case-sensitive.
- There is no specific ordering to the characters.

Examples:

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The longest substring without repeating characters is "abc", which has a length of 3.

Example 2:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Example 3:
Input: s = ""
Output: 0
*/

#include <iostream>
#include <string>

using namespace std;

int lengthOfLongestSubstring(string s) {
    // TODO: Write your logic here
    
    return 0;
}

int main() {
    // 🟢 [GREEN - CORRECT] Array initialization sahi hai
    char str[8] = {'a','b','c','a','b','c','b','b'};
    
    // 🟡 [YELLOW - SEMI GALAT] Logic wise kaam nahi aayega kyunki tu pura history yaad nahi rakh raha
    int cmp = 0;
    
    // 🟢 [GREEN - CORRECT]
    int max_len=0;

    // 🟢 [GREEN - CORRECT] Outer loop theek hai
    for(int i=0;i<8;i++){
        
        // 🔴 [RED - LOGICAL ERROR] Tu sirf current substring ke pehle char ko save kar raha hai. 
        // Aage aane wale characters ko isse compare karega toh duplicate detect nahi hoga!
        int cmp=str[i]; 
        
        // 🟢 [GREEN - CORRECT] Good, ab tu agle character se check kar raha hai
        for(int j=i+1;j<8;j++){   
            // 🟢 [GREEN - CORRECT]
            int temp=str[j];
            
            // 🟢 [GREEN - CORRECT] Length ka formula sahi hai
            int leng=j-i+1;
            
            if(leng>max_len){
                // 🔴 [RED - LOGICAL ERROR] Tu max_len ko update kar raha hai BINA confirm kiye ki string duplicate-free hai.
                // 🟠 [ORANGE - SYNTAX ERROR] (Note: Pura block galat jagah hai, par line me syntax galti nahi hai)
                // COMMENTED OUT: max_len=leng; 
            }
            
            // 🔴 [RED - LOGICAL ERROR] Tu naye char (temp) ko SIRF pehle char (cmp) se compare kar raha hai. 
            // Agar "abcb" me last ka 'b' aaya, toh wo 'a' se compare hoga aur match nahi karega, jabki usko array history me check hona chahiye tha.
            if(cmp==temp){
                // 🟡 [YELLOW - SEMI GALAT] Ye variables loop ke andar mar jayenge (scope). Inhe upar banana chahiye tha.
                int start=i; 
                int end=j;
                break;
            }
        } // 🟠 [ORANGE - SYNTAX ERROR] Missing closing brace for outer loop originally caused weird indent.
        
        // 🔴 [RED - LOGICAL ERROR] Ye cout outer loop ke ANDAR hai, toh loop jitni baar chalega, utni baar print karega. Isko loop ke bahar hona chahiye.
        // COMMENTED OUT: cout<<max_len;
        
        // 🟠 [ORANGE - SYNTAX ERROR] 'j' is undeclared here. 'j' sirf inner for-loop me zinda tha. Yaha aate hi 'j' gayab!
        // COMMENTED OUT: for(int a=i;a<j;a++) {cout<<str[a];}
    }
    
    return 0;
}
// 🟠 [ORANGE - SYNTAX ERROR] Ye extra bracket tha jo phaltu me laga hua tha (kyunki tune upar outer loop close nahi kiya tha original code me).
// COMMENTED OUT: }

/*
============================================================
  DRY-RUN FLOWCHART (How your code executes step-by-step)
  Example Array: {'a', 'b', 'c', 'b'}
============================================================

[START MAIN]
      |
      v
[max_len = 0]
      |
      v
Outer Loop (i=0):
[cmp = str[0] -> 'a']
      |
      v
Inner Loop (j=i -> j=0):
[temp = str[0] -> 'a']
      |
      v
[leng = 0 - 0 + 1 = 1]
      |
      v
[if (leng > max_len)] -> 1 > 0 (TRUE)
[max_len == leng] -> (TYPO: == assign nahi karta, max_len 0 hi rahega)
      |
      v
[if (cmp == temp)] -> 'a' == 'a' (TRUE)
      |
      +------> [start = 0, end = 0]
      |
      +------> [BREAK!] (Inner loop pehle hi letter par toot gaya)
      |
      v
(Exits inner loop immediately)
      |
      v
[cout << max_len] -> Prints '0'
      |
      v
[for (a=i; a<j; a++)] -> COMPILER ERROR! (kyunki 'j' inner loop me declare hua tha, yaha uski aukaat/scope khatam ho chuki hai)
      |
      v
Outer loop continues to i=1... (and same mistake happens again)

SUMMARY OF YOUR MISTAKES:
1. Inner loop aage badhne se pehle hi khud-ba-khud break ho jata hai kyunki tu pehle character ko usi same character se compare kar raha hai (j=0 par).
2. 'j' ka scope inner loop ke bahar nahi hai, toh use cout wale loop me use nahi kar sakte.
3. max_len==leng ek typo hai, isse variable update nahi hoga.
*/