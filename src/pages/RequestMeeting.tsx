import React, { useState } from 'react';
import { staff } from '../lib/data';
import { toast } from 'sonner';
import { Send, UserPlus, Clock, MessageSquare, AlertTriangle } from 'lucide-react';

const RequestMeeting = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [attendees, setAttendees] = useState<string[]>([]);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleAttendeeToggle = (id: string) => {
    setAttendees(prev => 
      prev.includes(id) ? prev.filter(attendeeId => attendeeId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startTime || !endTime || attendees.length === 0) {
        toast.error('Please fill all fields and select at least one attendee.');
        return;
    }
    console.log({ title, startTime, endTime, attendees, isUrgent });
    toast.success('Meeting request sent!', {
        description: 'You will be notified once everyone responds.'
    });
    setTitle('');
    setStartTime('');
    setEndTime('');
    setAttendees([]);
    setIsUrgent(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Request a New Meeting</h1>
        <p className="text-gray-500 dark:text-gray-400">Check availability and schedule a new meeting with your team.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-lg shadow-md space-y-6">
        <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium flex items-center"><MessageSquare className='w-4 h-4 mr-2'/>Meeting Title / Agenda</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Q3 Planning Session"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium flex items-center"><Clock className='w-4 h-4 mr-2'/>Start Time</label>
                <input
                    id="startTime"
                    type="datetime-local"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium flex items-center"><Clock className='w-4 h-4 mr-2'/>End Time</label>
                <input
                    id="endTime"
                    type="datetime-local"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
        </div>

        <div className="space-y-3">
            <label className="text-sm font-medium flex items-center"><UserPlus className='w-4 h-4 mr-2'/>Invite Attendees</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {staff.map(s => (
                    <div key={s.id} 
                        onClick={() => handleAttendeeToggle(s.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                            attendees.includes(s.id) ? 'bg-blue-100 border-blue-500 dark:bg-blue-900/50 dark:border-blue-400 scale-105' : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700'
                        }`}>
                         <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg font-bold">{s.avatar}</div>
                        <span className="font-medium text-xs sm:text-sm">{s.name}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
            <div className='flex items-start sm:items-center mb-2 sm:mb-0'>
                <AlertTriangle className='w-5 h-5 mr-3 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1 sm:mt-0'/>
                <div>
                    <label htmlFor="isUrgent" className="font-medium text-yellow-800 dark:text-yellow-200">Urgent Meeting</label>
                    <p className='text-xs text-yellow-600 dark:text-yellow-400'>This will notify attendees immediately.</p>
                </div>
            </div>
            <input
                id="isUrgent"
                type="checkbox"
                checked={isUrgent}
                onChange={e => setIsUrgent(e.target.checked)}
                className="w-5 h-5 rounded text-red-600 focus:ring-red-500 cursor-pointer self-end sm:self-center"
            />
        </div>

        <div className="text-center sm:text-right pt-4">
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 sm:px-6 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 shadow-lg">
                <Send className="w-5 h-5 mr-2" />
                <span className="sm:hidden">Send Invite</span>
                <span className="hidden sm:inline">Check Availability & Send Invite</span>
            </button>
        </div>
      </form>
    </div>
  );
};

export default RequestMeeting;
