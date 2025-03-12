import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Video, Calendar, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

interface Meeting {
  id: string;
  meeting_id: string;
  title: string;
  created_at: string;
  status: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');

  useEffect(() => {
    fetchMeetings();
  }, []);

  async function fetchMeetings() {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch meetings');
    } else {
      setMeetings(data || []);
    }
  }

  async function createMeeting(e: React.FormEvent) {
    e.preventDefault();
    
    const meetingId = uuidv4();
    const { error } = await supabase
      .from('meetings')
      .insert([
        {
          host_id: session?.user.id,
          meeting_id: meetingId,
          title: newMeetingTitle || 'New Meeting',
          status: 'scheduled'
        }
      ]);

    if (error) {
      toast.error('Failed to create meeting');
    } else {
      toast.success('Meeting created successfully');
      setNewMeetingTitle('');
      setIsCreatingMeeting(false);
      fetchMeetings();
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Meetings</h1>
          <button
            onClick={handleSignOut}
            className="btn-secondary flex items-center gap-2"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setIsCreatingMeeting(true)}
            className="p-6 rounded-xl border-2 border-dashed border-white/20 hover:border-primary transition-colors flex items-center justify-center gap-3"
          >
            <Plus className="text-primary" />
            <span>Create New Meeting</span>
          </button>

          {isCreatingMeeting && (
            <form onSubmit={createMeeting} className="p-6 rounded-xl bg-dark-lighter">
              <input
                type="text"
                placeholder="Meeting Title"
                value={newMeetingTitle}
                onChange={(e) => setNewMeetingTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark border border-white/20 focus:border-primary focus:outline-none mb-4"
              />
              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Meeting
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingMeeting(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="p-6 rounded-xl bg-dark-lighter hover:bg-dark-lightest transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                {meeting.status === 'in_progress' ? (
                  <Video className="text-red-500" />
                ) : (
                  <Calendar className="text-primary" />
                )}
                <h3 className="text-xl font-semibold">{meeting.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Created: {new Date(meeting.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/meeting/${meeting.meeting_id}`)}
                className="btn-primary w-full"
              >
                Join Meeting
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;