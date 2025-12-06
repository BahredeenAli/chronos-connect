import { meetings, staff, Staff } from '../lib/data';
import { format, isToday, parseISO } from 'date-fns';
import { Clock, Users, AlertTriangle } from 'lucide-react';

const Avatar: React.FC<{ staffMember?: Staff }> = ({ staffMember }) => {
    if (!staffMember) return null;
    return (
        <div 
            title={staffMember.name}
            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800 -ml-2 first:ml-0">
            {staffMember.avatar}
        </div>
    )
}

const Dashboard = () => {
  const todayMeetings = meetings.filter(m => isToday(parseISO(m.startTime)));
  const currentUser = staff[0]; // Assuming Amina is the current user

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{getGreeting()}, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-gray-500 dark:text-gray-400">Here’s what your schedule looks like today.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {todayMeetings.length > 0 ? (
          todayMeetings
            .sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime())
            .map(meeting => {
              const organizer = staff.find(s => s.id === meeting.organizer);
              const attendeeDetails = meeting.attendees.map(id => staff.find(s => s.id)).filter(Boolean) as Staff[];
              return (
              <div key={meeting.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 flex flex-col justify-between border-l-4 ${meeting.isUrgent ? 'border-red-500' : 'border-blue-500'}`}>
                <div>
                    {meeting.isUrgent && (
                        <div className="flex items-center text-red-500 dark:text-red-400 text-sm font-semibold mb-2">
                            <AlertTriangle className="w-4 h-4 mr-2"/>
                            URGENT
                        </div>
                    )}
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{meeting.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{meeting.agenda}</p>
                </div>
                <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{format(parseISO(meeting.startTime), 'p')} - {format(parseISO(meeting.endTime), 'p')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <div className="flex flex-row-reverse justify-end">
                                {attendeeDetails.slice(0, 4).map(s => <Avatar key={s.id} staffMember={s} />)}
                            </div>
                            {attendeeDetails.length > 4 && <span className='text-xs ml-1'>+{attendeeDetails.length - 4} more</span>}
                        </div>
                        {organizer && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                                Organized by {organizer.name.split(' ')[0]}
                            </div>
                        )}
                    </div>
                </div>
              </div>
            )})
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">No meetings today!</h3>
            <p className="text-gray-500 dark:text-gray-400">Enjoy your day or schedule a new meeting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;