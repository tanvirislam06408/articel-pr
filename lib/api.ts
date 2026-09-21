export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

async function request<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("monon_auth_token") : null;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(url, {
    headers: defaultHeaders,
    ...customConfig,
  });

  const resJson = await response.json().catch(() => ({
    success: false,
    statusCode: response.status,
    message: "Failed to parse JSON response",
  }));

  if (!response.ok || !resJson.success) {
    throw new Error(
      resJson.message || `API request failed with status ${response.status}`
    );
  }

  return resJson;
}

export const api = {
  // 1. Auth API
  auth: {
    login: (credentials: { email: string; password: string }) =>
      request<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData: any) =>
      request<{ user: any; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    me: () => request<any>("/auth/me"),
    updateProfile: (profileData: any) =>
      request<any>("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(profileData),
      }),
  },

  // 2. Topics API
  topics: {
    getAll: () => request<any[]>("/topics"),
    getBySlug: (slug: string) => request<any>(`/topics/${slug}`),
    create: (topicData: any) =>
      request<any>("/topics", {
        method: "POST",
        body: JSON.stringify(topicData),
      }),
    update: (id: string, topicData: any) =>
      request<any>(`/topics/${id}`, {
        method: "PATCH",
        body: JSON.stringify(topicData),
      }),
    delete: (id: string) =>
      request<any>(`/topics/${id}`, {
        method: "DELETE",
      }),
  },

  // 3. Articles API
  articles: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      search?: string;
      topic?: string;
      status?: string;
      isFeatured?: boolean;
      sortBy?: string;
      sortOrder?: "ASC" | "DESC" | "asc" | "desc";
    }) => request<any[]>("/articles", { params }),
    getFeatured: () => request<any[]>("/articles/featured"),
    getLeadCover: () => request<any>("/articles/lead-cover"),
    getBySlug: (slug: string) => request<any>(`/articles/${slug}`),
    create: (articleData: any) =>
      request<any>("/articles", {
        method: "POST",
        body: JSON.stringify(articleData),
      }),
    update: (id: string, articleData: any) =>
      request<any>(`/articles/${id}`, {
        method: "PATCH",
        body: JSON.stringify(articleData),
      }),
    delete: (id: string) =>
      request<any>(`/articles/${id}`, {
        method: "DELETE",
      }),
    recordView: (id: string) =>
      request<any>(`/articles/${id}/view`, {
        method: "POST",
      }),
  },

  // 4. Comments & Social API
  comments: {
    getByArticle: (slugOrId: string) =>
      request<{ comments: any[]; likesCount: number }>(`/comments/${slugOrId}`),
    addComment: (slugOrId: string, data: { authorName: string; authorEmail: string; content: string; parentId?: string | null }) =>
      request<any>(`/comments/${slugOrId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    likeArticle: (slugOrId: string, fingerprint?: string) =>
      request<{ likes: number }>(`/comments/${slugOrId}/like`, {
        method: "POST",
        body: JSON.stringify({ fingerprint }),
      }),
  },

  // 5. Contact & Newsletter
  contact: {
    sendMessage: (messageData: { name: string; email: string; subject?: string; message: string }) =>
      request<any>("/contact/message", {
        method: "POST",
        body: JSON.stringify(messageData),
      }),
    subscribe: (email: string) =>
      request<any>("/contact/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    getMessages: () => request<any[]>("/contact/messages"),
    getSubscribers: () => request<any[]>("/contact/subscribers"),
  },

  // 6. Analytics API
  analytics: {
    getDashboard: () => request<any>("/analytics/dashboard"),
  },

  // 7. Upload API
  upload: {
    image: async (file: File): Promise<ApiResponse<{ url: string; filename: string }>> => {
      const formData = new FormData();
      formData.append("image", file);

      const token =
        typeof window !== "undefined" ? localStorage.getItem("monon_auth_token") : null;

      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        throw new Error(resJson.message || "Failed to upload image");
      }
      return resJson;
    },
  },
};
