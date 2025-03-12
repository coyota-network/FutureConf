import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Users, Mic, Video, Share2, MessageSquare, PhoneOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface MeetingDetails {
  id: string;
  title: string;
  host_id: string;
  status: string;
}

function Meeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<MeetingDetails | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    fetchMeetingDetails();
  }, [id]);

  async function fetchMeetingDetails() {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('meeting_id', id)
      .single();

    if (error) {
      toast.error('Failed to fetch meeting details');
      navigate('/dashboard');
    } else {
      setMeeting(data);
      // Update meeting status to in_progress
      await supabase
        .from('meetings')
        .update({ status: 'in_progress' })
        .eq('meeting_id', id);
    }
  }

  async function endMeeting() {
    if (!meeting) return;

    await supabase
      .from('meetings')
      .update({ status: 'ended' })
      .eq('id', meeting.id);

    navigate('/dashboard');
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Meeting Header */}
      <div className="bg-dark-lighter p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{meeting.title}</h1>
          <p className="text-sm text-gray-400">Meeting ID: {id}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-dark-lightest">
            <Users className="text-primary" />
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg hover:bg-dark-lightest ${
              isMuted ? 'bg-red-500/20 text-red-500' : ''
            }`}
          >
            <Mic />
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-2 rounded-lg hover:bg-dark-lightest ${
              isVideoOff ? 'bg-red-500/20 text-red-500' : ''
            }`}
          >
            <Video />
          </button>
          <button className="p-2 rounded-lg hover:bg-dark-lightest">
            <Share2 className="text-primary" />
          </button>
          <button className="p-2 rounded-lg hover:bg-dark-lightest">
            <MessageSquare className="text-primary" />
          </button>
          <button
            onClick={endMeeting}
            className="btn-secondary bg-red-500 hover:bg-red-600 border-none flex items-center gap-2"
          >
            <PhoneOff size={20} />
            End Meeting
          </button>
        </div>
      </div>

      {/* Meeting Content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {/* Main video feed */}
          <div className="col-span-2 aspect-video bg-dark-lighter rounded-xl flex items-center justify-center">
            {isVideoOff ? (
              <div className="text-center">
                <Video size={48} className="mx-auto mb-2 text-gray-500" />
                <p className="text-gray-500">Video is turned off</p>
              </div>
            ) : (
              <div className="text-center">
                <Video size={48} className="mx-auto mb-2 text-primary" />
                <p className="text-gray-300">Camera feed would appear here</p>
              </div>
            )}
          </div>

          {/* Participant list */}
          <div className="bg-dark-lighter rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Participants</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-semibold text-black">You</span>
                </div>
                <div>
                  <p className="font-medium">You (Host)</p>
                  <p className="text-sm text-gray-400">Active Speaker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meeting;