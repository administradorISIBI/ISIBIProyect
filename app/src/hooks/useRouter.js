import { useMemo, useState } from "react";

export const useRouter=()=> {
  const [pathname, setPathname] = useState('/');

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}
