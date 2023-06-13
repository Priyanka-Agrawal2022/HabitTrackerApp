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

// fetch a habit using id
module.exports.getHabit = async function(req, res) {
    try {
        const habitId = req.query.id;
        const habit = await Habit.findById(habitId);

        return res.status(200).json({habit: habit});
    } catch (error) {
        console.log('Error:', err);
    }
}

// render the weekly view
module.exports.weekly = async function(req, res) {
    try {
        // send date array
        let date = new Date();
        let days = [];

        for(let i=0; i<7; i++) {
            let d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            
            // decrease date by 1
            date.setDate(date.getDate() - 1);

            days.push(d);
        }

        // reverse days array for desired order
        days.reverse();

        const habitsList = await Habit.find({});

        return res.render('weekly', {
            title: "Habit Tracker",
            habits_list: habitsList,
            days: days
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
        await Habit.create({
            description: req.body.description,
            days: ['none', 'none', 'none', 'none', 'none', 'none', 'none']
        });

        let view = req.body.hidden;

        return res.redirect(view);
    } catch (err) {
        console.log('Error:', err);
    }
}

// delete a habit & redirect to daily view
module.exports.delete = async function(req, res) {
    try {
        const habitId = req.query.id;

        await Habit.findByIdAndDelete(habitId);

        return res.redirect('back');

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

// update status
module.exports.updateWeeklyStatus = async function (req, res) {
    try {
        const habitId = req.query.id;
        const habitStatus = req.query.status;
        const day = req.query.day;

        // const habit = await Habit.findByIdAndUpdate(habitId,{
        //     status: habitStatus
        // }, {
        //     new: true
        // });

        const habit = await Habit.findById(habitId);

        habit.status = habitStatus;
        habit.days[day] = habitStatus;
        habit.save();
        
        return res.status(200).json({habit: habit});  
    } catch (err) {
        console.log('Error:', err);
    }
}

module.exports.update = async function (req, res) {
    try {
        const habitId = req.query.id;
        
        await Habit.findByIdAndUpdate(habitId,{
            description: req.body.description
        }, {
            new: true
        });
        
        return res.redirect('back');  
    } catch (err) {
        console.log('Error:', err);
    }
}