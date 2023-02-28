const Blogs = require("../models/blogs");
const slugify = require("slugify");

const { v4: uuidv4 } = require("uuid");

//การสร้าง
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
  }
  //ตรวจสอบความถูกต้องของข้อมูล
  switch (true) {
    case !title:
      res.status(400).json({ error: "กรุณากรอกข้อมูลชื่อเรื่อง" });
      break;
    case !content:
      res.status(400).json({ error: "กรุณากรอกรายละเอียด" });
      break;
  }

  //การบันทึกข้อมูล
  Blogs.create({ title, content, author, slug }, (err, blogs) => {
    if (err) {
      res
        .status(400)
        .json({ error: "ชื่อนี้ได้ถูกใช้งานแล้ว กรุณาตั้งชื่อใหม่" });
    }
    res.json(blogs);
  });

  //   res.json({
  //     data: { title, content, author, slug },
  //   });
};

// ค้นหาข้อมูลทั้งหมด
exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((error, blogs) => {
    if (error) {
      console.log(error);
    }
    res.json(blogs);
    console.log("ทำการดึงข้อมูลเรียบร้อยแล้ว");
  });
};

// ค้นหาข้อมูลแค่ตัวเดี๋ยวโดยอ้างอิงจาก slug

exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((error, blog) => {
    if (error) {
      console.log(error);
    }
    res.json(blog);
    console.log("ทำการดึงข้อมูลเรียบร้อยแล้ว");
  });
};

//ลบข้อมูล ฝั่ง server
exports.deleteBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json({ message: "Delete Blog Success!!" });
  });
};

// update ข้อมูลฝั่ง Server
exports.updateBlog = (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;

  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((error, blog) => {
    if (error) console.log("เกิดข้อผิดพลาด" + err);
    res.json(blog);
  });
};
