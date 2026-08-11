/*
1. NAVIGATE: Cần mở trang nào? 
   - Precondition không có
   - Mở 1 project bất kì trong trang: https://localhost:8443/blueway/designer/

2. FIND: Cần tìm element nào?
   Có 3 element cần verify: list item: tittle text, option 1&2 text

3. CHECK: Kiểm tra gì ở mỗi element?
    tittle to have text
    opt 1: toHaveText('Alle schließen')
    option 2: toHaveText('Alle schließen (außer Projektobjekte)')

4. ACT: Cần làm gì trước khi verify?
    - Mở URL Designer, wait
    - Login USERNAME, PASSWORD (.env)
    - wait
    - Mở Project bất kì, chưa có thì tạo mới
    - wait
    - Click button tabAction
    - wait
    - Check List item: tittle, option 1&2

5. VERIFY: Kết quả mong đợi là gì?
   Expected result nói gì?
    - Title: Close => Title in German: Schließen
    - Option 1: Close all => Title in German: Alle schließen
    - Option 2: Close all (except project objects) => Title in German: Alle schließen (außer Projektobjekte)

    */