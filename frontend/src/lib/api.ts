export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://portfolio2-7nz9.onrender.com/api";

export const getBackendBaseUrl = () => {
  return API_URL.replace(/\/api\/?$/, "");
};

const getFetchOptions = (): RequestInit => {
  if (typeof window === "undefined") {
    return {
      next: { revalidate: 5 },
    } as any;
  }

  return {
    cache: "no-store",
  };
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 60000
): Promise<Response> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort(new Error("Request timed out"));
  }, timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error: any) {
    if (error.name === "AbortError" || error.message === "Request timed out") {
      throw new Error(`Request to ${url} timed out after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function handleResponseError(
  res: Response,
  defaultMessage: string
) {
  let detail = "";

  try {
    const text = await res.text();

    try {
      const json = JSON.parse(text);
      detail = json.message || json.error || text;
    } catch {
      detail = text;
    }
  } catch {}

  throw new Error(
    `${defaultMessage}: ${res.status} ${res.statusText}${
      detail ? ` - ${detail}` : ""
    }`
  );
}

/* ------------------------------
   PUBLIC FETCH METHODS
--------------------------------*/

export async function fetchPortfolio() {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/portfolio`,
      getFetchOptions()
    );

    if (!res.ok) {
      return {
        name: "Loading...",
        title: "",
        shortIntro: "",
        description: "",
        githubUrl: "",
        linkedinUrl: "",
        email: "",
        photoUrl: "",
      };
    }

    return await res.json();
  } catch {
    return {
      name: "Loading...",
      title: "",
      shortIntro: "",
      description: "",
      githubUrl: "",
      linkedinUrl: "",
      email: "",
      photoUrl: "",
    };
  }
}

export async function fetchProjects() {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/projects`,
      getFetchOptions()
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchResume() {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/resume`,
      getFetchOptions()
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchSkills() {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/skills`,
      getFetchOptions()
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchCertificates() {
  try {
    const res = await fetchWithTimeout(
      `${API_URL}/certificates`,
      getFetchOptions()
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}
/* ------------------------------
   AUTH
--------------------------------*/

export async function login(credentials: any) {
  const res = await fetchWithTimeout(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    await handleResponseError(res, "Login failed");
  }

  return res.json();
}

export async function register(credentials: any) {
  const res = await fetchWithTimeout(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    await handleResponseError(res, "Registration failed");
  }

  return res.json();
}

/* ------------------------------
   FILE UPLOAD
--------------------------------*/

export async function uploadFile(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithTimeout(`${API_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    await handleResponseError(res, "Upload failed");
  }

  return res.json();
}

/* ------------------------------
   PORTFOLIO
--------------------------------*/

export async function updatePortfolio(data: any, token: string) {
  const res = await fetchWithTimeout(`${API_URL}/portfolio`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Update failed");
  }

  return res.json();
}

/* ------------------------------
   PROJECTS
--------------------------------*/

export async function createProject(data: any, token: string) {
  const res = await fetchWithTimeout(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Create project failed");
  }

  return res.json();
}

export async function updateProject(
  id: string | number,
  data: any,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Update project failed");
  }

  return res.json();
}

export async function deleteProject(
  id: string | number,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    await handleResponseError(res, "Delete project failed");
  }

  return true;
}

/* ------------------------------
   RESUME
--------------------------------*/

export async function createResume(
  data: any,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Create resume failed");
  }

  return res.json();
}

export async function deleteResume(
  id: string | number,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/resume/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    await handleResponseError(res, "Delete resume failed");
  }

  return true;
}
/* ------------------------------
   SKILLS
--------------------------------*/

export async function createSkill(data: any, token: string) {
  const res = await fetchWithTimeout(`${API_URL}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Create skill failed");
  }

  return res.json();
}

export async function deleteSkill(
  id: string | number,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/skills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    await handleResponseError(res, "Delete skill failed");
  }

  return true;
}

/* ------------------------------
   CERTIFICATES
--------------------------------*/

export async function createCertificate(
  data: any,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/certificates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Create certificate failed");
  }

  return res.json();
}

export async function deleteCertificate(
  id: string | number,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/certificates/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    await handleResponseError(res, "Delete certificate failed");
  }

  return true;
}

/* ------------------------------
   PASSWORD
--------------------------------*/

export async function changePassword(
  data: any,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/users/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    await handleResponseError(res, "Change password failed");
  }

  return true;
}

/* ------------------------------
   CONTACT
--------------------------------*/

export async function fetchContactMessages(token: string) {
  const res = await fetchWithTimeout(`${API_URL}/contact`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    await handleResponseError(res, "Fetch messages failed");
  }

  return res.json();
}

export async function deleteContactMessage(
  id: string | number,
  token: string
) {
  const res = await fetchWithTimeout(`${API_URL}/contact/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    await handleResponseError(res, "Delete message failed");
  }

  return true;
}