const Habit = require('../models/habit');

// fetch all habits and return to daily view
module.exports.daily = async function (req, res) {
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

// render the weekly view
module.exports.weekly = async function(req, res) {
    try {
        return res.render('weekly', {
            title: "Habit Tracker",
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
    try {
        const habit = await Habit.create({
            description: req.body.description
        });

        return res.redirect('/');
    } catch (err) {
        console.log('Error:', err);
    }
}

// delete a habit & redirect to daily view
module.exports.delete = async function(req, res) {
    try {
        const habitId = req.query.id;

        await Habit.findByIdAndDelete(habitId);

        return res.redirect('/');

    } catch (err) {
        console.log('Error:', err);
    }
}

// update status
module.exports.updateStatus = async function (req, res) {
    try {
        const habitId = req.query.id;
        const habitStatus = req.query.status;
        const habit = await Habit.findByIdAndUpdate(habitId,{
            status: habitStatus
        }, {
            new: true
        });
        
        return res.status(200).json({habit: habit});
        
    } catch (err) {
        console.log('Error:', err);
    }
}

module.exports.update = async function (req, res) {
    try {
        const habitId = req.query.id;
        const habit = await Habit.findByIdAndUpdate(habitId,{
            description: req.body.description
        }, {
            new: true
        });

        console.log(habit);
        
        return res.redirect('back');
        
    } catch (err) {
        console.log('Error:', err);
    }
}