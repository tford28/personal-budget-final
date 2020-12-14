const express = require("express");
const router = express.Router();
const Budget = require("../models/budget_schema");

router.get("/allBudgets", (req,res) => {
    Budget.find().then((result) => {
        if (!result){
            return res.status(404).json({Error:"Data not found"});
        }
        res.status(200).json(result);
    })
    .catch((e) => res.status(404).json({Error:"Data not found"}));
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Budget.findOne({ _id: id })
      .then((budget) => {
        if (!budget) {
          return res.status(404).json({ error: "there is no data" });
        }
        console.log(JSON.stringify(budget));
        return res.status(200).json(budget);
      }).catch((e) => res.status(404).json(e));
});

router.get("/username/:username", (req,res) => {
    const {username} = req.params;
    Budget.find({username: username}).then((budget) => {
        if (!budget){
            return res.status(404).json({error: "Theres no data."});
        }
        return res.status(200).json(budget)
    }).catch((e) => res.status(404).json(e));
});

router.post("/register", (req,res) => {
    const newBudget = new Budget({
        title: req.body.title,
        budget: req.body.budget,
        color: req.body.color,
        username: req.body.username,
    });
    newBudget.save().then((budget) => res.status(201).json(budget)).catch((err) => console.log(err));
});

router.delete("/delete/:id", (req,res) => {
    const {id} = req.params;
    Budget.remove({_id:id}).then((data) => res.status(200).json(data)).catch((e) => {
        console.log(e);
        res.status(404).json(e);
    });
});

router.put("/update/:id", (req,res) => {
    const {id} = req.params;
    Budget.updateOne(
        {_id:id},
        {
            $set:{
                title: req.body.title,
                budget: req.body.budget,
                color: req.body.color,
            }
        },
        (err) => {
            console.log(err);
        }
    ).then((data) => res.status(200).json(data)).catch((e) => res.status(404).json(e));
});

module.exports = router;
