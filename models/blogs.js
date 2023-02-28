const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: String,
      default: "Admin", //เฉพาะแอดมินเท่านั้น
    },
    slug: {
      type: String,
      lowercase: true, // หากมีการพิมพ์ภาษาอังกฤษไม่ว่าจะพิมพ์ใหญ๋หรือเล็กก็จะทำให้เป็นตัวพิมพ์เล็กทั้งหมด
      unique: true, // ห้ามตั้งชื่อซ้ำกัน
    },
  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = mongoose.model("Blogs", blogSchema);
