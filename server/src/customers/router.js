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
  const { name, birthday, gender, job } = req.body;
  try {
    const newCustomer = new Customer({ name, birthday, gender, job });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const id = req.body;
  try {
    const customer = await Customer.findById(id);
    await Customer.delete(customer);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
