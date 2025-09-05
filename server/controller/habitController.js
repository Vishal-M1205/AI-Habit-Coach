
import Habit from '../models/habitModel.js';
export async function addHabit(req, res) {
  const userId = req.user?.id;  // get from auth middleware
  if (!userId) {
    return res.json({ success: false, message: "User ID is required" });
  }

  try {
    const { title, description, frequency } = req.body;

    if (!title || !frequency) {
      return res.json({ success: false, message: "Title and frequency are required" });
    }

    const newHabit = {
      userId,
      title,
      description,
      frequency
    };

    const habit = await Habit.create(newHabit);

    res.json({ success: true, habit });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export async function getHabits(req, res) {
  const userId = req.user?.id;  // ✅ use req.user.id from auth middleware
  if (!userId) {
    return res.json({ success: false, message: "User ID is required" });
  }

  try {
    const habits = await Habit.find({ userId });
    res.json({ success: true, habits });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export async function updateHabit(req,res) {
    const userId = req.user?.id;
    if(!userId){
        res.json({ success: false, message: "User ID is required" });
    }
    try {
        const id = req.params.id;
          const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ success: false, message: "Habit not found" });

    if (habit.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    const result = await Habit.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, habit: result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    
}

export async function deleteHabit(req,res) {
    const userId = req.user?.id;
    if(!userId){
        res.json({ success: false, message: "User ID is required" });
    }
    try {
        const id = req.params.id;
        const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ success: false, message: "Habit not found" });

    if (habit.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    const result = await Habit.findByIdAndDelete(id);
    res.json({ success: true, habit: result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}

export async function completeHabit(req, res) {
  const userId = req.user?.id;  // ✅ get from token
  const { habitId } = req.body;

  if (!userId || !habitId) {
    return res.json({ success: false, message: "User ID and Habit ID required" });
  }

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ success: false, message: "Habit not found" });
    }

    if (habit.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If already completed today, skip
    const alreadyDone = habit.completionDates.some(
      d => new Date(d).setHours(0, 0, 0, 0) === today.getTime()
    );
    if (alreadyDone) {
      return res.json({ success: false, message: "Already completed today" });
    }

    // Push today's completion
    habit.completionDates.push(new Date());

    // Streak logic
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const hadYesterday = habit.completionDates.some(
      d => new Date(d).setHours(0, 0, 0, 0) === yesterday.getTime()
    );

    habit.streak = hadYesterday ? habit.streak + 1 : 1;
    habit.completed = true; // quick check

    await habit.save();

    res.json({ success: true, habit });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export async function getDashboardStats(req, res) {
  const userId = req.user?.id; // from middleware
  if (!userId) {
    return res.json({ success: false, message: "User ID required" });
  }

  try {
    const habits = await Habit.find({ userId });

    if (!habits.length) {
      return res.json({ 
        success: true, 
        stats: { totalDays: 0, today: "0/0", weekProgress: "0%" } 
      });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 6);

    let uniqueDays = new Set();
    let todayCompleted = 0;
    let todayTotal = habits.length;
    let weekCompleted = 0;
    let weekTotal = habits.length * 7;

    habits.forEach(habit => {
      habit.completionDates.forEach(d => {
        const day = new Date(d).setHours(0, 0, 0, 0);
        if (day >= weekAgo.getTime() && day <= today) {
          weekCompleted++;
        }
        uniqueDays.add(day);
      });

      if (habit.completionDates.some(d => new Date(d).setHours(0, 0, 0, 0) === today)) {
        todayCompleted++;
      }
    });

    const totalDays = uniqueDays.size;
    const weekProgress = ((weekCompleted / weekTotal) * 100).toFixed(0);

    res.json({
      success: true,
      stats: {
        totalDays,
        today: `${todayCompleted}/${todayTotal}`,
        weekProgress: `${weekProgress}%`
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
