import { meetings, staff } from '../lib/data';
import { format, parseISO, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Clock, Users, User } from 'lucide-react';

const WeeklySchedule = () => {
  const weekStartsOn = 1; // Monday
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  return (
    <div className="space-y-8">
       <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Week at a Glance</h1>
        <p className="text-gray-500 dark:text-gray-400">Review your schedule for the upcoming week.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDays.map(day => {
          const dayMeetings = meetings
            .filter(m => isSameDay(parseISO(m.startTime), day))
            .sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime());

          return (
            <div key={day.toString()} className="lg:border-r lg:pr-4 last:border-r-0 last:pr-0 border-gray-200 dark:border-gray-700">
              <h2 className={`font-bold text-lg sm:text-xl mb-3 pb-2 border-b-2 ${isSameDay(today, day) ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
                <span className="lg:hidden">{format(day, 'EEEE, ')}</span>
                {format(day, 'MMM d')}
              </h2>
              {dayMeetings.length > 0 ? (
                <div className="space-y-4">
                  {dayMeetings.map(meeting => {
                    const organizer = staff.find(s => s.id === meeting.organizer);
                    return (
                      <div key={meeting.id} className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-l-4 ${meeting.isUrgent ? 'border-red-500' : 'border-blue-500'}`}>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base">{meeting.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{meeting.agenda}</p>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
                          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{format(parseISO(meeting.startTime), 'p')} - {format(parseISO(meeting.endTime), 'p')}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{meeting.attendees.length} attendees</span>
                        </div>
                         {organizer && <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <User className="w-3 h-3 mr-2 flex-shrink-0" />
                          <span>Organizer: {organizer.name}</span>
                        </div>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/20 rounded-lg mt-4 lg:mt-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">No meetings.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySchedule;