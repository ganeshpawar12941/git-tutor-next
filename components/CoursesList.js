'use client';

import { useState, useEffect } from 'react';
import { coursesAPI } from '@/lib/api';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await coursesAPI.getAll();
        setCourses(data.courses || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id || course.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {course.duration || 'Duration not specified'}
            </span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Enroll
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
