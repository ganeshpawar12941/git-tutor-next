// API Configuration and Utility Functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v2';

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => apiRequest('/auth/me'),
};

// Courses API functions
export const coursesAPI = {
  getAll: () => apiRequest('/courses'),

  getById: (id) => apiRequest(`/courses/${id}`),

  create: (courseData) => apiRequest('/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
  }),

  update: (id, courseData) => apiRequest(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseData),
  }),

  delete: (id) => apiRequest(`/courses/${id}`, {
    method: 'DELETE',
  }),
};

// Users API functions
export const usersAPI = {
  getProfile: () => apiRequest('/users/profile'),

  updateProfile: (userData) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  getAll: () => apiRequest('/users'),

  getById: (id) => apiRequest(`/users/${id}`),
};

// Videos API functions
export const videosAPI = {
  getAll: () => apiRequest('/videos'),

  getById: (id) => apiRequest(`/videos/${id}`),

  getByCourse: (courseId) => apiRequest(`/videos/course/${courseId}`),

  upload: (formData) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/videos/upload`, {
      method: 'POST',
      body: formData,
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    }).then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || 'Upload failed');
        });
      }
      return response.json();
    });
  },

  update: (id, updateData) => apiRequest(`/videos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  }),

  delete: (id) => apiRequest(`/videos/${id}`, {
    method: 'DELETE',
  }),
};

// Comments API functions
export const commentsAPI = {
  getByVideo: (videoId) => apiRequest(`/comments/video/${videoId}`),

  create: (commentData) => apiRequest('/comments', {
    method: 'POST',
    body: JSON.stringify(commentData),
  }),

  update: (id, commentData) => apiRequest(`/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(commentData),
  }),

  delete: (id) => apiRequest(`/comments/${id}`, {
    method: 'DELETE',
  }),
};

// Enrollment API functions
export const enrollmentAPI = {
  enroll: (courseId) => {
    const token = localStorage.getItem('token');
    return fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || 'Enrollment failed');
        });
      }
      return response.json();
    });
  },

  getMyEnrollments: () => apiRequest('/enrollments/my'),

  getByCourse: (courseId) => apiRequest(`/enrollments/course/${courseId}`),
};

// Teachers API functions
export const teachersAPI = {
  getAll: () => apiRequest('/teachers'),

  getById: (id) => apiRequest(`/teachers/${id}`),

  getCourses: (teacherId) => apiRequest(`/teachers/${teacherId}/courses`),
};

// Notifications API functions
export const notificationsAPI = {
  getAll: () => apiRequest('/notifications'),

  markAsRead: (id) => apiRequest(`/notifications/${id}/read`, {
    method: 'PUT',
  }),

  markAllAsRead: () => apiRequest('/notifications/mark-all-read', {
    method: 'PUT',
  }),
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Utility function to get stored user data
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Utility function to store auth data
export const storeAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
