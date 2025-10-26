"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function LessonPage() {
  const searchParams = useSearchParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(1);

  useEffect(() => {
    const courseTitle = searchParams.get('course');
    if (courseTitle) {
      setCourse({
        title: courseTitle,
        lessons: [
          {
            id: 1,
            title: "Introduction to Git",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample video URL
            description: "Learn the basics of Git version control system"
          },
          {
            id: 2,
            title: "Setting up Git",
            duration: "12:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Configure Git on your local machine"
          },
          {
            id: 3,
            title: "Basic Git Commands",
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Master essential Git commands"
          }
        ]
      });
    }
  }, [searchParams]);

  if (!course) {
    return (
      <div id="app">
        <SiteNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lesson...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const currentLessonData = course.lessons.find(lesson => lesson.id === currentLesson);

  return (
    <div id="app">
      <SiteNav />

      <div className="min-h-screen bg-gray-50 py-8" style={{ paddingTop: '6rem' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-gray-600">Lesson {currentLesson} of {course.lessons.length}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    src={currentLessonData.videoUrl}
                    title={currentLessonData.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentLessonData.title}</h2>
                  <p className="text-gray-600 mb-4">{currentLessonData.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Duration: {currentLessonData.duration}</span>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Mark as Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Lessons</h3>
                <div className="space-y-3">
                  {course.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        lesson.id === currentLesson
                          ? 'bg-indigo-100 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-medium ${lesson.id === currentLesson ? 'text-indigo-700' : 'text-gray-900'}`}>
                            Lesson {lesson.id}: {lesson.title}
                          </h4>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>
                        {lesson.id === currentLesson && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">
                      {Math.round((currentLesson / course.lessons.length) * 100)}%
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Course Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentLesson / course.lessons.length) * 100}%` }}
                      ></div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Complete Course
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
