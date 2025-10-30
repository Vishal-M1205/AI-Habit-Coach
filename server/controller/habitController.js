
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
  const userId = req.user?.id; // from auth middleware
  if (!userId) {
    return res.json({ success: false, message: "User ID is required" });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habits = await Habit.find({ userId });

    // Add 'completed' field dynamically based on today's date
    const enrichedHabits = habits.map(habit => {
      const completedToday = habit.completionDates.some(
        d => new Date(d).setHours(0, 0, 0, 0) === today.getTime()
      );
      return { ...habit.toObject(), completed: completedToday };
    });

    res.json({ success: true, habits: enrichedHabits });
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
  const userId = req.user?.id;  // get from token
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

    // Check if already completed today
    const alreadyDone = habit.completionDates.some(
      d => new Date(d).setHours(0, 0, 0, 0) === today.getTime()
    );
    if (alreadyDone) {
      return res.json({ success: false, message: "Already completed today" });
    }

    // Add today's completion
    habit.completionDates.push(new Date());

    // Update streak
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const hadYesterday = habit.completionDates.some(
      d => new Date(d).setHours(0, 0, 0, 0) === yesterday.getTime()
    );

    habit.streak = hadYesterday ? habit.streak + 1 : 1;

    // ✅ Removed habit.completed entirely

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




export const chart = async (req, res) => {
  try {
    const userId = req.user?.id; 

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const habits = await Habit.find({ userId });

    // Collect all completion dates
    const progressMap = {};

    habits.forEach((habit) => {
      habit.completionDates.forEach((date, idx) => {
        const d = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
        if (!progressMap[d]) progressMap[d] = [];
        // Calculate habit's progress percentage on that day
        const progress = Math.min(((idx + 1) / habit.completionDates.length) * 100, 100);
        progressMap[d].push(progress);
      });
    });

    // Average progress per day across all habits
    const overallChart = Object.entries(progressMap).map(([date, progresses]) => {
      const avgProgress = progresses.reduce((a, b) => a + b, 0) / progresses.length;
      return { date, progress: Math.round(avgProgress) };
    });

    // Sort by date
    overallChart.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ success: true, overall: overallChart });
  } catch (error) {
    console.error("Error fetching overall progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export async function getHabitStats(req, res) {
  const userId = req.user?.id;
  if (!userId) {
    return res.json({ success: false, message: "User ID required" });
  }

  try {
    const habits = await Habit.find({ userId });

    if (!habits.length) {
      return res.json({
        success: true,
        stats: { currentStreak: 0, totalCompleted: 0, successRate: "0%" }
      });
    }

    // ---- Total Completed ----
    let totalCompleted = 0;
    habits.forEach(habit => {
      totalCompleted += habit.completionDates.length;
    });

    // ---- Current Streak ----
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streakDay = new Date(today);

    while (true) {
      const dayCompleted = habits.every(habit =>
        habit.completionDates.some(
          d => new Date(d).setHours(0, 0, 0, 0) === streakDay.getTime()
        )
      );

      if (dayCompleted) {
        currentStreak++;
        streakDay.setDate(streakDay.getDate() - 1); // check previous day
      } else {
        break;
      }
    }

    // ---- Success Rate ----
    // success rate = (completed days / total possible days * habits) * 100
    const firstHabitDate = new Date(
      Math.min(...habits.map(h => h.createdAt.getTime()))
    );
    const totalDays =
      Math.floor((today.getTime() - firstHabitDate.getTime()) / (1000 * 60 * 60 * 24)) +
      1;

    const totalPossible = totalDays * habits.length;
    const successRate =
      totalPossible > 0
        ? ((totalCompleted / totalPossible) * 100).toFixed(1) + "%"
        : "0%";

    res.json({
      success: true,
      stats: {
        currentStreak,
        totalCompleted,
        successRate
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}



