/*
=========================================================
  PROBLEM: Target Sum (Two Sum)
=========================================================
Tumhe ek array diya gaya hai aur ek 'target' number diya gaya hai.
Tujhe array me se aise DO numbers dhoondhne hain jinka sum 
(addition) us 'target' ke barabar ho.

Example 1:
nums = {2, 7, 11, 15}, target = 9
Output: "Numbers are 2 and 7" (Kyunki 2 + 7 = 9)

Example 2:
nums = {3, 2, 4}, target = 6
Output: "Numbers are 2 and 4" (Kyunki 2 + 4 = 6)

Constraint:
- Har array me sirf ek hi aisi jodi (pair) hogi jo target banayegi.
- Tu ek hi index ke number ko do baar use nahi kar sakta (matlab agar 3 hai toh 3+3=6 nahi kar sakta agar array me ek hi baar 3 hai).
- Hint: Isme bhi 2 loop lagenge. Pehla loop ek number pakdega, dusra loop bache hue numbers me uski jodi dhoondhega.
=========================================================
*/
#include <iostream>
using namespace std;

int main() {
    int nums[4] = {2, 7, 11, 15};
    int n = 4;
    int target = 9;
    
    // TODO: Apna 2 loop wala logic yaha laga.
    // Jab target ban jaye, tab cout se numbers print kar dena.
    for(int i=0;i<n;i++)
    {
        for(int j=i+1;j<n;j++)
        {
            if(nums[i]+nums[j]==target)
            {
                cout<<"Numbers are "<<nums[i]<<" and "<<nums[j]<<endl;
            }    
        }
    }
    
    
    return 0;
}
