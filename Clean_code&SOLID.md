# Clean code & SOLID principle
- Hiện từng code chỉ làm đúng việc theo tên.
- Code cho "trường hợp không tìm thấy user" lặp nhiều lần nên em đã viết thành 1 function riêng.
- Ở class rankService em viết thành 2 phần và nếu mốn trong tương lai có thêm rank thì sẽ sửa trực tiếp ở RANK_THRESHOLD. Ở phần này em nghĩ rằng không có vi phạm OCP do logic chính nằm ở function getRankFromScore.
- Hôm trước anh có nói về phần mật khẩu nên em có sửa lại r. Em viết function để xử lí riêng cái mật khẩu để cập nhật.