const Habit = require('../models/habit');

// fetch all habits and return to daily view
module.exports.home = async function (req, res) {
    try {
        const habitsList = await Habit.find({});

        return res.render('daily', {
            title: "Habit Tracker",
            habits_list: habitsList
        });
    } catch (err) {
        console.log('Error:', err);
    }
}

// render add habit page when add buttun is clicked
module.exports.addHabit = async function (req, res) {
    return res.render('add_habit', {
        title: 'Add Habit'
    });
}

// create a habit & render the updated daily view
module.exports.create = async function (req, res) {
    console.log(req.body);
    try {
        const habit = await Habit.create({
            description: req.body.description
        });

        return res.redirect('/');
    } catch (err) {
        console.log('Error:', err);
    }
}