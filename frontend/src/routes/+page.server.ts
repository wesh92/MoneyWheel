// frontend/src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Inside Docker Compose, services can talk to each other using their service names as hostnames.
    // The URL is http://<service-name>:<port>
    const response = await fetch('http://backend:8080/api/v1/healthcheck');

    if (!response.ok) {
        console.error('Backend response not OK:', response.status, await response.text());
        return { backendStatus: null };
    }
    
    const data = await response.json();
    return {
      backendStatus: data
    };

  } catch (error) {
    console.error("Failed to fetch from backend:", error);
    return {
        backendStatus: null
    };
  }
};
