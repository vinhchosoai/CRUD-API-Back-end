# Chọn database

Em nghĩ là dùng SQL vì này là project thiết kế CRUD, nên cần đảm bảo được tính toàn vẹn của data.
Nếu sử dụng NoSQL thì sẽ linh hoạt và nhanh hơn nhưng đây là API dùng để quản lý người dùng nên cần bảo đảm toàn vẹn và ổn định cho data.

# Flow 
Request từ client sẽ đi theo thứ tự sau :
1. Route : định nghĩa URL & phương thức HTTP và chỉ định controller nào xử lí request.
2. Middleware : Kiểm tra tính hợp lệ của request , nếu sai thì trả luôn.
3. Controller : lọc lấy dữ liệu và gửi cho service.
4. Service : xử lí logic từ request và gọi prisma để làm việc với db.
5. Prisma : thực hiện truy vấn từ db.

# Handle lỗi
Em dùng 1 file middleware để tập trung các lỗi . Khi mà có lỗi ở service hoặc controller thì sẽ được chuyển thẳng tới middleware mà k cần qua các middleware thông thường.
*Ưu điểm:*
 * Controller sạch
 * Dễ quản lý lỗi
 * Thống nhất các lỗi đều được trả về dưới dạng json ("error:...", "message:...") 
