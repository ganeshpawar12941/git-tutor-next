"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { useAuth } from '@/lib/auth-context';
import { videosAPI, coursesAPI } from '@/lib/api';

export default function CourseVideosPage() {
  const params = useParams();
  const courseId = params.courseId;
  const { user, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    duration: '',
    isFree: false,
    order: 0,
    thumbnail: null
  });
  const [uploadErrors, setUploadErrors] = useState({});
  const [uploadLoading, setUploadLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Helper function to format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);

      try {
        // Fetch course details
        const courseData = await coursesAPI.getById(courseId);
        setCourse(courseData);

        // Fetch course videos (sorted by order)
        const videosData = await videosAPI.getByCourse(courseId);
        setVideos(videosData || []);

        // Set first video as selected if available
        if (videosData && videosData.length > 0) {
          setSelectedVideo(videosData[0]);
        }

      } catch (error) {
        console.error('Error fetching course data:', error);
        setMessage({
          type: 'error',
          text: error.message || 'Failed to load course data'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const validateUploadForm = () => {
    const errors = {};

    if (!uploadFormData.title.trim()) {
      errors.title = 'Video title is required';
    } else if (uploadFormData.title.length < 5 || uploadFormData.title.length > 200) {
      errors.title = 'Title must be between 5 and 200 characters';
    }

    if (!uploadFormData.description.trim()) {
      errors.description = 'Video description is required';
    } else if (uploadFormData.description.length < 10 || uploadFormData.description.length > 2000) {
      errors.description = 'Description must be between 10 and 2000 characters';
    }

    if (!uploadFormData.duration) {
      errors.duration = 'Duration is required';
    } else {
      // Backend expects duration in seconds (integer), not MM:SS format
      const durationMatch = uploadFormData.duration.match(/^(\d+):(\d{2})$/);
      if (!durationMatch) {
        errors.duration = 'Duration must be in MM:SS format (e.g., 10:30)';
      } else {
        const minutes = parseInt(durationMatch[1]);
        const seconds = parseInt(durationMatch[2]);
        if (minutes < 0 || seconds < 0 || seconds >= 60) {
          errors.duration = 'Invalid duration format';
        }
      }
    }

    if (uploadFormData.order < 0) {
      errors.order = 'Order must be a non-negative number';
    }

    // Backend expects video file
    if (!uploadFormData.video) {
      errors.video = 'Video file is required';
    }

    setUploadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUploadInputChange = (field, value) => {
    setUploadFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (uploadErrors[field]) {
      setUploadErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setUploadErrors(prev => ({ ...prev, video: 'Please select a valid video file' }));
        return;
      }

      // Validate file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        setUploadErrors(prev => ({ ...prev, video: 'File size must be less than 100MB' }));
        return;
      }

      setUploadFormData(prev => ({
        ...prev,
        video: file
      }));

      // Clear error
      if (uploadErrors.video) {
        setUploadErrors(prev => ({ ...prev, video: '' }));
      }
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate thumbnail type
      if (!file.type.startsWith('image/')) {
        setUploadErrors(prev => ({ ...prev, thumbnail: 'Please select a valid image file' }));
        return;
      }

      setUploadFormData(prev => ({
        ...prev,
        thumbnail: file
      }));

      // Clear error
      if (uploadErrors.thumbnail) {
        setUploadErrors(prev => ({ ...prev, thumbnail: '' }));
      }
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!validateUploadForm()) return;

    setUploadLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();

      // Add video file with exact field name expected by backend
      if (uploadFormData.video) {
        formData.append('video', uploadFormData.video);
      }

      // Add thumbnail if provided
      if (uploadFormData.thumbnail) {
        formData.append('thumbnail', uploadFormData.thumbnail);
      }

      // Convert duration from MM:SS to seconds for backend
      const durationMatch = uploadFormData.duration.match(/^(\d+):(\d{2})$/);
      const durationInSeconds = durationMatch
        ? parseInt(durationMatch[1]) * 60 + parseInt(durationMatch[2])
        : 0;

      // Add metadata fields exactly as backend expects
      formData.append('title', uploadFormData.title.trim());
      formData.append('description', uploadFormData.description.trim());
      formData.append('course', courseId);
      formData.append('duration', durationInSeconds.toString()); // Backend expects seconds as integer
      formData.append('isFree', uploadFormData.isFree.toString());
      formData.append('order', uploadFormData.order.toString());

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type - browser will set it with boundary for FormData
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      // Refresh videos list
      const updatedVideos = await videosAPI.getByCourse(courseId);
      setVideos(updatedVideos || []);

      // Close modal and reset form
      setShowUploadModal(false);
      setUploadFormData({
        title: '',
        description: '',
        duration: '',
        isFree: false,
        order: 0,
        thumbnail: null,
        video: null
      });

      setMessage({
        type: 'success',
        text: 'Video uploaded successfully!'
      });

    } catch (error) {
      console.error('Upload error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Upload failed. Please try again.'
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: user?.name || "Current User",
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
          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Course Header */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Instructor: {course.teacher?.name || 'Unknown'}</span>
                    {course.code && <span>• Code: {course.code}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{videos.length}</div>
                  <div className="text-sm text-gray-500">Videos</div>
                  {(isTeacher || isAdmin) && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="mt-3 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      + Upload Video
                    </button>
                  )}
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
                  <p className="text-sm text-gray-600 mt-1">{videos.length} videos • {course.teacher?.name || 'Unknown'}</p>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {videos.map((video, index) => (
                      <div
                        key={video._id || video.id}
                        onClick={() => handleVideoSelect(video)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedVideo && (selectedVideo._id || selectedVideo.id) === (video._id || video.id)
                            ? 'bg-indigo-50 border-2 border-indigo-200 shadow-sm'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${
                            selectedVideo && (selectedVideo._id || selectedVideo.id) === (video._id || video.id)
                              ? 'text-indigo-900'
                              : 'text-gray-900'
                          }`}>
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-500">{formatDuration(video.durationInSeconds || video.duration)}</p>
                        </div>
                        {selectedVideo && (selectedVideo._id || selectedVideo.id) === (video._id || video.id) && (
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
                      <video
                        controls
                        className="w-full h-full"
                        poster={selectedVideo.thumbnail}
                        preload="metadata"
                      >
                        <source src={selectedVideo.url} type={selectedVideo.mimeType || 'video/mp4'} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h2>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                          Lesson {videos.findIndex(v => (v._id || v.id) === (selectedVideo._id || selectedVideo.id)) + 1} of {videos.length}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                          </svg>
                          Duration: {formatDuration(selectedVideo.durationInSeconds || selectedVideo.duration)}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                          </svg>
                          {selectedVideo.isFree ? 'Free' : 'Premium'}
                        </div>
                        {(isTeacher || isAdmin) && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            {selectedVideo.views || 0} views
                          </div>
                        )}
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
                      {videos.length > 0
                        ? 'Select a lesson from the curriculum to start learning. Each video is designed to build your skills progressively.'
                        : 'No videos have been uploaded yet. Check back later for new content.'
                      }
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                        {videos.length} Lessons
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

      {/* Video Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Upload New Video</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleVideoUpload} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={uploadFormData.title}
                  onChange={(e) => handleUploadInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    uploadErrors.title
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="Enter video title (5-200 characters)"
                />
                {uploadErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{uploadErrors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={uploadFormData.description}
                  onChange={(e) => handleUploadInputChange('description', e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    uploadErrors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="Describe what this video covers (10-2000 characters)"
                />
                {uploadErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{uploadErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={uploadFormData.duration}
                    onChange={(e) => handleUploadInputChange('duration', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      uploadErrors.duration
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    placeholder="MM:SS (e.g., 10:30)"
                  />
                  {uploadErrors.duration && (
                    <p className="mt-1 text-sm text-red-600">{uploadErrors.duration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={uploadFormData.order}
                    onChange={(e) => handleUploadInputChange('order', parseInt(e.target.value) || 0)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      uploadErrors.order
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                    }`}
                    placeholder="0"
                  />
                  {uploadErrors.order && (
                    <p className="mt-1 text-sm text-red-600">{uploadErrors.order}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video File *
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    uploadErrors.video
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
                {uploadErrors.video && (
                  <p className="mt-1 text-sm text-red-600">{uploadErrors.video}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Supported formats: MP4, AVI, MOV, MKV (Max 100MB)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    uploadErrors.thumbnail
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                />
                {uploadErrors.thumbnail && (
                  <p className="mt-1 text-sm text-red-600">{uploadErrors.thumbnail}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Optional thumbnail image for the video</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFree"
                  checked={uploadFormData.isFree}
                  onChange={(e) => handleUploadInputChange('isFree', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isFree" className="ml-2 block text-sm text-gray-900">
                  Make this video free for all students
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Uploading...
                    </div>
                  ) : (
                    'Upload Video'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
