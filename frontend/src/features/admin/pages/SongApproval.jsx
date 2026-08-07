import React, { useState } from 'react';
import { Check, X, PlayCircle, Music, Clock } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { usePendingSongs, useApproveSong, useRejectSong } from '../hooks/useApprovals';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { EmptyState } from '@/shared/ui/states/EmptyState';
import { ErrorState } from '@/shared/ui/states/ErrorState';

export const SongApproval = () => {
  const { data: response, isLoading, isError } = usePendingSongs();
  const { mutate: approve, isPending: isApproving } = useApproveSong();
  const { mutate: reject, isPending: isRejecting } = useRejectSong();
  
  const [activeAudio, setActiveAudio] = useState(null);

  const pendingSongs = response?.data || [];
  const isMutating = isApproving || isRejecting;

  const handleApprove = (id) => {
    if (window.confirm('Approve this song for public streaming?')) {
      approve(id);
    }
  };

  const handleReject = (id) => {
    const reason = window.prompt('Provide a reason for rejection:');
    if (reason !== null) {
      reject({ songId: id, reason: reason || 'Violation of platform terms.' });
    }
  };

  const toggleAudio = (audioUrl) => {
    if (activeAudio === audioUrl) {
      setActiveAudio(null); // Stop
    } else {
      setActiveAudio(audioUrl); // Play
    }
  };

  if (isError) return <AdminLayout><ErrorState message="Failed to load pending queue." /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#FAFAFA] tracking-tight mb-2">Content Moderation Queue</h1>
          <p className="text-[#A1A1AA] text-sm">Review, approve, or reject tracks uploaded by artists.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full bg-[#171717] rounded-xl" />)}
          </div>
        ) : pendingSongs.length === 0 ? (
          <EmptyState 
            icon={ShieldCheck} 
            title="Queue is Empty" 
            description="All artist uploads have been reviewed." 
          />
        ) : (
          <div className="flex flex-col gap-4">
            {pendingSongs.map((song) => (
              <Card key={song._id} className="bg-[#171717] border-[#2A2A2A] overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 gap-4 hover:border-[#3B82F6]/50 transition-colors">
                
                {/* Audio Preview & Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative group w-16 h-16 rounded-md bg-[#080808] overflow-hidden flex-shrink-0 border border-[#2A2A2A]">
                    <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover opacity-80" />
                    <button 
                      onClick={() => toggleAudio(song.audioUrl)}
                      className="absolute inset-0 flex items-center justify-center bg-[#080808]/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <PlayCircle className={`w-8 h-8 ${activeAudio === song.audioUrl ? 'text-[#3B82F6]' : 'text-[#FAFAFA]'}`} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-[#FAFAFA] font-bold text-base line-clamp-1">{song.title}</h3>
                    <p className="text-[#A1A1AA] text-sm line-clamp-1">{song.artist?.name || 'Unknown Artist'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-xs text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 mr-1" /> Pending
                      </span>
                      <span className="flex items-center text-xs text-[#A1A1AA] bg-[#2A2A2A] px-2 py-0.5 rounded">
                        <Music className="w-3 h-3 mr-1" /> {song.genre}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hidden Audio Player for Preview */}
                {activeAudio === song.audioUrl && (
                  <audio autoPlay src={song.audioUrl} onEnded={() => setActiveAudio(null)} className="hidden" />
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Button 
                    onClick={() => handleReject(song._id)}
                    disabled={isMutating}
                    variant="outline"
                    className="border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444]/10 hover:border-[#EF4444]"
                  >
                    <X className="w-4 h-4 mr-2" /> Reject
                  </Button>
                  
                  <Button 
                    onClick={() => handleApprove(song._id)}
                    disabled={isMutating}
                    className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-[#080808] font-bold"
                  >
                    <Check className="w-4 h-4 mr-2" /> Approve
                  </Button>
                </div>

              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};