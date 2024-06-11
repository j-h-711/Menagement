const express = require("express");
const router = express.Router();
const Customer = require("./model/customer.schema");

// 회원 전체 정보 조회
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 신규 고객 추가
router.post("/add", async (req, res) => {
  const { name, birthday, gender, job, phone, address, etc } = req.body;
  try {
    const newCustomer = new Customer({
      name,
      birthday,
      gender,
      job,
      phone,
      address,
      etc,
    });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 고객 정보 업데이트
router.patch("/patch/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 고객 삭제
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const customer = await Customer.findByIdAndDelete(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
