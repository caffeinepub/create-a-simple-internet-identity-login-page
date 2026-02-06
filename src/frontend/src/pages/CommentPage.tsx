import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Trash2, Heart } from 'lucide-react';

interface CommentPageProps {
  onClose: () => void;
}

interface Comment {
  id: string;
  oceanName: string;
  thoughts: string;
  timestamp: Date;
}

export default function CommentPage({ onClose }: CommentPageProps) {
  const [oceanName, setOceanName] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handlePost = () => {
    if (!oceanName.trim() || !thoughts.trim()) {
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      oceanName: oceanName.trim(),
      thoughts: thoughts.trim(),
      timestamp: new Date(),
    };

    setComments([newComment, ...comments]);
    setOceanName('');
    setThoughts('');
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sky-600 hover:text-sky-700 hover:bg-sky-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Comment Form Card */}
        <Card className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Share Your Thoughts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ocean Name */}
            <div className="space-y-2">
              <Label htmlFor="oceanName" className="text-sm font-semibold text-sky-900">
                Sea or Ocean Name
              </Label>
              <Input
                id="oceanName"
                type="text"
                placeholder="e.g., Pacific Ocean, Mediterranean Sea"
                value={oceanName}
                onChange={(e) => setOceanName(e.target.value)}
                className="h-12 border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900"
              />
            </div>

            {/* Thoughts */}
            <div className="space-y-2">
              <Label htmlFor="thoughts" className="text-sm font-semibold text-sky-900">
                Share your thoughts
              </Label>
              <Textarea
                id="thoughts"
                placeholder="Write your observations, concerns, or insights about this ocean or sea..."
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                rows={5}
                className="border-2 border-sky-200 focus:border-sky-400 focus:ring-sky-400 rounded-xl bg-white/50 backdrop-blur-sm text-sky-900 resize-none"
              />
            </div>

            {/* Post Button */}
            <div className="flex justify-center pt-2">
              <Button
                onClick={handlePost}
                disabled={!oceanName.trim() || !thoughts.trim()}
                className="w-full max-w-xs h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 hover:from-sky-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-900 mb-4">Recent Comments</h2>
            {comments.map((comment) => (
              <Card
                key={comment.id}
                className="border-2 border-sky-200/50 bg-white/80 backdrop-blur-xl shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-sky-900">{comment.oceanName}</h3>
                      <p className="text-xs text-sky-600">
                        {comment.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sky-800 whitespace-pre-wrap">{comment.thoughts}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-sky-700/60">
          <p>
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-400" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-600 underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
