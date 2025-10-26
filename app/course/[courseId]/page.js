"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function CourseVideosPage() {
  const params = useParams();
  const courseId = params.courseId;

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch course data
    const fetchCourseData = async () => {
      setIsLoading(true);

      // Mock course data - replace with actual API call
      const mockCourse = {
        id: courseId,
        title: decodeURIComponent(courseId),
        description: "Learn advanced concepts with hands-on examples",
        instructor: "Expert Instructor",
        videos: [
          {
            id: 1,
            title: "Introduction to the Course",
            duration: "10:30",
            thumbnail: "/api/placeholder/320/180",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample video
            description: "Get started with the fundamentals"
          },
          {
            id: 2,
            title: "Core Concepts Explained",
            duration: "25:45",
            thumbnail: "/api/placeholder/320/180",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Deep dive into essential topics"
          },
          {
            id: 3,
            title: "Practical Examples",
            duration: "18:20",
            thumbnail: "/api/placeholder/320/180",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Real-world applications and examples"
          },
          {
            id: 4,
            title: "Advanced Techniques",
            duration: "32:15",
            thumbnail: "/api/placeholder/320/180",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Master advanced concepts and techniques"
          }
        ]
      };

      // Mock comments data
      const mockComments = [
        {
          id: 1,
          user: "John Doe",
          avatar: "/api/placeholder/40/40",
          content: "Great explanation! This really helped me understand the concept better.",
          timestamp: "2 hours ago",
          likes: 12,
          replies: [
            {
              id: 2,
              user: "Jane Smith",
              avatar: "/api/placeholder/40/40",
              content: "I agree! The examples were very clear.",
              timestamp: "1 hour ago",
              likes: 5
            }
          ]
        },
        {
          id: 3,
          user: "Mike Johnson",
          avatar: "/api/placeholder/40/40",
          content: "Could you please elaborate more on the second example?",
          timestamp: "30 minutes ago",
          likes: 3,
          replies: []
        }
      ];

      setCourse(mockCourse);
      setComments(mockComments);
      // Don't auto-select first video - let user choose
      setIsLoading(false);
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Current User",
        avatar: "/api/placeholder/40/40",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  if (isLoading) {
    return (
      <>
        <SiteNav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ paddingTop: '3.5rem' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course content...</p>
          </div>
        </div>
        <SiteFooter />
      </>
    );
  }

  if (!course) {
    return (
      <>
        <SiteNav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ paddingTop: '3.5rem' }}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-600">The course you're looking for doesn't exist.</p>
          </div>
        </div>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNav />
      <div className="min-h-screen bg-gray-50" style={{ paddingTop: '3.5rem' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Course Header */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{course.videos.length}</div>
                  <div className="text-sm text-gray-500">Videos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Course Curriculum / Videos List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm sticky top-24">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.videos.length} videos • {course.instructor}</p>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {course.videos.map((video, index) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedVideo && selectedVideo.id === video.id
                            ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${
                            selectedVideo && selectedVideo.id === video.id
                              ? 'text-indigo-900'
                              : 'text-gray-900'
                          }`}>
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500">{video.duration}</p>
                        </div>
                        {selectedVideo && selectedVideo.id === video.id && (
                          <div className="ml-2">
                            <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {selectedVideo ? (
                /* Video Player and Comments when video is selected */
                <>
                  {/* Video Player */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="aspect-video bg-black">
                      <iframe
                        src={selectedVideo.videoUrl}
                        title={selectedVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                          Lesson {course.videos.findIndex(v => v.id === selectedVideo.id) + 1} of {course.videos.length}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        Duration: {selectedVideo.duration}
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900">Discussion</h3>
                      <p className="text-sm text-gray-600 mt-1">Share your thoughts and questions about this lesson</p>
                    </div>
                    <div className="p-6">
                      {/* Add Comment */}
                      <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="flex space-x-3">
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Share your thoughts about this lesson..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                              rows="3"
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Post Comment
                          </button>
                        </div>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex space-x-3">
                              <img
                                src={comment.avatar}
                                alt={comment.user}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => handleLikeComment(comment.id)}
                                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                    </svg>
                                    <span>{comment.likes}</span>
                                  </button>
                                  <button className="text-xs text-gray-500 hover:text-gray-700">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Welcome message when no video is selected */
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Welcome to {course.title}</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Select a lesson from the curriculum to start learning. Each video is designed to build your skills progressively.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        {course.videos.length} Lessons
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        Interactive
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
