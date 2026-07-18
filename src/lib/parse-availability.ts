// lib/parse-availability.ts
const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ParsedAvailability {
  allowedDays: number[]; // 0=Sun ... 6=Sat
  startMinutes: number;
  endMinutes: number;
}

const parseTimeToMinutes = (time: string): number => {
  const match = time.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  const [, hourStr, minStr, meridian] = match;
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minStr, 10);
  if (meridian.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};

export const parseAvailability = (availability: string): ParsedAvailability | null => {
  try {
    const [daysPart, timePart] = availability.split(",").map((s) => s.trim());
    const [startDay, endDay] = daysPart.split("-").map((s) => s.trim());
    const [startTime, endTime] = timePart.split("-").map((s) => s.trim());

    const startIdx = DAY_ABBR.indexOf(startDay);
    const endIdx = DAY_ABBR.indexOf(endDay);
    if (startIdx === -1 || endIdx === -1) return null;

    const allowedDays: number[] = [];
    let i = startIdx;
    while (true) {
      allowedDays.push(i);
      if (i === endIdx) break;
      i = (i + 1) % 7;
    }

    return {
      allowedDays,
      startMinutes: parseTimeToMinutes(startTime),
      endMinutes: parseTimeToMinutes(endTime),
    };
  } catch {
    return null;
  }
};

// Next N upcoming dates that fall on an allowed day
export const getUpcomingAvailableDates = (
  availability: string,
  daysAhead = 14
): Date[] => {
  const parsed = parseAvailability(availability);
  if (!parsed) return [];

  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= daysAhead; i++) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    if (parsed.allowedDays.includes(candidate.getDay())) {
      dates.push(candidate);
    }
  }
  return dates;
};

// Time slots (as "HH:MM" 24h strings) for a given duration, within availability hours
export const getTimeSlots = (availability: string, durationMinutes: number): string[] => {
  const parsed = parseAvailability(availability);
  if (!parsed) return [];

  const slots: string[] = [];
  let current = parsed.startMinutes;

  while (current + durationMinutes <= parsed.endMinutes) {
    const hour = Math.floor(current / 60);
    const minute = current % 60;
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
    current += durationMinutes;
  }

  return slots;
};

export const formatSlotLabel = (slot: string): string => {
  const [hourStr, minute] = slot.split(":");
  const hour = parseInt(hourStr, 10);
  const meridian = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${meridian}`;
};