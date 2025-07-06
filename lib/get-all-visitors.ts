const umamiApiKey = process.env.UMAMI_API_KEY;
const websiteId = process.env.UMAMI_WEBSITE_ID;

const formatDate = (date: any) => {
  return date.toISOString().split("T")[0];
};

export const fetchAllVisitors = async () => {
  const pageSize = 100;
  let sessions = [];
  let totalPages = 1;
  const start = "2024-12-01";
  const end = `${formatDate(new Date())}T23:59:59`;

  for (let page = 1; page <= totalPages; page++) {
    const apiUrl = `https://api.umami.is/v1/websites/${websiteId}/sessions?startAt=${new Date(
      start
    ).getTime()}&endAt=${new Date(
      end
    ).getTime()}&pageSize=${pageSize}&page=${page}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-umami-api-key": umamiApiKey,
      } as HeadersInit,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    sessions.push(...result.data);

    if (page === 1 && result.count) {
      totalPages = Math.ceil(result.count / pageSize);
    }
  }

  return sessions;
};
