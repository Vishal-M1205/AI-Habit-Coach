
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
    const todayDate = new Date(today);
    const weekAgoDate = new Date(today);
    weekAgoDate.setDate(weekAgoDate.getDate() - 6);

    let uniqueDays = new Set();
    let todayCompleted = 0;
    let todayTotal = habits.length;
    let weekCompleted = 0;
    let weekTotal = 0;

    habits.forEach(habit => {
      const habitCreatedDate = new Date(habit.createdAt).setHours(0, 0, 0, 0);

      // Calculate how many days this habit existed in the last week
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekAgoDate);
        day.setDate(day.getDate() + i);
        if (day.getTime() >= habitCreatedDate) {
          weekTotal++;
        }
      }

      habit.completionDates.forEach(d => {
        const day = new Date(d).setHours(0, 0, 0, 0);
        if (day >= weekAgoDate.getTime() && day <= today) {
          weekCompleted++;
        }
        uniqueDays.add(day);
      });

      if (habit.completionDates.some(d => new Date(d).setHours(0, 0, 0, 0) === today)) {
        todayCompleted++;
      }
    });

    const totalDays = uniqueDays.size;
    const weekProgress = weekTotal > 0 ? ((weekCompleted / weekTotal) * 100).toFixed(0) : 0;

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

    if (!habits.length) {
      return res.json({ success: true, overall: [] });
    }

    const dailyData = {};

    habits.forEach((habit) => {
      const habitCreatedDate = new Date(habit.createdAt);
      habitCreatedDate.setUTCHours(0, 0, 0, 0);

      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      // For each day the habit existed, increment the total possible for that day
      for (let d = new Date(habitCreatedDate); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        if (!dailyData[dateStr]) {
          dailyData[dateStr] = { completed: 0, total: 0 };
        }
        dailyData[dateStr].total++;
      }

      // For each completion, increment the completed count for that day
      habit.completionDates.forEach((date) => {
        const completionDate = new Date(date);
        const dateStr = completionDate.toISOString().split("T")[0];
        if (dailyData[dateStr]) {
          dailyData[dateStr].completed++;
        }
      });
    });

    // Format for chart
    const overallChart = Object.entries(dailyData).map(([date, data]) => {
      const percentage = data.total > 0 ? (data.completed / data.total) * 100 : 0;
      let level = 0;
      if (percentage > 0 && percentage < 34) level = 1;
      else if (percentage >= 34 && percentage < 67) level = 2;
      else if (percentage >= 67 && percentage < 100) level = 3;
      else if (percentage === 100) level = 4;

      return { 
        date, 
        count: data.completed, // How many habits were completed
        level // The intensity level for the heatmap
      };
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

    // ---- Best Streak (among all habits) ----
    const bestStreak = Math.max(0, ...habits.map(h => h.streak));

    // ---- Success Rate ----
    const today = new Date().setHours(0, 0, 0, 0);
    let totalPossible = 0;

    habits.forEach(habit => {
        const habitCreatedDate = new Date(habit.createdAt).setHours(0, 0, 0, 0);
        if (habitCreatedDate <= today) {
            const daysSinceCreation = 
                Math.floor((today - habitCreatedDate) / (1000 * 60 * 60 * 24)) + 1;
            totalPossible += daysSinceCreation;
        }
    });

    const successRate =
      totalPossible > 0
        ? ((totalCompleted / totalPossible) * 100).toFixed(0) + "%"
        : "0%";

    res.json({
      success: true,
      stats: {
        currentStreak: bestStreak, // Changed from a "perfect" streak to the best individual streak
        totalCompleted,
        successRate
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
