"use client";
import { useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

function modalReducer(state: { showCalendar: boolean }, action: { type: string }) {
  switch (action.type) {
    case "OPEN_CALENDAR":
      return { ...state, showCalendar: true };
    case "CLOSE_CALENDAR":
      return { ...state, showCalendar: false };
    default:
      return state;
  }
}

const timeSlots = {
  Morning: ["10:00 am", "10:15 am", "10:30 am", "10:45 am", "11:00 am", "11:15 am", "11:30 am", "11:45 am"],
  Afternoon: ["12:00 pm", "12:15 pm", "12:30 pm", "12:45 pm", "1:00 pm", "1:15 pm", "1:30 pm", "1:45 pm"],
  Evening: ["5:00 pm", "5:15 pm", "5:30 pm", "5:45 pm", "6:00 pm", "6:15 pm", "6:30 pm", "6:45 pm"],
};

export default function ServiceDateSelector() {
  const [state, dispatch] = useReducer(modalReducer, { showCalendar: false });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Simulate selecting a date from the calendar
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    dispatch({ type: "CLOSE_CALENDAR" });
  };

  return (
    <>
      <section className="max-w-3xl mx-auto mb-8 bg-muted rounded-xl shadow p-6">
        <div className="text-2xl font-semibold mb-2">Date</div>
        {selectedDate ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1">
                <div className="border rounded-lg bg-background px-4 py-3 flex items-center text-lg font-medium">
                  <CalendarDays className="w-5 h-5 mr-2 text-muted-foreground" />
                  {selectedDate}
                </div>
              </div>
            </div>
            <div className="text-muted-foreground text-base mb-2">Choose a time that suits you</div>
            <div className="flex rounded-full overflow-hidden bg-[#ececec] mb-4">
              {(["Morning", "Afternoon", "Evening"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 px-2  text-lg font-medium transition ${selectedTab === tab ? "bg-muted  shadow" : "text-muted-foreground"}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots[selectedTab].map((slot) => (
                <button
                  key={slot}
                  className={`rounded-full border px-6 py-2 text-base font-medium transition-all ${selectedTime === slot ? "bg-[#333] text-white" : "bg-background hover:bg-[#222]"}`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </>
        ) : (
          <Button className="bg-[#222] text-white text-lg font-semibold rounded-full px-8 py-3 shadow-md hover:bg-[#111] transition-all" onClick={() => dispatch({ type: "OPEN_CALENDAR" })}>
            Select preferred date
          </Button>
        )}
      </section>
      {/* Calendar Popup */}
      {state.showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-muted rounded-2xl shadow-xl p-8 max-w-3xl w-full relative">
            <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition" onClick={() => dispatch({ type: "CLOSE_CALENDAR" })}>
              <span className="text-2xl font-bold">×</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="flex gap-16">
                {/* December 2025 Calendar */}
                <div>
                  <div className="text-2xl font-semibold mb-2 text-center">December 2025</div>
                  <table className="w-full text-center mb-4">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="px-3">Su</th><th className="px-3">Mo</th><th className="px-3">Tu</th><th className="px-3">We</th><th className="px-3">Th</th><th className="px-3">Fr</th><th className="px-3">Sa</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      <tr><td className="px-3 calendar-day"></td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, December 1st, 2025")}>1</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, December 2nd, 2025")}>2</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, December 3rd, 2025")}>3</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, December 4th, 2025")}>4</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, December 5th, 2025")}>5</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, December 6th, 2025")}>6</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, December 7th, 2025")}>7</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, December 8th, 2025")}>8</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, December 9th, 2025")}>9</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, December 10th, 2025")}>10</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, December 11th, 2025")}>11</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, December 12th, 2025")}>12</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, December 13th, 2025")}>13</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, December 14th, 2025")}>14</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, December 15th, 2025")}>15</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, December 16th, 2025")}>16</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, December 17th, 2025")}>17</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, December 18th, 2025")}>18</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, December 19th, 2025")}>19</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, December 20th, 2025")}>20</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, December 21st, 2025")}>21</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, December 22nd, 2025")}>22</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, December 23rd, 2025")}>23</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, December 24th, 2025")}>24</td><td className="px-3"><span className="inline-block w-8 h-8 rounded-full bg-muted text-black">25</span></td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, December 26th, 2025")}>26</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, December 27th, 2025")}>27</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, December 28th, 2025")}>28</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, December 29th, 2025")}>29</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, December 30th, 2025")}>30</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, December 31st, 2025")}>31</td><td className="px-3 calendar-day"></td><td className="px-3 calendar-day"></td><td className="px-3 calendar-day"></td></tr>
                    </tbody>
                  </table>
                </div>
                {/* January 2026 Calendar */}
                <div>
                  <div className="text-2xl font-semibold mb-2 text-center">January 2026</div>
                  <table className="w-full text-center mb-4">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="px-3">Su</th><th className="px-3">Mo</th><th className="px-3">Tu</th><th className="px-3">We</th><th className="px-3">Th</th><th className="px-3">Fr</th><th className="px-3">Sa</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      <tr><td className="px-3 calendar-day"></td><td className="px-3 calendar-day"></td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, January 1st, 2026")}>1</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, January 2nd, 2026")}>2</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, January 3rd, 2026")}>3</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, January 4th, 2026")}>4</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, January 5th, 2026")}>5</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, January 6th, 2026")}>6</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, January 7th, 2026")}>7</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, January 8th, 2026")}>8</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, January 9th, 2026")}>9</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, January 10th, 2026")}>10</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, January 11th, 2026")}>11</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, January 12th, 2026")}>12</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, January 13th, 2026")}>13</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, January 14th, 2026")}>14</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, January 15th, 2026")}>15</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, January 16th, 2026")}>16</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, January 17th, 2026")}>17</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, January 18th, 2026")}>18</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, January 19th, 2026")}>19</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, January 20th, 2026")}>20</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, January 21st, 2026")}>21</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, January 22nd, 2026")}>22</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, January 23rd, 2026")}>23</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, January 24th, 2026")}>24</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sun, January 25th, 2026")}>25</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Mon, January 26th, 2026")}>26</td></tr>
                      <tr><td className="px-3 calendar-day" onClick={() => handleDateSelect("Tue, January 27th, 2026")}>27</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Wed, January 28th, 2026")}>28</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Thu, January 29th, 2026")}>29</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Fri, January 30th, 2026")}>30</td><td className="px-3 calendar-day" onClick={() => handleDateSelect("Sat, January 31st, 2026")}>31</td><td className="px-3 calendar-day"></td><td className="px-3 calendar-day"></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .calendar-day {
          transition: background 0.2s, color 0.2s;
          border-radius: 9999px;
          cursor: pointer;
        }
        .calendar-day:hover {
          background: #333;
          color: #fff;
        }
      `}</style>
    </>
  );
}
