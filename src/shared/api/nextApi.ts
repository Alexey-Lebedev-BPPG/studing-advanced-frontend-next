interface NextRequest<T, K> {
  body?: T;
  forAuth?: boolean;
  headers?: [string, string][] | Record<string, string> | Headers;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
}

export const nextApi = async <T, K>(props: NextRequest<T, K>) => {
  const {
    body,
    forAuth = false,
    headers,
    method = 'GET',
    url,
    ...otherParams
  } = props;

  const authHeaders = { authorization: forAuth ? '1' : '' };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...authHeaders, ...headers },
    method,
    ...otherParams,
  });

  const data: K = await response.json();

  return { data, ...response };
};
